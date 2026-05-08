import { ArrowRight, ArrowUp, BarChart3, CreditCard, Database, Shield, Sparkles, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'
import WayspendLogo from '../../components/common/WayspendLogo'
import { useSession } from '../../context/SessionContext'
import { workspaceHomeRoute } from '../../utils/routeHelpers'

const platformHighlights = [
  {
    eyebrow: 'Access + eligibility',
    title: 'Confirm coverage before care',
    description: 'Real-time eligibility, prior auth, and patient estimates across every payer.',
    icon: Shield,
  },
  {
    eyebrow: 'Claim management',
    title: 'First-pass rates above 96%',
    description: 'Professional, institutional, and dental claims on a single platform.',
    icon: CreditCard,
  },
  {
    eyebrow: 'Denial recovery',
    title: 'Recover revenue you earned',
    description: 'Avoid, track, and appeal denials so teams get paid faster and more fully.',
    icon: BarChart3,
  },
  {
    eyebrow: 'AltitudeAI',
    title: 'AI purpose-built for RCM',
    description: '30 years of healthcare-payment data, trained on what actually gets paid.',
    icon: Sparkles,
  },
  {
    eyebrow: 'Patient payments',
    title: 'Collect more, with empathy',
    description: 'Clear estimates and flexible payment plans that patients will actually use.',
    icon: Wallet,
  },
  {
    eyebrow: 'Analytics',
    title: 'One source of truth',
    description: 'Built on one database so your numbers stay aligned from intake through payment.',
    icon: Database,
  },
]

const proofStats = [
  { value: '30+', label: 'Years in healthcare payments' },
  { value: '1M+', label: 'Providers on the platform' },
  { value: '$1.2T', label: 'Gross claims processed / yr' },
  { value: '96%', label: 'First-pass claim rate' },
]

const footerColumns = [
  {
    title: 'Platform',
    items: ['Claim Manager', 'Denial Recovery', 'AltitudeAI', 'Analytics', 'Patient payments'],
  },
  {
    title: 'Solutions',
    items: ['Hospitals + health systems', 'Physician practices', 'Dental', 'Home health'],
  },
  {
    title: 'Company',
    items: ['About', 'Careers', 'Newsroom', 'Partners'],
  },
  {
    title: 'Resources',
    items: ['Customer stories', 'Guides', 'Events', 'Support'],
  },
]

function MountainBackdrop() {
  return (
    <svg
      viewBox="0 0 1440 560"
      preserveAspectRatio="xMidYMax slice"
      className="waystar-hero-backdrop"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="waystar-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b1f3a" />
          <stop offset="55%" stopColor="#122b4f" />
          <stop offset="100%" stopColor="#2a1f48" />
        </linearGradient>
        <radialGradient id="waystar-sun-glow" cx="78%" cy="35%" r="25%">
          <stop offset="0%" stopColor="#f26a4b" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#f26a4b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="560" fill="url(#waystar-sky)" />
      <rect width="1440" height="560" fill="url(#waystar-sun-glow)" />
      <g className="waystar-sun-cluster">
        <circle className="waystar-sun-core" cx="1130" cy="190" r="52" fill="#f5ead9" opacity="0.92" />
      </g>
      <path
        d="M0 420 L200 300 L360 360 L540 250 L720 330 L900 230 L1100 310 L1280 240 L1440 290 L1440 560 L0 560 Z"
        fill="#1a3358"
        opacity="0.6"
      />
      <path
        d="M0 470 L180 380 L340 430 L520 340 L700 400 L880 330 L1080 390 L1260 340 L1440 380 L1440 560 L0 560 Z"
        fill="#0b1f3a"
        opacity="0.85"
      />
      <path
        d="M0 520 L220 450 L420 500 L620 440 L820 490 L1020 450 L1240 490 L1440 460 L1440 560 L0 560 Z"
        fill="#08172b"
      />
    </svg>
  )
}

export default function LandingPage() {
  const { user } = useSession()
  const workspaceRoute = user ? workspaceHomeRoute(user.role) : '/signup'
  const loginRoute = user ? workspaceHomeRoute(user.role) : '/login'
  const loginLabel = user ? 'Workspace' : 'Client login'
  const handleScrollToTop = () => {
    if (typeof window === 'undefined') {
      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="waystar-page">
      <header className="waystar-nav">
        <div className="waystar-container waystar-nav-inner">
          <Link to="/" className="waystar-brand" aria-label="Wayspend home">
            <WayspendLogo tone="light" size={22} />
          </Link>

          <nav className="waystar-nav-links" aria-label="Primary">
            <a href="#platform">Platform</a>
            <a href="#platform">Solutions</a>
            <a href="#results">Customers</a>
            <a href="#resources">Resources</a>
            <a href="#company">Company</a>
          </nav>

          <div className="waystar-nav-actions">
            <Link to={loginRoute} className="waystar-login-link">
              {loginLabel}
            </Link>
            <Link to={workspaceRoute} className="waystar-button waystar-button-primary">
              Get a demo
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </header>

      <section className="waystar-hero">
        <MountainBackdrop />
        <div className="waystar-container waystar-hero-inner">
          <div className="waystar-hero-copy">
            <div className="waystar-badge">
              <span className="waystar-badge-dot" aria-hidden="true" />
              AltitudeAI - new
            </div>
            <h1>
              Transform healthcare payments. <span>The Way Forward.</span>
            </h1>
            <p>
              A truly unified revenue cycle platform - one database, one sign-on, and the industry&apos;s most
              advanced AI for healthcare payments.
            </p>
            <div className="waystar-hero-actions">
              <Link to={workspaceRoute} className="waystar-button waystar-button-primary">
                Get a demo
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <a href="#demo" className="waystar-button waystar-button-ghost-light">
                Watch the 2-min tour
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="waystar-section waystar-section-light" id="platform">
        <div className="waystar-container">
          <p className="waystar-eyebrow">The Wayspend platform</p>
          <h2 className="waystar-section-title">Everything you need to transform healthcare payments.</h2>

          <div className="waystar-feature-grid">
            {platformHighlights.map(({ eyebrow, title, description, icon: Icon }) => (
              <article key={title} className="waystar-feature-card">
                <div className="waystar-feature-icon">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <p className="waystar-feature-eyebrow">{eyebrow}</p>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="waystar-feature-link">
                  Learn more
                  <ArrowRight size={14} aria-hidden="true" />
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="waystar-proof-band" id="results">
        <div className="waystar-container waystar-proof-grid">
          {proofStats.map(({ value, label }) => (
            <article key={label} className="waystar-proof-card">
              <p className="waystar-eyebrow">Proof</p>
              <strong>{value}</strong>
              <p>{label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="waystar-cta-band" id="demo">
        <div className="waystar-cta-glow" aria-hidden="true" />
        <div className="waystar-container waystar-cta-inner">
          <div className="waystar-cta-copy">
            <p className="waystar-eyebrow waystar-eyebrow-soft">Ready when you are</p>
            <h2>See Wayspend in action with your own data.</h2>
          </div>

          <div className="waystar-cta-actions">
            <Link to={workspaceRoute} className="waystar-button waystar-button-primary">
              Get a demo
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a href="#resources" className="waystar-button waystar-button-ghost-light">
              Talk to sales
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <footer className="waystar-footer" id="company">
        <div className="waystar-container waystar-footer-grid">
          <div className="waystar-footer-brand">
            <div className="waystar-brand">
              <WayspendLogo tone="light" size={18} />
            </div>
            <p>The Wayspend platform simplifies healthcare payments.</p>
          </div>

          {footerColumns.map(({ title, items }) => (
            <section key={title} className="waystar-footer-column" aria-label={title}>
              <h3>{title}</h3>
              {items.map((item) => (
                <a key={item} href="#resources">
                  {item}
                </a>
              ))}
            </section>
          ))}
        </div>

        <div className="waystar-container waystar-footer-bottom" id="resources">
          <span>(c) 2026 Wayspend. All rights reserved.</span>
          <button type="button" className="waystar-scroll-top" onClick={handleScrollToTop} aria-label="Scroll to top">
            <ArrowUp size={18} aria-hidden="true" />
          </button>
          <div className="waystar-footer-meta">
            <a href="#resources">Privacy</a>
            <a href="#resources">Terms</a>
            <a href="#resources">HIPAA</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
