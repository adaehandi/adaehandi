import type { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'eventType', 'eventDate', 'status', 'createdAt'],
    group: 'Admin',
    description: 'Contact form and quote request submissions',
  },
  access: {
    // Only authenticated users can read inquiries
    read: ({ req: { user } }) => Boolean(user),
    // Anyone can create (public form submission)
    create: () => true,
    // Only authenticated users can update
    update: ({ req: { user } }) => Boolean(user),
    // Only admins can delete
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Full name of the person inquiring',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      admin: {
        description: 'Contact phone number',
      },
    },
    {
      name: 'eventType',
      type: 'select',
      required: true,
      options: [
        { label: 'Wedding', value: 'wedding' },
        { label: 'Corporate Event', value: 'corporate' },
        { label: 'Private Party', value: 'private-party' },
        { label: 'Religious Ceremony', value: 'religious' },
        { label: 'Birthday Party', value: 'birthday' },
        { label: 'Anniversary', value: 'anniversary' },
        { label: 'Engagement', value: 'engagement' },
        { label: 'Festival', value: 'festival' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'eventDate',
      type: 'date',
      admin: {
        description: 'Proposed event date',
        date: {
          pickerAppearance: 'dayOnly',
        },
        position: 'sidebar',
      },
    },
    {
      name: 'guestCount',
      type: 'number',
      admin: {
        description: 'Estimated number of guests',
        position: 'sidebar',
      },
    },
    {
      name: 'venue',
      type: 'text',
      admin: {
        description: 'Event venue (if known)',
      },
    },
    {
      name: 'budget',
      type: 'select',
      options: [
        { label: 'Under ₹50,000', value: 'under-50k' },
        { label: '₹50,000 - ₹1,00,000', value: '50k-1l' },
        { label: '₹1,00,000 - ₹2,50,000', value: '1l-2.5l' },
        { label: '₹2,50,000 - ₹5,00,000', value: '2.5l-5l' },
        { label: 'Above ₹5,00,000', value: 'above-5l' },
        { label: 'Not sure', value: 'not-sure' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'menuPreference',
      type: 'select',
      options: [
        { label: 'Vegetarian Only', value: 'veg-only' },
        { label: 'Non-Vegetarian Only', value: 'nonveg-only' },
        { label: 'Both Veg & Non-Veg', value: 'both' },
        { label: 'Not decided', value: 'not-decided' },
      ],
    },
    {
      name: 'services',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Full Catering', value: 'full-catering' },
        { label: 'Live Counters', value: 'live-counters' },
        { label: 'Buffet Setup', value: 'buffet' },
        { label: 'Sit-down Service', value: 'sit-down' },
        { label: 'Staff & Service', value: 'staff' },
        { label: 'Crockery & Cutlery', value: 'crockery' },
        { label: 'Tent & Furniture', value: 'tent' },
      ],
      admin: {
        description: 'Services required',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      admin: {
        description: 'Additional details or special requirements',
      },
    },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'website',
      options: [
        { label: 'Website Form', value: 'website' },
        { label: 'WhatsApp', value: 'whatsapp' },
        { label: 'Phone Call', value: 'phone' },
        { label: 'Referral', value: 'referral' },
        { label: 'Social Media', value: 'social' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Quote Sent', value: 'quote-sent' },
        { label: 'Follow Up', value: 'follow-up' },
        { label: 'Converted', value: 'converted' },
        { label: 'Lost', value: 'lost' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes (not visible to customer)',
      },
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'Team member handling this inquiry',
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
