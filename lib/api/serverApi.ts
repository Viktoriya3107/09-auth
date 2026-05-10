import { cookies } from 'next/headers'
import { api } from './api'

async function getCookieHeader() {
  const cookieStore = await cookies()
  return cookieStore.toString()
}

export const getMe = async () => {
  const res = await api.get('/users/me', {
    headers: {
      Cookie: await getCookieHeader(),
    },
  })
  return res
}

export const checkSession = async () => {
  const res = await api.get('/auth/session', {
    headers: {
      Cookie: await getCookieHeader(),
    },
  })
  return res
}

export const getNoteById = async (id: string) => {
  const res = await api.get(`/notes/${id}`, {
    headers: {
      Cookie: await getCookieHeader(),
    },
  })
  return res
}