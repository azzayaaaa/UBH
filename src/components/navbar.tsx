'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Building2, Menu, Wrench } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/floors', label: 'Давхарын лавлах', icon: Building2 },
  { href: '/request', label: 'Үйлчилгээ', icon: Wrench }
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#e2e8f0] bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a3a5c] text-sm font-black text-white">UBH</span>
          <span className="font-semibold tracking-wide text-[#1a3a5c]">UBH Center</span>
        </Link>

        <button aria-label="Цэс нээх" onClick={() => setOpen((value) => !value)} className="rounded-lg p-2 text-[#1a3a5c] md:hidden">
          <Menu className="h-5 w-5" />
        </button>

        <div className={cn('absolute left-4 right-4 top-20 grid gap-2 rounded-2xl border border-[#e2e8f0] bg-white p-3 shadow-xl md:static md:flex md:bg-transparent md:p-0 md:shadow-none', open ? 'grid' : 'hidden md:flex')}>
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#64748b] transition hover:bg-[#f1f5f9] hover:text-[#1a3a5c]',
                (pathname === href || pathname.startsWith(`${href}/`)) && 'bg-[#eef4ff] text-[#2563eb]'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
