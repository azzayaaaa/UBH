import Link from 'next/link'
import { ArrowRight, Bot, Building2, Layers3, MapPin, Wrench } from 'lucide-react'
import { AnimatedCounter } from '@/components/animated-counter'
import { AnimatedSection } from '@/components/animated-section'
import { FloorCard } from '@/components/floor-card'
import { getCompanies } from '@/lib/data'
import { floorNotes } from '@/lib/sample-data'

export default async function HomePage() {
  const companies = await getCompanies()
  const featuredFloors = [1, 6, 9, 15]

  return (
    <main>
      <section className="mx-auto grid min-h-[760px] max-w-7xl items-center gap-10 px-4 pb-16 pt-28 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <p className="eyebrow">Ухаалаг барилгын систем</p>
          <h1 className="mt-5 text-5xl font-semibold leading-tight text-[#0f172a] md:text-7xl">UBH Center</h1>
          <p className="mt-5 text-2xl font-medium text-[#1a3a5c]">Улаанбаатарын төвд байрлах арилжааны байр</p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#64748b]">
            Peace Ave 3, Сүхбаатар дүүрэгт байрлах 15 давхар mixed commercial төвийн давхарын лавлах, газрын зураг, AI туслах, үйлчилгээний хүсэлтийн нэгдсэн платформ.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/floors" className="btn-primary">
              Давхарын лавлах <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/floors?floor=1" className="btn-secondary">
              Барилгын мэдээлэл <MapPin className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="bg-gradient-to-br from-[#1a3a5c] to-[#2563eb] p-8 text-white">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/15 text-xl font-black">UBH</div>
            <h2 className="mt-8 text-3xl font-semibold">Smart Building</h2>
            <p className="mt-3 text-white/80">Давхар, компани, үйлчилгээ, байршлыг нэг системээс удирдана.</p>
          </div>
          <div className="grid gap-4 p-6 sm:grid-cols-3">
            <Stat icon={Layers3} label="Давхар" value={15} />
            <Stat icon={Building2} label="Компани" value={50} suffix="+" />
            <Stat icon={Wrench} label="Mixed Commercial" value={100} suffix="%" />
          </div>
        </div>
      </section>

      <AnimatedSection className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-5 md:grid-cols-3">
          <Feature href="/floors" icon={Building2} title="Давхарын лавлах" body="15 давхарын компаниудыг нэр, ангилал, давхраар хайна." />
          <Feature href="/request" icon={Wrench} title="Үйлчилгээний хүсэлт" body="Барилгын үйлчилгээ, засвар, дэмжлэгийн хүсэлт илгээнэ." />
          <Feature href="/request" icon={Bot} title="AI туслах ба үйлчилгээ" body="Асуултаа асууж, үйлчилгээний хүсэлтээ илгээнэ." />
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto max-w-7xl px-4 py-12">
        <section className="card grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="eyebrow">Байршил</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#0f172a]">Peace Ave 3, Сүхбаатар дүүрэг</h2>
            <p className="mt-3 max-w-2xl leading-7 text-[#64748b]">
              UBH Center нь Улаанбаатар хотын төвийн бизнес, үйлчилгээний бүсэд байрлах 15 давхар mixed commercial барилга.
            </p>
          </div>
          <div className="rounded-xl bg-[#eef4ff] px-5 py-4 text-sm font-semibold text-[#1a3a5c]">
            Улаанбаатар хотын төв
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8">
          <p className="eyebrow">Онцлох давхарууд</p>
          <h2 className="mt-3 text-3xl font-semibold text-[#0f172a]">Оффис, үйлчилгээ, боловсрол нэг дор</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-4">
          {featuredFloors.map((floor) => (
            <FloorCard key={floor} floor={floor} count={companies.filter((company) => company.floor === floor).length} note={floorNotes[floor] ?? `${floor}-р давхрын компаниуд`} />
          ))}
        </div>
      </AnimatedSection>
    </main>
  )
}

function Stat({ icon: Icon, label, value, suffix = '' }: { icon: typeof Building2; label: string; value: number; suffix?: string }) {
  return (
    <div className="rounded-xl bg-[#f8f9fc] p-4">
      <Icon className="h-5 w-5 text-[#2563eb]" />
      <p className="mt-4 text-3xl font-semibold text-[#0f172a]"><AnimatedCounter value={value} suffix={suffix} /></p>
      <p className="mt-1 text-sm text-[#64748b]">{label}</p>
    </div>
  )
}

function Feature({ href, icon: Icon, title, body }: { href: string; icon: typeof Building2; title: string; body: string }) {
  return (
    <Link href={href} className="card card-hover p-6">
      <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#eef4ff] text-[#2563eb]">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="mt-5 text-xl font-semibold text-[#0f172a]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#64748b]">{body}</p>
    </Link>
  )
}
