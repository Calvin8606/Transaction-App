import type { ReactNode } from 'react'
import Card from '../common/Card'

export default function PaymentStatusBanner({
  tone,
  eyebrow,
  title,
  description,
  children,
}: {
  tone: 'success' | 'danger' | 'warning'
  eyebrow: string
  title: string
  description: string
  children?: ReactNode
}) {
  return (
    <Card className="status-panel stack-md">
      <div className={`badge badge-${tone}`}>{eyebrow}</div>
      <div className="stack-sm">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children}
    </Card>
  )
}
