export default function Loading() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 pt-28">
      <div className="grid gap-5 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-40 animate-pulse rounded-2xl border border-[#e2e8f0] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08)]" />
        ))}
      </div>
    </main>
  )
}
