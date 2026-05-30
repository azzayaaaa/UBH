import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, DoorOpen, Globe, Mail, Phone } from 'lucide-react'
import { FloorImage } from '@/components/floor-image'
import { getCompany } from '@/lib/data'
import { getCompanyImage } from '@/lib/company-images'
import { getCompanyAudience, getCompanyServices, getFloorContext } from '@/lib/company-details'

export default async function CompanyProfilePage({ params }: { params: { id: string } }) {
  const company = await getCompany(Number(params.id))
  if (!company) notFound()
  const services = getCompanyServices(company)
  const audience = getCompanyAudience(company)
  const floorContext = getFloorContext(company)

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 pb-20 pt-28">
      <Link href="/floors" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563eb] hover:text-[#1a3a5c]">
        <ArrowLeft className="h-4 w-4" /> Давхарын лавлах руу буцах
      </Link>
      <section className="card mt-6 overflow-hidden">
        <div className="relative h-64 bg-gradient-to-br from-[#1a3a5c] to-[#2563eb]">
          <FloorImage floor={company.floor} src={getCompanyImage(company)} className="opacity-45" />
          <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-white">{company.floor}F</div>
        </div>
        <div className="p-6 md:p-10">
          <div>
            <div>
              <span className="rounded-full bg-[#eef4ff] px-3 py-1 text-sm font-semibold text-[#2563eb]">{company.category}</span>
              <h1 className="mt-5 text-4xl font-semibold text-[#0f172a] md:text-6xl">{company.name}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[#64748b]">{company.description}</p>
            </div>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Info icon={DoorOpen} label="Байршил" value={`${company.floor}-р давхар, ${company.room} өрөө`} />
            <Info icon={Clock} label="Ажлын цаг" value={company.hours} />
            <Info icon={Phone} label="Утас" value={company.phone} />
            <Info icon={Mail} label="Имэйл" value={company.email} href={`mailto:${company.email}`} />
            {company.website && <Info icon={Globe} label="Вэбсайт" value={company.website} href={company.website} />}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
            <section className="rounded-2xl border border-[#e2e8f0] bg-[#f8f9fc] p-6">
              <p className="eyebrow">Үйлчилгээний дэлгэрэнгүй</p>
              <h2 className="mt-3 text-2xl font-semibold text-[#0f172a]">{company.name} юу хийдэг вэ?</h2>
              <p className="mt-4 leading-7 text-[#64748b]">{company.description}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {services.map((service) => (
                  <div key={service} className="rounded-xl border border-[#e2e8f0] bg-white p-4 text-sm font-medium text-[#334155]">
                    {service}
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6">
                <p className="eyebrow">Хэнд тохиромжтой вэ?</p>
                <p className="mt-3 leading-7 text-[#64748b]">{audience}</p>
              </div>
              <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6">
                <p className="eyebrow">Давхарын мэдээлэл</p>
                <p className="mt-3 leading-7 text-[#64748b]">{floorContext}</p>
              </div>
            </section>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 rounded-2xl bg-[#eef4ff] p-5">
            <a href={`tel:${company.phone}`} className="btn-primary">Утсаар холбогдох</a>
            <a href={`mailto:${company.email}`} className="btn-secondary">Имэйл илгээх</a>
            <Link href="/request" className="btn-secondary">Үйлчилгээний хүсэлт илгээх</Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function Info({ icon: Icon, label, value, href }: { icon: typeof Phone; label: string; value: string; href?: string }) {
  const content = (
    <div className="rounded-xl border border-[#e2e8f0] bg-[#f8f9fc] p-4 transition hover:-translate-y-1 hover:bg-white hover:shadow-md">
      <Icon className="h-5 w-5 text-[#2563eb]" />
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#64748b]">{label}</p>
      <p className="mt-1 break-words text-[#0f172a]">{value}</p>
    </div>
  )

  return href ? <a href={href}>{content}</a> : content
}
