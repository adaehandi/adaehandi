import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get a Quote',
  description:
    'Request a customized catering quote for your event. Tell us about your requirements.',
}

export default function GetQuotePage(): React.JSX.Element {
  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-navy-700 font-serif text-4xl font-bold">Get a Quote</h1>
        <p className="text-navy-600/70 mt-4 text-lg">Coming soon...</p>
      </div>
    </div>
  )
}
