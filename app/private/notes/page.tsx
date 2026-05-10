export default function NotesPage() {
  const notes = [
    { id: 1, title: 'First note' },
    { id: 2, title: 'Second note' },
  ]

  return (
    <main>
      <h1>Notes</h1>

      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </main>
  )
}