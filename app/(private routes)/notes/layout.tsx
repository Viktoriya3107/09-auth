export default function NotesLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <main style={{ flex: 1 }}>{children}</main>
      <aside>{sidebar}</aside>
    </div>
  );
}