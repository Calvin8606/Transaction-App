import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../../components/common/Button'
import { useSession } from '../../context/SessionContext'

export default function SignupPage() {
  const { signup } = useSession()

  return (
    <div className="auth-entry stack-lg">
      <div className="stack-sm">
        <div className="auth-eyebrow-pill">Create account</div>
        <h1 className="auth-title">Create your Wayspend login.</h1>
        <p className="auth-copy">
          Use Auth0 sign-up to create an account, then sync your role-aware profile into the application database.
        </p>
      </div>
      <div className="auth-cta-shell stack-md">
        <Button
          block
          className="auth-cta-button"
          onClick={async () => {
            await signup('/dashboard')
          }}
        >
          Continue to sign up
          <ArrowRight size={16} aria-hidden="true" />
        </Button>
        <p className="auth-helper-copy">New accounts are created in Auth0 first, then mapped into the app database.</p>
      </div>
      <p className="auth-link-row">
        Already have access?{' '}
        <Link className="auth-inline-link" to="/login">
          Sign in
        </Link>
      </p>
    </div>
  )
}
