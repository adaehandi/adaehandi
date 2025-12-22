import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'

// Collections
import { Users } from './src/payload/collections/Users'
import { Media } from './src/payload/collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // Server URL
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',

  // Admin configuration
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' - Ada-e-Haandi Admin',
    },
  },

  // Database adapter - PostgreSQL via Neon
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
    push: true, // Auto-create/update database schema
  }),

  // Rich text editor - Lexical
  editor: lexicalEditor({}),

  // Collections
  collections: [Users, Media],

  // Globals (site-wide settings)
  globals: [],

  // TypeScript type generation
  typescript: {
    outputFile: path.resolve(dirname, 'src/types/payload-types.ts'),
  },

  // Secret key for authentication
  secret: process.env.PAYLOAD_SECRET || '',

  // Plugins
  plugins: [
    seoPlugin({
      collections: ['menu-items', 'service-packages'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${doc?.name || 'Ada-e-Haandi'} | Premium North Indian Catering`,
      generateDescription: ({ doc }) =>
        doc?.description || 'Premium North Indian catering services in Delhi NCR since 1998.',
    }),
  ],

  // Localization (optional - for Hindi support)
  // localization: {
  //   locales: ['en', 'hi'],
  //   defaultLocale: 'en',
  // },

  // Upload configuration
  upload: {
    limits: {
      fileSize: 5000000, // 5MB
    },
  },

  // GraphQL (optional)
  graphQL: {
    disable: true, // Disable GraphQL to reduce bundle size
  },
})
