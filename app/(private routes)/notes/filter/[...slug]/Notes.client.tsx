'use client'

import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { getNotes } from '@/lib/api/clientApi'
import type { NotesResponse } from '@/lib/api/clientApi'

import SearchBox from '@/components/SearchBox/SearchBox'
import Pagination from '@/components/Pagination/Pagination'
import NoteList from '@/components/NoteList/NoteList'
import Link from 'next/link'

export default function NotesClient() {
  const params = useParams()
  const tag = Array.isArray(params.slug) ? params.slug[0] : undefined

  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string>('')

  const [debouncedSearch] = useDebounce(search, 500)

  const { data, isLoading, isError } = useQuery<NotesResponse>({
    queryKey: ['notes', page, debouncedSearch, tag],
    queryFn: () =>
      getNotes({
        page,
        search: debouncedSearch || undefined,
        tag,
      }),
  })

  if (isLoading) return <p>Loading...</p>
  if (isError || !data) return <p>Error</p>

  return (
    <div>
      <Link href="/notes/action/create">Create note</Link>

      <SearchBox onSearch={setSearch} />

      <NoteList notes={data.items} />

      <Pagination
        page={page}
        totalPages={data.totalPages}
        onChange={(p: number) => setPage(p)}
      />
    </div>
  )
}