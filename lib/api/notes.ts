import { api } from './api'
import type { Note } from '@/types/note'

export type NotesResponse = {
  items: Note[]
  totalPages: number
}

export const getNotes = async (params: {
  tag?: string
  search?: string
  page?: number
}) => {
  const res = await api.get('/notes', { params })
  return res.data
}

export const getNoteById = async (id: string): Promise<Note> => {
  const res = await api.get(`/notes/${id}`)
  return res.data
}

export const createNote = async (data: {
  title: string
  content: string
  tag: string
}) => {
  const res = await api.post('/notes', data)
  return res.data
}

export const deleteNote = async (id: string) => {
  const res = await api.delete(`/notes/${id}`)
  return res.data
}