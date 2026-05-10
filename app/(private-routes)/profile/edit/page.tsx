'use client'

import { useEffect, useState } from 'react'
import { updateMe, getMe } from '@/lib/api/clientApi'
import { useRouter } from 'next/navigation'

export default function EditProfile() {
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    let active = true

    const loadUser = async () => {
      try {
        const user = await getMe()

        if (!active || !user) return

        setUsername(user.username ?? '')
        setEmail(user.email ?? '')
      } catch (err) {
        console.error(err)
      }
    }

    loadUser()

    return () => {
      active = false
    }
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()

    await updateMe({ username })
    router.push('/profile')
  }

  return (
    <main>
      <h1>Edit Profile</h1>

      <form onSubmit={handleSave}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />

        <p>{email}</p>

        <button type="submit">Save</button>
      </form>
    </main>
  )
}