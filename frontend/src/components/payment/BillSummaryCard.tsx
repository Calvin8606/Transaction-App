import type { PaymentPage } from '../../types/paymentPage'
import { formatCurrency, titleCase } from '../../utils/formatters'
import Card from '../common/Card'

export default function BillSummaryCard({
  page,
  amount,
}: {
  page: PaymentPage
  amount: number
}) {
  const amountLabel =
    page.amountMode === 'fixed'
      ? formatCurrency(page.fixedAmount ?? amount)
      : page.amountMode === 'range'
        ? `${formatCurrency(page.minAmount ?? 0)} - ${formatCurrency(page.maxAmount ?? 0)}`
        : 'Choose your amount'

  return (
    <Card className="summary-card stack-md">
      <div>
        <div className="badge badge-info">{page.organizationName ?? 'Wayspend provider'}</div>
        <h3>{page.title}</h3>
        <p className="muted-text">{page.subtitle ?? page.description}</p>
      </div>
      <div>
        <p className="muted-text">Payment configuration</p>
        <p className="amount-display" style={{ fontSize: '2.2rem' }}>
          {page.amountMode === 'open' ? formatCurrency(amount || 0) : amountLabel}
        </p>
      </div>
      <div className="stack-sm">
        <div className="summary-row">
          <span>Amount mode</span>
          <strong>{titleCase(page.amountMode)}</strong>
        </div>
        <div className="summary-row">
          <span>GL routing</span>
          <strong>{page.glCodes?.join(', ') ?? 'Configured in backend'}</strong>
        </div>
      </div>
    </Card>
  )
}
