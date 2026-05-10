import { getMe } from '@/lib/api/serverApi'
import Image from 'next/image'
import styles from './ProfilePage.module.css'

export default async function Profile() {
  const user = await getMe()

  return (
    <main className={styles.mainContent}>
      <div className={styles.profileCard}>
        <h1 className={styles.formTitle}>Profile Page</h1>

        <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={styles.avatar}
        />

        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>

        <a href="/profile/edit">Edit Profile</a>
      </div>
    </main>
  )
}