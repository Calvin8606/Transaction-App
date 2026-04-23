import type { TextareaHTMLAttributes } from 'react'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  helperText?: string
}

export default function Textarea({ label, helperText, id, ...props }: TextareaProps) {
  const textareaId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, '-')
  const helperId = `${textareaId}-helper`

  return (
    <label className="input-group" htmlFor={textareaId}>
      <span className="input-label">{label}</span>
      <textarea id={textareaId} className="textarea-input" aria-describedby={helperText ? helperId : undefined} {...props} />
      {helperText ? (
        <p className="input-helper" id={helperId}>
          {helperText}
        </p>
      ) : null}
    </label>
  )
}
