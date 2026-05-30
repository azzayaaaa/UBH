import { NextResponse } from 'next/server'
import { RequestStatus } from '@prisma/client'
import { getCurrentAdmin } from '@/lib/auth'
import { getPrisma } from '@/lib/prisma'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  if (!getCurrentAdmin()) {
    return NextResponse.json({ error: 'Нэвтрэх шаардлагатай.' }, { status: 401 })
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'DATABASE_URL тохируулаагүй байна.' }, { status: 503 })
  }

  const body = await request.json()
  if (!Object.values(RequestStatus).includes(body.status)) {
    return NextResponse.json({ error: 'Статус буруу байна.' }, { status: 400 })
  }

  const serviceRequest = await getPrisma().serviceRequest.update({
    where: { id: Number(params.id) },
    data: { status: body.status }
  })

  return NextResponse.json(serviceRequest)
}
