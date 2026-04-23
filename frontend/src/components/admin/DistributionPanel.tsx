import { Copy, QrCode, ScanLine } from 'lucide-react'
import type { PaymentPage } from '../../types/paymentPage'
import { APP_ORIGIN } from '../../utils/constants'
import { publicPayRoute } from '../../utils/routeHelpers'
import Button from '../common/Button'

export default function DistributionPanel({
  page,
  onCopy,
}: {
  page: PaymentPage
  onCopy: (value: string) => void
}) {
  const publicUrl = `${APP_ORIGIN}${publicPayRoute(page.slug || 'new-page')}`
  const iframeSnippet = `<iframe src="${publicUrl}" title="${page.title || 'Wayspend payment'}" width="100%" height="960" style="border:0;border-radius:24px;"></iframe>`

  return (
    <div className="stack-md">
      <div className="distribution-box stack-sm">
        <strong>Public URL</strong>
        <div className="split-row">
          <code className="mono">{publicUrl}</code>
          <Button variant="secondary" onClick={() => onCopy(publicUrl)}>
            <Copy size={16} aria-hidden="true" />
            Copy
          </Button>
        </div>
      </div>
      <div className="distribution-box stack-sm">
        <strong>Embed snippet</strong>
        <code className="mono">{iframeSnippet}</code>
        <Button variant="ghost" onClick={() => onCopy(iframeSnippet)}>
          <ScanLine size={16} aria-hidden="true" />
          Copy iframe
        </Button>
      </div>
      <div className="distribution-box split-row">
        <div className="stack-sm">
          <strong>QR code area</strong>
          <p className="muted-text">Swap this placeholder for `react-qr-code` when the team wants a generated asset.</p>
        </div>
        <div className="qr-placeholder" aria-hidden="true">
          <QrCode size={44} />
        </div>
      </div>
    </div>
  )
}
