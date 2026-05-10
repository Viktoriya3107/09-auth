'use client'

import Link from 'next/link'
import { useAuthStore } from '@/lib/store/authStore'
import { useRouter } from 'next/navigation'
import { logout } from '@/lib/api/clientApi'

export default function AuthNavigation() {
  const { isAuthenticated, user, clear } = useAuthStore()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      clear()
      router.push('/sign-in')
    } catch {
      clear()
    }
  }

  return (
    <ul>
      {!isAuthenticated ? (
        <>
          <li>
            <Link href="/sign-in">Login</Link>
          </li>
          <li>
            <Link href="/sign-up">Sign up</Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link href="/profile">Profile</Link>
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