'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function FloorCard({ floor, count, note }: { floor: number; count: number; note: string }) {
  return (
    <motion.div whileHover={{ y: -5 }} className="card card-hover p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#2563eb]">{floor}F</p>
          <h3 className="mt-2 text-2xl font-semibold text-[#0f172a]">{count} компани</h3>
        </div>
        <span className="rounded-lg bg-[#1a3a5c] px-3 py-1 text-xs font-semibold text-white">{floor}</span>
      </div>
      <p className="mt-4 min-h-12 text-sm leading-6 text-[#64748b]">{note}</p>
      <Link href={`/floors?floor=${floor}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#2563eb] hover:text-[#1a3a5c]">
        Дэлгэрэнгүй <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  )
}
