import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  helperText?: string
  error?: string
}

export default function Input({ label, helperText, error, id, ...props }: InputProps) {
  const inputId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, '-')
  const helperId = `${inputId}-helper`
  const errorId = `${inputId}-error`

  return (
    <label className="input-group" htmlFor={inputId}>
      <span className="input-label">{label}</span>
      <input
        id={inputId}
        className="text-input"
        aria-describedby={[helperText ? helperId : '', error ? errorId : ''].filter(Boolean).join(' ') || undefined}
        aria-invalid={Boolean(error)}
        {...props}
      />
      {helperText ? (
        <p className="input-helper" id={helperId}>
          {helperText}
        </p>
      ) : null}
      {error ? (
        <p className="input-error" id={errorId}>
          {error}
        </p>
      ) : null}
    </label>
  )
}
