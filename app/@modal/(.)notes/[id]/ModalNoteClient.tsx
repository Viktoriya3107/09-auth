'use client'

import { useQuery } from '@tanstack/react-query'
import { getNoteById } from '@/lib/api/clientApi'
import type { Note } from '@/types/note'

type Props = {
  id: string
}

export default function ModalNoteClient({ id }: Props) {
  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
    enabled: !!id,
  })

  if (isLoading) return <p>Loading...</p>
  if (isError || !data) return <p>Error</p>

  return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <span>{data.tag}</span>
    </div>
  )
}