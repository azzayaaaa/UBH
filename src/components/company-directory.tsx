'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { FloorSidebar } from './floor-sidebar'
import { CompanyCard } from './company-card'
import { categories } from '@/lib/sample-data'
import type { Company } from '@/lib/types'

export function CompanyDirectory({ companies, initialFloor }: { companies: Company[]; initialFloor?: number }) {
  const [query, setQuery] = useState('')
  const [floor, setFloor] = useState<number | 'all'>(initialFloor ?? 'all')
  const [category, setCategory] = useState('all')

  const filtered = useMemo(() => {
    return companies.filter((company) => {
      const matchesSearch = company.name.toLowerCase().includes(query.toLowerCase())
      const matchesFloor = floor === 'all' || company.floor === floor
      const matchesCategory = category === 'all' || company.category === category
      return matchesSearch && matchesFloor && matchesCategory
    })
  }, [category, companies, floor, query])

  return (
    <div className="grid gap-6 lg:grid-cols-[22rem_1fr]">
      <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <FloorSidebar companies={companies} selectedFloor={floor === 'all' ? undefined : floor} onSelectFloor={setFloor} />
        <button onClick={() => setFloor('all')} className="btn-secondary w-full">
          Бүх давхар
        </button>
      </div>

      <section className="space-y-5">
        <div className="card grid gap-3 p-4 md:grid-cols-[1fr_13rem]">
          <label className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Компанийн нэрээр хайх" className="input w-full pl-11" />
          </label>
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="input">
            <option value="all">Бүх ангилал</option>
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>

        <motion.div layout className="grid gap-5 md:grid-cols-2">
          {filtered.map((company) => <CompanyCard key={company.id} company={company} />)}
          {filtered.length === 0 && (
            <div className="card p-8 text-center text-[#64748b] md:col-span-2">
              Хайлтад тохирох компани олдсонгүй.
            </div>
          )}
        </motion.div>
      </section>
    </div>
  )
}
