import type { CollectionConfig } from 'payload'

export const ServicePackages: CollectionConfig = {
  slug: 'service-packages',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'priceRangeMin', 'minimumGuests', 'featured'],
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
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Package name (e.g., "Premium Wedding Package")',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.name) {
              return data.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Wedding Catering', value: 'wedding' },
        { label: 'Corporate Events', value: 'corporate' },
        { label: 'Private Parties', value: 'private-party' },
        { label: 'Religious Ceremonies', value: 'religious' },
        { label: 'Birthday Parties', value: 'birthday' },
        { label: 'Festival Celebrations', value: 'festival' },
        { label: 'Engagement/Roka', value: 'engagement' },
        { label: 'Anniversary', value: 'anniversary' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Brief description for cards and previews',
      },
    },
    {
      name: 'fullDescription',
      type: 'richText',
      admin: {
        description: 'Detailed package description',
      },
    },
    {
      name: 'pricing',
      type: 'group',
      fields: [
        {
          name: 'priceRangeMin',
          type: 'number',
          required: true,
          admin: {
            description: 'Minimum price per person (INR)',
          },
        },
        {
          name: 'priceRangeMax',
          type: 'number',
          admin: {
            description: 'Maximum price per person (INR)',
          },
        },
        {
          name: 'pricingNote',
          type: 'text',
          admin: {
            description: 'e.g., "Prices vary based on menu selection"',
          },
        },
      ],
    },
    {
      name: 'minimumGuests',
      type: 'number',
      required: true,
      defaultValue: 50,
      admin: {
        description: 'Minimum number of guests required',
        position: 'sidebar',
      },
    },
    {
      name: 'features',
      type: 'array',
      admin: {
        description: 'Key features of this package',
      },
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'includedItems',
      type: 'array',
      admin: {
        description: 'What is included in the package',
      },
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
        },
      ],
    },
    {
      name: 'menuOptions',
      type: 'group',
      fields: [
        {
          name: 'vegetarianItems',
          type: 'number',
          admin: {
            description: 'Number of vegetarian items included',
          },
        },
        {
          name: 'nonVegetarianItems',
          type: 'number',
          admin: {
            description: 'Number of non-vegetarian items included',
          },
        },
        {
          name: 'dessertItems',
          type: 'number',
          admin: {
            description: 'Number of dessert items included',
          },
        },
        {
          name: 'beverages',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Beverages included',
          },
        },
        {
          name: 'liveCounters',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Live cooking counters available',
          },
        },
      ],
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Main image for the package page',
      },
    },
    {
      name: 'galleryImages',
      type: 'array',
      maxRows: 10,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show in featured sections',
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
