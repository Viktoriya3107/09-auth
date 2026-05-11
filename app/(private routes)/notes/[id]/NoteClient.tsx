'use client'

import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getNoteById } from '@/lib/api/notes'

type Props = {
  id: string
}

export default function NoteClient({ id }: Props) {
  const router = useRouter()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
  })

  if (isLoading) return <p>Loading...</p>

  if (isError || !data) {
    return <p>Note not found</p>
  }

  return (
    <main>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
      <span>{data.tag}</span>

      <button onClick={() => router.back()}>
        Back
      </button>
    </main>
  )
}