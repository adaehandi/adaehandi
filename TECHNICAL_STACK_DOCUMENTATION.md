# Technical Stack Documentation
## Next.js 15 + Payload CMS + Vercel Deployment

**Date:** 2025-11-17
**Project:** Premium Indian Catering Website
**Stack:** Next.js 15, Payload CMS 3.0, Vercel, PostgreSQL/MongoDB
**Purpose:** Complete technical implementation guide

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Technology Stack Overview](#technology-stack-overview)
3. [Next.js 15 - Core Framework](#nextjs-15---core-framework)
4. [Payload CMS 3.0 - Content Management](#payload-cms-30---content-management)
5. [Vercel - Hosting & Deployment](#vercel---hosting--deployment)
6. [Database Choices](#database-choices)
7. [Project Structure](#project-structure)
8. [Image Optimization & Storage](#image-optimization--storage)
9. [SEO & Analytics](#seo--analytics)
10. [Authentication & Security](#authentication--security)
11. [Performance Optimization](#performance-optimization)
12. [Development Workflow](#development-workflow)
13. [Deployment Pipeline](#deployment-pipeline)
14. [Best Practices Checklist](#best-practices-checklist)

---

## Executive Summary

This document provides comprehensive technical guidance for building a premium catering website using modern, production-ready technologies optimized for performance, SEO, and developer experience.

### Why This Stack?

**Next.js 15:**
- ✅ React Server Components for optimal performance
- ✅ Built-in image optimization crucial for food photography
- ✅ Excellent SEO capabilities
- ✅ Fast page loads (critical for Indian internet speeds)
- ✅ TypeScript support for type safety

**Payload CMS 3.0:**
- ✅ Code-first, TypeScript-native
- ✅ Installs directly into Next.js app
- ✅ Fully customizable admin panel
- ✅ Local API (no network latency)
- ✅ Perfect for developer control

**Vercel:**
- ✅ Built by Next.js creators (seamless integration)
- ✅ Global CDN for fast delivery
- ✅ Automatic optimization
- ✅ Zero-config deployments
- ✅ Preview deployments for every PR

### Performance Goals

- **Load Time:** <3 seconds (4G connection)
- **Lighthouse Score:** 90+ (all metrics)
- **Core Web Vitals:** Green across the board
- **Mobile Experience:** Flawless (primary user device)

---

## Technology Stack Overview

### Core Technologies

```
Frontend Framework: Next.js 15 (App Router)
Language: TypeScript 5+
CMS: Payload CMS 3.0
Database: PostgreSQL (Neon) or MongoDB Atlas
Hosting: Vercel
Image Storage: Vercel Blob / Cloudinary
Styling: Tailwind CSS
```

### Supporting Technologies

```
Authentication: Payload built-in
Forms: React Hook Form
Validation: Zod
Analytics: Google Analytics 4
SEO: Next.js Metadata API + Schema.org
Email: Resend / SendGrid
Payments: Razorpay (for Indian market)
```

### Development Tools

```
Package Manager: pnpm (or npm/yarn)
Version Control: Git + GitHub
Code Quality: ESLint, Prettier
Type Checking: TypeScript strict mode
Testing: Vitest, Playwright (optional)
```

---

## Next.js 15 - Core Framework

### Key Features & Improvements

#### 1. **App Router (Stable)**

The App Router is the future of Next.js and is built around React Server Components.

**Benefits:**
- Server Components by default (zero client JS)
- Simplified data fetching
- Layouts that persist across navigation
- Improved performance
- Better TypeScript support

**Structure:**
```
app/
  ├── layout.tsx          # Root layout (persistent)
  ├── page.tsx           # Homepage
  ├── about/
  │   └── page.tsx       # /about route
  ├── services/
  │   ├── page.tsx       # /services route
  │   └── [slug]/
  │       └── page.tsx   # /services/[slug] dynamic route
  └── api/
      └── contact/
          └── route.ts   # API route
```

#### 2. **Server Components (Default)**

Components in App Router are Server Components unless you add `"use client"`.

**Server Components:**
```typescript
// app/components/MenuSection.tsx
// This is a Server Component (default)

async function MenuSection() {
  // Can fetch data directly
  const menus = await fetch('https://api.example.com/menus')
  const data = await menus.json()

  return (
    <section>
      {data.map(menu => (
        <MenuCard key={menu.id} {...menu} />
      ))}
    </section>
  )
}

export default MenuSection
```

**Client Components:**
```typescript
// app/components/ContactForm.tsx
"use client" // Needed for interactivity

import { useState } from 'react'

export default function ContactForm() {
  const [name, setName] = useState('')

  return (
    <form>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </form>
  )
}
```

**Golden Rule:**
- Keep most UI as Server Components
- Only use `"use client"` when you need:
  - useState, useEffect, other React hooks
  - Browser APIs
  - Event handlers (onClick, onChange, etc.)

#### 3. **Image Optimization**

Next.js `<Image>` component is critical for food photography websites.

**Features:**
- Automatic format optimization (WebP, AVIF)
- Lazy loading by default
- Responsive images
- Blur placeholders
- Prevents layout shift

**Example:**
```typescript
import Image from 'next/image'

export default function HeroSection() {
  return (
    <div className="relative h-screen">
      <Image
        src="/hero-biryani.jpg"
        alt="Signature biryani platter"
        fill
        priority // For above-the-fold images
        quality={90}
        className="object-cover"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQ..." // Blur placeholder
      />
    </div>
  )
}
```

**Best Practices:**
- Use `priority` on hero images
- Use `loading="lazy"` (default) for below-fold images
- Optimize source images before upload (max 3000px width)
- Use Next.js Image for ALL images (not raw `<img>`)

#### 4. **Metadata & SEO**

Next.js 15 provides excellent SEO capabilities through the Metadata API.

**Static Metadata:**
```typescript
// app/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Premium North Indian Catering | Delhi NCR',
    template: '%s | Your Brand Name'
  },
  description: 'Authentic North Indian catering services for weddings, corporate events, and private celebrations in Delhi NCR',
  keywords: ['catering Delhi', 'North Indian catering', 'wedding catering', 'corporate catering'],
  openGraph: {
    title: 'Premium North Indian Catering',
    description: 'Authentic catering services in Delhi NCR',
    images: ['/og-image.jpg'],
  },
}
```

**Dynamic Metadata:**
```typescript
// app/services/[slug]/page.tsx
import { Metadata } from 'next'

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const service = await getService(params.slug)

  return {
    title: service.title,
    description: service.description,
    openGraph: {
      images: [service.image],
    },
  }
}
```

#### 5. **Rendering Strategies**

Next.js 15 offers flexible rendering options:

**Static Generation (SSG) - Default & Recommended:**
```typescript
// app/about/page.tsx
// Automatically static when no dynamic data

export default function AboutPage() {
  return <div>About Us</div>
}
```

**Server-Side Rendering (SSR):**
```typescript
// app/dashboard/page.tsx
export const dynamic = 'force-dynamic' // Force SSR

export default async function Dashboard() {
  const data = await fetchUserData()
  return <div>{data}</div>
}
```

**Incremental Static Regeneration (ISR):**
```typescript
// app/blog/[slug]/page.tsx
export const revalidate = 3600 // Revalidate every hour

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug)
  return <article>{post.content}</article>
}
```

#### 6. **Parallel Data Fetching**

Fetch data in parallel to reduce loading time:

```typescript
async function MenuPage() {
  // These fetch in parallel automatically!
  const [appetizers, mains, desserts] = await Promise.all([
    getAppetizers(),
    getMains(),
    getDesserts()
  ])

  return (
    <>
      <MenuSection items={appetizers} />
      <MenuSection items={mains} />
      <MenuSection items={desserts} />
    </>
  )
}
```

#### 7. **Streaming & Suspense**

Show UI progressively as data loads:

```typescript
import { Suspense } from 'react'

export default function Page() {
  return (
    <div>
      <h1>Our Menus</h1>
      <Suspense fallback={<MenuSkeleton />}>
        <MenuList />
      </Suspense>
    </div>
  )
}

async function MenuList() {
  const menus = await getMenus() // Slow data fetch
  return <div>{/* Render menus */}</div>
}
```

---

## Payload CMS 3.0 - Content Management

### Why Payload CMS?

**Key Advantages:**
1. **Code-First:** Define everything in TypeScript
2. **Next.js Native:** Installs directly into your Next.js app
3. **Local API:** Query database directly without HTTP requests
4. **Full Control:** Customize everything
5. **Type-Safe:** Auto-generated TypeScript types

### Installation

```bash
npx create-payload-app@latest
# Or add to existing Next.js app:
npm install payload @payloadcms/next @payloadcms/richtext-lexical sharp graphql --legacy-peer-deps
```

### Core Concepts

#### 1. **Collections**

Collections are groups of documents (like posts, menus, services).

**Example Collection:**
```typescript
// payload/collections/MenuItems.ts
import { CollectionConfig } from 'payload/types'

export const MenuItems: CollectionConfig = {
  slug: 'menu-items',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true, // Hindi + English support
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Appetizers', value: 'appetizers' },
        { label: 'Main Course', value: 'mains' },
        { label: 'Desserts', value: 'desserts' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
    },
    {
      name: 'isVegetarian',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'isJain',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'spiceLevel',
      type: 'select',
      options: ['Mild', 'Medium', 'Hot', 'Extra Hot'],
    },
  ],
}
```

#### 2. **Media/Uploads Collection**

Handle image uploads:

```typescript
// payload/collections/Media.ts
import { CollectionConfig } from 'payload/types'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'public/media', // Local storage
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 576,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
```

#### 3. **Global Settings**

For site-wide settings like contact info, social links:

```typescript
// payload/globals/Settings.ts
import { GlobalConfig } from 'payload/types'

export const Settings: GlobalConfig = {
  slug: 'settings',
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
    },
    {
      name: 'contactEmail',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'whatsapp',
      type: 'text',
      required: true,
    },
    {
      name: 'socialMedia',
      type: 'group',
      fields: [
        { name: 'instagram', type: 'text' },
        { name: 'facebook', type: 'text' },
        { name: 'youtube', type: 'text' },
      ],
    },
  ],
}
```

#### 4. **Payload Configuration**

Main config file:

```typescript
// payload.config.ts
import { buildConfig } from 'payload/config'
import { postgresAdapter } from '@payloadcms/db-postgres'
// or: import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import { MenuItems } from './payload/collections/MenuItems'
import { Media } from './payload/collections/Media'
import { Settings } from './payload/globals/Settings'

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  collections: [MenuItems, Media],
  globals: [Settings],

  // Database
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),

  // Rich Text Editor
  editor: lexicalEditor({}),

  // TypeScript
  typescript: {
    outputFile: 'payload-types.ts',
  },

  // Admin Panel
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- Admin Panel',
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg',
    },
  },

  // File Storage (for Vercel deployment)
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
```

#### 5. **Querying Data with Local API**

The Local API lets you query directly without HTTP:

```typescript
// app/components/FeaturedMenus.tsx
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

export default async function FeaturedMenus() {
  const payload = await getPayloadHMR({ config: configPromise })

  const menus = await payload.find({
    collection: 'menu-items',
    where: {
      featured: { equals: true },
    },
    limit: 6,
    sort: '-createdAt',
  })

  return (
    <section>
      {menus.docs.map(menu => (
        <MenuCard key={menu.id} {...menu} />
      ))}
    </section>
  )
}
```

**REST API Alternative:**
```typescript
// For client components or external apps
const response = await fetch('https://yoursite.com/api/menu-items')
const data = await response.json()
```

#### 6. **Authentication**

Payload provides built-in authentication:

```typescript
// payload/collections/Users.ts
import { CollectionConfig } from 'payload/types'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true, // Enable authentication
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'editor', 'viewer'],
      required: true,
      defaultValue: 'viewer',
    },
  ],
}
```

#### 7. **Custom Admin UI**

Fully customize the admin panel:

```typescript
// payload.config.ts
export default buildConfig({
  admin: {
    components: {
      // Custom logo
      graphics: {
        Logo: '/custom-logo.tsx',
        Icon: '/custom-icon.tsx',
      },
      // Custom views
      views: {
        Dashboard: '/custom-dashboard.tsx',
      },
    },
    // Custom CSS
    css: '/admin-styles.css',
  },
})
```

---

## Vercel - Hosting & Deployment

### Why Vercel?

- **Built for Next.js** - Created by the same team
- **Zero Configuration** - Deploy in seconds
- **Global CDN** - Fast worldwide
- **Automatic HTTPS** - Free SSL
- **Preview Deployments** - Every PR gets its own URL
- **Edge Functions** - Run code close to users
- **Analytics** - Built-in performance monitoring

### Deployment Setup

#### 1. **Connect GitHub Repository**

```bash
# Push your code to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/catering-website.git
git push -u origin main

# Then connect on Vercel dashboard:
# 1. Go to vercel.com
# 2. Click "New Project"
# 3. Import your GitHub repo
# 4. Configure and deploy
```

#### 2. **Environment Variables**

Set these in Vercel dashboard (Settings > Environment Variables):

```env
# Database
DATABASE_URI=postgresql://user:pass@host:5432/dbname
# or
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname

# Payload
PAYLOAD_SECRET=your-secret-key-here
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com

# File Storage (Vercel Blob)
BLOB_READ_WRITE_TOKEN=vercel_blob_xxx

# Email (optional)
RESEND_API_KEY=re_xxx

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Payment (Razorpay for India)
RAZORPAY_KEY_ID=rzp_live_xxx
RAZORPAY_KEY_SECRET=xxx
```

**Accessing in Code:**
```typescript
// Server-side (safe)
const dbUri = process.env.DATABASE_URI

// Client-side (only NEXT_PUBLIC_ vars)
const gaId = process.env.NEXT_PUBLIC_GA_ID
```

#### 3. **Build Configuration**

Vercel auto-detects Next.js. Override if needed:

```json
// vercel.json (optional)
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

#### 4. **Domain Setup**

```
1. Vercel Dashboard > Your Project > Settings > Domains
2. Add your custom domain (e.g., yourcompany.com)
3. Update DNS records (Vercel provides instructions)
4. SSL automatically provisioned
```

### Vercel Features

#### **Preview Deployments**

Every pull request gets a unique URL:
```
https://catering-website-git-feature-menu-yourusername.vercel.app
```

Share with clients for review before merging to production!

#### **Edge Functions**

Run serverless functions at the edge (closest to user):

```typescript
// app/api/contact/route.ts
export const runtime = 'edge' // Run on the edge

export async function POST(request: Request) {
  const body = await request.json()
  // Handle form submission
  return Response.json({ success: true })
}
```

#### **Analytics**

Enable Vercel Analytics for real performance data:

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

#### **Image Optimization**

Vercel automatically optimizes images via Next.js Image component.

**Limits on Free Plan:**
- 1,000 source images optimized per month
- 1GB bandwidth

**For high-traffic sites:**
- Upgrade Vercel plan
- Or use external service (Cloudinary, Vercel Blob)

---

## Database Choices

### MongoDB vs PostgreSQL

#### **MongoDB (Document Database)**

**Best For:**
- Flexible, evolving schemas
- Nested/embedded documents
- Rapid development
- Projects with dynamic fields

**Pros:**
- ✅ Closer match to Payload's data structure
- ✅ One document per collection item (simple)
- ✅ No migrations needed for schema changes
- ✅ Great for localization (Hindi + English)

**Cons:**
- ❌ Less rigid data integrity
- ❌ Not ideal for complex relational data

**Setup:**
```bash
# MongoDB Atlas (free tier available)
1. Create account at mongodb.com/cloud/atlas
2. Create cluster (free M0)
3. Create database user
4. Whitelist IP (0.0.0.0/0 for Vercel)
5. Get connection string
```

**Connection:**
```typescript
// payload.config.ts
import { mongooseAdapter } from '@payloadcms/db-mongodb'

export default buildConfig({
  db: mongooseAdapter({
    url: process.env.MONGODB_URI,
  }),
})
```

---

#### **PostgreSQL (Relational Database)**

**Best For:**
- Structured, relational data
- Projects requiring strict schemas
- Complex queries and joins
- Long-term data integrity

**Pros:**
- ✅ Strong ACID compliance
- ✅ Excellent for complex queries
- ✅ Better for reporting
- ✅ Scales well for large datasets

**Cons:**
- ❌ Requires migrations
- ❌ More complex setup with Payload
- ❌ Less flexible for schema changes

**Setup:**
```bash
# Neon (PostgreSQL for Vercel)
1. Go to neon.tech
2. Create project
3. Get connection string
```

**Connection:**
```typescript
// payload.config.ts
import { postgresAdapter } from '@payloadcms/db-postgres'

export default buildConfig({
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
})
```

**Migrations:**
```bash
# Generate migration after schema changes
npm run payload migrate:create

# Run migrations
npm run payload migrate
```

### **Recommendation for Catering Website:**

**Use MongoDB** if:
- You want rapid development
- Schema might evolve
- Localization is important (Hindi + English)
- You prefer simpler setup

**Use PostgreSQL** if:
- You have strict data requirements
- You need complex reporting
- You're comfortable with migrations
- You prioritize long-term data integrity

**For this project: MongoDB Atlas (Free tier is generous)**

---

## Project Structure

### Recommended Next.js 15 + Payload Structure

```
catering-website/
├── app/                          # Next.js App Router
│   ├── (frontend)/              # Route group (doesn't affect URL)
│   │   ├── layout.tsx           # Frontend layout
│   │   ├── page.tsx             # Homepage
│   │   ├── about/
│   │   │   └── page.tsx         # About page
│   │   ├── services/
│   │   │   ├── page.tsx         # Services listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # Individual service
│   │   ├── gallery/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   └── components/          # Frontend-specific components
│   │       ├── Hero.tsx
│   │       ├── MenuCard.tsx
│   │       └── ContactForm.tsx
│   │
│   ├── (payload)/               # Admin panel (optional grouping)
│   │   └── admin/
│   │       └── [[...segments]]/
│   │           └── page.tsx     # Payload admin UI
│   │
│   └── api/                     # API routes
│       ├── contact/
│       │   └── route.ts
│       └── [...slug]/
│           └── route.ts         # Payload REST API
│
├── components/                   # Shared components
│   ├── ui/                      # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   └── shared/                  # Cross-app components
│       ├── Header.tsx
│       └── Footer.tsx
│
├── payload/                      # Payload CMS configuration
│   ├── collections/
│   │   ├── MenuItems.ts
│   │   ├── Services.ts
│   │   ├── Gallery.ts
│   │   ├── Testimonials.ts
│   │   ├── Media.ts
│   │   └── Users.ts
│   ├── globals/
│   │   └── Settings.ts
│   └── access/                  # Access control functions
│       └── isAdmin.ts
│
├── lib/                         # Utility functions
│   ├── utils.ts                 # General utilities
│   └── payload.ts               # Payload helper functions
│
├── public/                      # Static files
│   ├── images/
│   ├── fonts/
│   └── favicon.ico
│
├── styles/                      # Global styles
│   └── globals.css
│
├── types/                       # TypeScript types
│   └── index.ts
│
├── .env.local                   # Local environment variables
├── .gitignore
├── next.config.js              # Next.js configuration
├── payload.config.ts           # Payload configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── package.json
└── README.md
```

### Key Files Explained

#### **app/layout.tsx** (Root Layout)
```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Premium Catering - Delhi NCR',
  description: 'Authentic North Indian catering services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
```

#### **next.config.js**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['your-blob-storage.vercel-storage.com'],
    formats: ['image/avif', 'image/webp'],
  },
  // For Payload Admin UI
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
```

---

## Image Optimization & Storage

### Challenge: Vercel Has No Persistent File Storage

Vercel is serverless - files uploaded during runtime don't persist across deployments.

### Solutions

#### **1. Vercel Blob Storage (Recommended)**

**Pros:**
- ✅ Official Vercel solution
- ✅ Zero configuration
- ✅ Automatic optimization
- ✅ Fast CDN delivery
- ✅ Simple pricing

**Setup:**
```bash
# Install
npm install @payloadcms/storage-vercel-blob

# Add to Vercel project
vercel blob add
# This creates BLOB_READ_WRITE_TOKEN automatically
```

**Configuration:**
```typescript
// payload.config.ts
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

export default buildConfig({
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
```

**Pricing:**
- Free: 1GB storage, 100GB bandwidth
- Pro: $20/month for more

---

#### **2. Cloudinary (Alternative)**

**Pros:**
- ✅ Generous free tier (25GB storage, 25GB bandwidth)
- ✅ Powerful transformations
- ✅ Great for food photography
- ✅ Automatic format optimization

**Setup:**
```bash
npm install @payloadcms/plugin-cloud-storage cloudinary

# Get credentials from cloudinary.com
```

**Configuration:**
```typescript
// payload.config.ts
import { cloudinaryAdapter } from '@payloadcms/plugin-cloud-storage/cloudinary'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'

export default buildConfig({
  plugins: [
    cloudStorage({
      collections: {
        media: {
          adapter: cloudinaryAdapter({
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY,
            apiSecret: process.env.CLOUDINARY_API_SECRET,
            folder: 'catering-website',
          }),
        },
      },
    }),
  ],
})
```

---

#### **3. AWS S3 (Enterprise)**

Best for very high traffic or enterprise needs.

```bash
npm install @payloadcms/plugin-cloud-storage @aws-sdk/client-s3
```

---

### Image Optimization Best Practices

**1. Source Images:**
```
- Max width: 3000px
- Format: JPEG for photos, PNG for graphics
- Compress before upload (80-85% quality)
```

**2. Next.js Image Component:**
```typescript
import Image from 'next/image'

// Responsive image
<Image
  src={menuItem.image.url}
  alt={menuItem.image.alt}
  width={800}
  height={600}
  className="rounded-lg"
  quality={85}
  placeholder="blur"
  blurDataURL={menuItem.image.blurDataURL}
/>
```

**3. Lazy Loading:**
- Next.js does this automatically
- Only images in viewport load initially
- Crucial for gallery pages with many images

**4. WebP/AVIF:**
- Next.js automatically serves modern formats
- Falls back to JPEG/PNG for older browsers
- 25-35% smaller file sizes

---

## SEO & Analytics

### Next.js SEO Features

#### 1. **Metadata API**

```typescript
// app/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Premium North Indian Catering | Delhi NCR',
  description: 'Authentic tandoori, biryani, and Mughlai cuisine for weddings and corporate events in Delhi',
  keywords: ['catering Delhi', 'North Indian catering', 'wedding catering', 'corporate catering NCR'],

  openGraph: {
    title: 'Premium North Indian Catering',
    description: 'Authentic catering services in Delhi NCR',
    url: 'https://yoursite.com',
    siteName: 'Your Company',
    images: [
      {
        url: 'https://yoursite.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Premium catering services',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Premium North Indian Catering',
    description: 'Authentic catering services in Delhi NCR',
    images: ['https://yoursite.com/twitter-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
```

#### 2. **Sitemap**

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yoursite.com'

  // Get dynamic routes from Payload
  const services = await getServices()

  const serviceUrls = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(service.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...serviceUrls,
  ]
}
```

#### 3. **Robots.txt**

```typescript
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: 'https://yoursite.com/sitemap.xml',
  }
}
```

#### 4. **Structured Data (Schema.org)**

Critical for local SEO and rich snippets:

```typescript
// app/page.tsx
export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    name: 'Your Catering Company',
    image: 'https://yoursite.com/logo.jpg',
    '@id': 'https://yoursite.com',
    url: 'https://yoursite.com',
    telephone: '+91-XXXXXXXXXX',
    priceRange: '₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Your Address',
      addressLocality: 'Delhi',
      postalCode: '110001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.6139,
      longitude: 77.2090,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '09:00',
      closes: '21:00',
    },
    servesCuisine: 'North Indian',
    acceptsReservations: 'True',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Page content */}
    </>
  )
}
```

**Additional Schema Types:**

```typescript
// For individual menu items
{
  "@context": "https://schema.org/",
  "@type": "MenuItem",
  "name": "Dal Makhani",
  "description": "Creamy black lentils slow-cooked with butter and spices",
  "image": "https://yoursite.com/dal-makhani.jpg",
  "offers": {
    "@type": "Offer",
    "price": "350",
    "priceCurrency": "INR"
  },
  "nutrition": {
    "@type": "NutritionInformation",
    "calories": "250"
  }
}

// For events/catering services
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Wedding Catering",
  "provider": {
    "@type": "Organization",
    "name": "Your Company"
  },
  "areaServed": {
    "@type": "City",
    "name": "Delhi"
  }
}
```

### Analytics Integration

#### **Google Analytics 4**

```typescript
// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

#### **Vercel Analytics**

```bash
npm install @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

---

## Authentication & Security

### Payload CMS Authentication

Payload provides robust authentication out of the box.

#### **Admin Users Collection**

```typescript
// payload/collections/Users.ts
import { CollectionConfig } from 'payload/types'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 7200, // 2 hours
    verify: false, // Set to true for email verification
    maxLoginAttempts: 5,
    lockTime: 600 * 1000, // 10 minutes
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'createdAt'],
  },
  access: {
    create: () => false, // Only admins can create users (set in admin panel)
    read: () => true,
    update: ({ req: { user } }) => {
      // Users can only update themselves
      if (user.role === 'admin') return true
      return {
        id: {
          equals: user.id,
        },
      }
    },
    delete: ({ req: { user } }) => user.role === 'admin',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
        {
          label: 'Viewer',
          value: 'viewer',
        },
      ],
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
}
```

#### **Access Control**

```typescript
// payload/access/isAdmin.ts
import { Access } from 'payload/types'

export const isAdmin: Access = ({ req: { user } }) => {
  return user?.role === 'admin'
}

export const isAdminOrEditor: Access = ({ req: { user } }) => {
  return user?.role === 'admin' || user?.role === 'editor'
}
```

**Apply to Collections:**

```typescript
// payload/collections/MenuItems.ts
import { isAdminOrEditor } from '../access/isAdmin'

export const MenuItems: CollectionConfig = {
  slug: 'menu-items',
  access: {
    create: isAdminOrEditor,
    read: () => true, // Public
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  // ... fields
}
```

### Security Best Practices

#### **1. Environment Variables**

```env
# Strong secret key
PAYLOAD_SECRET=generate-with-openssl-rand-base64-32

# Database credentials
DATABASE_URI=postgresql://...

# Never commit .env to git
```

#### **2. CORS Configuration**

```typescript
// payload.config.ts
export default buildConfig({
  cors: [
    'https://yourdomain.com',
    'https://www.yourdomain.com',
    process.env.NODE_ENV === 'development' && 'http://localhost:3000',
  ].filter(Boolean),
  csrf: [
    'https://yourdomain.com',
    'https://www.yourdomain.com',
    process.env.NODE_ENV === 'development' && 'http://localhost:3000',
  ].filter(Boolean),
})
```

#### **3. Rate Limiting**

For API routes:

```typescript
// lib/rateLimit.ts
import { RateLimiter } from 'limiter'

const limiter = new RateLimiter({
  tokensPerInterval: 10,
  interval: 'minute',
})

export async function rateLimit() {
  const remainingRequests = await limiter.removeTokens(1)
  if (remainingRequests < 0) {
    throw new Error('Rate limit exceeded')
  }
}
```

```typescript
// app/api/contact/route.ts
import { rateLimit } from '@/lib/rateLimit'

export async function POST(req: Request) {
  try {
    await rateLimit()
    // Handle request
  } catch (error) {
    return Response.json(
      { error: 'Too many requests' },
      { status: 429 }
    )
  }
}
```

#### **4. Input Validation**

Use Zod for type-safe validation:

```bash
npm install zod
```

```typescript
// lib/validations.ts
import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^[0-9]{10}$/),
  eventType: z.enum(['wedding', 'corporate', 'private']),
  guestCount: z.number().min(10).max(10000),
  date: z.string().datetime(),
  message: z.string().max(1000).optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
```

```typescript
// app/api/contact/route.ts
import { contactFormSchema } from '@/lib/validations'

export async function POST(req: Request) {
  const body = await req.json()

  // Validate
  const result = contactFormSchema.safeParse(body)

  if (!result.success) {
    return Response.json(
      { error: 'Invalid input', details: result.error },
      { status: 400 }
    )
  }

  // Process valid data
  const data = result.data
  // ...
}
```

---

## Performance Optimization

### Critical Optimizations for Indian Market

Indian internet speeds vary widely. Optimize aggressively.

#### **1. Image Optimization (Most Important)**

Food websites are image-heavy - this is critical:

```typescript
// Always use Next.js Image
import Image from 'next/image'

// Good
<Image
  src={dish.image}
  alt={dish.name}
  width={800}
  height={600}
  quality={85}
  placeholder="blur"
  priority={false} // Only true for hero images
/>

// Bad (never do this)
<img src={dish.image} alt={dish.name} />
```

**Image Checklist:**
- ✅ All images through `<Image>` component
- ✅ WebP/AVIF automatic conversion
- ✅ Lazy loading (default)
- ✅ Blur placeholders
- ✅ Responsive sizes
- ✅ CDN delivery (Vercel/Cloudinary)

#### **2. Font Optimization**

```typescript
// app/layout.tsx
import { Inter, Playfair_Display } from 'next/font/google'

// Load only needed weights and subsets
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-playfair',
})

