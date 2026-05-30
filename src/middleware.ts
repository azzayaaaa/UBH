import { NextRequest, NextResponse } from 'next/server'

function base64UrlToBytes(value: string) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(value.length / 4) * 4, '=')
  return Uint8Array.from(atob(base64), (char) => char.charCodeAt(0))
}

async function verifyJwt(token: string, secret: string) {
  const parts = token.split('.')
  if (parts.length !== 3) return false

  const [header, payload, signature] = parts
  const data = new TextEncoder().encode(`${header}.${payload}`)
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  )

  const valid = await crypto.subtle.verify('HMAC', key, base64UrlToBytes(signature), data)
  if (!valid) return false

  const claims = JSON.parse(new TextDecoder().decode(base64UrlToBytes(payload))) as { exp?: number; role?: string }
  if (claims.role !== 'admin') return false
  if (claims.exp && claims.exp * 1000 < Date.now()) return false

  return true
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('ubh_admin_token')?.value
  const secret = process.env.JWT_SECRET || 'development-only-secret'
  const valid = token ? await verifyJwt(token, secret).catch(() => false) : false

  if (!valid) {
    const loginUrl = new URL('/admin', request.url)
    loginUrl.searchParams.set('next', request.nextUrl.pathname)
    const response = NextResponse.redirect(loginUrl)
    response.cookies.set('ubh_admin_token', '', { path: '/', maxAge: 0 })
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/dashboard/:path*']
}
