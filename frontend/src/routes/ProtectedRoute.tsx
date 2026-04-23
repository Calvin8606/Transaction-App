import { Navigate, Outlet, useLocation } from 'react-router-dom'
import LoadingState from '../components/common/LoadingState'
import { useSession } from '../context/SessionContext'

export default function ProtectedRoute() {
  const { user, loading } = useSession()
  const location = useLocation()

  if (loading) {
    return <LoadingState title="Restoring your Wayspend workspace..." />
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return <Outlet />
}
