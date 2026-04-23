import type { ReactNode } from 'react'

export default function PageHeader({
  title,
  description,
  actions,
}: {
  title: string
  description: string
  actions?: ReactNode
}) {
  return (
    <div className="page-header">
      <div className="stack-sm">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {actions ? <div className="action-row">{actions}</div> : null}
    </div>
  )
}
