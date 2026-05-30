'use client'

import { useRouter } from 'next/navigation'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { LogIn } from 'lucide-react'

export function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    const formData = new FormData(event.currentTarget)

    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(formData))
    })

    setLoading(false)
    if (!response.ok) {
      setError('Имэйл эсвэл нууц үг буруу байна.')
      return
    }

    router.push('/admin/dashboard')
    router.refresh()
  }

  return (
    <form onSubmit={submit} autoComplete="off" className="card mx-auto grid max-w-md gap-4 p-6">
      <label className="grid gap-2 text-sm font-medium text-[#334155]">
        Админ имэйл
        <input name="username" type="email" inputMode="email" autoComplete="off" placeholder="admin@example.com" className="input" />
      </label>
      <label className="grid gap-2 text-sm font-medium text-[#334155]">
        Нууц үг
        <input name="password" type="password" autoComplete="new-password" placeholder="Нууц үгээ оруулна уу" className="input" />
      </label>
      <button disabled={loading} className="btn-primary">
        <LogIn className="h-4 w-4" />
        {loading ? 'Нэвтэрч байна...' : 'Нэвтрэх'}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  )
}
