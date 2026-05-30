import { CompanyDirectory } from '@/components/company-directory'
import { getCompanies } from '@/lib/data'

export default async function FloorsPage({ searchParams }: { searchParams: { floor?: string } }) {
  const companies = await getCompanies()
  const initialFloor = searchParams.floor ? Number(searchParams.floor) : undefined

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 pb-20 pt-28">
      <div className="mb-8">
        <p className="eyebrow">Давхарын лавлах</p>
        <h1 className="mt-3 text-4xl font-semibold text-[#0f172a]">15 давхарын компани, үйлчилгээний мэдээлэл</h1>
        <p className="mt-3 max-w-2xl text-[#64748b]">Давхар сонгох, ангиллаар шүүх, компанийн нэрээр хайх боломжтой.</p>
      </div>
      <CompanyDirectory companies={companies} initialFloor={initialFloor} />
    </main>
  )
}
