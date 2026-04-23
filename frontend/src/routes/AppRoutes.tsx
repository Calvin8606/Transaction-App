import { Navigate, Route, Routes } from 'react-router-dom'
import { useSession } from '../context/SessionContext'
import AdminLayout from '../layouts/AdminLayout'
import AuthLayout from '../layouts/AuthLayout'
import PublicLayout from '../layouts/PublicLayout'
import DashboardPage from '../pages/admin/DashboardPage'
import PaymentPageEditorPage from '../pages/admin/PaymentPageEditorPage'
import PaymentPagesPage from '../pages/admin/PaymentPagesPage'
import ReportsPage from '../pages/admin/ReportsPage'
import LoginPage from '../pages/auth/LoginPage'
import SignupPage from '../pages/auth/SignupPage'
import VerifyEmailPage from '../pages/auth/VerifyEmailPage'
import PaymentDisabledPage from '../pages/public/PaymentDisabledPage'
import PaymentFailurePage from '../pages/public/PaymentFailurePage'
import PaymentSuccessPage from '../pages/public/PaymentSuccessPage'
import PublicPaymentPage from '../pages/public/PublicPaymentPage'
import ProtectedRoute from './ProtectedRoute'
import RoleRoute from './RoleRoute'

function RootRedirect() {
  const { user } = useSession()
  return <Navigate to={user ? '/admin/dashboard' : '/login'} replace />
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute allowedRole="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="payment-pages" element={<PaymentPagesPage />} />
            <Route path="payment-pages/new" element={<PaymentPageEditorPage />} />
            <Route path="payment-pages/:id/edit" element={<PaymentPageEditorPage />} />
            <Route path="reports" element={<ReportsPage />} />
          </Route>
        </Route>
      </Route>

      <Route element={<PublicLayout />}>
        <Route path="/pay/:slug" element={<PublicPaymentPage />} />
        <Route path="/pay/:slug/success" element={<PaymentSuccessPage />} />
        <Route path="/pay/:slug/failure" element={<PaymentFailurePage />} />
        <Route path="/pay/:slug/disabled" element={<PaymentDisabledPage />} />
      </Route>
    </Routes>
  )
}
