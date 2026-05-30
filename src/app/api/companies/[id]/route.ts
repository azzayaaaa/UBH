import { NextResponse } from 'next/server'
import { getCurrentAdmin } from '@/lib/auth'
import { getCompany } from '@/lib/data'
import { getPrisma } from '@/lib/prisma'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const company = await getCompany(Number(params.id))
  if (!company) return NextResponse.json({ error: 'Мэдээлэл олдсонгүй.' }, { status: 404 })
  return NextResponse.json(company)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  if (!getCurrentAdmin()) {
    return NextResponse.json({ error: 'Нэвтрэх шаардлагатай.' }, { status: 401 })
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'DATABASE_URL тохируулаагүй байна.' }, { status: 503 })
  }

  const body = await request.json()
  const company = await getPrisma().company.update({
    where: { id: Number(params.id) },
    data: {
      name: body.name,
      floor: Number(body.floor),
      room: body.room,
      category: body.category,
      phone: body.phone,
      email: body.email,
      website: body.website || null,
      logo: body.logo || null,
      hours: body.hours,
      description: body.description
    }
  })

  return NextResponse.json(company)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  if (!getCurrentAdmin()) {
    return NextResponse.json({ error: 'Нэвтрэх шаардлагатай.' }, { status: 401 })
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'DATABASE_URL тохируулаагүй байна.' }, { status: 503 })
  }

  await getPrisma().company.delete({ where: { id: Number(params.id) } })
  return NextResponse.json({ ok: true })
}
