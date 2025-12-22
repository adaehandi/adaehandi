import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import '@/styles/globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

// Load fonts with Next.js optimization
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  title: {
    default: 'Ada-e-Haandi | Premium North Indian Catering | Delhi NCR',
    template: '%s | Ada-e-Haandi',
  },
  description:
    'New-age catering since 1998. Premium North Indian catering services for weddings, corporate events, and private celebrations in Delhi NCR. Authentic taste with 27 years of culinary excellence.',
  keywords: [
    'catering Delhi',
    'North Indian catering',
    'wedding catering Delhi',
    'corporate catering NCR',
    'Indian food catering',
    'Ada-e-Haandi',
    'premium catering services',
    'best caterer Delhi',
  ],
  authors: [{ name: 'Ada-e-Haandi' }],
  creator: 'Ada-e-Haandi',
  publisher: 'Ada-e-Haandi',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Ada-e-Haandi',
    title: 'Ada-e-Haandi | Premium North Indian Catering',
    description:
      'New-age catering since 1998. Premium North Indian catering for weddings, corporate events, and celebrations in Delhi NCR.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ada-e-Haandi Premium Catering',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ada-e-Haandi | Premium North Indian Catering',
    description: 'New-age catering since 1998. Premium North Indian catering in Delhi NCR.',
    images: ['/images/og-image.jpg'],
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

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2B3A67" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} bg-cream-100 text-navy-700 min-h-screen font-sans antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
