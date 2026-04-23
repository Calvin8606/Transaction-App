import type { AppUser } from '../types/auth'
import type { PaymentPage } from '../types/paymentPage'
import type { ReportFilters, ReportPayload, ReportSummary } from '../types/report'
import type { PaymentMethod, Transaction, TransactionStatus } from '../types/transaction'

const STORAGE_KEYS = {
  pages: 'wayspend.pages',
  transactions: 'wayspend.transactions',
  session: 'wayspend.session',
}

const seededPages: PaymentPage[] = [
  {
    id: 'page-1',
    slug: 'north-hill-cardiology',
    title: 'Cardiology Balance Payment',
    subtitle: 'Complete your remaining balance for recent care',
    description: 'Use this secure page to complete your outstanding cardiology balance in a few steps.',
    organizationName: 'North Hill Cardiology',
    brandColor: '#0b1f3a',
    logoUrl: '',
    headerMessage: 'Payments are processed in Stripe test mode for this demo.',
    footerMessage: 'Questions about your statement? Call Patient Financial Services at (555) 010-2040.',
    amountMode: 'fixed',
    fixedAmount: 286.42,
    glCodes: ['CARD-4410', 'CARD-SELF-PAY'],
    isActive: true,
    customFields: [
      {
        id: 'field-account',
        label: 'Account number',
        fieldType: 'text',
        required: true,
        placeholder: 'Example: NHC-19384',
        helperText: 'Found at the top right of your statement.',
        order: 1,
      },
      {
        id: 'field-dob',
        label: 'Date of birth',
        fieldType: 'date',
        required: true,
        order: 2,
      },
      {
        id: 'field-program',
        label: 'Payment allocation',
        fieldType: 'dropdown',
        required: false,
        options: ['Current balance', 'Payment plan deposit', 'Prior visit'],
        order: 3,
      },
    ],
    confirmationTemplate: 'Thank you for completing your North Hill Cardiology payment.',
    lastUpdated: '2026-04-23T12:08:00.000Z',
  },
  {
    id: 'page-2',
    slug: 'lakeside-orthopedics-estimate',
    title: 'Procedure Estimate Deposit',
    subtitle: 'Reserve your surgery date with a deposit',
    description: 'Collect a flexible deposit ahead of service and route funds to the correct GL bucket.',
    organizationName: 'Lakeside Orthopedics',
    brandColor: '#234b84',
    logoUrl: '',
    headerMessage: 'A deposit helps us hold your scheduled procedure date.',
    footerMessage: 'Deposits are refundable per your signed estimate agreement.',
    amountMode: 'range',
    minAmount: 250,
    maxAmount: 1500,
    glCodes: ['ORTHO-DEPOSIT', 'SCHED-RESERVE'],
    isActive: true,
    customFields: [
      {
        id: 'field-surgeon',
        label: 'Provider',
        fieldType: 'dropdown',
        required: true,
        options: ['Dr. Patel', 'Dr. Morgan', 'Dr. Chen'],
        order: 1,
      },
      {
        id: 'field-plan',
        label: 'Include payment plan follow-up',
        fieldType: 'checkbox',
        required: false,
        helperText: 'Our finance team will reach out with demo-safe next steps.',
        order: 2,
      },
    ],
    confirmationTemplate: 'Your deposit request has been captured and routed for review.',
    lastUpdated: '2026-04-22T15:40:00.000Z',
  },
  {
    id: 'page-3',
    slug: 'harbor-pediatrics-donation',
    title: 'Family Support Contribution',
    subtitle: 'Optional open amount contribution',
    description: 'Collect community support payments for pediatric care outreach.',
    organizationName: 'Harbor Pediatrics Foundation',
    brandColor: '#2f6f61',
    logoUrl: '',
    headerMessage: 'Support pediatric access funds with a contribution of your choice.',
    footerMessage: 'This demo page shows how open amount pages can be branded safely.',
    amountMode: 'open',
    glCodes: ['FOUNDATION-GIVING'],
    isActive: false,
    disabledReason: 'Temporarily paused during campaign review',
    customFields: [
      {
        id: 'field-note',
        label: 'Dedication note',
        fieldType: 'text',
        required: false,
        placeholder: 'Optional message',
        order: 1,
      },
    ],
    confirmationTemplate: 'Thank you for supporting Harbor Pediatrics Foundation.',
    lastUpdated: '2026-04-21T19:25:00.000Z',
  },
]

const seededTransactions: Transaction[] = [
  {
    id: 'txn-1001',
    pageId: 'page-1',
    pageTitle: 'Cardiology Balance Payment',
    payerName: 'Maria Johnson',
    payerEmail: 'maria@example.com',
    amount: 286.42,
    paymentMethod: 'card',
    status: 'success',
    glCode: 'CARD-4410',
    createdAt: '2026-04-23T13:40:00.000Z',
  },
  {
    id: 'txn-1002',
    pageId: 'page-2',
    pageTitle: 'Procedure Estimate Deposit',
    payerName: 'Devon Brooks',
    payerEmail: 'devon@example.com',
    amount: 600,
    paymentMethod: 'ach',
    status: 'pending',
    glCode: 'ORTHO-DEPOSIT',
    createdAt: '2026-04-23T11:05:00.000Z',
  },
  {
    id: 'txn-1003',
    pageId: 'page-1',
    pageTitle: 'Cardiology Balance Payment',
    payerName: 'Jordan Lee',
    payerEmail: 'jordan.fail@example.com',
    amount: 286.42,
    paymentMethod: 'wallet',
    status: 'failed',
    glCode: 'CARD-SELF-PAY',
    createdAt: '2026-04-22T16:15:00.000Z',
  },
  {
    id: 'txn-1004',
    pageId: 'page-2',
    pageTitle: 'Procedure Estimate Deposit',
    payerName: 'Naomi Wright',
    payerEmail: 'naomi@example.com',
    amount: 1200,
    paymentMethod: 'card',
    status: 'success',
    glCode: 'SCHED-RESERVE',
    createdAt: '2026-04-21T10:30:00.000Z',
  },
]

