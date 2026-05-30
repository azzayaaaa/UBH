import { LoginForm } from '@/components/login-form'

export default function AdminPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-28">
      <div className="mx-auto mb-8 max-w-md text-center">
        <p className="eyebrow">Админ</p>
        <h1 className="mt-3 text-4xl font-semibold text-[#0f172a]">Хяналтын самбар руу нэвтрэх</h1>
        <p className="mt-3 text-[#64748b]">Компани, үйлчилгээний хүсэлт, статистикийг удирдана.</p>
      </div>
      <LoginForm />
    </main>
  )
}
