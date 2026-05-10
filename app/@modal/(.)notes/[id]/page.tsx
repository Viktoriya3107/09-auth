import { getQueryClient } from '@/lib/getQueryClient';
import { getNoteById } from '@/lib/api/serverApi';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import ModalNoteClient from './ModalNoteClient';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ModalNotePage({ params }: Props) {
  const { id } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ModalNoteClient id={id} />
    </HydrationBoundary>
  );
}