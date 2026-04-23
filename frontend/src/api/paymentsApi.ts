import type { PaymentMethod } from '../types/transaction'
import { createMockTransaction, getPageBySlug } from '../utils/mockData'

export const paymentsApi = {
  async getPublicPage(slug: string) {
    return getPageBySlug(slug) ?? null
  },
  async completeDemoPayment(input: {
    slug: string
    payerName: string
    payerEmail: string
    amount: number
    paymentMethod: PaymentMethod
    glCode?: string
  }) {
    const page = getPageBySlug(input.slug)
    if (!page) throw new Error('Payment page not found')

    const status = input.payerEmail.toLowerCase().includes('fail') ? 'failed' : 'success'
    const transaction = createMockTransaction({
      pageId: page.id,
      pageTitle: page.title,
      payerName: input.payerName,
      payerEmail: input.payerEmail,
      amount: input.amount,
      paymentMethod: input.paymentMethod,
      status,
      glCode: input.glCode ?? page.glCodes?.[0],
    })

    return {
      status,
      transaction,
      page,
      clientSecret: 'pi_demo_client_secret_placeholder',
    }
  },
}
