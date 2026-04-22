# Search and Navigation Enhancements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enhance universal search with relevance ranking, create reusable navigation components (SidebarNav, VideoCard, ContentSection), refactor OnboardingUX and GuiaWriting pages with scroll-spy navigation.

**Architecture:** Build three reusable components first, enhance search algorithm with scoring, then refactor both pages using new components with IntersectionObserver-based scroll-spy.

**Tech Stack:** React 18.3, TypeScript, React Router 7.13, Tailwind CSS 4.1, IntersectionObserver API, Lucide React icons

---

## File Structure Overview

**New files to create:**
- `src/app/components/ContentSection.tsx` - Section wrapper for scroll navigation
- `src/app/components/VideoCard.tsx` - Video thumbnail with play overlay
- `src/app/components/SidebarNav.tsx` - Fixed sidebar with scroll-spy

**Files to modify:**
- `src/app/components/Layout.tsx` - Enhanced search with relevance scoring (lines 154-174)
- `src/app/pages/OnboardingUX.tsx` - Complete refactor with new components
- `src/app/pages/GuiaWriting.tsx` - Complete refactor with new components

**Repository note:** This is not a git repository. All "Commit" steps should be skipped - proceed directly to next task.

---

### Task 1: Create ContentSection Component

**Files:**
- Create: `src/app/components/ContentSection.tsx`

- [ ] **Step 1: Create basic ContentSection component structure**

Create file `src/app/components/ContentSection.tsx`:

```typescript
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
```

- [ ] **Step 2: Verify component in browser**

Run: `npm run dev`
Expected: Server starts without errors
Browser: Navigate to http://localhost:5173 to ensure app loads

- [ ] **Step 3: Skip commit (not a git repository)**

Proceed to Task 2.

---

### Task 2: Create VideoCard Component

**Files:**
- Create: `src/app/components/VideoCard.tsx`

- [ ] **Step 1: Create VideoCard component with thumbnail and play overlay**

Create file `src/app/components/VideoCard.tsx`:

```typescript
import { Play } from 'lucide-react';

interface VideoCardProps {
  title: string;
  thumbnail: string;
  videoUrl: string;
  description?: string;
}

export function VideoCard({ title, thumbnail, videoUrl, description }: VideoCardProps) {
  const handleClick = () => {
    window.open(videoUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="relative cursor-pointer group overflow-hidden rounded-[var(--radius-card)] shadow-[var(--elevation-md)] transition-transform hover:scale-[1.02]"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`Assistir vídeo: ${title}`}
    >
      {/* 16:9 Aspect Ratio Container */}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <img
          src={thumbnail}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" />
          </div>
        </div>
      </div>
      
      {/* Title and Description */}
      <div className="p-4 bg-card">
        <h3 
          className="font-semibold mb-1"
          style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}
        >
          {title}
        </h3>
        {description && (
          <p 
            className="text-muted-foreground"
            style={{ fontSize: 'var(--text-label)' }}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify component in browser**

Run: `npm run dev` (if not already running)
Expected: No TypeScript or build errors in terminal

- [ ] **Step 3: Skip commit (not a git repository)**

Proceed to Task 3.

---

### Task 3: Create SidebarNav Component

**Files:**
- Create: `src/app/components/SidebarNav.tsx`

- [ ] **Step 1: Create SidebarNav component with mobile responsiveness**

Create file `src/app/components/SidebarNav.tsx`:

```typescript
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
        <div className="sticky top-4 p-4 bg-card border border-border rounded-[var(--radius-card)] shadow-[var(--elevation-sm)]">
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
```

- [ ] **Step 2: Verify component in browser**

Run: `npm run dev` (if not already running)
Expected: No TypeScript or build errors

- [ ] **Step 3: Skip commit (not a git repository)**

Proceed to Task 4.

---

### Task 4: Enhance Search Algorithm in Layout

**Files:**
- Modify: `src/app/components/Layout.tsx:154-174`

- [ ] **Step 1: Add relevance scoring function before searchResults**

In `src/app/components/Layout.tsx`, add this function after line 153 (after `const searchQuery_lower = searchQuery.toLowerCase();`):

```typescript
  // Relevance scoring function
  const calculateRelevance = (item: { name?: string; title?: string; role?: string; description?: string; tags?: string[] }, query: string): number => {
    const queryLower = query.toLowerCase();
    let score = 0;
    
    // Exact match in name/title: +100
    if (item.name?.toLowerCase() === queryLower) score += 100;
    if (item.title?.toLowerCase() === queryLower) score += 100;
    
    // Exact match in role/description: +50
    if (item.role?.toLowerCase() === queryLower) score += 50;
    if (item.description?.toLowerCase() === queryLower) score += 50;
    
    // Starts with query: +30
    if (item.name?.toLowerCase().startsWith(queryLower)) score += 30;
    if (item.title?.toLowerCase().startsWith(queryLower)) score += 30;
    
    // Partial match (includes): +10
    if (item.name?.toLowerCase().includes(queryLower)) score += 10;
    if (item.title?.toLowerCase().includes(queryLower)) score += 10;
    
    // Tag exact match: +40
    if (item.tags?.some(t => t.toLowerCase() === queryLower)) score += 40;
    
    // Tag partial match: +5
    if (item.tags?.some(t => t.toLowerCase().includes(queryLower))) score += 5;
    
    return score;
  };
