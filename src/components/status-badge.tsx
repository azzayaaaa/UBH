import { cn, statusLabel } from '@/lib/utils'
import type { RequestStatus } from '@/lib/types'

const styles: Record<RequestStatus, string> = {
  PENDING: 'bg-amber-50 text-amber-700 ring-amber-200',
  IN_PROGRESS: 'bg-blue-50 text-blue-700 ring-blue-200',
  COMPLETED: 'bg-emerald-50 text-emerald-700 ring-emerald-200'
}

export function StatusBadge({ status }: { status: RequestStatus }) {
  return (
    <span className={cn('inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 transition hover:scale-105', styles[status])}>
      {statusLabel(status)}
    </span>
  )
}
