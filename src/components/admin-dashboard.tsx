'use client'

import type { FormEvent } from 'react'
import { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Building2, CheckCircle2, Clock3, Plus, Trash2 } from 'lucide-react'
import { requestTypeLabel, statusLabel } from '@/lib/utils'
import { StatusBadge } from './status-badge'
import type { Company, RequestStatus, ServiceRequest } from '@/lib/types'

const statuses: RequestStatus[] = ['PENDING', 'IN_PROGRESS', 'COMPLETED']
const colors = ['#1a3a5c', '#2563eb', '#10b981', '#60a5fa', '#64748b', '#93c5fd', '#0f172a']

export function AdminDashboard({ initialCompanies, initialRequests }: { initialCompanies: Company[]; initialRequests: ServiceRequest[] }) {
  const [companies, setCompanies] = useState(initialCompanies)
  const [requests, setRequests] = useState(initialRequests)
  const [editing, setEditing] = useState<Company | null>(null)
  const [message, setMessage] = useState('')

  const floorData = useMemo(() => Array.from({ length: 15 }, (_, index) => {
    const floor = index + 1
    return { floor: `${floor}F`, companies: companies.filter((company) => company.floor === floor).length }
  }), [companies])

  const categoryData = useMemo(() => {
    const groups = new Map<string, number>()
    companies.forEach((company) => groups.set(company.category, (groups.get(company.category) ?? 0) + 1))
    return Array.from(groups, ([name, value]) => ({ name, value }))
  }, [companies])

  const requestTrend = useMemo(() => {
    const labels = ['Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба', 'Ням']
    return labels.map((day, index) => ({ day, requests: Math.max(0, requests.length - Math.abs(index - 4)) }))
  }, [requests.length])

  async function saveCompany(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const payload = Object.fromEntries(formData)
    const response = await fetch(editing ? `/api/companies/${editing.id}` : '/api/companies', {
      method: editing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      setMessage('Компани хадгалахад алдаа гарлаа.')
      return
    }

    const company = await response.json()
    setCompanies((current) => editing ? current.map((item) => item.id === company.id ? company : item) : [company, ...current])
    setEditing(null)
    setMessage('Компани амжилттай хадгалагдлаа.')
    event.currentTarget.reset()
  }

  async function deleteCompany(id: number) {
    const response = await fetch(`/api/companies/${id}`, { method: 'DELETE' })
    if (!response.ok) {
      setMessage('Устгахад алдаа гарлаа.')
      return
    }
    setCompanies((current) => current.filter((company) => company.id !== id))
  }

  async function updateRequest(id: number, status: RequestStatus) {
    const response = await fetch(`/api/requests/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
    if (!response.ok) return
    const updated = await response.json()
    setRequests((current) => current.map((request) => request.id === id ? updated : request))
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Metric icon={Building2} label="Компани" value={companies.length} />
        <Metric icon={Clock3} label="Нээлттэй хүсэлт" value={requests.filter((request) => request.status !== 'COMPLETED').length} />
        <Metric icon={CheckCircle2} label="Дууссан хүсэлт" value={requests.filter((request) => request.status === 'COMPLETED').length} />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <ChartCard title="Давхар бүрийн компани">
          <BarChart data={floorData}>
            <CartesianGrid stroke="#e2e8f0" />
            <XAxis dataKey="floor" stroke="#64748b" />
            <YAxis stroke="#64748b" allowDecimals={false} />
            <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e2e8f0', color: '#0f172a' }} />
            <Bar dataKey="companies" fill="#2563eb" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ChartCard>
        <ChartCard title="Категори хуваарилалт">
          <PieChart>
            <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={86} label>
              {categoryData.map((_, index) => <Cell key={index} fill={colors[index % colors.length]} />)}
            </Pie>
            <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e2e8f0', color: '#0f172a' }} />
          </PieChart>
        </ChartCard>
        <ChartCard title="Хүсэлтийн динамик">
          <LineChart data={requestTrend}>
            <CartesianGrid stroke="#e2e8f0" />
            <XAxis dataKey="day" stroke="#64748b" />
            <YAxis stroke="#64748b" allowDecimals={false} />
            <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e2e8f0', color: '#0f172a' }} />
            <Line type="monotone" dataKey="requests" stroke="#1a3a5c" strokeWidth={3} dot={{ fill: '#2563eb' }} />
          </LineChart>
        </ChartCard>
      </div>

      <section className="card p-5">
        <h2 className="text-lg font-semibold text-[#0f172a]">{editing ? 'Компани засах' : 'Компани нэмэх'}</h2>
        <form onSubmit={saveCompany} className="mt-4 grid gap-3 md:grid-cols-2">
          <input name="name" defaultValue={editing?.name ?? ''} placeholder="Нэр" required className="input" />
          <input name="category" defaultValue={editing?.category ?? ''} placeholder="Ангилал" required className="input" />
          <input name="phone" defaultValue={editing?.phone ?? ''} placeholder="Утас" required className="input" />
          <input name="email" defaultValue={editing?.email ?? ''} placeholder="Имэйл" required className="input" />
          <input name="website" defaultValue={editing?.website ?? ''} placeholder="Вэбсайт" className="input" />
          <input name="hours" defaultValue={editing?.hours ?? ''} placeholder="Ажлын цаг" required className="input" />
          <input name="room" defaultValue={editing?.room ?? ''} placeholder="Өрөө" required className="input" />
          <input name="floor" type="number" min="1" max="15" defaultValue={editing?.floor ?? 1} className="input" />
          <textarea name="description" defaultValue={editing?.description ?? ''} placeholder="Тайлбар" required className="input min-h-28 resize-none md:col-span-2" />
          <button className="btn-primary w-fit">
            <Plus className="h-4 w-4" /> Хадгалах
          </button>
          {message && <p className="self-center text-sm text-[#2563eb]">{message}</p>}
        </form>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="card p-5">
          <h2 className="mb-4 text-lg font-semibold text-[#0f172a]">Компанийн жагсаалт</h2>
          <div className="space-y-3">
            {companies.map((company) => (
              <div key={company.id} className="flex items-center justify-between gap-4 rounded-xl border border-[#e2e8f0] bg-[#f8f9fc] p-4">
                <div>
                  <p className="font-medium text-[#0f172a]">{company.name}</p>
                  <p className="text-sm text-[#64748b]">{company.floor}F, {company.room} өрөө</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditing(company)} className="rounded-lg border border-[#e2e8f0] bg-white px-3 py-2 text-sm font-semibold text-[#1a3a5c] hover:border-[#2563eb]">Засах</button>
                  <button aria-label={`${company.name} устгах`} onClick={() => deleteCompany(company.id)} className="rounded-lg border border-red-200 bg-white px-3 py-2 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card p-5">
          <h2 className="mb-4 text-lg font-semibold text-[#0f172a]">Үйлчилгээний хүсэлт</h2>
          <div className="space-y-3">
            {requests.map((request) => (
              <div key={request.id} className="rounded-xl border border-[#e2e8f0] bg-[#f8f9fc] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-[#0f172a]">{request.companyName}</p>
                    <p className="text-sm font-medium text-[#2563eb]">{requestTypeLabel(request.requestType)}</p>
                  </div>
                  <select value={request.status} onChange={(event) => updateRequest(request.id, event.target.value as RequestStatus)} className="input py-2 text-xs">
                    {statuses.map((status) => <option key={status} value={status}>{statusLabel(status)}</option>)}
                  </select>
                </div>
                <div className="mt-3"><StatusBadge status={request.status} /></div>
                <p className="mt-3 text-sm leading-6 text-[#64748b]">{request.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function Metric({ icon: Icon, label, value }: { icon: typeof Building2; label: string; value: number }) {
  return (
    <div className="card card-hover p-5">
      <Icon className="h-6 w-6 text-[#2563eb]" />
      <p className="mt-5 text-3xl font-semibold text-[#0f172a]">{value}</p>
      <p className="text-sm text-[#64748b]">{label}</p>
    </div>
  )
}

function ChartCard({ title, children }: { title: string; children: React.ReactElement }) {
  return (
    <div className="card h-80 p-5">
      <h2 className="mb-4 text-lg font-semibold text-[#0f172a]">{title}</h2>
      <ResponsiveContainer width="100%" height="85%">
        {children}
      </ResponsiveContainer>
    </div>
  )
}
