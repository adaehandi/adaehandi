import type { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'eventType', 'eventDate', 'featured'],
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
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Title for this gallery item (e.g., "Sharma Wedding Reception")',
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
        { label: 'Food Photography', value: 'food' },
        { label: 'Setup & Decor', value: 'setup' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Brief description of the event or photo',
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
        position: 'sidebar',
      },
    },
    {
      name: 'venue',
      type: 'text',
      admin: {
        description: 'Event venue',
      },
    },
    {
      name: 'guestCount',
      type: 'number',
      admin: {
        description: 'Number of guests',
      },
    },
    {
      name: 'tags',
      type: 'array',
      admin: {
        description: 'Additional tags for filtering',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show in featured gallery on homepage',
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
