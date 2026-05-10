'use client';

import Modal from '@/components/Modal/Modal';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getNoteById } from '@/lib/api/clientApi'; 

type Note = {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt?: string;
};

export default function NotePreview({ id }: { id: string }) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
    enabled: !!id,
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error loading note</p>;

  return (
    <Modal onClose={() => router.back()}>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <p>Tag: {data.tag}</p>
      {data.createdAt && <p>Created: {data.createdAt}</p>}

      <button onClick={() => router.back()}>
        Close
      </button>
    </Modal>
  );
}