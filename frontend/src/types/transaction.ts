export type TransactionStatus = 'success' | 'failed' | 'pending'
export type PaymentMethod = 'card' | 'wallet' | 'ach'

export type Transaction = {
  id: string
  pageId: string
  pageTitle?: string
  payerName?: string
  payerEmail?: string
  amount: number
  paymentMethod: PaymentMethod
  status: TransactionStatus
  glCode?: string
  createdAt: string
}
