import { Copy, Eye, PencilLine } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { PaymentPage } from '../../types/paymentPage'
import { APP_ORIGIN } from '../../utils/constants'
import { formatDateTime, titleCase } from '../../utils/formatters'
import { adminEditRoute, publicPayRoute } from '../../utils/routeHelpers'
import Button from '../common/Button'
import Card from '../common/Card'
import StatusPill from '../common/StatusPill'

export default function PaymentPageCard({
  page,
  onCopy,
}: {
  page: PaymentPage
  onCopy: (url: string) => void
}) {
  const publicUrl = `${APP_ORIGIN}${publicPayRoute(page.slug)}`

  return (
    <Card padded={false}>
      <div className="list-card">
        <div>
          <div className="list-title">
            <div>
              <div className="split-row">
                <h3 className="card-title" style={{ margin: 0 }}>
                  {page.title}
                </h3>
                <StatusPill status={page.isActive ? 'active' : 'disabled'} />
              </div>
              <p className="card-subtitle">{page.subtitle ?? page.description ?? 'Reusable branded payment page'}</p>
            </div>
          </div>
          <div className="list-metadata muted-text">
            <span className="badge badge-neutral mono">/{page.slug}</span>
            <span>{titleCase(page.amountMode)} amount</span>
            <span>{page.organizationName ?? 'Wayspend provider'}</span>
            <span>Updated {page.lastUpdated ? formatDateTime(page.lastUpdated) : 'just now'}</span>
          </div>
        </div>
        <div className="action-row">
          <Link to={adminEditRoute(page.id)}>
            <Button variant="secondary">
              <PencilLine size={16} aria-hidden="true" />
              Edit
            </Button>
          </Link>
          <Link to={publicPayRoute(page.slug)} target="_blank" rel="noreferrer">
            <Button variant="ghost">
              <Eye size={16} aria-hidden="true" />
              Preview
            </Button>
          </Link>
          <Button variant="ghost" onClick={() => onCopy(publicUrl)}>
            <Copy size={16} aria-hidden="true" />
            Copy link
          </Button>
        </div>
      </div>
    </Card>
  )
}
