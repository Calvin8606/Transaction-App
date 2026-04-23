import { ArrowRight } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import { useSession } from '../../context/SessionContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useSession()

  async function handleSubmit(formData: FormData) {
    const email = String(formData.get('email') ?? 'ops@wayspend.demo')
    const name = String(formData.get('name') ?? 'Avery Brooks')
    await login(email, name)
    navigate((location.state as { from?: string } | null)?.from ?? '/admin/dashboard')
  }

  return (
    <div className="stack-lg">
      <div className="stack-sm">
        <div className="badge badge-info">Admin sign in</div>
        <h1>Access the Wayspend admin shell.</h1>
        <p>Auth0-ready shell with a local mock session so the rest of the product flow is never blocked.</p>
      </div>
      <form
        className="stack-md"
        onSubmit={async (event) => {
          event.preventDefault()
          await handleSubmit(new FormData(event.currentTarget))
        }}
      >
        <Input label="Work email" name="email" type="email" defaultValue="ops@wayspend.demo" />
        <Input label="Display name" name="name" defaultValue="Avery Brooks" />
        <Button type="submit" block>
          Continue to admin
          <ArrowRight size={16} aria-hidden="true" />
        </Button>
      </form>
      <p className="muted-text">
        New workspace? <Link to="/signup">Create an account</Link>
      </p>
    </div>
  )
}
