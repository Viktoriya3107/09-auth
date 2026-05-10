'use client'

import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { checkSession, getMe } from '@/lib/api/clientApi'
import { useAuthStore } from '@/lib/store/authStore'

export default function AuthProvider({
  children,
}: {
  children: ReactNode
}) {
  const { setUser, clearIsAuthenticated } = useAuthStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      try {
        const session = await checkSession()

        // якщо сесія активна → отримуємо user
        if (session?.success) {
          const user = await getMe()
          setUser(user)
        } else {
          clearIsAuthenticated()
        }
      } catch {
        clearIsAuthenticated()
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [setUser, clearIsAuthenticated])

  if (loading) return <p>Loading...</p>

  return <>{children}</>
}