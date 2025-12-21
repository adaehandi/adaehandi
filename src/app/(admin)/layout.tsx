import type { Metadata } from 'next'
import '@/styles/globals.css'

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
