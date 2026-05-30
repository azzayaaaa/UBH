'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { Send } from 'lucide-react'
import { requestTypeLabel } from '@/lib/utils'
import type { RequestType } from '@/lib/types'

const requestTypes: RequestType[] = ['IT_SUPPORT', 'CLEANING', 'SECURITY', 'ELECTRICITY', 'OTHER']

export function ServiceRequestForm() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setMessage('')
    const formData = new FormData(event.currentTarget)

    const response = await fetch('/api/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(formData))
    })

    setLoading(false)
    setMessage(response.ok ? 'Таны хүсэлт амжилттай илгээгдлээ.' : 'Хүсэлт илгээхэд алдаа гарлаа. Өгөгдлийн сангийн тохиргоог шалгана уу.')
    if (response.ok) event.currentTarget.reset()
  }

  return (
    <form onSubmit={submit} className="card grid gap-4 p-5 md:p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-[#334155]">
          Компани / байгууллагын нэр
          <input name="companyName" required placeholder="Жишээ: E-Pen боловсрол" className="input" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-[#334155]">
          Холбогдох утас
          <input name="contactPhone" required placeholder="+976 99xx xxxx" className="input" />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium text-[#334155]">
        Хүсэлтийн төрөл
        <select name="requestType" required className="input">
          {requestTypes.map((type) => <option key={type} value={type}>{requestTypeLabel(type)}</option>)}
        </select>
      </label>
      <label className="grid gap-2 text-sm font-medium text-[#334155]">
        Тайлбар
        <textarea name="description" required rows={6} placeholder="Асуудлын байршил, яаралтай эсэх, дэлгэрэнгүй тайлбарыг бичнэ үү." className="input resize-none" />
      </label>
      <button disabled={loading} className="btn-primary w-fit">
        <Send className="h-4 w-4" />
        {loading ? 'Илгээж байна...' : 'Хүсэлт илгээх'}
      </button>
      {message && <p className="text-sm text-[#2563eb]">{message}</p>}
    </form>
  )
}
