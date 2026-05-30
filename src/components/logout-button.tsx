'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
  const router = useRouter()

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin')
    router.refresh()
  }

  return (
    <button onClick={logout} className="btn-secondary">
      <LogOut className="h-4 w-4" />
      Гарах
    </button>
  )
}
