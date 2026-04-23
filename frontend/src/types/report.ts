import type { PaymentMethod, Transaction, TransactionStatus } from './transaction'

export type ReportSummary = {
  totalCollected: number
  averagePaymentAmount: number
  successfulPayments: number
  failedPayments: number
  pendingPayments: number
  activePages: number
}

export type ReportFilters = {
  dateRange: '7d' | '30d' | '90d'
  pageId: string
  status: TransactionStatus | 'all'
  method: PaymentMethod | 'all'
}

export type BreakdownItem = {
  label: string
  value: number
  amount: number
}

export type ReportPayload = {
  summary: ReportSummary
  transactions: Transaction[]
  glCodeBreakdown: BreakdownItem[]
  paymentMethodBreakdown: BreakdownItem[]
}
