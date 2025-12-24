import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'

// Collections
import { Users } from './src/payload/collections/Users'
import { Media } from './src/payload/collections/Media'
import { MenuItems } from './src/payload/collections/MenuItems'
import { ServicePackages } from './src/payload/collections/ServicePackages'
import { Testimonials } from './src/payload/collections/Testimonials'
import { Gallery } from './src/payload/collections/Gallery'
import { Inquiries } from './src/payload/collections/Inquiries'

// Globals
import { SiteSettings } from './src/payload/globals/SiteSettings'
import { Homepage } from './src/payload/globals/Homepage'
import { Navigation } from './src/payload/globals/Navigation'

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
    // Using migrations instead of push for production stability
    push: false,
  }),

  // Rich text editor - Lexical
  editor: lexicalEditor({}),

  // Collections
  collections: [Users, Media, MenuItems, ServicePackages, Testimonials, Gallery, Inquiries],

  // Globals (site-wide settings)
  globals: [SiteSettings, Homepage, Navigation],

  // TypeScript type generation
  typescript: {
    outputFile: path.resolve(dirname, 'src/types/payload-types.ts'),
  },

  // Secret key for authentication
  secret: process.env.PAYLOAD_SECRET || '',

  // Plugins
  plugins: [
    // Vercel Blob Storage for media uploads
    // Requires BLOB_READ_WRITE_TOKEN env variable (auto-set by Vercel)
    vercelBlobStorage({
      collections: {
        media: true, // Enable for Media collection
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
      // Use client uploads to bypass Vercel's 4.5MB serverless limit
      clientUploads: true,
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

  // Sharp for image processing
  sharp,
})