export default function RootLayout({ children }) {
  return (
    <html className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

#### **3. Code Splitting**

Automatically done by Next.js, but you can optimize further:

```typescript
// Dynamic imports for heavy components
import dynamic from 'next/dynamic'

const ImageGallery = dynamic(() => import('@/components/ImageGallery'), {
  loading: () => <GallerySkeleton />,
  ssr: false, // If component doesn't need SSR
})

export default function GalleryPage() {
  return (
    <div>
      <h1>Our Gallery</h1>
      <ImageGallery />
    </div>
  )
}
```

#### **4. Database Query Optimization**

```typescript
// Bad: N+1 queries
const services = await payload.find({ collection: 'services' })
for (const service of services.docs) {
  const images = await payload.find({
    collection: 'media',
    where: { service: { equals: service.id } }
  })
}

// Good: Single query with relationships
const services = await payload.find({
  collection: 'services',
  depth: 2, // Populate relationships
})
```

#### **5. Caching Strategy**

```typescript
// app/services/page.tsx
// Revalidate every hour
export const revalidate = 3600

export default async function ServicesPage() {
  const services = await getServices()
  return <ServicesList services={services} />
}
```

**Different Caching Strategies:**
```typescript
// Static (default)
export const dynamic = 'force-static'

// Server-side render every request
export const dynamic = 'force-dynamic'

// ISR - regenerate every N seconds
export const revalidate = 60
```

#### **6. Minimize JavaScript**

```typescript
// Keep most components as Server Components
// Only use "use client" when necessary

// ✅ Good - Server Component
async function MenuSection() {
  const menus = await getMenus()
  return <div>{/* render */}</div>
}

// ❌ Unnecessary - doesn't need client JS
"use client"
function MenuSection() {
  const [menus, setMenus] = useState([])
  useEffect(() => {
    fetch('/api/menus').then(/* ... */)
  }, [])
}
```

#### **7. Bundle Analysis**

```bash
# Install
npm install @next/bundle-analyzer

# Configure
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // your config
})

# Run analysis
ANALYZE=true npm run build
```

---

## Development Workflow

### Local Development Setup

```bash
# Clone repo
git clone https://github.com/yourusername/catering-website.git
cd catering-website

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Run database (if using MongoDB locally)
# Or connect to MongoDB Atlas / Neon Postgres

# Generate Payload types
npm run payload generate:types

# Run development server
npm run dev
```

**Access:**
- Frontend: http://localhost:3000
- Admin Panel: http://localhost:3000/admin

### Git Workflow

**Branch Strategy:**
```bash
main          # Production
├── develop   # Development
└── feature/* # Feature branches
```

**Feature Development:**
```bash
# Create feature branch
git checkout -b feature/wedding-packages

# Make changes, commit
git add .
git commit -m "Add wedding package page"

# Push and create PR
git push origin feature/wedding-packages
# Create PR on GitHub for review
```

### Code Quality Tools

#### **ESLint Configuration**

```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

#### **Prettier Configuration**

```json
// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

#### **Pre-commit Hooks**

```bash
npm install --save-dev husky lint-staged

# Initialize husky
npx husky install
```

```json
// package.json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

---

## Deployment Pipeline

### Automated Deployment Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npm run type-check

      - name: Build
        run: npm run build
        env:
          DATABASE_URI: ${{ secrets.DATABASE_URI }}
          PAYLOAD_SECRET: ${{ secrets.PAYLOAD_SECRET }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### Deployment Checklist

**Before First Deployment:**
- [ ] Environment variables set in Vercel
- [ ] Database created and accessible
- [ ] Domain configured
- [ ] Analytics set up
- [ ] Error tracking configured (Sentry, etc.)

**Before Each Deployment:**
- [ ] All tests passing
- [ ] Lint checks passing
- [ ] Type checks passing
- [ ] Build successful locally
- [ ] Database migrations run (if using Postgres)
- [ ] Environment variables updated (if changed)

**After Deployment:**
- [ ] Smoke test critical paths
- [ ] Check Vercel deployment logs
- [ ] Verify images loading
- [ ] Test contact form
- [ ] Check analytics tracking
- [ ] Test on mobile device

---

## Best Practices Checklist

### TypeScript

- [ ] Strict mode enabled
- [ ] No `any` types (or justified)
- [ ] All props typed
- [ ] Payload types auto-generated
- [ ] Zod for runtime validation

### Performance

- [ ] All images use `<Image>` component
- [ ] Critical images have `priority`
- [ ] Non-critical images lazy-loaded
- [ ] Fonts optimized (next/font)
- [ ] Minimal client-side JavaScript
- [ ] Code splitting where appropriate
- [ ] Database queries optimized

### SEO

- [ ] Metadata on all pages
- [ ] Open Graph tags
- [ ] Structured data (Schema.org)
- [ ] Sitemap generated
- [ ] Robots.txt configured
- [ ] Image alt text
- [ ] Semantic HTML

### Accessibility

- [ ] WCAG AA compliance
- [ ] Color contrast ratios pass
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] ARIA labels where needed
- [ ] Focus indicators visible

### Security

- [ ] Environment variables secure
- [ ] HTTPS enforced
- [ ] CORS configured
- [ ] Rate limiting on forms
- [ ] Input validation
- [ ] SQL/NoSQL injection prevention
- [ ] XSS protection

### Mobile

- [ ] Mobile-first design
- [ ] Touch targets 44x44px minimum
- [ ] Text readable (16px+)
- [ ] Fast on 4G
- [ ] No horizontal scroll
- [ ] Hamburger menu works

### Indian Market Specific

- [ ] WhatsApp integration
- [ ] Click-to-call buttons
- [ ] Bilingual support (where needed)
- [ ] Rupee currency formatting
- [ ] Local SEO optimized
- [ ] Festival/wedding focus
- [ ] Fast loading on varied speeds

---

## Common Issues & Solutions

### Issue: Images Not Loading

**Problem:** Images show broken after deployment

**Solution:**
```typescript
// next.config.js
module.exports = {
  images: {
    domains: [
      'your-blob-storage.vercel-storage.com',
      'res.cloudinary.com',
    ],
  },
}
```

### Issue: Build Fails on Vercel

**Problem:** Works locally, fails on Vercel

**Solutions:**
1. Check environment variables in Vercel dashboard
2. Ensure database is accessible from Vercel IPs
3. Check build logs for specific error
4. Verify all dependencies in package.json
5. Check Node version compatibility

### Issue: Slow Page Loads

**Problem:** Pages load slowly, especially in India

**Solutions:**
1. Optimize images (most common cause)
2. Reduce JavaScript bundle size
3. Enable ISR caching
4. Use CDN for static assets
5. Minimize API calls
6. Implement proper loading states

### Issue: Payload Admin Panel Not Loading

**Problem:** /admin returns 404 or blank

**Solutions:**
1. Verify Payload config is correct
2. Check admin route setup
3. Ensure database connection works
4. Check browser console for errors
5. Verify PAYLOAD_SECRET is set

---

## Resources & Documentation

### Official Documentation

- **Next.js 15:** https://nextjs.org/docs
- **Payload CMS 3:** https://payloadcms.com/docs
- **Vercel:** https://vercel.com/docs
- **TypeScript:** https://www.typescriptlang.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs

### Helpful Guides

- **Next.js + Payload Guide:** https://payloadcms.com/posts/blog/the-ultimate-guide-to-using-nextjs-with-payload
- **Vercel Deployment:** https://vercel.com/guides/how-to-deploy-nextjs
- **Image Optimization:** https://nextjs.org/docs/app/building-your-application/optimizing/images

### Community

- **Next.js Discord:** https://nextjs.org/discord
- **Payload Discord:** https://discord.gg/payload
- **GitHub Issues:** Report bugs and request features

---

## Conclusion

This stack provides a modern, performant, and scalable foundation for your premium catering website:

✅ **Next.js 15** - Fast, SEO-friendly, great DX
✅ **Payload CMS** - Flexible, code-first content management
✅ **Vercel** - Zero-config deployment, global CDN
✅ **TypeScript** - Type safety and better tooling
✅ **Optimized** - Fast loading even on slower connections

**Next Steps:**
1. Set up development environment
2. Configure Payload collections for catering content
3. Build out pages using research from design docs
4. Implement SEO best practices
5. Deploy to Vercel
6. Launch and iterate based on analytics

---

*Document created: 2025-11-17*
*Stack Version: Next.js 15, Payload CMS 3.0, Vercel*
*Target: Production-ready catering website*
*Version: 1.0*
