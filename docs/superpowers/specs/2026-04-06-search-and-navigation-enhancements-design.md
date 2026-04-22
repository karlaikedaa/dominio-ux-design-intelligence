# Search and Navigation Enhancements Implementation Design

**Goal:** Enhance universal search with relevance ranking, refactor OnboardingUX and GuiaWriting pages with scroll-spy navigation and updated content.

**Architecture:** Create reusable navigation components (SidebarNav, VideoCard, ContentSection), implement IntersectionObserver-based scroll-spy, upgrade search algorithm with scoring system, restructure content as typed data arrays.

**Tech Stack:** React 18.3, TypeScript, React Router 7.13, Tailwind CSS 4.1, IntersectionObserver API

---

## 1. Architecture Overview

### Component Hierarchy

```
Layout (existing)
├── Universal Search (enhanced with relevance scoring)
│
OnboardingUX (refactored)
├── SidebarNav (new, reusable)
│   └── ScrollSpy navigation with section links
├── ContentSection[] (new, reusable wrapper)
    └── Content from .txt document
    └── VideoCard components (new, reusable)
    └── External links (open in new tab)

GuiaWriting (refactored)
├── SidebarNav (new, reusable)
│   └── ScrollSpy navigation with 13 section links
├── ContentSection[] (new, reusable wrapper)
    └── Content from PDF (13 sections)
    └── VideoCard components (new, reusable)
```

### Navigation Flow

- **Menu click**: Smooth scroll to section via `scrollIntoView()`
- **Page scroll**: IntersectionObserver detects visible section, updates sidebar highlight
- **Video click**: Opens external link in new tab
- **Text links**: Open in new tab with proper security attributes

### Key Architectural Decisions

1. **Reusable components**: SidebarNav, VideoCard, ContentSection shared between pages (DRY principle)
2. **Layout unchanged**: Only search logic enhanced, no structural modifications
3. **No state management library**: React useState + IntersectionObserver sufficient
4. **Content as data**: Structured as typed arrays, not hardcoded JSX

---

## 2. Component Design

### SidebarNav Component

**Purpose:** Fixed sidebar navigation with scroll-spy highlighting

**Interface:**
```typescript
interface SidebarNavProps {
  sections: Array<{
    id: string;
    title: string;
    subsections?: Array<{ id: string; title: string }>;
  }>;
  activeId: string; // Current visible section ID
}
```

**Behavior:**
- Fixed position on desktop (sticky), collapsible on mobile
- Highlights active section based on `activeId` prop
- Smooth scroll to section on menu item click
- Nested list for subsections (indented with Tailwind)

**Styling:**
- Tailwind CSS for consistency with existing design system
- Active state: `bg-[var(--color-accent)]` and `font-semibold`
- Hover state: `hover:bg-[var(--color-hover)]`

### VideoCard Component

**Purpose:** Video thumbnail with play overlay that opens external link

**Interface:**
```typescript
interface VideoCardProps {
  title: string;
  thumbnail: string; // Path to image in /public/images/
  videoUrl: string; // External video link
  description?: string;
}
```

**Behavior:**
- Displays thumbnail image with centered play icon overlay
- Hover effect: scale(1.05) + opacity change
- Click opens `videoUrl` in new tab with `window.open(url, '_blank')`
- Accessible: proper alt text, keyboard navigable

**Layout:**
- 16:9 aspect ratio container (padding-bottom: 56.25%)
- Responsive: full width on mobile, max-width on desktop
- Play icon: absolute centered, semi-transparent background

### ContentSection Component

**Purpose:** Wrapper for sections to enable scroll-spy and consistent spacing

**Interface:**
```typescript
interface ContentSectionProps {
  id: string; // For IntersectionObserver targeting
  title: string;
  children: React.ReactNode; // Flexible content
}
```

**Behavior:**
- Renders `<section id={id}>` for scroll navigation
- Title with consistent typography: `text-2xl font-semibold mb-4`
- Bottom margin for section spacing: `mb-12`
- Scroll margin top: `scroll-mt-24` (accounts for fixed header if present)

### Scroll-spy Implementation

