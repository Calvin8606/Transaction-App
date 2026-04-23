import type { ReportFilters } from '../types/report'
import { buildReportPayload } from '../utils/mockData'

export const reportsApi = {
  async getSummary(filters: ReportFilters) {
    return buildReportPayload(filters).summary
  },
  async getTransactions(filters: ReportFilters) {
    return buildReportPayload(filters).transactions
  },
  async getReport(filters: ReportFilters) {
    return buildReportPayload(filters)
  },
}
