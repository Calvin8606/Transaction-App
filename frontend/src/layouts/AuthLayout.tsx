import { ArrowLeft, CreditCard, LayoutDashboard, ShieldCheck, Workflow } from 'lucide-react'
import { Link, Outlet } from 'react-router-dom'
import WayspendLogo from '../components/common/WayspendLogo'

const features = [
  {
    title: 'Reusable payment pages',
    description: 'Spin up branded pages for statements, deposits, and open balance collection.',
    icon: LayoutDashboard,
  },
  {
    title: 'Stripe-ready intake',
    description: 'Keep the UI ready for Payment Element insertion without storing card data locally.',
    icon: CreditCard,
  },
  {
    title: 'Trust-first payer flow',
    description: 'Clear guidance, healthcare-safe language, and accessibility built into every step.',
    icon: ShieldCheck,
  },
  {
    title: 'Reporting and routing',
    description: 'Monitor transactions, GL codes, and page performance in one workspace.',
    icon: Workflow,
  },
]

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      <main className="auth-panel">
        <div className="auth-panel-shell">
          <Link to="/" className="auth-home-link" aria-label="Back to Wayspend home">
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Back to home</span>
          </Link>

          <div className="auth-form-shell">
            <Outlet />
          </div>
        </div>
      </main>
      <aside className="auth-aside">
        <div className="auth-aside-inner">
          <div className="auth-aside-copy stack-md">
            <p className="auth-aside-eyebrow">Client workspace</p>
            <WayspendLogo tone="light" size={28} />
            <p className="auth-aside-kicker">Healthcare payments for modern provider teams</p>
            <h2 className="auth-aside-title">
              The fastest way to launch a polished payment workspace that still feels enterprise-ready.
            </h2>
            <p className="auth-aside-body">
              Structured for Auth0, Stripe test mode, backend API handoff, and live page distribution.
            </p>
          </div>

          <div className="auth-feature-grid">
            {features.map(({ title, description, icon: Icon }) => (
              <article key={title} className="auth-feature-card">
                <div className="auth-feature-icon">
                  <Icon size={18} aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p className="auth-feature-copy">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}