**Technical approach:**
- IntersectionObserver with `threshold: 0.5` (section active when 50%+ visible)
- Observer attached to all ContentSection elements on mount
- State: `const [activeId, setActiveId] = useState<string>('')`
- Callback updates `activeId` when intersection changes
- SidebarNav receives `activeId` prop and applies highlight

**Edge case handling:**
- Multiple sections visible → prioritize topmost
- Top/bottom of page → highlight first/last section
- Fast scrolling → debounce callback (50ms) to prevent flicker

---

## 3. Search Algorithm Enhancement

### Current Implementation

**Problem:**
- Uses `.includes()` for all matches (partial matching)
- No ranking: results appear in array order (personas first, then content)
- "guia" matches "Seguir o guia" equally to "Guia Writing"

### New Relevance Scoring Algorithm

**Scoring logic:**
```typescript
function calculateRelevance(item: SearchableItem, query: string): number {
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
}
```

**Implementation:**
1. Calculate score for each item in search pool (personas + searchable content)
2. Filter items with score > 0
3. Sort by score descending (highest first)
4. Return sorted results

**Example results:**
- Query: "guia"
  - "Guia Writing" (exact title) → 100 → rank 1
  - "Guia de Acessibilidade" (starts with) → 30 → rank 2  
  - "Seguir o guia de estilo" (partial in description) → 10 → rank 3

---

## 4. Data Structure

### OnboardingUX Content Structure

**Content removal:**
- Remove "Cultura IA First" section entirely (was section 5 in original)
- Retain 4 sections with content from provided .txt document

**TypeScript interfaces:**
```typescript
interface OnboardingSection {
  id: string; // For scroll navigation
  title: string;
  subsections: Array<{
    id: string;
    title: string;
    content: Array<{
      type: 'text' | 'list' | 'video' | 'link';
      data: string | string[] | VideoData | LinkData;
    }>;
  }>;
}

interface VideoData {
  title: string;
  thumbnail: string; // Path: /images/onboarding/videos/video-XX.jpg
  url: string; // External video link
  description?: string;
}

interface LinkData {
  text: string;
  url: string;
}

const onboardingSections: OnboardingSection[] = [
  // 4 sections populated from .txt document
  // Exact text from document, no alterations
];
```

### GuiaWriting Content Structure

**Content replacement:**
- Remove all existing content (4 sections with accordion)
- Replace with 13 sections from provided PDF
- No accordion structure (single scrollable page)

**TypeScript interfaces:**
```typescript
interface WritingSection {
  id: string; // For scroll navigation
  title: string;
  content: Array<{
    type: 'paragraph' | 'example' | 'tip' | 'video';
    text?: string;
    label?: string; // "Exemplo correto", "Dica", etc.
    videoData?: VideoData;
  }>;
  subsections?: WritingSection[]; // Nested structure for subtitles
}

const writingSections: WritingSection[] = [
  // 13 sections from PDF
  // Preserves exact text and structure from PDF
];
```

**Benefits:**
- Type-safe content (compile-time validation)
- Content updates independent of component logic
- Flexible rendering via `type` field switch
- Natural support for nested subsections
- Clear separation of data and presentation

### Rendering Logic

**Pattern:**
```typescript
{sections.map(section => (
  <ContentSection key={section.id} id={section.id} title={section.title}>
    {section.content.map((item, idx) => {
      switch (item.type) {
        case 'text': return <p key={idx}>{item.data}</p>;
        case 'list': return <ul key={idx}>{item.data.map(li => <li>{li}</li>)}</ul>;
        case 'video': return <VideoCard key={idx} {...item.data} />;
        case 'link': return <a key={idx} href={item.data.url} target="_blank" rel="noopener noreferrer">{item.data.text}</a>;
      }
    })}
  </ContentSection>
))}
```

---

## 5. Image Asset Management

### Folder Structure

```
/public/images/
├── onboarding/
│   ├── videos/           # Video thumbnails for OnboardingUX
│   │   ├── video-01.jpg
│   │   ├── video-02.jpg
│   │   └── ...
│   └── diagrams/         # Diagrams/illustrations for OnboardingUX
│       ├── diagram-01.png
│       └── ...
└── writing/              # All assets for GuiaWriting
    ├── video-01.jpg
    ├── video-02.jpg
    └── ...
```

### Naming Conventions

