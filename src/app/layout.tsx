import './globals.css'
import type { Metadata } from 'next'

// eslint-disable-next-line camelcase
import { Work_Sans } from 'next/font/google'

const workSans = Work_Sans({ subsets: ['latin'] })

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
      <body className={workSans.className}>{children}</body>
    </html>
  )
}
