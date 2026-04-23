import { AlertCircle } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Button from '../../components/common/Button'
import PaymentStatusBanner from '../../components/payment/PaymentStatusBanner'

export default function PaymentFailurePage() {
  const { slug = '' } = useParams()

  return (
    <div className="status-page">
      <div className="status-icon" style={{ background: 'var(--danger-100)', color: 'var(--danger-500)' }}>
        <AlertCircle size={30} aria-hidden="true" />
      </div>
      <PaymentStatusBanner
        tone="danger"
        eyebrow="Payment failed"
        title="We could not complete that payment."
        description="This demo state is triggered when the payer email contains the word fail, which makes it easy to show retry handling."
      >
        <div className="stack-sm">
          <p className="muted-text">
            Try again with a different demo email, or contact the provider team if you need statement support.
          </p>
          <div className="action-row">
            <Link to={`/pay/${slug}`}>
              <Button>Try again</Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary">Return to admin</Button>
            </Link>
          </div>
        </div>
      </PaymentStatusBanner>
    </div>
  )
}