**Sequential numbering:**
- `video-XX.jpg` for video thumbnails (01, 02, 03, ...)
- `diagram-XX.png` for diagrams/illustrations

**Descriptive names (alternative):**
- `video-cultura-ux.jpg`, `diagram-fluxo-trabalho.png`
- Use kebab-case for multi-word names

### Image Requirements

**Video thumbnails:**
- Aspect ratio: 16:9 (1280x720px or 1920x1080px recommended)
- Format: JPG (smaller file size for photos)
- Quality: 80-85% compression

**Diagrams/illustrations:**
- Variable dimensions (maintain readable resolution)
- Format: PNG (supports transparency, better for graphics)
- Quality: Lossless compression

### Asset Table Deliverable

At end of implementation, provide markdown table:

| Filename | Location | Description | Dimensions |
|----------|----------|-------------|------------|
| video-01.jpg | /public/images/onboarding/videos/ | Intro to UX process | 1280x720 |
| diagram-01.png | /public/images/onboarding/diagrams/ | Workflow diagram | 1920x1080 |
| ... | ... | ... | ... |

### Component Usage

```typescript
<VideoCard 
  title="Introdução ao processo UX"
  thumbnail="/images/onboarding/videos/video-01.jpg"
  videoUrl="https://youtube.com/watch?v=..."
  description="Overview do nosso workflow de design"
/>
```

---

## 6. Navigation Flow and Interactions

### Scroll-spy Behavior

**Implementation flow:**
1. User scrolls page → IntersectionObserver callback fires
2. Observer calculates which ContentSection is most visible (>50% in viewport)
3. Active section ID updates via `setActiveId(sectionId)`
4. SidebarNav re-renders with new `activeId` prop
5. Corresponding menu item receives highlight class
6. Highlight persists until user scrolls to different section

**IntersectionObserver configuration:**
```typescript
const observerOptions = {
  root: null, // viewport
  rootMargin: '0px',
  threshold: 0.5 // 50% visibility
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setActiveId(entry.target.id);
    }
  });
}, observerOptions);
```

### Menu Click Behavior

**Implementation:**
```typescript
const handleMenuClick = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }
};
```

**Flow:**
1. User clicks sidebar menu item
2. `handleMenuClick` finds target ContentSection by ID
3. `scrollIntoView()` smoothly scrolls to section
4. Scroll completes → IntersectionObserver naturally updates highlight
5. No manual state updates needed (scroll-spy handles it)

### Link Handling

**External links:**
```typescript
<a 
  href={url} 
  target="_blank" 
  rel="noopener noreferrer"
  className="text-blue-600 hover:underline"
>
  {linkText}
</a>
```

**Video links (via VideoCard):**
```typescript
const handleVideoClick = () => {
  window.open(videoUrl, '_blank', 'noopener,noreferrer');
};
```

**Internal navigation:**
- Uses existing React Router setup
- No changes needed to routes.tsx

### Mobile Responsiveness

**Sidebar behavior:**
- Desktop (≥768px): Fixed sidebar visible
- Mobile (<768px): Hamburger menu, sidebar slides in/out

**Mobile menu flow:**
1. User taps hamburger icon → sidebar slides in
2. User taps menu item → scrolls to section AND closes sidebar
3. Scroll-spy still active (highlight visible when menu reopened)

**Implementation:**
```typescript
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

const handleMobileMenuClick = (sectionId: string) => {
  handleMenuClick(sectionId);
  setMobileMenuOpen(false); // Close menu after navigation
};
```

### Edge Cases

**Multiple sections visible:**
- Prioritize topmost section in viewport
- Use `entries[0]` from IntersectionObserver (sorted by position)

**At page extremes:**
- Top of page: Highlight first section even if <50% visible
- Bottom of page: Highlight last section even if <50% visible
- Adjust observer logic: `if (entry.boundingClientRect.top < 100) setActiveId(entry.target.id)`

**Fast scrolling:**
- Debounce observer callback (50ms) to prevent highlight flicker
- Use `lodash.debounce` or custom debounce implementation

### Accessibility

**Semantic HTML:**
```typescript
<nav aria-label="Page navigation">
  <ul role="list">
    <li>
      <a href={`#${section.id}`} aria-current={isActive ? 'location' : undefined}>
        {section.title}
      </a>
    </li>
  </ul>
