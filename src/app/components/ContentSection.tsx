interface ContentSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export function ContentSection({ id, title, children }: ContentSectionProps) {
  return (
    <section
      id={id}
      className="mb-12 scroll-mt-24"
    >
      <h2
        className="text-2xl font-semibold mb-4"
        style={{
          fontSize: 'var(--text-xl)',
          fontWeight: 'var(--font-weight-semibold)'
        }}
      >
        {title}
      </h2>
      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
}
