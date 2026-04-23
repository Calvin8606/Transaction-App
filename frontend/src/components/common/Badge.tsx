type BadgeProps = {
  children: string
  tone?: 'success' | 'warning' | 'danger' | 'info' | 'neutral'
}

export default function Badge({ children, tone = 'neutral' }: BadgeProps) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}