const defaultAdminUser: AppUser = {
  id: 'admin-1',
  email: 'ops@wayspend.demo',
  name: 'Avery Brooks',
  role: 'admin',
  emailVerified: true,
}

function readStorage<T>(key: string, fallback: T): T {
  const raw = window.localStorage.getItem(key)
  if (!raw) {
    window.localStorage.setItem(key, JSON.stringify(fallback))
    return fallback
  }

  try {
    return JSON.parse(raw) as T
  } catch {
    window.localStorage.setItem(key, JSON.stringify(fallback))
    return fallback
  }
}

function writeStorage<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function initializeMockStore() {
  readStorage(STORAGE_KEYS.pages, seededPages)
  readStorage(STORAGE_KEYS.transactions, seededTransactions)
}

export function getMockPages() {
  initializeMockStore()
  return readStorage(STORAGE_KEYS.pages, seededPages)
}

export function getMockTransactions() {
  initializeMockStore()
  return readStorage(STORAGE_KEYS.transactions, seededTransactions)
}

export function getPageById(id: string) {
  return getMockPages().find((page) => page.id === id)
}

export function getPageBySlug(slug: string) {
  return getMockPages().find((page) => page.slug === slug)
}

export function saveMockPage(payload: PaymentPage) {
  const pages = getMockPages()
  const nextPage = {
    ...payload,
    lastUpdated: new Date().toISOString(),
  }
  const existingIndex = pages.findIndex((page) => page.id === payload.id)
  const savedPage = existingIndex >= 0 ? nextPage : { ...nextPage, id: `page-${crypto.randomUUID()}` }
  const nextPages = existingIndex >= 0 ? pages.map((page) => (page.id === payload.id ? savedPage : page)) : [savedPage, ...pages]

  writeStorage(STORAGE_KEYS.pages, nextPages)
  return savedPage
}

export function toggleMockPageStatus(id: string, isActive: boolean) {
  const nextPages = getMockPages().map((page) =>
    page.id === id ? { ...page, isActive, lastUpdated: new Date().toISOString() } : page,
  )
  writeStorage(STORAGE_KEYS.pages, nextPages)
}

export function createMockTransaction(input: {
  pageId: string
  pageTitle: string
  payerName: string
  payerEmail: string
  amount: number
  paymentMethod: PaymentMethod
  status: TransactionStatus
  glCode?: string
}) {
  const nextTransaction: Transaction = {
    id: `txn-${Math.floor(Date.now() / 1000)}`,
    createdAt: new Date().toISOString(),
    ...input,
  }
  const nextTransactions = [nextTransaction, ...getMockTransactions()]
  writeStorage(STORAGE_KEYS.transactions, nextTransactions)
  return nextTransaction
}

export function getMockSession() {
  return readStorage<AppUser | null>(STORAGE_KEYS.session, defaultAdminUser)
}

export function setMockSession(user: AppUser | null) {
  writeStorage(STORAGE_KEYS.session, user)
}

function filterTransactions(transactions: Transaction[], filters: ReportFilters) {
  const now = Date.now()
  const days = filters.dateRange === '7d' ? 7 : filters.dateRange === '30d' ? 30 : 90
  const cutoff = now - days * 24 * 60 * 60 * 1000

  return transactions.filter((transaction) => {
    if (new Date(transaction.createdAt).getTime() < cutoff) return false
    if (filters.pageId !== 'all' && transaction.pageId !== filters.pageId) return false
    if (filters.status !== 'all' && transaction.status !== filters.status) return false
    if (filters.method !== 'all' && transaction.paymentMethod !== filters.method) return false
    return true
  })
}

function computeSummary(transactions: Transaction[]): ReportSummary {
  const successfulTransactions = transactions.filter((transaction) => transaction.status === 'success')
  const totalCollected = successfulTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)
  const averagePaymentAmount = successfulTransactions.length > 0 ? totalCollected / successfulTransactions.length : 0

  return {
    totalCollected,
    averagePaymentAmount,
    successfulPayments: successfulTransactions.length,
    failedPayments: transactions.filter((transaction) => transaction.status === 'failed').length,
    pendingPayments: transactions.filter((transaction) => transaction.status === 'pending').length,
    activePages: getMockPages().filter((page) => page.isActive).length,
  }
}

function makeBreakdown<T extends string>(items: T[], getLabel: (value: T) => string, rows: Transaction[]) {
  return items
    .map((item) => {
      const matching = rows.filter(
        (row) => row.paymentMethod === item || row.glCode === item || (item === 'Unassigned' && !row.glCode),
      )

      return {
        label: getLabel(item),
        value: matching.length,
        amount: matching.reduce((sum, row) => sum + row.amount, 0),
      }
    })
    .filter((entry) => entry.value > 0)
}

export function buildReportPayload(filters: ReportFilters): ReportPayload {
  const filteredTransactions = filterTransactions(getMockTransactions(), filters)
  const methodBreakdown = makeBreakdown(['card', 'wallet', 'ach'], (value) => value.toUpperCase(), filteredTransactions)
  const glCodeValues = Array.from(
    new Set(filteredTransactions.map((row) => row.glCode ?? 'Unassigned')),
  ) as string[]
  const glCodeBreakdown = makeBreakdown(glCodeValues, (value) => value, filteredTransactions)

  return {
    summary: computeSummary(filteredTransactions),
    transactions: filteredTransactions,
    glCodeBreakdown,
    paymentMethodBreakdown: methodBreakdown,
  }
}
