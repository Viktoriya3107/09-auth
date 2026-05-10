'use client'

import { login } from '@/lib/api/clientApi'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from './SignInPage.module.css'

export default function SignIn() {
  const router = useRouter()
  const [error, setError] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const form = new FormData(e.currentTarget as HTMLFormElement)

    try {
      await login({
        email: form.get('email') as string,
        password: form.get('password') as string,
      })

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