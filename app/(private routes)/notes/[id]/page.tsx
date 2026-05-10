import type { Metadata } from 'next';
import { getNoteById } from '@/lib/api/notes';

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;

  const note = await getNoteById(id);

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
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const note = await getNoteById(id);

  return (
    <main>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <span>{note.tag}</span>
    </main>
  );
}