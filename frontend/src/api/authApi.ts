import type { AppUser } from '../types/auth'
import { getMockSession, setMockSession } from '../utils/mockData'

export const authApi = {
  async getSession() {
    return getMockSession()
  },
  async login(email: string, name = 'Avery Brooks'): Promise<AppUser> {
    const user: AppUser = {
      id: 'admin-1',
      email,
      name,
      role: 'admin',
      emailVerified: true,
    }
    setMockSession(user)
    return user
  },
  async signup(email: string, name: string) {
    const user: AppUser = {
      id: 'admin-signup',
      email,
      name,
      role: 'admin',
      emailVerified: false,
    }
    setMockSession(user)
    return user
  },
  async logout() {
    setMockSession(null)
  },
  async markVerified() {
    const existing = getMockSession()
    if (!existing) return null
    const updated = { ...existing, emailVerified: true }
    setMockSession(updated)
    return updated
  },
}
