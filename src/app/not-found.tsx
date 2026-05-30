import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-4xl font-semibold text-[#0f172a]">Энэ мэдээлэл олдсонгүй.</h1>
      <Link href="/floors" className="btn-primary mt-8">
        Давхарын лавлах руу буцах
      </Link>
    </main>
  )
}
