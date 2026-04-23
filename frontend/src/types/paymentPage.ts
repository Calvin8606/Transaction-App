export type AmountMode = 'fixed' | 'range' | 'open'

export type CustomFieldType = 'text' | 'number' | 'dropdown' | 'date' | 'checkbox'

export type CustomField = {
  id: string
  label: string
  fieldType: CustomFieldType
  required: boolean
  placeholder?: string
  helperText?: string
  options?: string[]
  order: number
}

export type PaymentPage = {
  id: string
  slug: string
  title: string
  subtitle?: string
  description?: string
  brandColor: string
  logoUrl?: string
  organizationName?: string
  headerMessage?: string
  footerMessage?: string
  amountMode: AmountMode
  fixedAmount?: number
  minAmount?: number
  maxAmount?: number
  glCodes?: string[]
  isActive: boolean
  disabledReason?: string
  customFields: CustomField[]
  confirmationTemplate?: string
  lastUpdated?: string
}
