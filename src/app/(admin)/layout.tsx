import type { Metadata } from 'next'

// Note: Do NOT import globals.css here - Payload has its own styles
// Tailwind's CSS reset conflicts with Payload admin UI

export const metadata: Metadata = {
  title: 'Admin | Ada-e-Haandi',
  description: 'Content management system for Ada-e-Haandi website',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <>{children}</>
}
