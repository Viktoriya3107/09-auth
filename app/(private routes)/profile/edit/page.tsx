'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { updateMe, getMe } from '@/lib/api/clientApi'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/authStore'

export default function EditProfile() {
  const router = useRouter()
  const setUser = useAuthStore((state) => state.setUser)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState('')

  useEffect(() => {
    let active = true

    const loadUser = async () => {
      try {
        const user = await getMe()

        if (!active || !user) return

        setUsername(user.username ?? '')
        setEmail(user.email ?? '')
        setAvatar(user.avatar ?? '')
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

    const updated = await updateMe({ username })

    
    setUser(updated)

    router.push('/profile')
  }

  return (
    <main>
      <h1>Edit Profile</h1>

      {avatar && (
        <Image
          src={avatar}
          alt="User avatar"
          width={100}
          height={100}
        />
      )}

      <form onSubmit={handleSave}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />

        
        <input value={email} readOnly />

        <button type="submit">Save</button>

        
        <button type="button" onClick={() => router.back()}>
          Cancel
        </button>
      </form>
    </main>
  )
}