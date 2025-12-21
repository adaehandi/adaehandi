import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Ada-e-Haandi - 27 years of culinary excellence in North Indian catering since 1998.',
}

export default function AboutPage(): React.JSX.Element {
  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-navy-700 font-serif text-4xl font-bold">About Us</h1>
        <p className="text-navy-600/70 mt-4 text-lg">Coming soon...</p>
      </div>
    </div>
  )
}
