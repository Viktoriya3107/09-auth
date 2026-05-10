'use client'

import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { checkSession } from '@/lib/api/clientApi'
import { useAuthStore } from '@/lib/store/authStore'

export default function AuthProvider({
  children,
}: {
  children: ReactNode
}) {
  const { setUser, clear } = useAuthStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      try {
        const user = await checkSession()

        if (user) setUser(user)
        else clear()
      } catch {
        clear()
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [setUser, clear])

  if (loading) return <p>Loading...</p>

  return <>{children}</>
}