import { Building2, CreditCard, Wallet } from 'lucide-react'
import type { PaymentMethod } from '../../types/transaction'

const optionIcons = {
  card: CreditCard,
  wallet: Wallet,
  ach: Building2,
}

export default function PaymentOptionCard({
  method,
  selected,
  onSelect,
}: {
  method: PaymentMethod
  selected: boolean
  onSelect: (method: PaymentMethod) => void
}) {
  const Icon = optionIcons[method]

  return (
    <button type="button" className="option-card" data-selected={selected} onClick={() => onSelect(method)}>
      <div className="stack-sm">
        <Icon size={18} aria-hidden="true" />
        <strong>{method.toUpperCase()}</strong>
        <span className="muted-text">
          {method === 'card'
            ? 'Primary card entry path'
            : method === 'wallet'
              ? 'Digital wallet placeholder'
              : 'ACH-ready handoff seam'}
        </span>
      </div>
    </button>
  )
}
