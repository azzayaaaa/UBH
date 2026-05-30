import { NextResponse } from 'next/server'
import { adminCookie, signAdminToken, verifyAdmin } from '@/lib/auth'

export async function POST(request: Request) {
  const { username, password } = await request.json()

  if (!username || !password) {
    return NextResponse.json({ error: 'Нэвтрэх нэр болон нууц үг шаардлагатай.' }, { status: 400 })
  }

  const valid = await verifyAdmin(username, password)
  if (!valid) {
    return NextResponse.json({ error: 'Нэвтрэх мэдээлэл буруу байна.' }, { status: 401 })
  }

  const token = signAdminToken(username)
  const response = NextResponse.json({ ok: true })
  response.cookies.set(adminCookie(token))
  return response
}
