import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display, MedievalSharp } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif',
  display: 'swap',
});

const medievalSharp = MedievalSharp({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lord of the Shadows',
  description: 'Enter the dark worlds of bestselling fantasy author. Epic sagas, mythic adventures, and unforgettable tales await.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', type: 'image/x-icon' }, // Recommended: a multi-size .ico file
      { url: '/lod-logo.png', type: 'image/png' }, // Keep as a fallback or for larger displays if needed
      { url: '/lord-logo.png', media: '(prefers-color-scheme: light)', type: 'image/png' },
      { url: '/lord-logo.png', media: '(prefers-color-scheme: dark)', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png', // Often 180x180
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable} ${medievalSharp.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  )
}