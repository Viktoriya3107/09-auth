'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getNoteById } from '@/lib/api/notes';

export default function NotePreview({ id }: { id: string }) {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h3>{data?.title}</h3>
      <p>{data?.content}</p>

      <button onClick={() => router.back()}>
        Back
      </button>
    </div>
  );
}