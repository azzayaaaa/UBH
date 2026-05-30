import { NextResponse } from 'next/server'
import { RequestType } from '@prisma/client'
import { getServiceRequests } from '@/lib/data'
import { getPrisma } from '@/lib/prisma'

export async function GET() {
  return NextResponse.json(await getServiceRequests())
}

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'DATABASE_URL тохируулаагүй байна.' }, { status: 503 })
  }

  const body = await request.json()
  if (!Object.values(RequestType).includes(body.requestType)) {
    return NextResponse.json({ error: 'Хүсэлтийн төрөл буруу байна.' }, { status: 400 })
  }

  const serviceRequest = await getPrisma().serviceRequest.create({
    data: {
      companyName: body.companyName,
      contactPhone: body.contactPhone,
      requestType: body.requestType,
      description: body.description
    }
  })

  return NextResponse.json(serviceRequest, { status: 201 })
}
