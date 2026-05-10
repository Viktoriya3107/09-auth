import type { Metadata } from 'next';
import { getNotes } from '@/lib/api/notes';
import type { Note } from '@/types/note';

type NotesResponse = {
  items: Note[];
  totalPages: number;
};

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string[] }> }
): Promise<Metadata> {
  const { slug } = await params;

  const filter = slug?.join('/') || 'all';

  return {
    title: `Filter: ${filter}`,
    description: `Filtered notes by ${filter}`,
    openGraph: {
      title: `Filter: ${filter}`,
      description: `Filtered notes by ${filter}`,
      url: `https://notehub.com/notes/filter/${filter}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        },
      ],
    },
  };
}

export default async function FilterPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  const filter = slug?.[0] || 'all';

  const data: NotesResponse = await getNotes({
    tag: filter === 'all' ? undefined : filter,
    page: 1,
  });

  const notes = data.items;

  return (
    <main>
      <h1>Filter: {filter}</h1>
      <pre>{JSON.stringify(notes, null, 2)}</pre>
    </main>
  );
}