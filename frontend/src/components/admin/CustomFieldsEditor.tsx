import { Plus, Trash2 } from 'lucide-react'
import type { CustomField, CustomFieldType } from '../../types/paymentPage'
import Button from '../common/Button'
import Checkbox from '../common/Checkbox'
import Input from '../common/Input'
import Select from '../common/Select'

type CustomFieldsEditorProps = {
  fields: CustomField[]
  onChange: (fields: CustomField[]) => void
}

const fieldTypeOptions: { label: string; value: CustomFieldType }[] = [
  { label: 'Text', value: 'text' },
  { label: 'Number', value: 'number' },
  { label: 'Dropdown', value: 'dropdown' },
  { label: 'Date', value: 'date' },
  { label: 'Checkbox', value: 'checkbox' },
]

export default function CustomFieldsEditor({ fields, onChange }: CustomFieldsEditorProps) {
  const updateField = (fieldId: string, patch: Partial<CustomField>) => {
    onChange(fields.map((field) => (field.id === fieldId ? { ...field, ...patch } : field)))
  }

  const addField = () => {
    onChange([
      ...fields,
      {
        id: `field-${crypto.randomUUID()}`,
        label: 'New field',
        fieldType: 'text',
        required: false,
        placeholder: '',
        helperText: '',
        options: [],
        order: fields.length + 1,
      },
    ])
  }

  const removeField = (fieldId: string) => {
    onChange(fields.filter((field) => field.id !== fieldId).map((field, index) => ({ ...field, order: index + 1 })))
  }

  return (
    <div className="stack-md">
      {fields.map((field, index) => (
        <div key={field.id} className="custom-field-card stack-sm">
          <div className="split-row">
            <strong>Field {index + 1}</strong>
            <Button variant="ghost" onClick={() => removeField(field.id)}>
              <Trash2 size={16} aria-hidden="true" />
              Remove
            </Button>
          </div>
          <div className="form-grid-2">
            <Input
              label="Label"
              value={field.label}
              onChange={(event) => updateField(field.id, { label: event.target.value })}
            />
            <Select
              label="Field type"
              value={field.fieldType}
              onChange={(event) => updateField(field.id, { fieldType: event.target.value as CustomFieldType })}
              options={fieldTypeOptions}
            />
          </div>
          <div className="form-grid-2">
            <Input
              label="Placeholder"
              value={field.placeholder ?? ''}
              onChange={(event) => updateField(field.id, { placeholder: event.target.value })}
            />
            <Input
              label="Helper text"
              value={field.helperText ?? ''}
              onChange={(event) => updateField(field.id, { helperText: event.target.value })}
            />
          </div>
          {field.fieldType === 'dropdown' ? (
            <Input
              label="Options"
              helperText="Comma-separated values"
              value={(field.options ?? []).join(', ')}
              onChange={(event) =>
                updateField(field.id, {
                  options: event.target.value
                    .split(',')
                    .map((option) => option.trim())
                    .filter(Boolean),
                })
              }
            />
          ) : null}
          <Checkbox
            label="Required field"
            checked={field.required}
            onChange={(event) => updateField(field.id, { required: event.target.checked })}
          />
        </div>
      ))}
      <Button variant="secondary" onClick={addField}>
        <Plus size={16} aria-hidden="true" />
        Add custom field
      </Button>
    </div>
  )
}
