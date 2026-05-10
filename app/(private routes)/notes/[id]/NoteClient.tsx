'use client'

import { useQuery } from '@tanstack/react-query'
import { getNoteById } from '@/lib/api/clientApi'

export default function NoteClient({ id }: { id: string }) {
  const { data } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
  })

  if (!data) return <p>Loading...</p>

  return (
    <main>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
      <span>{data.tag}</span>
    </main>
  )
}