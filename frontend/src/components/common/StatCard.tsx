import type { ReactNode } from 'react'
import Card from './Card'

type StatCardProps = {
  title: string
  value: string
  eyebrow?: string
  footnote?: string
  icon?: ReactNode
}

export default function StatCard({ title, value, eyebrow, footnote, icon }: StatCardProps) {
  return (
    <Card className="stat-card stack-sm">
      <div className="card-header">
        <div>
          {eyebrow ? <div className="muted-text">{eyebrow}</div> : null}
          <h3 className="card-title">{title}</h3>
        </div>
        {icon}
      </div>
      <p className="stat-value">{value}</p>
      {footnote ? <p className="stat-footnote">{footnote}</p> : null}
    </Card>
  )
}