```

- [ ] **Step 2: Replace searchResults logic with scored and sorted results**

Replace lines 156-174 (the `const searchResults = ...` block) with:

```typescript
  const searchResults = searchQuery.length >= 2
    ? [
        // Personas with scores
        ...allPersonas
          .map(p => ({ ...p, type: 'persona' as const, score: calculateRelevance(p, searchQuery_lower) }))
          .filter(p => p.score > 0),
        
        // Content with scores
        ...searchableContent
          .map(c => ({ ...c, score: calculateRelevance(c, searchQuery_lower) }))
          .filter(c => c.score > 0),
      ]
      .sort((a, b) => b.score - a.score) // Sort by score descending
    : [];
```

- [ ] **Step 3: Test search in browser**

Run: `npm run dev`
Browser: Navigate to http://localhost:5173
Action: Click search icon (magnifying glass in header)
Test cases:
1. Search "guia" → "Guia de UX Writing" should appear first
2. Search "personas" → exact matches first, then partial matches
3. Search "writing" → pages/content with "writing" in title ranked highest

Expected: Exact matches consistently appear before partial matches

- [ ] **Step 4: Skip commit (not a git repository)**

Proceed to Task 5.

---

### Task 5: Refactor OnboardingUX Page

**Files:**
- Modify: `src/app/pages/OnboardingUX.tsx` (complete refactor)

- [ ] **Step 1: Read current OnboardingUX file to understand structure**

Run: Read tool on `src/app/pages/OnboardingUX.tsx`
Note: This file has 840 lines with accordion structure and 5 sections including "Cultura IA First"

- [ ] **Step 2: Create new OnboardingUX with imports and data structure**

Replace entire contents of `src/app/pages/OnboardingUX.tsx` with:

```typescript
import { useEffect, useRef, useState } from 'react';
import { SidebarNav } from '../components/SidebarNav';
import { ContentSection } from '../components/ContentSection';
import { VideoCard } from '../components/VideoCard';

// Data structure for content
interface OnboardingSubsection {
  id: string;
  title: string;
  content: Array<{
    type: 'text' | 'list' | 'video' | 'link';
    data: any;
  }>;
}

interface OnboardingSection {
  id: string;
  title: string;
  subsections: OnboardingSubsection[];
}

