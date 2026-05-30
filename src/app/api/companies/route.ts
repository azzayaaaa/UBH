import { NextResponse } from 'next/server'
import { getCurrentAdmin } from '@/lib/auth'
import { getCompanies } from '@/lib/data'
import { getPrisma } from '@/lib/prisma'

export async function GET() {
  return NextResponse.json(await getCompanies())
}

export async function POST(request: Request) {
  if (!getCurrentAdmin()) {
    return NextResponse.json({ error: 'Нэвтрэх шаардлагатай.' }, { status: 401 })
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'DATABASE_URL тохируулаагүй байна.' }, { status: 503 })
  }

  const body = await request.json()
  const company = await getPrisma().company.create({
    data: {
      name: body.name,
      floor: Number(body.floor),
      room: body.room,
      category: body.category,
      phone: body.phone,
      email: body.email,
      website: body.website || null,
      hours: body.hours,
      logo: body.logo || null,
      description: body.description
    }
  })

  return NextResponse.json(company, { status: 201 })
}
