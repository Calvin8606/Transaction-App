import { Outlet } from 'react-router-dom'
import Sidebar from '../components/admin/Sidebar'
import Topbar from '../components/admin/Topbar'

export default function AdminLayout() {
  return (
    <div className="admin-shell app-shell">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <main className="layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
