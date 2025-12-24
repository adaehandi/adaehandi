import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'clientName',
    defaultColumns: ['clientName', 'eventType', 'rating', 'featured'],
    group: 'Content',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'clientName',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the client',
      },
    },
    {
      name: 'company',
      type: 'text',
      admin: {
        description: 'Company name (for corporate events)',
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
      name: 'quote',
      type: 'textarea',
      required: true,
      admin: {
        description: 'The testimonial text',
      },
    },
    {
      name: 'rating',
      type: 'select',
      required: true,
      defaultValue: '5',
      options: [
        { label: '5 Stars', value: '5' },
        { label: '4 Stars', value: '4' },
        { label: '3 Stars', value: '3' },
        { label: '2 Stars', value: '2' },
        { label: '1 Star', value: '1' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'clientPhoto',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional photo of the client',
      },
    },
    {
      name: 'eventDate',
      type: 'date',
      admin: {
        description: 'When the event took place',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'MMM yyyy',
        },
      },
    },
    {
      name: 'venue',
      type: 'text',
      admin: {
        description: 'Event venue (optional)',
      },
    },
    {
      name: 'guestCount',
      type: 'number',
      admin: {
        description: 'Number of guests served',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show on homepage',
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order (lower = first)',
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
