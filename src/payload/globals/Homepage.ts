import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  admin: {
    group: 'Pages',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'hero',
              type: 'group',
              fields: [
                {
                  name: 'headline',
                  type: 'text',
                  required: true,
                  defaultValue: 'Perfect Catered Affairs',
                },
                {
                  name: 'subheadline',
                  type: 'text',
                  defaultValue: 'Premium North Indian Catering Since 1998',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue:
                    'Serving authentic Mughlai cuisine for weddings, corporate events, and private parties across Delhi-NCR.',
                },
                {
                  name: 'backgroundImage',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Hero section background image',
                  },
                },
                {
                  name: 'primaryCta',
                  type: 'group',
                  fields: [
                    {
                      name: 'text',
                      type: 'text',
                      defaultValue: 'Get Quote',
                    },
                    {
                      name: 'link',
                      type: 'text',
                      defaultValue: '/get-quote',
                    },
                  ],
                },
                {
                  name: 'secondaryCta',
                  type: 'group',
                  fields: [
                    {
                      name: 'text',
                      type: 'text',
                      defaultValue: 'View Menu',
                    },
                    {
                      name: 'link',
                      type: 'text',
                      defaultValue: '/menu',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Stats',
          fields: [
            {
              name: 'stats',
              type: 'array',
              maxRows: 4,
              defaultValue: [
                { value: '27+', label: 'Years of Excellence' },
                { value: '5000+', label: 'Events Catered' },
                { value: '10L+', label: 'Happy Guests' },
                { value: '100+', label: 'Menu Items' },
              ],
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g., "27+", "5000+", "100%"',
                  },
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g., "Years Experience", "Events Catered"',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Featured Menu',
          fields: [
            {
              name: 'featuredMenu',
              type: 'group',
              fields: [
                {
                  name: 'sectionTitle',
                  type: 'text',
                  defaultValue: 'Signature Dishes',
                },
                {
                  name: 'sectionSubtitle',
                  type: 'text',
                  defaultValue: 'Our most loved preparations',
                },
                {
                  name: 'items',
                  type: 'relationship',
                  relationTo: 'menu-items',
                  hasMany: true,
                  maxRows: 8,
                  admin: {
                    description: 'Select up to 8 menu items to feature on homepage',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Services',
          fields: [
            {
              name: 'services',
              type: 'group',
              fields: [
                {
                  name: 'sectionTitle',
                  type: 'text',
                  defaultValue: 'Our Services',
                },
                {
                  name: 'sectionSubtitle',
                  type: 'text',
                  defaultValue: 'Catering for every occasion',
                },
                {
                  name: 'featuredServices',
                  type: 'relationship',
                  relationTo: 'service-packages',
                  hasMany: true,
                  maxRows: 4,
                  admin: {
                    description: 'Select service packages to show on homepage',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Testimonials',
          fields: [
            {
              name: 'testimonials',
              type: 'group',
              fields: [
                {
                  name: 'sectionTitle',
                  type: 'text',
                  defaultValue: 'What Our Clients Say',
                },
                {
                  name: 'sectionSubtitle',
                  type: 'text',
                  defaultValue: 'Trusted by thousands of happy customers',
                },
                {
                  name: 'featured',
                  type: 'relationship',
                  relationTo: 'testimonials',
                  hasMany: true,
                  maxRows: 6,
                  admin: {
                    description:
                      'Select testimonials to show on homepage (or leave empty to auto-select featured)',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Why Choose Us',
          fields: [
            {
              name: 'whyChooseUs',
              type: 'group',
              fields: [
                {
                  name: 'sectionTitle',
                  type: 'text',
                  defaultValue: 'Why Choose Ada-e-Haandi?',
                },
                {
                  name: 'reasons',
                  type: 'array',
                  maxRows: 6,
                  defaultValue: [
                    {
                      title: '27+ Years Experience',
                      description: 'Trusted by thousands of families since 1998',
                      icon: 'award',
                    },
                    {
                      title: 'Customized Menus',
                      description: 'Tailored menus to match your taste and budget',
                      icon: 'utensils',
                    },
                    {
                      title: 'Professional Service',
                      description: 'Trained staff ensuring flawless execution',
                      icon: 'users',
                    },
                    {
                      title: 'Premium Quality',
                      description: 'Fresh ingredients and authentic recipes',
                      icon: 'star',
                    },
                  ],
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      required: true,
                    },
                    {
                      name: 'icon',
                      type: 'select',
                      options: [
                        { label: 'Award', value: 'award' },
                        { label: 'Utensils', value: 'utensils' },
                        { label: 'Users', value: 'users' },
                        { label: 'Star', value: 'star' },
                        { label: 'Clock', value: 'clock' },
                        { label: 'Shield', value: 'shield' },
                        { label: 'Heart', value: 'heart' },
                        { label: 'Check', value: 'check' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'CTA Section',
          fields: [
            {
              name: 'cta',
              type: 'group',
              fields: [
                {
                  name: 'headline',
                  type: 'text',
                  defaultValue: 'Ready to Create Your Perfect Event?',
                },
                {
                  name: 'subheadline',
                  type: 'text',
                  defaultValue: 'Get a customized quote for your upcoming celebration',
                },
                {
                  name: 'buttonText',
                  type: 'text',
                  defaultValue: 'Request a Quote',
                },
                {
                  name: 'buttonLink',
                  type: 'text',
                  defaultValue: '/get-quote',
                },
                {
                  name: 'backgroundImage',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
