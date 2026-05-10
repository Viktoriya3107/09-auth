export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import { getMe } from '@/lib/api/clientApi'
import Image from 'next/image'
import styles from './ProfilePage.module.css'

export const metadata: Metadata = {
  title: 'Profile',
  description: 'User profile page',
}

export default async function Profile() {
  const user = await getMe()

  if (!user) {
    return (
      <main>
        <h1>No user found</h1>
      </main>
    )
  }

  return (
    <main className={styles.mainContent}>
      <div className={styles.profileCard}>
        <h1>Profile Page</h1>

        <Image
          src={user.avatar ?? '/default-avatar.png'}
          alt="User Avatar"
          width={120}
          height={120}
        />

        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>

        <Link href="/profile/edit">Edit Profile</Link>
      </div>
    </main>
  )
}