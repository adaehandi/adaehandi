import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { z } from 'zod'

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 5 // 5 requests per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false
  }

  record.count++
  return true
}

// Validation schema for contact form
const contactFormSchema = z.object({
  type: z.literal('contact'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  eventType: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

// Validation schema for quote request form
const quoteFormSchema = z.object({
  type: z.literal('quote'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  alternatePhone: z.string().optional(),
  eventType: z.string(),
  eventDate: z.string(),
  guestCount: z.string(),
  venue: z.string().optional(),
  cuisinePreference: z.string().optional(),
  dietaryPreference: z.enum(['veg', 'nonveg', 'both']).optional(),
  spiceLevel: z.enum(['mild', 'medium', 'spicy']).optional(),
  specialRequirements: z.string().optional(),
  services: z.array(z.string()).optional(),
  budget: z.string().optional(),
  message: z.string().optional(),
})

const formSchema = z.discriminatedUnion('type', [contactFormSchema, quoteFormSchema])

type FormData = z.infer<typeof formSchema>

// Map form data to Payload collection fields
function mapToPayloadFields(data: FormData): Record<string, unknown> {
  const baseFields = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    message: data.message || '',
    source: 'website',
    status: 'new',
  }

  if (data.type === 'contact') {
    return {
      ...baseFields,
      eventType: data.eventType || 'other',
    }
  }

  // Quote form
  return {
    ...baseFields,
    eventType: data.eventType,
    eventDate: data.eventDate ? new Date(data.eventDate).toISOString() : undefined,
    guestCount: data.guestCount ? parseInt(data.guestCount, 10) : undefined,
    venue: data.venue,
    menuPreference: mapDietaryPreference(data.dietaryPreference),
    services: data.services,
    budget: data.budget,
  }
}

function mapDietaryPreference(pref?: string): string {
  switch (pref) {
    case 'veg':
      return 'veg-only'
    case 'nonveg':
      return 'nonveg-only'
    case 'both':
      return 'both'
    default:
      return 'not-decided'
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()

    // Validate input
    const validationResult = formSchema.safeParse(body)
    if (!validationResult.success) {
      const errors = validationResult.error.flatten()
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: errors.fieldErrors },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Get Payload instance
    const payload = await getPayload({ config })

    // Map form data to Payload fields
    const inquiryData = mapToPayloadFields(data)

    // Create inquiry in Payload CMS
    const inquiry = await payload.create({
      collection: 'inquiries',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: inquiryData as any,
    })

    // Send email notification (if Resend is configured)
    await sendEmailNotification(data, String(inquiry.id))

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been submitted successfully. We will contact you soon!',
      id: inquiry.id,
    })
  } catch (error) {
    console.error('Error processing inquiry:', error)
    return NextResponse.json(
      { success: false, error: 'An error occurred while processing your request.' },
      { status: 500 }
    )
  }
}

async function sendEmailNotification(data: FormData, inquiryId: string): Promise<void> {
  // Check if Resend API key is configured
  const resendApiKey = process.env.RESEND_API_KEY
  if (!resendApiKey) {
    console.log('Resend API key not configured. Skipping email notification.')
    console.log('New inquiry received:', { id: inquiryId, name: data.name, email: data.email })
    return
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || 'Ada-e-Haandi <noreply@adaehaandi.com>',
        to: process.env.EMAIL_TO || 'info@adaehaandi.com',
        subject: `New ${data.type === 'quote' ? 'Quote Request' : 'Contact Form'} - ${data.name}`,
        html: generateEmailHtml(data, inquiryId),
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Failed to send email notification:', error)
    }
  } catch (error) {
    console.error('Error sending email notification:', error)
  }
}

function generateEmailHtml(data: FormData, inquiryId: string): string {
  const isQuote = data.type === 'quote'

  let details = `
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
  `

  if (isQuote) {
    details += `
      <p><strong>Event Type:</strong> ${data.eventType}</p>
      <p><strong>Event Date:</strong> ${data.eventDate}</p>
      <p><strong>Guest Count:</strong> ${data.guestCount}</p>
      ${data.venue ? `<p><strong>Venue:</strong> ${data.venue}</p>` : ''}
      ${data.dietaryPreference ? `<p><strong>Dietary Preference:</strong> ${data.dietaryPreference}</p>` : ''}
      ${data.services?.length ? `<p><strong>Services:</strong> ${data.services.join(', ')}</p>` : ''}
      ${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ''}
    `
  }

  if (data.message) {
    details += `<p><strong>Message:</strong></p><p>${data.message}</p>`
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2B3A67; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New ${isQuote ? 'Quote Request' : 'Contact Form Submission'}</h1>
        </div>
        <div class="content">
          ${details}
          <hr>
          <p><small>Inquiry ID: ${inquiryId}</small></p>
          <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://adaehaandi.vercel.app'}/admin/collections/inquiries/${inquiryId}">View in Admin Panel</a></p>
        </div>
        <div class="footer">
          <p>This email was sent from the Ada-e-Haandi website contact form.</p>
        </div>
      </div>
    </body>
    </html>
  `
}
