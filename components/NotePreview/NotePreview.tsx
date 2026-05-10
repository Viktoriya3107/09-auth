import Link from 'next/link';
import css from './NotePreview.module.css';

type Note = {
  id: string;
  title: string;
  content: string;
  tag: string;
};

export default function NotePreview({ note }: { note: Note }) {
  return (
    <li className={css.card}>
      <div className={css.header}>
        <h3 className={css.title}>{note.title}</h3>
        <span className={css.tag}>{note.tag}</span>
      </div>

      <p className={css.text}>
        {note.content.length > 120
          ? note.content.slice(0, 120) + '...'
          : note.content}
      </p>

      <Link className={css.link} href={`/notes/${note.id}`}>
        Read more
      </Link>
    </li>
  );
}