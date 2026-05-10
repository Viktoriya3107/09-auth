import NotePreview from '@/components/NotePreview/NotePreview';
import css from './NoteList.module.css';

export type Note = {
  id: string;
  title: string;
  content: string;
  tag: string;
};

type Props = {
  notes: Note[];
};

export default function NoteList({ notes }: Props) {
  if (!notes.length) {
    return <p className={css.empty}>No notes found</p>;
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <NotePreview key={note.id} note={note} />
      ))}
    </ul>
  );
}