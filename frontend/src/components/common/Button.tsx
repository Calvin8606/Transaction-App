import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  block?: boolean
}

export default function Button({
  children,
  className = '',
  variant = 'primary',
  block = false,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`button button-${variant}${block ? ' button-block' : ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}
