import { NextResponse } from 'next/server'
import { expiredAdminCookie } from '@/lib/auth'

export async function POST() {
  const response = NextResponse.json({ ok: true })
  response.cookies.set(expiredAdminCookie())
  return response
}
