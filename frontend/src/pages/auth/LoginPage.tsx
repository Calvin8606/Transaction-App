import { ArrowRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import Button from '../../components/common/Button'
import { useSession } from '../../context/SessionContext'

export default function LoginPage() {
  const location = useLocation()
  const { login } = useSession()
  const nextPath = (location.state as { from?: string } | null)?.from ?? '/dashboard'

  return (
    <div className="auth-entry stack-lg">
      <div className="stack-sm">
        <div className="auth-eyebrow-pill">Client login</div>
        <h1 className="auth-title">Sign in to your Wayspend workspace.</h1>
        <p className="auth-copy">
          Authenticate with Auth0, sync your profile through the backend, and open the dashboard you&apos;re allowed
          to access.
        </p>
      </div>

      <div className="auth-cta-shell stack-md">
        <Button
          block
          className="auth-cta-button"
          onClick={async () => {
            await login(nextPath)
          }}
        >
          Continue to login
          <ArrowRight size={16} aria-hidden="true" />
        </Button>
        <p className="auth-helper-copy">Single sign-on routes you into the right workspace after authentication.</p>
      </div>

      <p className="auth-link-row">
        Need an account?{' '}
        <Link className="auth-inline-link" to="/signup">
          Create one
        </Link>
      </p>
    </div>
  )
}
