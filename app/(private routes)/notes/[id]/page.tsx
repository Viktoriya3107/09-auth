import type { Metadata } from 'next'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getNoteById } from '@/lib/api/serverApi'
import NoteClient from './NoteClient'

export const dynamic = 'force-dynamic'

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const { id } = params

  const note = await getNoteById(id)

  if (!note) {
    return {
      title: 'Note not found',
      description: 'This note does not exist',
    }
  }

  return {
    title: note.title,
    description: note.content.slice(0, 120),
    openGraph: {
      title: note.title,
      description: note.content.slice(0, 120),
      url: `https://notehub.com/notes/${id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        },
      ],
    },
  }
}

export default async function NotePage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteClient id={id} />
    </HydrationBoundary>
  )
}