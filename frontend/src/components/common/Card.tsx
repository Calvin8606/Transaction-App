import type { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
  padded?: boolean
}

export default function Card({ children, className = '', padded = true }: CardProps) {
  return <section className={`card${padded ? ' card-padding' : ''} ${className}`.trim()}>{children}</section>
}
