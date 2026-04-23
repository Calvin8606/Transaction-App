import type { ReactNode } from 'react'
import Card from './Card'

export default function EmptyState({ title, message, action }: { title: string; message: string; action?: ReactNode }) {
  return (
    <Card className="empty-state">
      <h2>{title}</h2>
      <p className="muted-text">{message}</p>
      {action ? <div style={{ marginTop: '1rem' }}>{action}</div> : null}
    </Card>
  )
}
