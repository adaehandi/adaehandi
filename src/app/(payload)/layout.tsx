// Note: Do NOT import globals.css here - Tailwind's CSS reset conflicts with Payload admin UI
// The admin/layout.tsx imports @payloadcms/next/css and custom.scss

export default function PayloadLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <>{children}</>
}
