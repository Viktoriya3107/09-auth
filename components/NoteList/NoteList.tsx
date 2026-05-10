'use client'

import Link from 'next/link'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteNote } from '@/lib/api/clientApi'
import type { Note } from '@/types/note'

type Props = {
  notes: Note[]
}

export default function NoteList({ notes }: Props) {
  const queryClient = useQueryClient()

  const { mutate: removeNote } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })

  if (!notes.length) {
    return <p>No notes found</p>
  }

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <Link href={`/notes/${note.id}`}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <span>{note.tag}</span>
          </Link>

          <button onClick={() => removeNote(note.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}