export const dynamic = 'force-dynamic'

import { getMe } from '@/lib/api/serverApi'
import Image from 'next/image'
import styles from './ProfilePage.module.css'

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

        <a href="/profile/edit">Edit Profile</a>
      </div>
    </main>
  )
}