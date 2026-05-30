import { redirect } from 'next/navigation'

export default function CompanyRedirect({ params }: { params: { id: string } }) {
  redirect(`/company/${params.id}`)
}
