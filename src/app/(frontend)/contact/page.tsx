import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Ada-e-Haandi for catering inquiries. Located at South Moti Bagh Market, New Delhi.',
}

export default function ContactPage(): React.JSX.Element {
  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-navy-700 font-serif text-4xl font-bold">Contact Us</h1>
        <p className="text-navy-600/70 mt-4 text-lg">Coming soon...</p>
      </div>
    </div>
  )
}
