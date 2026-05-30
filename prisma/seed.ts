import { PrismaClient, RequestStatus, RequestType } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { sampleCompanies } from '../src/lib/sample-data'

const prisma = new PrismaClient()

async function main() {
  await prisma.serviceRequest.deleteMany()
  await prisma.company.deleteMany()

  const passwordHash = await bcrypt.hash('Azzaya0707@1', 10)

  await prisma.admin.upsert({
    where: { username: 'azzayabayartai07@gmail.com' },
    update: { passwordHash },
    create: { username: 'azzayabayartai07@gmail.com', passwordHash }
  })

  for (const company of sampleCompanies) {
    await prisma.company.create({
      data: {
        id: company.id,
        name: company.name,
        floor: company.floor,
        room: company.room,
        category: company.category,
        phone: company.phone,
        email: company.email,
        website: company.website,
        hours: company.hours,
        logo: company.logo,
        description: company.description
      }
    })
  }

  await prisma.serviceRequest.createMany({
    data: [
      { companyName: 'Некст IT оффис', contactPhone: '+976 7711 0601', requestType: RequestType.IT_SUPPORT, description: '6-р давхрын хурлын өрөөний сүлжээ тасалдаж байна.', status: RequestStatus.IN_PROGRESS },
      { companyName: 'Луна гоо сайхны студи', contactPhone: '+976 7711 0901', requestType: RequestType.CLEANING, description: 'Оройн ээлжийн дараа нэмэлт цэвэрлэгээ хийлгэх хүсэлттэй.', status: RequestStatus.PENDING },
      { companyName: 'TOEFL/GRE төв', contactPhone: '+976 7711 1505', requestType: RequestType.ELECTRICITY, description: '1505 өрөөний гэрэлтүүлэг анивчаад байна.', status: RequestStatus.COMPLETED }
    ]
  })
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
