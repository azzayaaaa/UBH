import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { PageShell } from '@/components/page-shell'
import { AIChat } from '@/components/ai-chat'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UBH Center ухаалаг барилгын систем',
  description: 'UBH Center-ийн давхарын лавлах, газрын зураг, AI туслах, үйлчилгээний хүсэлтийн систем.'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="mn">
      <body className={inter.className}>
        <Navbar />
        <PageShell>{children}</PageShell>
        <AIChat />
      </body>
    </html>
  )
}
