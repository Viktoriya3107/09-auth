import { cookies } from 'next/headers'
import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api'

const serverApi = axios.create({ baseURL })

function getCookieHeader() {
  return cookies().toString()
}

export const getMe = async () => {
  const res = await serverApi.get('/users/me', {
    headers: { Cookie: getCookieHeader() },
  })
  return res.data
}

export const checkSession = async () => {
  const res = await serverApi.get('/auth/session', {
    headers: { Cookie: getCookieHeader() },
  })
  return res.data
}