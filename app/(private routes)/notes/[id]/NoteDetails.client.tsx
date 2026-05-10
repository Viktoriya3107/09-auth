'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getNoteById } from '@/lib/api/clientApi'; 
import css from './NoteDetails.module.css';

type Note = {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt?: string;
};

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error loading note</p>;

  return (
    <div className={css.container}>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <span>{data.tag}</span>
      {data.createdAt && <small>{data.createdAt}</small>}
    </div>
  );
}