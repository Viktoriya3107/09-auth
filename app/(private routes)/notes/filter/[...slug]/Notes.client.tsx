'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { getNotes } from '@/lib/api/notes';
import type { Note } from '@/types/user';

import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';

type Props = {
  tag?: string;
};

type NotesResponse = {
  items: Note[];
  totalPages: number;
};

function useDebounce(value: string, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

export default function NotesClient({ tag }: Props) {
  const router = useRouter();

  // pagination state (required by review)
  const [page, setPage] = useState(1);

  // search state
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  // query
  const { data } = useQuery<NotesResponse>({
    queryKey: ['notes', tag, debouncedSearch, page],
    queryFn: () => getNotes(tag, debouncedSearch, page),
  });

  const notes = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;

  // search handler
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  // pagination handler
  const handlePageChange = (p: number) => {
    setPage(p);
  };

  return (
    <div>
      <SearchBox onSearch={handleSearch} />

      {notes.length > 0 && <NoteList notes={notes} />}

      {notes.length > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={handlePageChange}
        />
      )}

      <button onClick={() => router.push('/notes/action/create')}>
        Create note
      </button>
    </div>
  );
}