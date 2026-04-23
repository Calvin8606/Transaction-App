import { Activity, BadgeDollarSign, CircleAlert, Wallet } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { pagesApi } from '../../api/pagesApi'
import { reportsApi } from '../../api/reportsApi'
import ActivityTable from '../../components/admin/ActivityTable'
import PageHeader from '../../components/admin/PageHeader'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import LoadingState from '../../components/common/LoadingState'
import StatCard from '../../components/common/StatCard'
import type { ReportPayload } from '../../types/report'
import { formatCurrency } from '../../utils/formatters'

const defaultFilters = {
  dateRange: '30d',
  pageId: 'all',
  status: 'all',
  method: 'all',
} as const

export default function DashboardPage() {
  const [report, setReport] = useState<ReportPayload | null>(null)
  const [pagesCount, setPagesCount] = useState(0)

  useEffect(() => {
    reportsApi.getReport(defaultFilters).then(setReport)
    pagesApi.list().then((pages) => setPagesCount(pages.length))
  }, [])

  if (!report) return <LoadingState />

  return (
    <div className="stack-lg">
      <PageHeader
        title="Wayspend dashboard"
        description="Monitor collection performance, recent activity, and rollout readiness for your demo environment."
        actions={
          <Link to="/admin/payment-pages/new">
            <Button>Create new page</Button>
          </Link>
        }
      />

      <div className="stats-grid">
        <StatCard title="Total collected" value={formatCurrency(report.summary.totalCollected)} icon={<BadgeDollarSign size={18} />} footnote="Successful payments in the selected window" />
        <StatCard title="Average payment amount" value={formatCurrency(report.summary.averagePaymentAmount)} icon={<Wallet size={18} />} footnote="Across successful demo payments" />
        <StatCard title="Successful payments" value={String(report.summary.successfulPayments)} icon={<Activity size={18} />} footnote={`${pagesCount} pages are currently configured`} />
        <StatCard title="Failed or pending" value={String(report.summary.failedPayments + report.summary.pendingPayments)} icon={<CircleAlert size={18} />} footnote="Use reporting to isolate statuses and methods" />
      </div>

      <div className="dashboard-grid">
        <div className="stack-lg">
          <ActivityTable transactions={report.transactions.slice(0, 6)} />
        </div>
        <div className="stack-lg">
          <Card className="insight-card">
            <div className="card-header">
              <div>
                <div className="badge badge-warning">Insight</div>
                <h2 className="card-title" style={{ color: 'var(--cream-50)' }}>
                  Suggested next move
                </h2>
              </div>
            </div>
            <div className="stack-md">
              <p style={{ margin: 0 }}>
                Deposit collection pages are converting at higher amounts than fixed balance pages in the current demo data.
              </p>
              <p className="muted-text">
                Push the builder flow next, then walk stakeholders from creation to public payment to reporting in one pass.
              </p>
              <Link to="/admin/payment-pages">
                <Button variant="secondary">Open payment pages</Button>
              </Link>
            </div>
          </Card>

          <Card>
            <div className="card-header">
              <div>
                <h2 className="card-title">Rollout readiness</h2>
                <p className="card-subtitle">What the current frontend already supports for backend hookup.</p>
              </div>
            </div>
            <div className="stack-sm">
              <div className="summary-row">
                <span>Admin shell and guarded routes</span>
                <strong>Ready</strong>
              </div>
              <div className="summary-row">
                <span>Builder and live preview</span>
                <strong>Ready</strong>
              </div>
              <div className="summary-row">
                <span>Public payment flow</span>
                <strong>Ready for Stripe seam</strong>
              </div>
              <div className="summary-row">
                <span>Reporting</span>
                <strong>Ready for API swap</strong>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
