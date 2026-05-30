import { NextResponse } from 'next/server'
import { adminCookie, signAdminToken, verifyAdmin } from '@/lib/auth'

export async function POST(request: Request) {
  const { username, password } = await request.json()

  if (!username || !password) {
    return NextResponse.json({ error: 'Имэйл болон нууц үг шаардлагатай.' }, { status: 400 })
  }

  const email = String(username).trim().toLowerCase()
  const valid = await verifyAdmin(email, String(password))
  if (!valid) {
    return NextResponse.json({ error: 'Имэйл эсвэл нууц үг буруу байна.' }, { status: 401 })
  }

  const token = signAdminToken(email)
  const response = NextResponse.json({ ok: true })
  response.cookies.set(adminCookie(token))
  return response
}
