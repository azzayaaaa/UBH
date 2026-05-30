import { streamGroqAnswer } from '@/lib/groq'
import { getCompanies } from '@/lib/data'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const { messages = [] } = await request.json()
  const companies = await getCompanies()
  const context = companies
    .map((company) => `${company.floor}-р давхар, ${company.room} өрөө: ${company.name} (${company.category}) - ${company.description}`)
    .join('\n')

  return streamGroqAnswer([
    {
      role: 'system',
      content: `Та UBH Center-ийн ухаалаг туслах. Зөвхөн UBH Center-ийн давхар, компани, үйлчилгээ, байршилтай холбоотой асуултад хариулна. Монгол хэлээр хариулна.

UBH Center-ийн мэдээлэл:
Байршил: Peace Ave 3, Сүхбаатар дүүрэг, Улаанбаатар.
${context}`
    },
    ...messages
  ])
}
