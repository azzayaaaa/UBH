import { ServiceRequestForm } from '@/components/service-request-form'

export default function RequestPage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 pb-20 pt-28">
      <div className="grid gap-8 lg:grid-cols-[1fr_.75fr]">
        <section>
          <p className="eyebrow">Үйлчилгээний хүсэлт</p>
          <h1 className="mt-3 text-4xl font-semibold text-[#0f172a]">Барилгын үйлчилгээний хүсэлт илгээх</h1>
          <p className="mt-4 max-w-2xl leading-7 text-[#64748b]">IT дэмжлэг, цэвэрлэгээ, аюулгүй байдал, цахилгаан болон бусад хүсэлтийг нэг цэгээс илгээнэ.</p>
          <div className="mt-8">
            <ServiceRequestForm />
          </div>
        </section>
        <aside className="card h-fit p-6">
          <p className="eyebrow">Хүсэлтийн явц</p>
          <h2 className="mt-3 text-2xl font-semibold text-[#0f172a]">Статусыг админ баталгаажуулна</h2>
          <p className="mt-4 leading-7 text-[#64748b]">
            Илгээсэн хүсэлтүүдийг UBH Center-ийн админ баг хүлээн авч, шаардлагатай ажилтанд шилжүүлэн явцыг шинэчилнэ. Public хуудсанд түрээслэгчдийн хүсэлтийн жагсаалт харагдахгүй.
          </p>
          <div className="mt-6 grid gap-3">
            {['Хүлээн авах', 'Шалгаж хуваарилах', 'Гүйцэтгэж дуусгах'].map((item, index) => (
              <div key={item} className="flex items-center gap-3 rounded-xl bg-[#f8f9fc] p-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a3a5c] text-sm font-semibold text-white">{index + 1}</span>
                <span className="text-sm font-medium text-[#334155]">{item}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  )
}
