'use client'

import { useState } from 'react'
import { register, getMe } from '@/lib/api/clientApi'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/authStore'
import styles from './SignUpPage.module.css'

export default function SignUp() {
  const [error, setError] = useState('')
  const router = useRouter()

  const setUser = useAuthStore((state) => state.setUser)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = new FormData(e.currentTarget)

    try {
      await register({
        email: form.get('email') as string,
        password: form.get('password') as string,
      })

      // даємо бекенду встановити cookies
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
      <h1 className={styles.formTitle}>Sign up</h1>

      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className={styles.input}
          />
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.submitButton}>
            Register
          </button>
        </div>

        <p className={styles.error}>{error}</p>
      </form>
    </main>
  )
}