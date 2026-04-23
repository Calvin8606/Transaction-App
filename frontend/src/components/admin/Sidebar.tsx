import { BarChart3, CreditCard, LayoutDashboard, LogOut, Settings, Sparkles } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSession } from '../../context/SessionContext'

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/payment-pages', label: 'Payment pages', icon: CreditCard },
  { to: '/admin/reports', label: 'Reporting', icon: BarChart3 },
]

export default function Sidebar() {
  const { logout } = useSession()
  const navigate = useNavigate()

  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <div className="brand-mark">
          <Sparkles size={18} aria-hidden="true" />
        </div>
        <div className="brand-copy">
          <strong>Wayspend</strong>
          <span>Provider payment platform</span>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Primary admin">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
            <Icon size={18} aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-note stack-sm">
        <div className="badge badge-info">Hackathon demo</div>
        <strong>Built for backend handoff</strong>
        <p style={{ margin: 0 }}>
          Auth, page publishing, Stripe insertion, and reporting all stay behind typed seams.
        </p>
      </div>

      <div className="sidebar-secondary">
        <NavLink to="/verify-email" className="sidebar-link">
          <Settings size={18} aria-hidden="true" />
          <span>Session status</span>
        </NavLink>
        <button
          className="sidebar-link"
          onClick={async () => {
            await logout()
            navigate('/login')
          }}
          style={{ border: 0, background: 'transparent', width: '100%' }}
        >
          <LogOut size={18} aria-hidden="true" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  )
}
