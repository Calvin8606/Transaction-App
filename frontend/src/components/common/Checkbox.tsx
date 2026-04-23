import type { InputHTMLAttributes, ReactNode } from 'react'

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  helperText?: ReactNode
}

export default function Checkbox({ label, helperText, id, ...props }: CheckboxProps) {
  const checkboxId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <label className="checkbox-row" htmlFor={checkboxId}>
      <input id={checkboxId} type="checkbox" {...props} />
      <span>
        <strong>{label}</strong>
        {helperText ? <span className="muted-text"> {helperText}</span> : null}
      </span>
    </label>
  )
}
