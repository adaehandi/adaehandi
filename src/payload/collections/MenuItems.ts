import type { CollectionConfig } from 'payload'

export const MenuItems: CollectionConfig = {
  slug: 'menu-items',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'cuisine', 'isVegetarian', 'featured'],
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
        description: 'Name of the dish in English',
      },
    },
    {
      name: 'nameHindi',
      type: 'text',
      admin: {
        description: 'Name of the dish in Hindi (optional)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier (auto-generated from name)',
      },
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
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Brief description of the dish',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Tandoor', value: 'tandoor' },
        { label: 'Curries - Vegetarian', value: 'curries-veg' },
        { label: 'Curries - Non-Vegetarian', value: 'curries-nonveg' },
        { label: 'Rice & Biryani', value: 'rice-biryani' },
        { label: 'Breads', value: 'breads' },
        { label: 'Chinese', value: 'chinese' },
        { label: 'Starters', value: 'starters' },
        { label: 'Soups & Salads', value: 'soups-salads' },
        { label: 'Desserts', value: 'desserts' },
        { label: 'Beverages', value: 'beverages' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'cuisine',
      type: 'select',
      required: true,
      defaultValue: 'north-indian',
      options: [
        { label: 'North Indian', value: 'north-indian' },
        { label: 'Mughlai', value: 'mughlai' },
        { label: 'Chinese', value: 'chinese' },
        { label: 'Continental', value: 'continental' },
        { label: 'South Indian', value: 'south-indian' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'dietaryInfo',
      type: 'group',
      fields: [
        {
          name: 'isVegetarian',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Is this a vegetarian dish?',
          },
        },
        {
          name: 'isVegan',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'isHalal',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'isSpicy',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Is this dish spicy?',
          },
        },
        {
          name: 'spiceLevel',
          type: 'select',
          options: [
            { label: 'Mild', value: 'mild' },
            { label: 'Medium', value: 'medium' },
            { label: 'Hot', value: 'hot' },
            { label: 'Very Hot', value: 'very-hot' },
          ],
          admin: {
            condition: (data, siblingData) => siblingData?.isSpicy,
          },
        },
      ],
    },
    {
      name: 'price',
      type: 'number',
      admin: {
        description: 'Price per serving in INR (optional - for reference)',
      },
    },
    {
      name: 'servingSize',
      type: 'text',
      admin: {
        description: 'e.g., "Serves 2-3" or "Per person"',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show this item in featured sections',
        position: 'sidebar',
      },
    },
    {
      name: 'images',
      type: 'array',
      minRows: 0,
      maxRows: 5,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'ingredients',
      type: 'textarea',
      admin: {
        description: 'Key ingredients (for allergy information)',
      },
    },
  ],
  timestamps: true,
}
