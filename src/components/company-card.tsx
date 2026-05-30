'use client'

import Link from 'next/link'
import { Clock, DoorOpen, Phone } from 'lucide-react'
import { FloorImage } from './floor-image'
import { getCompanyImage } from '@/lib/company-images'
import type { Company } from '@/lib/types'

export function CompanyCard({ company }: { company: Company }) {
  return (
    <Link href={`/company/${company.id}`} className="card card-hover block overflow-hidden">
      <div className="relative h-44 w-full overflow-hidden">
        <FloorImage floor={company.floor} src={getCompanyImage(company)} />
      </div>
      <div className="p-5">
        <div>
          <span className="rounded-full bg-[#eef4ff] px-3 py-1 text-xs font-semibold text-[#2563eb]">{company.category}</span>
          <h3 className="mt-3 text-xl font-semibold text-[#0f172a]">{company.name}</h3>
        </div>
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-[#64748b]">{company.description}</p>
        <div className="mt-5 grid gap-2 text-sm text-[#475569]">
          <span className="flex items-center gap-2"><DoorOpen className="h-4 w-4 text-[#2563eb]" /> {company.floor}-р давхар, {company.room} өрөө</span>
          <span className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#2563eb]" /> {company.phone}</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#2563eb]" /> {company.hours}</span>
        </div>
      </div>
    </Link>
  )
}
