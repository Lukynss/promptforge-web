import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import Background from '@/components/Background'
import CursorGlow from '@/components/CursorGlow'
import Nav from '@/components/Nav'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'PromptForge — Transform rough ideas into precise prompts',
  description:
    'PromptForge asks smart questions about your prompt, learns your preferences, and transforms vague ideas into precise, powerful AI instructions.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <Background />
        <CursorGlow />
        <Nav />
        {children}
      </body>
    </html>
  )
}
