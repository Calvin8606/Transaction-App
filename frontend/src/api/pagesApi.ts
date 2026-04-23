import type { PaymentPage } from '../types/paymentPage'
import { getMockPages, getPageById, getPageBySlug, saveMockPage, toggleMockPageStatus } from '../utils/mockData'

export const pagesApi = {
  async list() {
    return getMockPages()
  },
  async getById(id: string) {
    return getPageById(id) ?? null
  },
  async getBySlug(slug: string) {
    return getPageBySlug(slug) ?? null
  },
  async save(page: PaymentPage) {
    return saveMockPage(page)
  },
  async updateStatus(id: string, isActive: boolean) {
    toggleMockPageStatus(id, isActive)
  },
}
