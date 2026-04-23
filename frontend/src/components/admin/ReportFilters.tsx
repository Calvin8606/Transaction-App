import type { PaymentPage } from '../../types/paymentPage'
import type { ReportFilters as ReportFiltersType } from '../../types/report'
import Select from '../common/Select'

export default function ReportFilters({
  filters,
  pages,
  onChange,
}: {
  filters: ReportFiltersType
  pages: PaymentPage[]
  onChange: (filters: ReportFiltersType) => void
}) {
  return (
    <div className="report-filters">
      <Select
        label="Date range"
        value={filters.dateRange}
        onChange={(event) => onChange({ ...filters, dateRange: event.target.value as ReportFiltersType['dateRange'] })}
        options={[
          { label: 'Last 7 days', value: '7d' },
          { label: 'Last 30 days', value: '30d' },
          { label: 'Last 90 days', value: '90d' },
        ]}
      />
      <Select
        label="Payment page"
        value={filters.pageId}
        onChange={(event) => onChange({ ...filters, pageId: event.target.value })}
        options={[
          { label: 'All pages', value: 'all' },
          ...pages.map((page) => ({ label: page.title, value: page.id })),
        ]}
      />
      <Select
        label="Status"
        value={filters.status}
        onChange={(event) => onChange({ ...filters, status: event.target.value as ReportFiltersType['status'] })}
        options={[
          { label: 'All statuses', value: 'all' },
          { label: 'Success', value: 'success' },
          { label: 'Failed', value: 'failed' },
          { label: 'Pending', value: 'pending' },
        ]}
      />
      <Select
        label="Method"
        value={filters.method}
        onChange={(event) => onChange({ ...filters, method: event.target.value as ReportFiltersType['method'] })}
        options={[
          { label: 'All methods', value: 'all' },
          { label: 'Card', value: 'card' },
          { label: 'Wallet', value: 'wallet' },
          { label: 'ACH', value: 'ach' },
        ]}
      />
    </div>
  )
}
