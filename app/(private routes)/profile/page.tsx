'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getMe, updateMe } from '@/lib/api/clientApi'
import { useAuthStore } from '@/lib/store/authStore'
import styles from './ProfilePage.module.css'

export default function EditProfilePage() {
  const router = useRouter()
  const setUser = useAuthStore((state) => state.setUser)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState<string | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      const user = await getMe()

      setUsername(user.username)
      setEmail(user.email)
      setAvatar(user.avatar ?? '/default-avatar.png')
    }

    loadUser()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const updatedUser = await updateMe({ username })

    setUser(updatedUser)
    router.push('/profile')
  }

  const handleCancel = () => {
    router.push('/profile')
  }

  return (
    <main className={styles.mainContent}>
      <div className={styles.profileCard}>
        <h1 className={styles.formTitle}>Edit Profile</h1>

        <Image
          src={avatar ?? '/default-avatar.png'}
          alt="User Avatar"
          width={120}
          height={120}
          className={styles.avatar}
        />

        <form className={styles.profileInfo} onSubmit={handleSubmit}>
          <div className={styles.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <p>Email: {email}</p>

          <div className={styles.actions}>
            <button type="submit" className={styles.saveButton}>
              Save
            </button>

            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}