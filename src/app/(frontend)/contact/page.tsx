'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Contact information
const contactInfo = {
  address: {
    line1: '141-142, South Moti Bagh Market',
    line2: 'New Delhi - 110021',
    mapUrl: 'https://maps.google.com/?q=South+Moti+Bagh+Market+New+Delhi',
  },
  phones: [
    { number: '+91 99993 42322', href: 'tel:+919999342322' },
    { number: '011-2467 2702', href: 'tel:01124672702' },
  ],
  email: 'info@adaehaandi.com',
  whatsapp: '+919999342322',
  hours: {
    weekdays: '10:00 AM - 10:00 PM',
    weekends: '10:00 AM - 10:00 PM',
  },
}

// Inquiry types
const inquiryTypes = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'wedding', label: 'Wedding Catering' },
  { value: 'corporate', label: 'Corporate Event' },
  { value: 'party', label: 'Private Party' },
  { value: 'other', label: 'Other' },
]

interface FormData {
  name: string
  email: string
  phone: string
  inquiryType: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  message?: string
  submit?: string
}

// Google Maps embed URL for South Moti Bagh
const GOOGLE_MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.0234!2d77.1686!3d28.5697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1d5f5c0f0001%3A0x1234567890abcdef!2sSouth%20Moti%20Bagh%20Market!5e0!3m2!1sen!2sin!4v1234567890'

