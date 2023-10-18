import type { Metadata } from 'next'
import { Lexend } from 'next/font/google'

import './globals.css'
import { cn } from '@/lib/utils'
import Navbar from '@/components/Navbar'

const lexend = Lexend({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Learning Journey',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(
        lexend.className, 'antialiased min-h-screen pt-16'
      )}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
