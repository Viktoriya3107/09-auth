import { api } from './api'
import type { Note } from '@/types/note'
import type { User } from '@/types/user'

export type NotesResponse = {
  items: Note[]
  totalPages: number
}

type AuthDTO = {
  email: string
  password: string
}

type UpdateUserDTO = Partial<User>

type CreateNoteDTO = {
  title: string
  content: string
  tag: string
}


export const register = (data: AuthDTO) =>
  api.post('/auth/register', data).then(res => res.data)

export const login = (data: AuthDTO) =>
  api.post('/auth/login', data).then(res => res.data)

export const logout = () =>
  api.post('/auth/logout').then(res => res.data)

export const checkSession = () =>
  api.get('/auth/session').then(res => res.data)

export const getMe = (): Promise<User> =>
  api.get('/users/me').then(res => res.data)

export const updateMe = (data: UpdateUserDTO) =>
  api.patch('/users/me', data).then(res => res.data)


export const getNotes = (params?: {
  tag?: string
  search?: string
  page?: number
}) =>
  api.get<NotesResponse>('/notes', { params }).then(res => res.data)

export const getNoteById = (id: string): Promise<Note> =>
  api.get<Note>(`/notes/${id}`).then(res => res.data)

export const createNote = (data: CreateNoteDTO): Promise<Note> =>
  api.post('/notes', data).then(res => res.data)

export const deleteNote = (id: string): Promise<void> =>
  api.delete(`/notes/${id}`).then(res => res.data)