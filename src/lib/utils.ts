import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { RequestStatus, RequestType } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function requestTypeLabel(value: RequestType) {
  return {
    IT_SUPPORT: 'IT дэмжлэг',
    CLEANING: 'Цэвэрлэгээ',
    SECURITY: 'Аюулгүй байдал',
    ELECTRICITY: 'Цахилгаан',
    OTHER: 'Бусад'
  }[value]
}

export function statusLabel(value: RequestStatus) {
  return {
    PENDING: 'Хүлээгдэж байна',
    IN_PROGRESS: 'Хийгдэж байна',
    COMPLETED: 'Дууссан'
  }[value]
}
