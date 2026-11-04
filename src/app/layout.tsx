import './globals.css'
import type { Metadata } from 'next'

// eslint-disable-next-line camelcase
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rannie Raymundo | Web Developer',
  description: 'Portfolio v2 by Rannie Raymundo'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
