import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { authApi } from '../api/authApi'
import type { AppUser } from '../types/auth'

type SessionContextValue = {
  user: AppUser | null
  loading: boolean
  login: (email: string, name?: string) => Promise<void>
  signup: (email: string, name: string) => Promise<void>
  logout: () => Promise<void>
  markVerified: () => Promise<void>
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined)

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    authApi.getSession().then((session) => {
      setUser(session)
      setLoading(false)
    })
  }, [])

  const value: SessionContextValue = {
    user,
    loading,
    async login(email, name) {
      const nextUser = await authApi.login(email, name)
      setUser(nextUser)
    },
    async signup(email, name) {
      const nextUser = await authApi.signup(email, name)
      setUser(nextUser)
    },
    async logout() {
      await authApi.logout()
      setUser(null)
    },
    async markVerified() {
      const nextUser = await authApi.markVerified()
      setUser(nextUser)
    },
  }

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession() {
  const context = useContext(SessionContext)
  if (!context) throw new Error('useSession must be used inside SessionProvider')
  return context
}
