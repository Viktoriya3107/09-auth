import { cookies } from 'next/headers'
import { api } from './api'
import type { User } from '@/types/user'
import type { Note } from '@/types/note'

async function getCookieHeader() {
  const cookieStore = await cookies()
  return cookieStore.toString()
}


export const getMe = async (): Promise<User> => {
  const res = await api.get<User>('/users/me', {
    headers: {
      Cookie: await getCookieHeader(),
    },
  })

  return res.data
}


export const checkSession = async () => {
  const res = await api.get('/auth/session', {
    headers: {
      Cookie: await getCookieHeader(),
    },
  })

  return res
}


export const getNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: await getCookieHeader(),
    },
  })

  return res.data
}