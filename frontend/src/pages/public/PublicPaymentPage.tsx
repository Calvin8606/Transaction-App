import { ArrowRight, Info } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { paymentsApi } from '../../api/paymentsApi'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import Checkbox from '../../components/common/Checkbox'
import EmptyState from '../../components/common/EmptyState'
import Input from '../../components/common/Input'
import LoadingState from '../../components/common/LoadingState'
import Select from '../../components/common/Select'
import BillSummaryCard from '../../components/payment/BillSummaryCard'
import PaymentOptionCard from '../../components/payment/PaymentOptionCard'
import SecureFooter from '../../components/payment/SecureFooter'
import TrustPanel from '../../components/payment/TrustPanel'
import type { PaymentPage } from '../../types/paymentPage'
import type { PaymentMethod } from '../../types/transaction'

const methods: PaymentMethod[] = ['card', 'wallet', 'ach']

export default function PublicPaymentPage() {
  const { slug = '' } = useParams()
  const navigate = useNavigate()
  const [page, setPage] = useState<PaymentPage | null | undefined>(undefined)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card')
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    paymentsApi.getPublicPage(slug).then((result) => {
      setPage(result)
      if (result?.amountMode === 'fixed') setAmount(result.fixedAmount ?? 0)
      if (result?.amountMode === 'range') setAmount(result.minAmount ?? 0)
    })
  }, [slug])

  const customFieldInputs = useMemo(() => page?.customFields ?? [], [page])

  if (page === undefined) return <LoadingState title="Opening secure payment page..." />
  if (page === null) {
    return (
      <div className="public-shell">
        <EmptyState title="Payment page not found" message="The requested page could not be loaded for this demo." />
      </div>
    )
  }

  if (!page.isActive) {
    return <Navigate to={`/pay/${slug}/disabled`} replace />
  }
  const activePage: PaymentPage = page

  async function handleSubmit(formData: FormData) {
    const payerName = String(formData.get('payerName') ?? '')
    const payerEmail = String(formData.get('payerEmail') ?? '')
    const amountValue =
      activePage.amountMode === 'fixed' ? activePage.fixedAmount ?? 0 : Number(formData.get('amount') ?? amount) || 0
    const result = await paymentsApi.completeDemoPayment({
      slug,
      payerName,
      payerEmail,
      amount: amountValue,
      paymentMethod,
      glCode: String(formData.get('glCode') ?? activePage.glCodes?.[0] ?? ''),
    })

    navigate(`/pay/${slug}/${result.status === 'success' ? 'success' : 'failure'}`, {
      state: { transaction: result.transaction, page: result.page },
    })
  }

  return (
    <div className="public-shell">
      <div className="public-grid">
        <div className="stack-lg">
          <BillSummaryCard page={activePage} amount={amount} />
          <TrustPanel />
        </div>

        <div className="stack-lg">
          <Card className="payment-card stack-lg">
            <div className="stack-sm">
              <div className="badge badge-warning">Demo-safe payment</div>
              <h1>{activePage.title}</h1>
              <p>{activePage.description}</p>
            </div>

            <form
              className="stack-lg"
              onSubmit={async (event) => {
                event.preventDefault()
                await handleSubmit(new FormData(event.currentTarget))
              }}
            >
              <div className="card card-padding stack-md" style={{ background: 'var(--surface-muted)' }}>
                <div className="topbar-group">
                  <Info size={18} aria-hidden="true" />
                  <strong>{activePage.headerMessage}</strong>
                </div>
                <p className="muted-text">
                  Enter any email containing <code>fail</code> to preview the failure state. Do not use real payment data.
                </p>
              </div>

              <div className="form-grid-2">
                <Input label="Payer name" name="payerName" required placeholder="Full name" />
                <Input label="Email address" name="payerEmail" type="email" required placeholder="name@example.com" />
              </div>

              {activePage.amountMode !== 'fixed' ? (
                <Input
                  label={activePage.amountMode === 'range' ? 'Payment amount' : 'Amount to pay'}
                  name="amount"
                  type="number"
                  min={activePage.amountMode === 'range' ? String(activePage.minAmount ?? 0) : '1'}
                  max={activePage.amountMode === 'range' ? String(activePage.maxAmount ?? 10000) : undefined}
                  step="0.01"
                  value={amount}
                  onChange={(event) => setAmount(Number(event.target.value) || 0)}
                  helperText={
                    activePage.amountMode === 'range'
                      ? `Allowed range: ${activePage.minAmount} to ${activePage.maxAmount}`
                      : 'Enter the amount you would like to submit.'
                  }
                  required
                />
              ) : null}

              {customFieldInputs.map((field) =>
                field.fieldType === 'dropdown' ? (
                  <Select
                    key={field.id}
                    label={field.label}
                    name={field.id}
                    required={field.required}
                    options={(field.options ?? []).map((option) => ({ label: option, value: option }))}
                  />
                ) : field.fieldType === 'checkbox' ? (
                  <Checkbox key={field.id} label={field.label} name={field.id} helperText={field.helperText} />
                ) : (
                  <Input
                    key={field.id}
                    label={field.label}
                    name={field.id}
                    type={field.fieldType === 'number' ? 'number' : field.fieldType === 'date' ? 'date' : 'text'}
                    required={field.required}
                    placeholder={field.placeholder}
                    helperText={field.helperText}
                  />
                ),
              )}

              <Select
                label="GL code"
                name="glCode"
                options={(activePage.glCodes ?? ['Unassigned']).map((code) => ({ label: code, value: code }))}
              />

              <div className="stack-md">
                <strong>Select payment option</strong>
                <div className="payment-method-grid">
                  {methods.map((method) => (
                    <PaymentOptionCard
                      key={method}
                      method={method}
                      selected={paymentMethod === method}
                      onSelect={setPaymentMethod}
                    />
                  ))}
                </div>
              </div>

              <div className="stripe-placeholder">
                <strong>Stripe Payment Element area</strong>
                <p className="muted-text">
                  This region is reserved for real Stripe Elements once the backend returns a live client secret.
                </p>
                <div className="stripe-lines">
                  <span />
                  <span />
                  <span style={{ width: '68%' }} />
                </div>
              </div>

              <Button type="submit" block>
                Submit secure payment
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </form>
            <SecureFooter />
          </Card>
        </div>
      </div>
    </div>
  )
}
