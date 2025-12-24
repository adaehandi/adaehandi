import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
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
          label: 'Main Navigation',
          fields: [
            {
              name: 'mainMenu',
              type: 'array',
              admin: {
                description: 'Main navigation links',
              },
              defaultValue: [
                { label: 'Home', link: '/', order: 1 },
                { label: 'Menu', link: '/menu', order: 2 },
                { label: 'Services', link: '/services', order: 3 },
                { label: 'Gallery', link: '/gallery', order: 4 },
                { label: 'About', link: '/about', order: 5 },
                { label: 'Contact', link: '/contact', order: 6 },
              ],
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'link',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Internal path (e.g., /menu) or external URL',
                  },
                },
                {
                  name: 'openInNewTab',
                  type: 'checkbox',
                  defaultValue: false,
                },
                {
                  name: 'order',
                  type: 'number',
                  defaultValue: 0,
                },
                {
                  name: 'children',
                  type: 'array',
                  admin: {
                    description: 'Dropdown menu items (optional)',
                  },
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'link',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'order',
                      type: 'number',
                      defaultValue: 0,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'CTA Button',
          fields: [
            {
              name: 'ctaButton',
              type: 'group',
              fields: [
                {
                  name: 'show',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    description: 'Show CTA button in header',
                  },
                },
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
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'footerColumns',
              type: 'array',
              maxRows: 4,
              defaultValue: [
                {
                  title: 'Quick Links',
                  links: [
                    { label: 'Home', link: '/' },
                    { label: 'Menu', link: '/menu' },
                    { label: 'Services', link: '/services' },
                    { label: 'Gallery', link: '/gallery' },
                  ],
                },
                {
                  title: 'Services',
                  links: [
                    { label: 'Wedding Catering', link: '/services/wedding' },
                    { label: 'Corporate Events', link: '/services/corporate' },
                    { label: 'Private Parties', link: '/services/private-party' },
                    { label: 'Religious Ceremonies', link: '/services/religious' },
                  ],
                },
                {
                  title: 'Contact',
                  links: [
                    { label: 'About Us', link: '/about' },
                    { label: 'Contact', link: '/contact' },
                    { label: 'Get Quote', link: '/get-quote' },
                  ],
                },
              ],
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'links',
                  type: 'array',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'link',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'openInNewTab',
                      type: 'checkbox',
                      defaultValue: false,
                    },
                  ],
                },
              ],
            },
            {
              name: 'footerText',
              type: 'textarea',
              defaultValue:
                'Ada-e-Haandi has been serving authentic North Indian cuisine for weddings, corporate events, and private parties since 1998. Based in South Delhi, we cater across Delhi-NCR.',
            },
            {
              name: 'copyrightText',
              type: 'text',
              defaultValue: '© {year} Ada-e-Haandi. All rights reserved.',
              admin: {
                description: 'Use {year} to auto-insert current year',
              },
            },
          ],
        },
        {
          label: 'Mobile Menu',
          fields: [
            {
              name: 'mobileMenu',
              type: 'group',
              fields: [
                {
                  name: 'showPhone',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    description: 'Show phone number in mobile menu',
                  },
                },
                {
                  name: 'showWhatsApp',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    description: 'Show WhatsApp button in mobile menu',
                  },
                },
                {
                  name: 'showSocial',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    description: 'Show social links in mobile menu',
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
