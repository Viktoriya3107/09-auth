'use client'

import { useAuthStore } from '@/lib/store/authStore'
import { useRouter } from 'next/navigation'
import { logout } from '@/lib/api/clientApi'

export default function AuthNavigation() {
  const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      clearIsAuthenticated()
      router.push('/sign-in')
    } catch {
      clearIsAuthenticated()
    }
  }

  return (
    <ul>
      {!isAuthenticated ? (
        <>
          <li>
            <a href="/sign-in">Login</a>
          </li>
          <li>
            <a href="/sign-up">Sign up</a>
          </li>
        </>
      ) : (
        <>
          <li>
            <a href="/profile">Profile</a>
          </li>

          <li>
            <p>{user?.email}</p>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </>
      )}
    </ul>
  )
}