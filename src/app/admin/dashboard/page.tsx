import { redirect } from 'next/navigation'
import { AdminDashboard } from '@/components/admin-dashboard'
import { LogoutButton } from '@/components/logout-button'
import { getCurrentAdmin } from '@/lib/auth'
import { getCompanies, getServiceRequests } from '@/lib/data'

export default async function AdminDashboardPage() {
  const admin = getCurrentAdmin()
  if (!admin) redirect('/admin')

  const [companies, requests] = await Promise.all([getCompanies(), getServiceRequests()])

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 pb-20 pt-28">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Админ dashboard</p>
          <h1 className="mt-3 text-4xl font-semibold text-[#0f172a]">Smart Building хяналтын самбар</h1>
          <p className="mt-3 max-w-2xl text-[#64748b]">Компани нэмэх, засах, устгах болон үйлчилгээний хүсэлтийн статус удирдах.</p>
        </div>
        <LogoutButton />
      </div>
      <AdminDashboard initialCompanies={companies} initialRequests={requests} />
    </main>
  )
}
