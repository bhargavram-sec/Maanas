import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MANAS - Heal Gender Conditioning',
  description: 'AI-powered mental health for gender-specific conditioning',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
