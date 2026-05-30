'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Company } from '@/lib/types'

export function FloorSidebar({
  companies,
  selectedFloor,
  onSelectFloor
}: {
  companies: Company[]
  selectedFloor?: number
  onSelectFloor?: (floor: number) => void
}) {
  const floors = Array.from({ length: 15 }, (_, index) => 15 - index)

  return (
    <aside className="card flex max-h-[calc(100vh-8rem)] flex-col p-4">
      <div className="mb-4">
        <p className="eyebrow">Барилгын бүтэц</p>
        <h2 className="mt-2 text-xl font-semibold text-[#0f172a]">15 давхар</h2>
        <p className="mt-1 text-sm text-[#64748b]">B1: Зогсоол, агуулах</p>
      </div>
      <div className="grid gap-2 overflow-y-auto pr-1">
        {floors.map((floor) => {
          const count = companies.filter((company) => company.floor === floor).length
          const active = selectedFloor === floor

          return (
            <motion.button
              key={floor}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectFloor?.(floor)}
              className={cn(
                'grid min-h-11 grid-cols-[4.5rem_1fr_2rem] items-center rounded-lg border px-3 text-left text-sm transition',
                active ? 'border-[#1a3a5c] bg-[#1a3a5c] text-white shadow-md' : 'border-[#e2e8f0] bg-white text-[#334155] hover:border-[#2563eb] hover:bg-[#f8f9fc]'
              )}
            >
              <span className="font-semibold">{floor}F</span>
              <span className={cn('h-2 rounded-full', active ? 'bg-white/70' : 'bg-gradient-to-r from-[#1a3a5c] to-[#2563eb]')} style={{ opacity: count ? 0.35 + count * 0.12 : 0.15 }} />
              <span className={cn('text-right text-xs', active ? 'text-white/80' : 'text-[#64748b]')}>{count}</span>
            </motion.button>
          )
        })}
      </div>
    </aside>
  )
}
