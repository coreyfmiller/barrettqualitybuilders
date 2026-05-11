import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: {
    default: 'Barrett Quality Builders | Decks, Fences & Interior Woodwork',
    template: '%s | Barrett Quality Builders',
  },
  description: 'Quality craftsmanship for custom decks, fences, and interior woodwork in Saint John and Fredericton, New Brunswick. Over 100 decks and 250 fences built. Get a free quote today!',
  keywords: ['deck builder', 'fence contractor', 'custom decks', 'pressure treated deck', 'cedar fence', 'composite deck', 'Saint John', 'Fredericton', 'New Brunswick', 'interior woodwork'],
  authors: [{ name: 'Barrett Quality Builders' }],
  openGraph: {
    title: 'Barrett Quality Builders | Decks, Fences & Interior Woodwork',
    description: 'Quality craftsmanship for custom decks, fences, and interior woodwork in New Brunswick.',
    url: 'https://barrettqualitybuilders.ca',
    siteName: 'Barrett Quality Builders',
    locale: 'en_CA',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
