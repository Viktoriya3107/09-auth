'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { getNotes } from '@/lib/api/clientApi'
import type { Note } from '@/types/note'

type NotesResponse = {
  items: Note[]
  totalPages: number
}

export default function NotesClient() {
  const [page, setPage] = useState(1)

  const { data } = useQuery<NotesResponse>({
    queryKey: ['notes', page],
    queryFn: () => getNotes({ page }),
  })

  return (
    <div>
      <ul>
        {data?.items?.map((note) => (
          <li key={note.id}>
            <Link href={`/notes/${note.id}`}>
              {note.title}
            </Link>
          </li>
        ))}
      </ul>

      <button onClick={() => setPage((p) => p + 1)}>
        Next
      </button>
    </div>
  )
}