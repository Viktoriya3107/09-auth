'use client'

import { useEffect, useState } from 'react'
import { updateMe, getMe } from '@/lib/api/clientApi'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import styles from './EditProfilePage.module.css'

export default function EditProfile() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState('')

  useEffect(() => {
    const loadUser = async () => {
      const user = await getMe()
      setUsername(user.username)
      setEmail(user.email)
      setAvatar(user.avatar)
    }

    loadUser()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()

    await updateMe({ username })
    router.push('/profile')
  }

  return (
    <main className={styles.mainContent}>
      <div className={styles.profileCard}>
        <h1 className={styles.formTitle}>Edit Profile</h1>

        <Image
          src={avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={styles.avatar}
        />

        <form onSubmit={handleSave} className={styles.profileInfo}>
          <div className={styles.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
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
              onClick={() => router.push('/profile')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}