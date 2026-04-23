import { ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import { useSession } from '../../context/SessionContext'

export default function SignupPage() {
  const { signup } = useSession()
  const navigate = useNavigate()

  return (
    <div className="stack-lg">
      <div className="stack-sm">
        <div className="badge badge-info">Create workspace</div>
        <h1>Set up a provider payment workspace.</h1>
        <p>Keep the shell Auth0-ready while giving the demo a clean route into dashboard, page building, and reporting.</p>
      </div>
      <form
        className="stack-md"
        onSubmit={async (event) => {
          event.preventDefault()
          const formData = new FormData(event.currentTarget)
          await signup(String(formData.get('email')), String(formData.get('name')))
          navigate('/verify-email')
        }}
      >
        <Input label="Organization admin" name="name" defaultValue="Jordan Parker" />
        <Input label="Email address" name="email" type="email" defaultValue="finance@wayspend.demo" />
        <Button type="submit" block>
          Continue to verification
          <ArrowRight size={16} aria-hidden="true" />
        </Button>
      </form>
      <p className="muted-text">
        Already have access? <Link to="/login">Sign in</Link>
      </p>
    </div>
  )
}