export default function ContactPage(): React.ReactElement {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'general',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[+]?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    if (errors.submit) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.submit
        return newErrors
      })
    }

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          eventType: formData.inquiryType,
          message: formData.message,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form')
      }

      setIsSubmitted(true)
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: error instanceof Error ? error.message : 'An error occurred. Please try again.',
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-navy relative pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-gold-500 mb-2 text-sm font-medium tracking-widest uppercase">
            Get in Touch
          </p>
          <h1 className="mb-4 font-serif text-4xl font-bold text-white sm:text-5xl">Contact Us</h1>
          <p className="mx-auto max-w-2xl text-lg text-white/80">
            Have questions about our catering services? We&apos;d love to hear from you. Reach out
            to us and we&apos;ll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="shadow-elegant rounded-2xl bg-white p-8">
                <h2 className="text-navy-700 mb-6 font-serif text-2xl font-bold">
                  Send Us a Message
                </h2>

                {isSubmitted ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-navy-700 mb-2 font-serif text-xl font-bold">
                      Message Sent!
                    </h3>
                    <p className="text-navy-600/70 mb-6">
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false)
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          inquiryType: 'general',
                          message: '',
                        })
                      }}
                      className="text-gold-600 hover:text-gold-700 font-semibold"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="text-navy-700 mb-1.5 block text-sm font-medium"
                        >
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={cn(
                            'text-navy-700 w-full rounded-xl border bg-white px-4 py-3',
                            'placeholder:text-navy-300',
                            'transition-colors duration-200',
                            'focus:ring-gold-500 focus:border-transparent focus:ring-2 focus:outline-none',
                            errors.name
                              ? 'border-red-500 focus:ring-red-500'
                              : 'border-cream-300 hover:border-cream-400'
                          )}
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="text-navy-700 mb-1.5 block text-sm font-medium"
                        >
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={cn(
                            'text-navy-700 w-full rounded-xl border bg-white px-4 py-3',
                            'placeholder:text-navy-300',
                            'transition-colors duration-200',
                            'focus:ring-gold-500 focus:border-transparent focus:ring-2 focus:outline-none',
                            errors.email
                              ? 'border-red-500 focus:ring-red-500'
                              : 'border-cream-300 hover:border-cream-400'
                          )}
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      {/* Phone */}
                      <div>
                        <label
                          htmlFor="phone"
                          className="text-navy-700 mb-1.5 block text-sm font-medium"
                        >
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={cn(
                            'text-navy-700 w-full rounded-xl border bg-white px-4 py-3',
                            'placeholder:text-navy-300',
                            'transition-colors duration-200',
                            'focus:ring-gold-500 focus:border-transparent focus:ring-2 focus:outline-none',
                            errors.phone
                              ? 'border-red-500 focus:ring-red-500'
                              : 'border-cream-300 hover:border-cream-400'
                          )}
                          placeholder="+91 99999 99999"
                        />
                        {errors.phone && (
                          <p className="mt-1.5 text-sm text-red-600">{errors.phone}</p>
                        )}
                      </div>

                      {/* Inquiry Type */}
                      <div>
                        <label
                          htmlFor="inquiryType"
                          className="text-navy-700 mb-1.5 block text-sm font-medium"
                        >
                          Inquiry Type
                        </label>
                        <select
                          id="inquiryType"
                          name="inquiryType"
                          value={formData.inquiryType}
                          onChange={handleChange}
                          className="text-navy-700 border-cream-300 hover:border-cream-400 focus:ring-gold-500 w-full cursor-pointer appearance-none rounded-xl border bg-white px-4 py-3 transition-colors duration-200 focus:border-transparent focus:ring-2 focus:outline-none"
                        >
                          {inquiryTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="text-navy-700 mb-1.5 block text-sm font-medium"
                      >
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={cn(
                          'text-navy-700 w-full resize-y rounded-xl border bg-white px-4 py-3',
                          'placeholder:text-navy-300',
                          'transition-colors duration-200',
                          'focus:ring-gold-500 focus:border-transparent focus:ring-2 focus:outline-none',
                          errors.message
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-cream-300 hover:border-cream-400'
                        )}
                        placeholder="Tell us about your event, requirements, or any questions you have..."
                      />
                      {errors.message && (
                        <p className="mt-1.5 text-sm text-red-600">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Error */}
                    {errors.submit && (
                      <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
                        {errors.submit}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gold-500 text-navy-700 shadow-gold hover:bg-gold-600 inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold transition-all hover:shadow-lg disabled:cursor-wait disabled:opacity-70 sm:w-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin\ h-5 w-5" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="h-5 w-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Information Sidebar */}
            <div className="space-y-6">
              {/* Quick Contact Card */}
              <div className="shadow-elegant rounded-2xl bg-white p-6">
                <h3 className="text-navy-700 mb-6 font-serif text-xl font-bold">
                  Contact Information
                </h3>

                <div className="space-y-5">
                  {/* Address */}
                  <div className="flex gap-4">
                    <div className="bg-gold-500/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                      <MapPin className="text-gold-600 h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-navy-700 font-medium">Visit Us</p>
                      <p className="text-navy-600/70 text-sm">{contactInfo.address.line1}</p>
                      <p className="text-navy-600/70 text-sm">{contactInfo.address.line2}</p>
                      <a
                        href={contactInfo.address.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold-600 hover:text-gold-700 mt-1 inline-block text-sm font-medium"
                      >
                        Get Directions →
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4">
                    <div className="bg-gold-500/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                      <Phone className="text-gold-600 h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-navy-700 font-medium">Call Us</p>
                      {contactInfo.phones.map((phone) => (
                        <a
                          key={phone.number}
                          href={phone.href}
                          className="text-navy-600/70 hover:text-gold-600 block text-sm transition-colors"
                        >
                          {phone.number}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4">
                    <div className="bg-gold-500/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                      <Mail className="text-gold-600 h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-navy-700 font-medium">Email Us</p>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-navy-600/70 hover:text-gold-600 text-sm transition-colors"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex gap-4">
                    <div className="bg-gold-500/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                      <Clock className="text-gold-600 h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-navy-700 font-medium">Business Hours</p>
                      <p className="text-navy-600/70 text-sm">
                        Mon - Sun: {contactInfo.hours.weekdays}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="rounded-2xl bg-green-600 p-6 text-white">
                <div className="mb-4 flex items-center gap-3">
                  <MessageCircle className="h-8 w-8" />
                  <h3 className="font-serif text-xl font-bold">Quick Response?</h3>
                </div>
                <p className="mb-6 text-sm text-white/90">
                  Message us on WhatsApp for faster responses. We typically reply within 30 minutes
                  during business hours.
                </p>
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}?text=Hi%2C%20I%20would%20like%20to%20inquire%20about%20your%20catering%20services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-green-600 transition-all hover:bg-green-50"
                >
                  <MessageCircle className="h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </div>

              {/* Quick Quote CTA */}
              <div className="bg-navy-700 rounded-2xl p-6 text-white">
                <h3 className="text-gold-500 mb-2 font-serif text-xl font-bold">
                  Need a Detailed Quote?
                </h3>
                <p className="mb-6 text-sm text-white/80">
                  Use our quote request form for a customized catering proposal based on your
                  requirements.
                </p>
                <Link
                  href="/get-quote"
                  className="bg-gold-500 text-navy-700 shadow-gold hover:bg-gold-600 inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-all hover:shadow-lg"
                >
                  Get a Quote
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-cream-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-navy-700 font-serif text-2xl font-bold">Find Us</h2>
            <p className="text-navy-600/70 mt-2">
              Located in the heart of South Delhi, easily accessible from all parts of Delhi NCR
            </p>
          </div>

          {/* Google Maps Embed */}
          <div className="shadow-elegant overflow-hidden rounded-2xl">
            <iframe
              src={GOOGLE_MAPS_EMBED_URL}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ada-e-Haandi Location - South Moti Bagh Market, New Delhi"
              className="w-full"
            />
          </div>

          {/* Directions link */}
          <div className="mt-4 text-center">
            <a
              href={contactInfo.address.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-600 hover:text-gold-700 inline-flex items-center gap-2 font-medium"
            >
              <MapPin className="h-4 w-4" />
              Open in Google Maps for directions
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
