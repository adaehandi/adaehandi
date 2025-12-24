import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'businessName',
              type: 'text',
              required: true,
              defaultValue: 'Ada-e-Haandi',
            },
            {
              name: 'tagline',
              type: 'text',
              required: true,
              defaultValue: 'Perfect Catered Affairs Since 1998',
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              defaultValue:
                'Premium North Indian catering services for weddings, corporate events, and private parties in Delhi-NCR. Serving authentic Mughlai cuisine since 1998.',
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'favicon',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'contact',
              type: 'group',
              fields: [
                {
                  name: 'primaryPhone',
                  type: 'text',
                  required: true,
                  defaultValue: '+91-9999342322',
                },
                {
                  name: 'secondaryPhone',
                  type: 'text',
                  defaultValue: '011-24672702',
                },
                {
                  name: 'whatsapp',
                  type: 'text',
                  defaultValue: '+91-9999342322',
                },
                {
                  name: 'email',
                  type: 'email',
                  required: true,
                  defaultValue: 'info@adaehaandi.com',
                },
              ],
            },
            {
              name: 'address',
              type: 'group',
              fields: [
                {
                  name: 'street',
                  type: 'text',
                  defaultValue: '141-142, South Moti Bagh Market',
                },
                {
                  name: 'city',
                  type: 'text',
                  defaultValue: 'New Delhi',
                },
                {
                  name: 'state',
                  type: 'text',
                  defaultValue: 'Delhi',
                },
                {
                  name: 'pincode',
                  type: 'text',
                  defaultValue: '110021',
                },
                {
                  name: 'fullAddress',
                  type: 'textarea',
                  defaultValue: '141-142, South Moti Bagh Market, New Delhi - 110021',
                },
                {
                  name: 'googleMapsUrl',
                  type: 'text',
                  admin: {
                    description: 'Google Maps embed URL',
                  },
                },
                {
                  name: 'googleMapsLink',
                  type: 'text',
                  admin: {
                    description: 'Google Maps directions link',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Business Hours',
          fields: [
            {
              name: 'businessHours',
              type: 'group',
              fields: [
                {
                  name: 'weekdays',
                  type: 'text',
                  defaultValue: '10:00 AM - 8:00 PM',
                },
                {
                  name: 'saturday',
                  type: 'text',
                  defaultValue: '10:00 AM - 8:00 PM',
                },
                {
                  name: 'sunday',
                  type: 'text',
                  defaultValue: '10:00 AM - 6:00 PM',
                },
                {
                  name: 'note',
                  type: 'text',
                  defaultValue: 'Available 24/7 for event inquiries',
                },
              ],
            },
          ],
        },
        {
          label: 'Social Media',
          fields: [
            {
              name: 'social',
              type: 'group',
              fields: [
                {
                  name: 'instagram',
                  type: 'text',
                  admin: {
                    description: 'Instagram URL',
                  },
                },
                {
                  name: 'facebook',
                  type: 'text',
                  admin: {
                    description: 'Facebook page URL',
                  },
                },
                {
                  name: 'youtube',
                  type: 'text',
                  admin: {
                    description: 'YouTube channel URL',
                  },
                },
                {
                  name: 'twitter',
                  type: 'text',
                  admin: {
                    description: 'Twitter/X URL',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Certifications',
          fields: [
            {
              name: 'certifications',
              type: 'group',
              fields: [
                {
                  name: 'fssaiNumber',
                  type: 'text',
                  admin: {
                    description: 'FSSAI License Number',
                  },
                },
                {
                  name: 'fssaiBadge',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'FSSAI Badge Image',
                  },
                },
                {
                  name: 'otherCertifications',
                  type: 'array',
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'number',
                      type: 'text',
                    },
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seo',
              type: 'group',
              fields: [
                {
                  name: 'metaTitle',
                  type: 'text',
                  defaultValue: 'Ada-e-Haandi | Premium North Indian Catering in Delhi-NCR',
                },
                {
                  name: 'metaDescription',
                  type: 'textarea',
                  defaultValue:
                    'Premium North Indian & Mughlai catering for weddings, corporate events & parties in Delhi-NCR. 27+ years of excellence. Request a quote today!',
                },
                {
                  name: 'ogImage',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Default Open Graph image for social sharing',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
