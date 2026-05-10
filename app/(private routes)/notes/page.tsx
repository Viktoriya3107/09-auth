import { getNotes } from '@/lib/api/notes';

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <main>
      <h1>All notes</h1>
      <pre>{JSON.stringify(notes, null, 2)}</pre>
    </main>
  );
}