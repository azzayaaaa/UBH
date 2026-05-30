export type Company = {
  id: number
  name: string
  floor: number
  room: string
  category: string
  phone: string
  email: string
  website?: string | null
  hours: string
  logo?: string | null
  description: string
  createdAt?: string | Date
  updatedAt?: string | Date
}

export type RequestType = 'IT_SUPPORT' | 'CLEANING' | 'SECURITY' | 'ELECTRICITY' | 'OTHER'
export type RequestStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'

export type ServiceRequest = {
  id: number
  companyName: string
  contactPhone: string
  requestType: RequestType
  description: string
  status: RequestStatus
  createdAt: string | Date
  updatedAt: string | Date
}
