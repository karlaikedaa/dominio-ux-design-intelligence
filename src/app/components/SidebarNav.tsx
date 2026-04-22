import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface SidebarNavSection {
  id: string;
  title: string;
  subsections?: Array<{ id: string; title: string }>;
}

interface SidebarNavProps {
  sections: SidebarNavSection[];
  activeId: string;
}

export function SidebarNav({ sections, activeId }: SidebarNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Close mobile menu after navigation
    setMobileOpen(false);
  };

  const navContent = (
    <nav aria-label="Page navigation" className="space-y-1">
      <ul role="list" className="space-y-1">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleClick(section.id);
              }}
              aria-current={activeId === section.id ? 'location' : undefined}
              className={`block px-3 py-2 rounded-[var(--radius)] transition-colors ${
                activeId === section.id
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-foreground hover:bg-muted'
              }`}
              style={{ fontSize: 'var(--text-label)' }}
            >
              {section.title}
            </a>

            {/* Subsections */}
            {section.subsections && section.subsections.length > 0 && (
              <ul role="list" className="mt-1 ml-4 space-y-1">
                {section.subsections.map((subsection) => (
                  <li key={subsection.id}>
                    <a
                      href={`#${subsection.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick(subsection.id);
                      }}
                      aria-current={activeId === subsection.id ? 'location' : undefined}
                      className={`block px-3 py-1.5 rounded-[var(--radius)] transition-colors text-sm ${
                        activeId === subsection.id
                          ? 'bg-primary/10 text-primary font-semibold'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                      style={{ fontSize: 'var(--text-caption)' }}
                    >
                      {subsection.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-20 right-4 z-50 p-2 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform"
        aria-label={mobileOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 shrink-0">
        <div className="sticky top-4 p-4 bg-card border border-border rounded-[var(--radius-card)] shadow-[var(--elevation-sm)] max-h-[calc(100vh-2rem)] overflow-y-auto">
          <h3
            className="font-semibold mb-4 text-muted-foreground"
            style={{
              fontSize: 'var(--text-caption)',
              fontWeight: 'var(--font-weight-semibold)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            Nesta página
          </h3>
          {navContent}
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside className="absolute right-0 top-0 bottom-0 w-80 bg-card border-l border-border shadow-2xl overflow-y-auto">
            <div className="p-4">
              <h3
                className="font-semibold mb-4 text-muted-foreground"
                style={{
                  fontSize: 'var(--text-caption)',
                  fontWeight: 'var(--font-weight-semibold)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                Nesta página
              </h3>
              {navContent}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
