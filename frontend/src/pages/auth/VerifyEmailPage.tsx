import { MailCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import { useSession } from '../../context/SessionContext'
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from '../../utils/constants'

export default function VerifyEmailPage() {
  const { user, markVerified } = useSession()
  const navigate = useNavigate()

  return (
    <Card className="stack-lg">
      <div className="stack-sm">
        <div className="badge badge-warning">Verification state</div>
        <h1>Verify the admin session before entering the workspace.</h1>
        <p>
          This placeholder mirrors the Auth0 verification checkpoint. The real implementation can swap in the SDK flow
          without changing routes.
        </p>
      </div>
      <div className="card card-padding stack-md" style={{ background: 'var(--surface-muted)' }}>
        <div className="topbar-group">
          <MailCheck size={18} aria-hidden="true" />
          <strong>{user?.email ?? 'finance@wayspend.demo'}</strong>
        </div>
        <p className="muted-text">
          Auth0 domain: {AUTH0_DOMAIN} | client: {AUTH0_CLIENT_ID}
        </p>
      </div>
      <Button
        onClick={async () => {
          await markVerified()
          navigate('/admin/dashboard')
        }}
      >
        Mark verified and continue
      </Button>
    </Card>
  )
}
