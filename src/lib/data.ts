import { getPrisma } from './prisma'
import { sampleCompanies, sampleRequests } from './sample-data'
import type { Company, ServiceRequest } from './types'

function hasDatabase() {
  return Boolean(process.env.DATABASE_URL)
}

export async function getCompanies(): Promise<Company[]> {
  if (!hasDatabase()) return sampleCompanies

  try {
    return await getPrisma().company.findMany({ orderBy: [{ floor: 'asc' }, { name: 'asc' }] })
  } catch {
    return sampleCompanies
  }
}

export async function getCompany(id: number): Promise<Company | null> {
  if (!hasDatabase()) return sampleCompanies.find((company) => company.id === id) ?? null

  try {
    return await getPrisma().company.findUnique({ where: { id } })
  } catch {
    return sampleCompanies.find((company) => company.id === id) ?? null
  }
}

export async function getServiceRequests(): Promise<ServiceRequest[]> {
  if (!hasDatabase()) return sampleRequests

  try {
    return await getPrisma().serviceRequest.findMany({ orderBy: { createdAt: 'desc' } })
  } catch {
    return sampleRequests
  }
}
