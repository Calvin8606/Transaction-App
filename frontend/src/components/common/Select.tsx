import type { SelectHTMLAttributes } from 'react'

type Option = {
  label: string
  value: string
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  options: Option[]
  helperText?: string
}

export default function Select({ label, options, helperText, id, ...props }: SelectProps) {
  const selectId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, '-')
  const helperId = `${selectId}-helper`

  return (
    <label className="input-group" htmlFor={selectId}>
      <span className="input-label">{label}</span>
      <select
        id={selectId}
        className="select-input"
        aria-describedby={helperText ? helperId : undefined}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText ? (
        <p className="input-helper" id={helperId}>
          {helperText}
        </p>
      ) : null}
    </label>
  )
}
