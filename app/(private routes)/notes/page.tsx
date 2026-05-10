'use client';

import { useQuery } from '@tanstack/react-query';
import { getNotes } from '@/lib/api/notes';

export default function NotesPage() {
  const { data } = useQuery({
    queryKey: ['notes', { page: 1 }],

    queryFn: ({ queryKey }) => {
      const [, params] = queryKey as [
        string,
        { page?: number }
      ];

      return getNotes(params);
    },
  });

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}