// Content data - 4 sections (Cultura IA First removed)
// NOTE: Placeholder content - replace with actual .txt document content
const onboardingSections: OnboardingSection[] = [
  {
    id: 'bem-vindo',
    title: 'Bem-vindo ao time de UX',
    subsections: [
      {
        id: 'sobre-dominio',
        title: 'Sobre a Domínio Sistemas',
        content: [
          {
            type: 'text',
            data: 'A Domínio Sistemas é uma empresa brasileira líder no desenvolvimento de software de gestão empresarial e contábil.'
          },
          {
            type: 'text',
            data: 'Fundada em 1989, atendemos mais de 15.000 escritórios contábeis e empresas em todo o Brasil.'
          }
        ]
      },
      {
        id: 'missao-time-ux',
        title: 'Missão do time de UX',
        content: [
          {
            type: 'text',
            data: 'Nossa missão é transformar a experiência dos usuários através de design centrado no ser humano e inovação constante.'
          },
          {
            type: 'list',
            data: [
              'Pesquisar e entender as necessidades dos usuários',
              'Projetar interfaces intuitivas e acessíveis',
              'Validar soluções através de testes e iteração',
              'Colaborar com times de produto e desenvolvimento'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'nosso-processo',
    title: 'Nosso processo de design',
    subsections: [
      {
        id: 'discovery',
        title: 'Discovery',
        content: [
          {
            type: 'text',
            data: 'Fase de descoberta onde investigamos problemas, coletamos dados e entendemos contexto.'
          },
          {
            type: 'video',
            data: {
              title: 'Introdução ao processo de Discovery',
              thumbnail: '/images/onboarding/videos/video-01.jpg',
              videoUrl: 'https://www.youtube.com/watch?v=exemplo',
              description: 'Conheça as etapas do nosso processo de discovery'
            }
          }
        ]
      },
      {
        id: 'cocriacao',
        title: 'Cocriação',
        content: [
          {
            type: 'text',
            data: 'Trabalhamos colaborativamente com stakeholders para idealizar e prototipar soluções.'
          }
        ]
      },
      {
        id: 'delivery',
        title: 'Delivery',
        content: [
          {
            type: 'text',
            data: 'Entregamos especificações detalhadas e acompanhamos implementação com desenvolvedores.'
          }
        ]
      }
    ]
  },
  {
    id: 'ferramentas',
    title: 'Ferramentas e recursos',
    subsections: [
      {
        id: 'design-tools',
        title: 'Ferramentas de design',
        content: [
          {
            type: 'list',
            data: [
              'Figma para design de interfaces',
              'Miro para workshops colaborativos',
              'Notion para documentação',
              'GitHub para versionamento'
            ]
          },
          {
            type: 'link',
            data: {
              text: 'Acesse nossa biblioteca Figma',
              url: 'https://www.figma.com/exemplo'
            }
          }
        ]
      },
      {
        id: 'research-tools',
        title: 'Ferramentas de pesquisa',
        content: [
          {
            type: 'list',
            data: [
              'Maze para testes de usabilidade',
              'Hotjar para analytics comportamentais',
              'Google Forms para questionários'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'cultura',
    title: 'Cultura e valores',
    subsections: [
      {
        id: 'valores-ux',
        title: 'Valores do time',
        content: [
          {
            type: 'list',
            data: [
              'Empatia com usuários e colegas',
              'Colaboração multidisciplinar',
              'Iteração e aprendizado contínuo',
              'Transparência e comunicação clara'
            ]
          }
        ]
      },
      {
        id: 'recursos-desenvolvimento',
        title: 'Recursos para desenvolvimento',
        content: [
          {
            type: 'text',
            data: 'Incentivamos o desenvolvimento profissional através de cursos, eventos e mentorias.'
          },
          {
            type: 'link',
            data: {
              text: 'Ver calendário de eventos UX',
              url: 'https://exemplo.com/eventos'
            }
          }
        ]
      }
    ]
  }
];

export function OnboardingUX() {
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Setup IntersectionObserver for scroll-spy
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    const sectionElements = document.querySelectorAll('section[id]');
    sectionElements.forEach(el => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Prepare sections for SidebarNav
  const navSections = onboardingSections.map(section => ({
    id: section.id,
    title: section.title,
    subsections: section.subsections.map(sub => ({
      id: sub.id,
      title: sub.title
    }))
  }));

  // Render content based on type
  const renderContent = (item: { type: string; data: any }, index: number) => {
    switch (item.type) {
      case 'text':
        return (
          <p key={index} style={{ fontSize: 'var(--text-base)' }}>
            {item.data}
          </p>
        );
      
      case 'list':
        return (
          <ul key={index} className="list-disc list-inside space-y-2">
            {item.data.map((li: string, i: number) => (
              <li key={i} style={{ fontSize: 'var(--text-base)' }}>
                {li}
              </li>
            ))}
          </ul>
        );
      
      case 'video':
        return <VideoCard key={index} {...item.data} />;
      
      case 'link':
        return (
          <a
            key={index}
            href={item.data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline inline-flex items-center gap-1"
            style={{ fontSize: 'var(--text-base)' }}
          >
            {item.data.text}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex gap-8 p-6 max-w-7xl mx-auto">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <header className="mb-8">
          <h1 
            className="text-4xl font-bold mb-2"
            style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-bold)' }}
          >
            Comece aqui
          </h1>
          <p 
            className="text-muted-foreground"
            style={{ fontSize: 'var(--text-base)' }}
          >
            Bem-vindo ao time de UX da Domínio Sistemas
          </p>
        </header>

        {onboardingSections.map(section => (
          <ContentSection key={section.id} id={section.id} title={section.title}>
            {section.subsections.map(subsection => (
              <div key={subsection.id} id={subsection.id} className="mb-8 scroll-mt-24">
                <h3 
                  className="text-xl font-semibold mb-3"
                  style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)' }}
                >
                  {subsection.title}
                </h3>
                <div className="space-y-4">
                  {subsection.content.map((item, idx) => renderContent(item, idx))}
                </div>
              </div>
            ))}
          </ContentSection>
        ))}
      </div>

      {/* Sidebar Navigation */}
      <SidebarNav sections={navSections} activeId={activeId} />
    </div>
  );
}
```

- [ ] **Step 3: Test OnboardingUX in browser**

Run: `npm run dev`
Browser: Navigate to http://localhost:5173/onboarding
Test cases:
1. Page loads without errors
2. Sidebar navigation appears on desktop (hidden on mobile with toggle button)
3. Clicking sidebar item scrolls to section smoothly
4. Scrolling page updates sidebar highlight automatically
5. VideoCard displays with play icon overlay
6. External links open in new tab
7. Mobile: Toggle button appears, sidebar slides in/out

Expected: All navigation and scroll-spy working, no "Cultura IA First" section present

- [ ] **Step 4: Replace placeholder content with actual .txt document data**

Note: The implementer must replace the `onboardingSections` array content with actual text from the provided .txt document. The structure is ready - only content needs updating.

- [ ] **Step 5: Skip commit (not a git repository)**

Proceed to Task 6.

---

### Task 6: Refactor GuiaWriting Page

**Files:**
- Modify: `src/app/pages/GuiaWriting.tsx` (complete refactor)

- [ ] **Step 1: Read current GuiaWriting file to understand structure**

Run: Read tool on `src/app/pages/GuiaWriting.tsx`
Note: Current file has 4 sections with accordion structure

- [ ] **Step 2: Create new GuiaWriting with 13 sections from PDF**

Replace entire contents of `src/app/pages/GuiaWriting.tsx` with:

```typescript
import { useEffect, useRef, useState } from 'react';
import { SidebarNav } from '../components/SidebarNav';
import { ContentSection } from '../components/ContentSection';
import { VideoCard } from '../components/VideoCard';

// Data structure for content
interface WritingContent {
  type: 'paragraph' | 'example' | 'tip' | 'video';
  text?: string;
  label?: string;
  videoData?: {
    title: string;
    thumbnail: string;
    videoUrl: string;
    description?: string;
  };
}

interface WritingSection {
  id: string;
  title: string;
  content: WritingContent[];
  subsections?: WritingSection[];
}

// Content data - 13 sections from PDF
// NOTE: Placeholder content - replace with actual PDF content
const writingSections: WritingSection[] = [
  {
    id: 'introducao',
    title: '1. Introdução',
    content: [
      {
        type: 'paragraph',
        text: 'Este guia estabelece os padrões de UX Writing para produtos Domínio.'
      },
      {
        type: 'paragraph',
        text: 'Nosso objetivo é criar interfaces claras, consistentes e acessíveis.'
      }
    ]
  },
  {
    id: 'tom-voz',
    title: '2. Tom de voz',
    content: [
      {
        type: 'paragraph',
        text: 'O tom de voz Thomson Reuters é profissional, acessível, conciso e direto.'
      },
      {
        type: 'tip',
        label: 'Dica',
        text: 'Use linguagem natural e evite jargões desnecessários.'
      },
      {
        type: 'example',
        label: 'Exemplo correto',
        text: 'Não foi possível salvar as alterações. Verifique sua conexão e tente novamente.'
      },
      {
        type: 'example',
        label: 'Exemplo incorreto',
        text: 'Erro 500: Internal Server Error. Stack trace: ...'
      }
    ]
  },
  {
    id: 'voz-ativa',
    title: '3. Voz ativa',
    content: [
      {
        type: 'paragraph',
        text: 'Sempre use voz ativa para tornar a comunicação mais clara e direta.'
      },
      {
        type: 'example',
        label: 'Exemplo correto',
        text: 'O sistema salvou suas alterações.'
      },
      {
        type: 'example',
        label: 'Exemplo incorreto',
        text: 'Suas alterações foram salvas pelo sistema.'
      }
    ]
  },
  {
    id: 'clareza-objetividade',
    title: '4. Clareza e objetividade',
    content: [
      {
        type: 'paragraph',
        text: 'Seja direto. Evite rodeios e redundâncias.'
      },
      {
        type: 'example',
        label: 'Exemplo correto',
        text: 'Excluir nota fiscal'
      },
      {
        type: 'example',
        label: 'Exemplo incorreto',
        text: 'Clique aqui para excluir a nota fiscal selecionada'
      }
    ]
  },
  {
    id: 'botoes',
    title: '5. Botões',
    content: [
      {
        type: 'paragraph',
        text: 'Use verbos no infinitivo. Seja específico sobre a ação.'
      },
      {
        type: 'example',
        label: 'Exemplo correto',
        text: 'Salvar nota fiscal'
      },
      {
        type: 'example',
        label: 'Exemplo incorreto',
        text: 'OK'
      },
      {
        type: 'tip',
        label: 'Dica para ações destrutivas',
        text: 'Use cores de alerta e seja explícito: "Excluir permanentemente"'
      }
    ]
  },
  {
    id: 'mensagens-erro',
    title: '6. Mensagens de erro',
    content: [
      {
        type: 'paragraph',
        text: 'Explique o problema e como resolver. Não culpe o usuário.'
      },
      {
        type: 'example',
        label: 'Exemplo correto',
        text: 'Este campo é obrigatório. Preencha com o CNPJ da empresa.'
      },
      {
        type: 'example',
        label: 'Exemplo incorreto',
        text: 'Erro: campo vazio'
      }
    ]
  },
  {
    id: 'empty-states',
    title: '7. Empty states',
    content: [
      {
        type: 'paragraph',
        text: 'Estados vazios devem explicar por que estão vazios e sugerir ação.'
      },
      {
        type: 'example',
        label: 'Exemplo correto',
        text: 'Nenhuma nota fiscal cadastrada ainda. Clique em "Nova nota" para começar.'
      },
      {
        type: 'example',
        label: 'Exemplo incorreto',
        text: 'Sem resultados.'
      }
    ]
  },
  {
    id: 'datas-valores',
    title: '8. Datas e valores',
    content: [
      {
        type: 'paragraph',
        text: 'Use formato brasileiro: DD/MM/AAAA, horário 24h, moeda R$.'
      },
      {
        type: 'example',
        label: 'Exemplos',
        text: '15/03/2024 às 14:30 | R$ 1.234,56'
      }
    ]
  },
  {
    id: 'linguagem-inclusiva',
    title: '9. Linguagem inclusiva',
    content: [
      {
        type: 'paragraph',
        text: 'Evite linguagem que exclua grupos sociais. Use termos neutros quando possível.'
      },
      {
        type: 'example',
        label: 'Exemplo correto',
        text: 'Responsável pela empresa'
      },
      {
        type: 'example',
        label: 'Exemplo incorreto',
        text: 'Dono da empresa'
      }
    ]
  },
  {
    id: 'capitalizacao',
    title: '10. Capitalização',
    content: [
      {
        type: 'paragraph',
        text: 'Títulos: Capitalize apenas primeira palavra. Botões: Capitalize primeira letra.'
      },
      {
        type: 'example',
        label: 'Títulos',
        text: 'Configurações de usuário'
      },
      {
        type: 'example',
        label: 'Botões',
        text: 'Salvar alterações'
      }
    ]
  },
  {
    id: 'pontuacao',
    title: '11. Pontuação',
    content: [
      {
        type: 'paragraph',
        text: 'Não use ponto final em labels, títulos ou botões. Use em parágrafos.'
      },
      {
        type: 'example',
        label: 'Label',
        text: 'Nome completo'
      },
      {
        type: 'example',
        label: 'Mensagem',
        text: 'Suas alterações foram salvas com sucesso.'
      }
    ]
  },
  {
    id: 'abreviacoes',
    title: '12. Abreviações e siglas',
    content: [
      {
        type: 'paragraph',
        text: 'Na primeira ocorrência, escreva por extenso seguido da sigla entre parênteses.'
      },
      {
        type: 'example',
        label: 'Exemplo',
        text: 'Sistema Público de Escrituração Digital (SPED)'
      }
    ]
  },
  {
    id: 'confirmacoes',
    title: '13. Confirmações e cancelamentos',
    content: [
      {
        type: 'paragraph',
        text: 'Seja claro sobre consequências. Use "Cancelar" para reverter, não para fechar.'
      },
      {
        type: 'example',
        label: 'Dialog de confirmação',
        text: 'Tem certeza que deseja excluir esta nota fiscal? Esta ação não pode ser desfeita.'
      },
      {
        type: 'tip',
        label: 'Botões de confirmação',
        text: 'Primário: ação principal (ex: "Excluir"). Secundário: "Cancelar" ou "Voltar".'
      },
      {
        type: 'video',
        videoData: {
          title: 'Boas práticas em dialogs de confirmação',
          thumbnail: '/images/writing/video-01.jpg',
          videoUrl: 'https://www.youtube.com/watch?v=exemplo',
          description: 'Como criar mensagens claras em ações destrutivas'
        }
      }
    ]
  }
];

export function GuiaWriting() {
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Setup IntersectionObserver for scroll-spy
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    const sectionElements = document.querySelectorAll('section[id]');
    sectionElements.forEach(el => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Prepare sections for SidebarNav (flat structure, no nested subsections for now)
  const navSections = writingSections.map(section => ({
    id: section.id,
    title: section.title
  }));

  // Render content based on type
  const renderContent = (item: WritingContent, index: number) => {
    switch (item.type) {
      case 'paragraph':
        return (
          <p key={index} style={{ fontSize: 'var(--text-base)' }} className="leading-relaxed">
            {item.text}
          </p>
        );
      
      case 'example':
        return (
          <div key={index} className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50/50">
            <p className="text-sm font-semibold text-blue-700 mb-1">{item.label}</p>
            <p style={{ fontSize: 'var(--text-base)' }} className="text-foreground">{item.text}</p>
          </div>
        );
      
      case 'tip':
        return (
          <div key={index} className="border-l-4 border-amber-500 pl-4 py-2 bg-amber-50/50">
            <p className="text-sm font-semibold text-amber-700 mb-1">{item.label}</p>
            <p style={{ fontSize: 'var(--text-base)' }} className="text-foreground">{item.text}</p>
          </div>
        );
      
      case 'video':
        return item.videoData ? <VideoCard key={index} {...item.videoData} /> : null;
      
      default:
        return null;
    }
  };

  return (
    <div className="flex gap-8 p-6 max-w-7xl mx-auto">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <header className="mb-8">
          <h1 
            className="text-4xl font-bold mb-2"
            style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-bold)' }}
          >
            Guia de UX Writing
          </h1>
          <p 
            className="text-muted-foreground"
            style={{ fontSize: 'var(--text-base)' }}
          >
            Padrões de linguagem para produtos Domínio
          </p>
        </header>

        {writingSections.map(section => (
          <ContentSection key={section.id} id={section.id} title={section.title}>
            <div className="space-y-4">
              {section.content.map((item, idx) => renderContent(item, idx))}
            </div>
          </ContentSection>
        ))}
      </div>

      {/* Sidebar Navigation */}
      <SidebarNav sections={navSections} activeId={activeId} />
    </div>
  );
}
```

- [ ] **Step 3: Test GuiaWriting in browser**

Run: `npm run dev`
Browser: Navigate to http://localhost:5173/guia-writing
Test cases:
1. Page loads without errors
2. All 13 sections visible in single scrollable page (no accordion)
3. Sidebar navigation shows all section titles
4. Clicking sidebar scrolls to section smoothly
5. Scrolling updates sidebar highlight automatically
6. Examples display with colored border (blue for examples, amber for tips)
7. Video card displays correctly
8. Mobile: Sidebar toggle works

Expected: All 13 sections visible, scroll-spy working, no accordion structure

- [ ] **Step 4: Replace placeholder content with actual PDF data**

Note: The implementer must replace the `writingSections` array content with actual text from the provided PDF (13 sections). The structure is ready - only content needs updating.

- [ ] **Step 5: Skip commit (not a git repository)**

Proceed to Task 7.

---

### Task 7: Create Image Asset Folders and Documentation

**Files:**
- Create: `public/images/onboarding/videos/` (directory)
- Create: `public/images/onboarding/diagrams/` (directory)
- Create: `public/images/writing/` (directory)
- Create: `IMAGE_ASSETS.md` (documentation)

- [ ] **Step 1: Create image folder structure**

Run:
```bash
mkdir -p public/images/onboarding/videos
mkdir -p public/images/onboarding/diagrams
mkdir -p public/images/writing
```

Expected: Folders created successfully

- [ ] **Step 2: Create image asset documentation**

Create file `IMAGE_ASSETS.md` at project root:

```markdown
# Image Assets Required

This document lists all image assets needed for the OnboardingUX and GuiaWriting pages.

## OnboardingUX Page

### Videos
| Filename | Location | Description | Dimensions | Status |
|----------|----------|-------------|------------|--------|
| video-01.jpg | /public/images/onboarding/videos/ | Introdução ao processo de Discovery | 1280x720 | ⏳ Pending |
| video-02.jpg | /public/images/onboarding/videos/ | (Additional videos as needed) | 1280x720 | ⏳ Pending |

### Diagrams
| Filename | Location | Description | Dimensions | Status |
|----------|----------|-------------|------------|--------|
| diagram-01.png | /public/images/onboarding/diagrams/ | (Diagrams as needed) | Variable | ⏳ Pending |

## GuiaWriting Page

### Videos
| Filename | Location | Description | Dimensions | Status |
|----------|----------|-------------|------------|--------|
| video-01.jpg | /public/images/writing/ | Boas práticas em dialogs de confirmação | 1280x720 | ⏳ Pending |

## Image Requirements

**Video Thumbnails:**
- Aspect ratio: 16:9 (1280x720px or 1920x1080px)
- Format: JPG
- Quality: 80-85% compression

**Diagrams/Illustrations:**
- Format: PNG (supports transparency)
- Quality: Lossless compression
- Dimensions: Variable (maintain readable resolution)

## Placeholder Images

For development, use placeholder services:
- `https://via.placeholder.com/1280x720/4A90E2/FFFFFF?text=Video+Thumbnail`
- `https://via.placeholder.com/1920x1080/4A90E2/FFFFFF?text=Diagram`

Update image paths in code once actual assets are available.
```

- [ ] **Step 3: Update component imports with placeholder images (temporary)**

In `src/app/pages/OnboardingUX.tsx`, update video thumbnail paths to use placeholders:

```typescript
// In videoData objects, change:
thumbnail: '/images/onboarding/videos/video-01.jpg',
// To:
thumbnail: 'https://via.placeholder.com/1280x720/4A90E2/FFFFFF?text=Video+01',
```

Do the same for `src/app/pages/GuiaWriting.tsx`.

- [ ] **Step 4: Test with placeholder images**

Browser: Refresh OnboardingUX and GuiaWriting pages
Expected: Placeholder images load correctly, video cards clickable

- [ ] **Step 5: Skip commit (not a git repository)**

Implementation complete.

---

## Manual Testing Checklist

After completing all tasks, perform comprehensive testing:

### Search Enhancement
- [ ] Search "guia" → "Guia de UX Writing" appears first (exact match)
- [ ] Search "personas" → exact title matches ranked before partials
- [ ] Search "writing" → high-scoring results first
- [ ] Search with 2+ characters triggers results
- [ ] Search with 1 character shows no results
- [ ] Empty search shows no results

### OnboardingUX Page
- [ ] Page loads without console errors
- [ ] Desktop: Sidebar visible on right side, fixed position
- [ ] Desktop: Sidebar highlights current section while scrolling
- [ ] Desktop: Clicking sidebar item scrolls smoothly to section
- [ ] Mobile: Toggle button appears (top-right)
- [ ] Mobile: Sidebar slides in from right when toggle clicked
- [ ] Mobile: Sidebar closes after clicking menu item
- [ ] "Cultura IA First" section not present (removed)
- [ ] 4 main sections visible
- [ ] Video cards display with play icon overlay
- [ ] Clicking video card opens link in new tab
- [ ] External text links open in new tab
- [ ] All content from .txt document rendered correctly

### GuiaWriting Page
- [ ] Page loads without console errors
- [ ] All 13 sections visible in single scrollable page
- [ ] No accordion structure (all content expanded)
- [ ] Desktop: Sidebar navigation visible and functional
- [ ] Mobile: Toggle button and slide-in sidebar work
- [ ] Scroll-spy highlights active section
- [ ] Examples display with blue border
- [ ] Tips display with amber border
- [ ] Video card functional
- [ ] All content from PDF rendered correctly

### Component Reusability
- [ ] ContentSection used in both pages
- [ ] VideoCard used in both pages
- [ ] SidebarNav used in both pages
- [ ] Components visually consistent across pages

### Accessibility
- [ ] Keyboard navigation works (Tab through sidebar items)
- [ ] Enter/Space activates sidebar links
- [ ] ARIA labels present on navigation
- [ ] Semantic HTML structure (nav, section, h2, h3)
- [ ] Skip links functional
- [ ] Focus visible on interactive elements

### Responsive Design
- [ ] Desktop (≥1024px): Sidebar always visible
- [ ] Tablet (768-1023px): Sidebar toggles
- [ ] Mobile (<768px): Toggle button, slide-in sidebar
- [ ] Content readable at all breakpoints
- [ ] No horizontal scrolling

---

## Success Criteria

✅ **Search Enhancement**
- Exact match terms appear first in results
- Partial matches ranked lower than exact matches
- Score-based sorting working correctly

✅ **OnboardingUX Refactor**
- "Cultura IA First" section removed completely
- Sidebar navigation with all section/subsection titles
- Scroll-spy highlights current section automatically
- Content from .txt document rendered exactly (after replacement)
- All links open in new tabs
- Video thumbnails with play overlay functional

✅ **GuiaWriting Refactor**
- All 13 sections from PDF rendered (after content replacement)
- No accordion structure (single scrollable page)
- Sidebar navigation with scroll-spy
- Video areas functional with thumbnails

✅ **Code Quality**
- Reusable components (DRY principle)
- Type-safe content structures (TypeScript interfaces)
- Accessible markup and interactions
- Responsive design (mobile + desktop)
- No unnecessary complexity (YAGNI)

---

## Content Replacement Notes

**IMPORTANT:** Two tasks require content replacement with actual documents:

1. **OnboardingUX (Task 5, Step 4):**
   - Replace `onboardingSections` array with content from provided .txt document
   - Maintain data structure: sections → subsections → content items
   - Map content types correctly (text, list, video, link)

2. **GuiaWriting (Task 6, Step 4):**
   - Replace `writingSections` array with content from provided PDF (13 sections)
   - Maintain data structure: sections → content items
   - Use correct content types (paragraph, example, tip, video)
   - Ensure all 13 sections included with complete content

The current placeholder content demonstrates the structure. Implementers should follow the same pattern when inserting actual content.

---

## Image Asset Handoff

After implementation, provide the following to content team:

1. **IMAGE_ASSETS.md** with complete table of required images
2. **Placeholder image locations** in code (marked with comments)
3. **Instructions** for replacing placeholders with actual assets

Content team workflow:
1. Create images per specifications
2. Save to folders: `/public/images/onboarding/` and `/public/images/writing/`
3. Update image paths in code (search for placeholder URLs)
4. Test in browser to verify images load correctly
