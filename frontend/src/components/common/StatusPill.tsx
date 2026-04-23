import type { TransactionStatus } from '../../types/transaction'

type StatusPillProps = {
  status: TransactionStatus | 'active' | 'disabled'
}

export default function StatusPill({ status }: StatusPillProps) {
  const tone =
    status === 'success' || status === 'active'
      ? 'success'
      : status === 'pending'
        ? 'warning'
        : 'danger'

  return <span className={`pill pill-${tone}`}>{status}</span>
}
