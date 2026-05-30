import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { getPrisma } from './prisma'

const COOKIE_NAME = 'ubh_admin_token'
const ADMIN_EMAIL = 'azzayabayartai07@gmail.com'
const ADMIN_PASSWORD = 'Azzaya0707@1'

function getJwtSecret() {
  return process.env.JWT_SECRET || 'development-only-secret'
}

export async function verifyAdmin(username: string, password: string) {
  if (username !== ADMIN_EMAIL) return false

  if (!process.env.DATABASE_URL) {
    return password === ADMIN_PASSWORD
  }

  try {
    const admin = await getPrisma().admin.findUnique({ where: { username } })
    if (!admin) return password === ADMIN_PASSWORD
    return bcrypt.compare(password, admin.passwordHash)
  } catch {
    return password === ADMIN_PASSWORD
  }
}

export function signAdminToken(username: string) {
  return jwt.sign({ username, role: 'admin' }, getJwtSecret(), { expiresIn: '8h' })
}

export function getAdminFromToken(token?: string) {
  if (!token) return null

  try {
    return jwt.verify(token, getJwtSecret()) as { username: string; role: string }
  } catch {
    return null
  }
}

export function getCurrentAdmin() {
  return getAdminFromToken(cookies().get(COOKIE_NAME)?.value)
}

export function adminCookie(token: string) {
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8
  }
}

export function expiredAdminCookie() {
  return {
    name: COOKIE_NAME,
    value: '',
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0
  }
}
