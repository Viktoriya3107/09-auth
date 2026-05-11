'use client'

import { login, getMe } from '@/lib/api/clientApi'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuthStore } from '@/lib/store/authStore'
import styles from './SignInPage.module.css'

export default function SignIn() {
  const router = useRouter()
  const [error, setError] = useState('')

  const setUser = useAuthStore((state) => state.setUser)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = new FormData(e.currentTarget)

    try {
      await login({
        email: form.get('email') as string,
        password: form.get('password') as string,
      })

      
      await new Promise((r) => setTimeout(r, 50))

      let user = null

      try {
        user = await getMe()
      } catch {
        user = null
      }

      if (user) {
        setUser(user)
      }

      router.push('/profile')
    } catch {
      setError('Error')
    }
  }

  return (
    <main className={styles.mainContent}>
      <form onSubmit={onSubmit} className={styles.form}>
        <h1 className={styles.formTitle}>Sign in</h1>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.submitButton}>
            Log in
          </button>
        </div>

        <p className={styles.error}>{error}</p>
      </form>
    </main>
  )
}