</nav>
```

**Keyboard navigation:**
- Tab through menu items (native focus management)
- Enter/Space activates link (native behavior)
- Focus moves to target section after navigation

**Screen readers:**
- Menu items announce as links with current page location
- Section headings use proper heading hierarchy (h2, h3)
- Video cards have descriptive alt text and labels

---

## 7. Implementation Scope

### Files to Create

1. **src/app/components/SidebarNav.tsx** - Reusable sidebar with scroll-spy
2. **src/app/components/VideoCard.tsx** - Video thumbnail component
3. **src/app/components/ContentSection.tsx** - Section wrapper for navigation

### Files to Modify

1. **src/app/components/Layout.tsx**
   - Update search logic with relevance scoring
   - Lines 84-174 (search implementation)
   - Preserve all existing functionality

2. **src/app/pages/OnboardingUX.tsx**
   - Complete refactor: remove accordion structure
   - Remove "Cultura IA First" section
   - Replace content with data from .txt document
   - Add SidebarNav and ContentSection components
   - Implement scroll-spy with IntersectionObserver

3. **src/app/pages/GuiaWriting.tsx**
   - Complete refactor: remove accordion structure
   - Replace all content with 13 sections from PDF
   - Add SidebarNav and ContentSection components
   - Implement scroll-spy with IntersectionObserver

### Files Unchanged

- **src/app/routes.tsx** - No routing changes needed
- All other pages and components

### Content Assets Required

- .txt document content for OnboardingUX (4 sections)
- PDF content for GuiaWriting (13 sections)
- Video thumbnail images (to be provided with asset table)
- Diagram images for OnboardingUX (to be provided with asset table)

---

## 8. Testing Strategy

### Component Testing

**SidebarNav:**
- Renders all sections and subsections
- Highlights active section correctly
- Scroll navigation works on click
- Mobile menu toggles properly

**VideoCard:**
- Renders thumbnail and overlay correctly
- Opens link in new tab on click
- Hover effects apply properly
- Accessible via keyboard

**ContentSection:**
- Renders with correct ID for navigation
- Title displays properly
- Children render correctly

### Integration Testing

**Scroll-spy:**
- Active section updates on scroll
- Sidebar highlight syncs with visible section
- Edge cases handled (top/bottom of page)

**Search algorithm:**
- Exact matches appear first
- Partial matches ranked lower
- Score calculation correct for all item types

### Manual Testing Checklist

- [ ] Desktop navigation: sidebar fixed, scrolling smooth
- [ ] Mobile navigation: menu toggles, closes after selection
- [ ] Video cards open correct links in new tab
- [ ] External text links open in new tab
- [ ] Search prioritizes exact matches
- [ ] All content from documents rendered accurately
- [ ] No broken links or missing images
- [ ] Keyboard navigation works throughout
- [ ] Screen reader announces navigation correctly

---

## 9. Success Criteria

### Search Enhancement
- ✅ Exact match terms appear first in results
- ✅ Partial matches ranked lower than exact matches
- ✅ Search behavior consistent across personas and content

### OnboardingUX Refactor
- ✅ "Cultura IA First" section removed completely
- ✅ Sidebar navigation with all section/subsection titles
- ✅ Scroll-spy highlights current section automatically
- ✅ All content from .txt document rendered exactly
- ✅ All links open in new tabs
- ✅ Video thumbnails with play overlay functional

### GuiaWriting Refactor
- ✅ All 13 sections from PDF rendered
- ✅ No accordion structure (single scrollable page)
- ✅ Sidebar navigation with scroll-spy
- ✅ Video areas functional with thumbnails

### Code Quality
- ✅ Reusable components (DRY principle)
- ✅ Type-safe content structures
- ✅ Accessible markup and interactions
- ✅ Responsive design (mobile + desktop)
- ✅ No unnecessary complexity (YAGNI)

---

## 10. Future Enhancements (Out of Scope)

- Search with fuzzy matching / typo tolerance
- Search result preview/snippet
- Sidebar navigation progress indicator
- Video playback modal (instead of external tab)
- Lazy loading for images
- Search analytics tracking
- Bookmarkable section URLs (hash routing)

These enhancements are intentionally excluded to maintain focused scope and avoid feature creep.
