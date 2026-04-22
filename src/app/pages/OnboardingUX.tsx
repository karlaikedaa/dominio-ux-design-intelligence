import { useEffect, useRef, useState } from 'react';
import { SidebarNav } from '../components/SidebarNav';
import { OnboardingContent } from '../components/onboarding/OnboardingContent';

interface NavigationItem {
  id: string;
  title: string;
  subsections?: Array<{ id: string; title: string }>;
}

export function OnboardingUX() {
  const [activeId, setActiveId] = useState<string>('');
  const [navSections, setNavSections] = useState<NavigationItem[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Setup IntersectionObserver for scroll-spy
  useEffect(() => {
    const setupObserver = () => {
      const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -35% 0px',
        threshold: 0
      };

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      }, observerOptions);

      // Observe all headings with IDs
      const headingElements = document.querySelectorAll('h2[id], h3[id], h4[id]');
      headingElements.forEach(el => observerRef.current?.observe(el));
    };

    // Setup observer after a short delay to ensure content is rendered
    const timer = setTimeout(setupObserver, 500);

    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [navSections]);

  // Definição manual dos headings do OnboardingContent
  useEffect(() => {
    const sections: NavigationItem[] = [
      {
        id: '1-boas-vindas',
        title: '1. Boas vindas',
        subsections: [
          { id: '11-que-bom-ter-você-com-a-gente', title: '1.1 Que bom ter você com a gente!' },
          { id: '12-sobre-esse-material', title: '1.2 Sobre esse material' },
          { id: '13-conheca-mais-nossos-produtos', title: '1.3 Conheça mais nossos produtos' },
        ]
      },
      {
        id: '2-dados-da-empresa',
        title: '2. Dados da empresa',
        subsections: [
          { id: '21-manual-marca-tr', title: '2.1 Manual de marca TR' },
          { id: '22-atrium', title: '2.2 Atrium' },
          { id: '23-sgd', title: '2.3 SGD' },
          { id: '24-azure', title: '2.4 Azure' },
          { id: '25-pendo', title: '2.5 Pendo' },
          { id: '26-datadog', title: '2.6 Datadog' },
          { id: '27-acessos', title: '2.7 Acessos' },
        ]
      },
      {
        id: '3-dia-a-dia',
        title: '3. Dia a dia',
        subsections: [
          { id: '31-folha-flash', title: '3.1 Folha Flash' },
          { id: '32-mytime', title: '3.2 MyTime' },
          { id: '33-workday', title: '3.3 Workday' },
          { id: '34-ferias-feriados', title: '3.4 Férias e feriados' },
          { id: '35-nossos-escritorios', title: '3.5 Nossos escritórios' },
        ]
      },
      {
        id: '4-time-de-ux',
        title: '4. Time de UX',
        subsections: [
          { id: '41-quem-somos', title: '4.1 Quem somos' },
          { id: '42-design-systems', title: '4.2 Design Systems' },
          { id: '43-dom-design-system', title: '4.3 DOM Design System' },
          { id: '44-agendas-ux', title: '4.4 Agendas UX' },
          { id: '45-design-talks', title: '4.5 Design Talks' },
          { id: '46-triple-diamond', title: '4.6 Triple Diamond' },
          { id: '47-processos-design', title: '4.7 Processos de design' },
        ]
      },
    ];

    setNavSections(sections);
  }, []);

  return (
    <div className="flex gap-8 p-6 max-w-7xl mx-auto">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <header className="mb-12 pb-6 border-b border-border">
          <h1
            className="text-foreground mb-3"
            style={{
              fontSize: 'var(--text-h1)',
              fontWeight: 'var(--font-weight-semibold)',
              lineHeight: '1.2'
            }}
          >
            Comece aqui
          </h1>
          <p
            className="text-muted-foreground"
            style={{
              fontSize: 'var(--text-lg)',
              lineHeight: '1.6'
            }}
          >
            Bem-vindo ao time de UX da Domínio Sistemas
          </p>
        </header>

        <OnboardingContent />
      </div>

      {/* Sidebar Navigation */}
      {navSections.length > 0 && (
        <SidebarNav sections={navSections} activeId={activeId} />
      )}
    </div>
  );
}
