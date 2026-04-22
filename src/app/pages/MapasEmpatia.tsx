import { useState, useCallback, useEffect, useRef } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  personasContabil,
  personasPME,
  personaEmpregado,
  empathyMaps,
} from "../data/personas";
import type { Persona, EmpathyMap } from "../data/personas";
import {
  Brain,
  Ear,
  Eye,
  MessageCircle,
  Frown,
  Trophy,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  X,
} from "lucide-react";

/* ── Tab config ─────────────────────────────────────────────────── */
const TABS = [
  { id: "contabil", label: "Contábil", personas: personasContabil },
  { id: "empresa", label: "Empresa", personas: personasPME },
  { id: "para-voce", label: "Para Você", personas: personaEmpregado },
] as const;

type TabId = (typeof TABS)[number]["id"];

const PREVIEW = 2; // itens visíveis nos cards resumo

/* ── Quadrant helpers ───────────────────────────────────────────── */
interface QuadrantData {
  key: string;
  title: string;
  icon: React.ReactNode;
  items: string[];
  accentClass: string;
}

function getQuadrants(map: EmpathyMap): QuadrantData[] {
  return [
    { key: "sees",        title: "Vê",           icon: <Eye className="w-4 h-4" />,         items: map.sees,        accentClass: "text-primary" },
    { key: "hears",       title: "Ouve",          icon: <Ear className="w-4 h-4" />,         items: map.hears,       accentClass: "text-primary" },
    { key: "saysDoes",    title: "Fala e Faz",    icon: <MessageCircle className="w-4 h-4" />, items: map.saysDoes,  accentClass: "text-primary" },
    { key: "thinksFeels", title: "Pensa e Sente", icon: <Brain className="w-4 h-4" />,       items: map.thinksFeels, accentClass: "text-primary" },
  ];
}

/* ─────────────────────────────────────────────────────────────────
   DRAWER — seção específica do mapa de empatia
───────────────────────────────────────────────────────────────── */

type DrawerSectionData =
  | { kind: "items";  title: string; icon: React.ReactNode; items: string[] }
  | { kind: "pains";  pains: EmpathyMap["pains"] }
  | { kind: "gains";  gains: EmpathyMap["gains"] };

function SectionDrawer({
  persona,
  section,
  open,
  onClose,
}: {
  persona: Persona;
  section: DrawerSectionData | null;
  open: boolean;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  /* Focus trap + ESC */
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [open, onClose]);

  /* Prevent body scroll */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const sectionLabel =
    !section ? "" :
    section.kind === "items" ? section.title :
    section.kind === "pains" ? "O que dificulta e frustra" :
    "O que traz satisfação e sucesso";

  const sectionIcon =
    !section ? null :
    section.kind === "items" ? section.icon :
    section.kind === "pains"
      ? <Frown className="w-4 h-4" aria-hidden="true" />
      : <Trophy className="w-4 h-4" aria-hidden="true" />;

  const sectionAccent =
    !section ? "text-primary" :
    section.kind === "pains" ? "text-destructive" :
    section.kind === "gains" ? "text-chart-1" :
    "text-primary";

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 z-40 bg-black/40 transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
      />

      {/* Drawer panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`${sectionLabel} — ${persona?.name ?? ""}`}
        className="fixed top-0 right-0 z-50 h-full bg-background flex flex-col shadow-[var(--elevation-lg)] transition-transform duration-300 ease-in-out"
        style={{
          width: "min(520px, 100vw)",
          transform: open ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Header */}
        <div className="flex items-start gap-3 p-5 border-b border-border shrink-0">
          <img
            src={persona?.avatar}
            alt=""
            aria-hidden="true"
            className="w-10 h-10 rounded-full object-cover shrink-0 mt-0.5"
          />
          <div className="flex-1 min-w-0">
            <p
              className="text-muted-foreground mb-0.5"
              style={{ fontSize: "var(--text-caption)", lineHeight: "1.4" }}
            >
              {persona?.name} · {persona?.role}
            </p>
            <div className={`flex items-center gap-2 ${sectionAccent}`}>
              <span aria-hidden="true">{sectionIcon}</span>
              <h2
                style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-semibold)", lineHeight: "1.3" }}
              >
                {sectionLabel}
              </h2>
            </div>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Fechar detalhes"
            className="p-2 rounded-[var(--radius)] hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 shrink-0"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {section?.kind === "items" && (
            <ul className="space-y-3">
              {section.items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 p-3 bg-card border border-border rounded-[var(--radius-card)]"
                  style={{ fontSize: "var(--text-label)", lineHeight: "1.6" }}
                >
                  <span className="text-primary mt-0.5 shrink-0" aria-hidden="true">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          {section?.kind === "pains" && (
            <div className="space-y-3">
              {section.pains.map((pain, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 bg-card border border-border rounded-[var(--radius-card)]"
                  style={{ fontSize: "var(--text-label)", lineHeight: "1.6" }}
                >
                  <span
                    className={`shrink-0 mt-0.5 px-2 py-0.5 rounded-[var(--radius)] ${
                      pain.intensity === "critica"
                        ? "bg-destructive/10 text-destructive"
                        : pain.intensity === "alta"
                        ? "bg-chart-3/10 text-chart-3"
                        : "bg-chart-2/10 text-chart-2"
                    }`}
                    style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)", whiteSpace: "nowrap" }}
                  >
                    {pain.intensity === "critica" ? "Crítica" : pain.intensity === "alta" ? "Alta" : "Média"}
                  </span>
                  <span>{pain.text}</span>
                </div>
              ))}
            </div>
          )}

          {section?.kind === "gains" && (
            <div className="space-y-3">
              {section.gains.map((gain, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 bg-card border border-border rounded-[var(--radius-card)]"
                  style={{ fontSize: "var(--text-label)", lineHeight: "1.6" }}
                >
                  <span
                    className={`shrink-0 mt-0.5 px-2 py-0.5 rounded-[var(--radius)] ${
                      gain.priority === "essencial"
                        ? "bg-chart-1/10 text-chart-1"
                        : gain.priority === "importante"
                        ? "bg-chart-2/10 text-chart-2"
                        : "bg-chart-3/10 text-chart-3"
                    }`}
                    style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)", whiteSpace: "nowrap" }}
                  >
                    {gain.priority === "essencial" ? "Essencial" : gain.priority === "importante" ? "Importante" : "Desejável"}
                  </span>
                  <span>{gain.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   "Ver tudo" link — reutilizável
───────────────────────────────────────────────────────────────── */
function ViewAllLink({ total, shown, onClick }: { total: number; shown: number; onClick: () => void }) {
  const hidden = total - shown;
  if (hidden <= 0) return null;
  return (
    <button
      onClick={onClick}
      className="mt-2 text-primary hover:underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 rounded"
      style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" }}
    >
      Ver todos ({total})
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Quadrant compact card
───────────────────────────────────────────────────────────────── */
function QuadrantCompact({
  quadrant,
  onViewAll,
}: {
  quadrant: QuadrantData;
  onViewAll: () => void;
}) {
  const preview = quadrant.items.slice(0, PREVIEW);
  return (
    <section
      className="bg-card border border-border rounded-[var(--radius-card)] p-4 flex flex-col"
      aria-labelledby={`qc-${quadrant.key}`}
    >
      <h3
        id={`qc-${quadrant.key}`}
        className="flex items-center gap-2 mb-2.5"
        style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}
      >
        <span className={quadrant.accentClass} aria-hidden="true">{quadrant.icon}</span>
        {quadrant.title}
      </h3>
      <ul className="space-y-1.5 flex-1">
        {preview.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-2"
            style={{ fontSize: "var(--text-caption)", lineHeight: "1.55" }}
          >
            <span className="text-primary mt-0.5 shrink-0" aria-hidden="true">•</span>
            <span className="text-foreground">{item}</span>
          </li>
        ))}
      </ul>
      <ViewAllLink total={quadrant.items.length} shown={PREVIEW} onClick={onViewAll} />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Pains compact card
───────────────────────────────────────────────────────────────── */
function PainsCompact({
  pains,
  onViewAll,
}: {
  pains: EmpathyMap["pains"];
  onViewAll: () => void;
}) {
  const preview = pains.slice(0, PREVIEW);
  return (
    <section
      className="bg-card border border-border rounded-[var(--radius-card)] p-4 flex flex-col"
      aria-labelledby="sum-pains"
    >
      <h3
        id="sum-pains"
        className="flex items-center gap-2 mb-2.5"
        style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}
      >
        <span className="text-destructive" aria-hidden="true"><Frown className="w-4 h-4" /></span>
        O que dificulta e frustra
      </h3>
      <div className="space-y-1.5 flex-1">
        {preview.map((pain, i) => (
          <div
            key={i}
            className="flex items-start gap-1.5"
            style={{ fontSize: "var(--text-caption)", lineHeight: "1.55" }}
          >
            <span
              className={`shrink-0 mt-0.5 ${
                pain.intensity === "critica" ? "text-destructive" :
                pain.intensity === "alta" ? "text-chart-3" : "text-chart-2"
              }`}
              style={{ fontWeight: "var(--font-weight-semibold)" }}
            >
              {pain.intensity === "critica" ? "Crítica" : pain.intensity === "alta" ? "Alta" : "Média"}
            </span>
            <span className="text-foreground">{pain.text}</span>
          </div>
        ))}
      </div>
      <ViewAllLink total={pains.length} shown={PREVIEW} onClick={onViewAll} />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Gains compact card
───────────────────────────────────────────────────────────────── */
function GainsCompact({
  gains,
  onViewAll,
}: {
  gains: EmpathyMap["gains"];
  onViewAll: () => void;
}) {
  const preview = gains.slice(0, PREVIEW);
  return (
    <section
      className="bg-card border border-border rounded-[var(--radius-card)] p-4 flex flex-col"
      aria-labelledby="sum-gains"
    >
      <h3
        id="sum-gains"
        className="flex items-center gap-2 mb-2.5"
        style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}
      >
        <span className="text-chart-1" aria-hidden="true"><Trophy className="w-4 h-4" /></span>
        O que traz satisfação e sucesso
      </h3>
      <div className="space-y-1.5 flex-1">
        {preview.map((gain, i) => (
          <div
            key={i}
            className="flex items-start gap-1.5"
            style={{ fontSize: "var(--text-caption)", lineHeight: "1.55" }}
          >
            <span
              className={`shrink-0 mt-0.5 ${
                gain.priority === "essencial" ? "text-chart-1" :
                gain.priority === "importante" ? "text-chart-2" : "text-chart-3"
              }`}
              style={{ fontWeight: "var(--font-weight-semibold)" }}
            >
              {gain.priority === "essencial" ? "Essencial" : gain.priority === "importante" ? "Importante" : "Desejável"}
            </span>
            <span className="text-foreground">{gain.text}</span>
          </div>
        ))}
      </div>
      <ViewAllLink total={gains.length} shown={PREVIEW} onClick={onViewAll} />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   LEFT PANEL — Card compacto de persona (seletor)
───────────────────────────────────────────────────────────────── */
function EmpathyCard({
  persona,
  isSelected,
  onClick,
}: {
  persona: Persona;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`rounded-[var(--radius-card)] border bg-card transition-all duration-200 overflow-hidden ${
        isSelected
          ? "border-primary shadow-[var(--elevation-sm)]"
          : "border-border hover:border-primary/40 hover:shadow-[var(--elevation-sm)]"
      }`}
    >
      <div className="p-4 pb-3">
        <div className="mb-3">
          <span
            className="inline-block px-3 py-1 rounded-[var(--radius)] bg-chart-2 text-white"
            style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" }}
          >
            {persona.tag}
          </span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <img
            src={persona.avatar}
            alt=""
            aria-hidden="true"
            className="w-14 h-14 rounded-full object-cover shrink-0"
            loading="lazy"
          />
          <div className="min-w-0">
            <p style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-semibold)", lineHeight: "1.3" }}>
              {persona.name}, {persona.age} anos
            </p>
            <p className="text-muted-foreground" style={{ fontSize: "var(--text-label)", lineHeight: "1.4" }}>
              {persona.role}
            </p>
          </div>
        </div>
        <p className="text-foreground mb-4" style={{ fontSize: "var(--text-label)", lineHeight: "1.5" }}>
          {persona.summary}
        </p>
        {persona.digitalLevel !== undefined && (
          <div className="mb-4">
            <p className="text-muted-foreground mb-1.5" style={{ fontSize: "var(--text-caption)" }}>
              Nível de digitalização:
            </p>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`w-3 h-3 rounded-full ${level <= persona.digitalLevel! ? "bg-primary" : "bg-muted"}`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
                {persona.digitalLevelLabel}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="px-4 pb-4">
        <button
          onClick={onClick}
          aria-pressed={isSelected}
          aria-label={`Ver mapa de empatia de ${persona.name}`}
          className="w-full bg-primary text-primary-foreground rounded-[var(--radius-button)] py-2.5 hover:opacity-90 active:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}
        >
          Ver mapa de empatia
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   RIGHT PANEL — Detail com quadrantes compactos + drawer por seção
───────────────────────────────────────────────────────────────── */
function EmpathyMapDetail({
  persona,
  empathyMap,
  currentIndex,
  total,
  onPrev,
  onNext,
  onBack,
}: {
  persona: Persona;
  empathyMap: EmpathyMap;
  currentIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onBack?: () => void;
}) {
  const [drawerSection, setDrawerSection] = useState<DrawerSectionData | null>(null);
  const quadrants = getQuadrants(empathyMap);

  const openSection = useCallback((s: DrawerSectionData) => setDrawerSection(s), []);
  const closeDrawer = useCallback(() => setDrawerSection(null), []);

  return (
    <>
      <SectionDrawer
        persona={persona}
        section={drawerSection}
        open={drawerSection !== null}
        onClose={closeDrawer}
      />

      <div className="flex flex-col">
        {/* Mobile back */}
        {onBack && (
          <div className="lg:hidden mb-4">
            <Button variant="outline" size="sm" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span style={{ fontSize: "var(--text-label)" }}>Voltar à lista</span>
            </Button>
          </div>
        )}

        {/* Persona header */}
        <div
          className="bg-card border border-border rounded-[var(--radius-card)] p-4 mb-5 flex items-center gap-4"
          role="region"
          aria-label={`Persona: ${persona.name}`}
        >
          <img
            src={persona.avatar}
            alt=""
            aria-hidden="true"
            className="w-14 h-14 rounded-full object-cover shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="mb-1">
              <span
                className={`inline-block px-2.5 py-0.5 rounded-[var(--radius)] ${persona.tagColor} ${persona.tagTextColor}`}
                style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" }}
              >
                {persona.tag}
              </span>
            </div>
            <p style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-semibold)", lineHeight: "1.3" }}>
              {persona.name}, {persona.age} anos
            </p>
            <p className="text-muted-foreground" style={{ fontSize: "var(--text-label)", lineHeight: "1.4" }}>
              {persona.role} · {persona.location}
            </p>
            {persona.modules && persona.modules.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2" aria-label="Módulos utilizados">
                {persona.modules.map((mod) => (
                  <Badge key={mod} variant="outline" style={{ fontSize: "var(--text-badge)" }}>{mod}</Badge>
                ))}
              </div>
            )}
          </div>
          {/* Prev / Next */}
          <div className="flex items-center gap-1 shrink-0">
            <Button variant="ghost" size="sm" disabled={currentIndex <= 0} onClick={onPrev} aria-label="Persona anterior" className="p-1.5">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-muted-foreground select-none px-1" style={{ fontSize: "var(--text-caption)" }}>
              {currentIndex + 1}/{total}
            </span>
            <Button variant="ghost" size="sm" disabled={currentIndex >= total - 1} onClick={onNext} aria-label="Próxima persona" className="p-1.5">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Desktop: 3 rows × 2 cols — compact */}
        <div className="hidden md:flex flex-col gap-4">
          {/* Row 1: Vê | Ouve */}
          <div className="grid grid-cols-2 gap-4">
            <QuadrantCompact
              quadrant={quadrants[0]}
              onViewAll={() => openSection({ kind: "items", title: quadrants[0].title, icon: quadrants[0].icon, items: quadrants[0].items })}
            />
            <QuadrantCompact
              quadrant={quadrants[1]}
              onViewAll={() => openSection({ kind: "items", title: quadrants[1].title, icon: quadrants[1].icon, items: quadrants[1].items })}
            />
          </div>
          {/* Row 2: Fala e Faz | Pensa e Sente */}
          <div className="grid grid-cols-2 gap-4">
            <QuadrantCompact
              quadrant={quadrants[2]}
              onViewAll={() => openSection({ kind: "items", title: quadrants[2].title, icon: quadrants[2].icon, items: quadrants[2].items })}
            />
            <QuadrantCompact
              quadrant={quadrants[3]}
              onViewAll={() => openSection({ kind: "items", title: quadrants[3].title, icon: quadrants[3].icon, items: quadrants[3].items })}
            />
          </div>
          {/* Row 3: Pains | Gains */}
          <div className="grid grid-cols-2 gap-4">
            <PainsCompact
              pains={empathyMap.pains}
              onViewAll={() => openSection({ kind: "pains", pains: empathyMap.pains })}
            />
            <GainsCompact
              gains={empathyMap.gains}
              onViewAll={() => openSection({ kind: "gains", gains: empathyMap.gains })}
            />
          </div>
        </div>

        {/* Mobile: accordion */}
        <div className="md:hidden space-y-2">
          {quadrants.map((q, idx) => (
            <details key={q.key} open={idx === 0} className="bg-card border border-border rounded-[var(--radius-card)]">
              <summary
                className="flex items-center gap-2 p-4 cursor-pointer min-h-[44px]"
                style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-semibold)" }}
              >
                <span className="text-primary" aria-hidden="true">{q.icon}</span>
                {q.title}
                <span className="ml-auto text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
                  {q.items.length} itens
                </span>
              </summary>
              <div className="px-4 pb-3">
                <ul className="space-y-1.5 mb-2">
                  {q.items.slice(0, PREVIEW).map((item, i) => (
                    <li key={i} className="flex items-start gap-2" style={{ fontSize: "var(--text-label)" }}>
                      <span className="text-primary mt-1" aria-hidden="true">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <ViewAllLink
                  total={q.items.length}
                  shown={PREVIEW}
                  onClick={() => openSection({ kind: "items", title: q.title, icon: q.icon, items: q.items })}
                />
              </div>
            </details>
          ))}
          <details className="bg-card border border-border rounded-[var(--radius-card)]">
            <summary className="flex items-center gap-2 p-4 cursor-pointer min-h-[44px]" style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-semibold)" }}>
              <span className="text-destructive" aria-hidden="true"><Frown className="w-4 h-4" /></span>
              O que dificulta e frustra
            </summary>
            <div className="px-4 pb-3">
              <div className="space-y-1.5 mb-2">
                {empathyMap.pains.slice(0, PREVIEW).map((pain, i) => (
                  <div key={i} className="flex items-start gap-1.5" style={{ fontSize: "var(--text-label)" }}>
                    <span className={`shrink-0 ${pain.intensity === "critica" ? "text-destructive" : pain.intensity === "alta" ? "text-chart-3" : "text-chart-2"}`} style={{ fontWeight: "var(--font-weight-semibold)" }}>
                      {pain.intensity === "critica" ? "Crítica" : pain.intensity === "alta" ? "Alta" : "Média"}
                    </span>
                    <span>{pain.text}</span>
                  </div>
                ))}
              </div>
              <ViewAllLink total={empathyMap.pains.length} shown={PREVIEW} onClick={() => openSection({ kind: "pains", pains: empathyMap.pains })} />
            </div>
          </details>
          <details className="bg-card border border-border rounded-[var(--radius-card)]">
            <summary className="flex items-center gap-2 p-4 cursor-pointer min-h-[44px]" style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-semibold)" }}>
              <span className="text-chart-1" aria-hidden="true"><Trophy className="w-4 h-4" /></span>
              O que traz satisfação e sucesso
            </summary>
            <div className="px-4 pb-3">
              <div className="space-y-1.5 mb-2">
                {empathyMap.gains.slice(0, PREVIEW).map((gain, i) => (
                  <div key={i} className="flex items-start gap-1.5" style={{ fontSize: "var(--text-label)" }}>
                    <span className={`shrink-0 ${gain.priority === "essencial" ? "text-chart-1" : gain.priority === "importante" ? "text-chart-2" : "text-chart-3"}`} style={{ fontWeight: "var(--font-weight-semibold)" }}>
                      {gain.priority === "essencial" ? "Essencial" : gain.priority === "importante" ? "Importante" : "Desejável"}
                    </span>
                    <span>{gain.text}</span>
                  </div>
                ))}
              </div>
              <ViewAllLink total={empathyMap.gains.length} shown={PREVIEW} onClick={() => openSection({ kind: "gains", gains: empathyMap.gains })} />
            </div>
          </details>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════════ */
export function MapasEmpatia() {
  const [activeTab, setActiveTab] = useState<TabId>("contabil");
  const activeTabData = TABS.find((t) => t.id === activeTab)!;
  const activePersonas = activeTabData.personas as Persona[];

  const [selectedId, setSelectedId] = useState<string>(activePersonas[0]?.id ?? "");

  const handleTabChange = useCallback((tabId: TabId) => {
    const tabPersonas = TABS.find((t) => t.id === tabId)!.personas as Persona[];
    setActiveTab(tabId);
    setSelectedId(tabPersonas[0]?.id ?? "");
  }, []);

  const handleSelect = useCallback((id: string) => setSelectedId(id), []);

  const currentIndex = activePersonas.findIndex((p) => p.id === selectedId);
  const selectedPersona = activePersonas.find((p) => p.id === selectedId) ?? null;
  const selectedMap = selectedId ? empathyMaps[selectedId] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) setSelectedId(activePersonas[currentIndex - 1].id);
  }, [currentIndex, activePersonas]);

  const handleNext = useCallback(() => {
    if (currentIndex < activePersonas.length - 1) setSelectedId(activePersonas[currentIndex + 1].id);
  }, [currentIndex, activePersonas]);

  return (
    <div className="flex flex-col p-4 md:p-6 lg:p-8" style={{ height: "calc(100vh - 3.5rem)" }}>

      {/* Page header */}
      <div className="mb-5 shrink-0">
        <h1 style={{ fontSize: "var(--text-h3)", fontWeight: "var(--font-weight-semibold)", lineHeight: "1.3" }}>
          Mapas de Empatia
        </h1>
        <p className="text-muted-foreground mt-1.5 max-w-2xl" style={{ fontSize: "var(--text-label)", lineHeight: "1.5" }}>
          Explore o que cada persona pensa, sente, vê e ouve. Use o link em cada card para ver os itens completos.
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-1 mb-5 shrink-0 border-b border-border" role="tablist" aria-label="Categoria de personas">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            onClick={() => handleTabChange(tab.id)}
            className={`px-4 py-2.5 transition-all duration-200 border-b-2 -mb-px focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
            style={{
              fontSize: "var(--text-label)",
              fontWeight: activeTab === tab.id ? "var(--font-weight-semibold)" : "var(--font-weight-regular)",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Master-detail */}
      <div id={`tabpanel-${activeTab}`} role="tabpanel" className="flex-1 min-h-0 flex flex-col lg:flex-row gap-6">

        {/* Left: persona cards */}
        <aside
          className={`lg:w-[340px] xl:w-[380px] shrink-0 overflow-y-auto ${
            selectedPersona && selectedMap ? "hidden lg:block" : "block"
          }`}
          aria-label={`Lista de personas — ${activeTabData.label}`}
        >
          <nav className="space-y-3 pb-4" role="list">
            {activePersonas.map((persona) => (
              <div key={persona.id} role="listitem">
                <EmpathyCard
                  persona={persona}
                  isSelected={selectedId === persona.id}
                  onClick={() => handleSelect(persona.id)}
                />
              </div>
            ))}
          </nav>
        </aside>

        {/* Right: empathy map */}
        <main
          className={`flex-1 min-w-0 overflow-y-auto ${
            selectedPersona && selectedMap ? "block" : "hidden lg:flex"
          }`}
          aria-live="polite"
        >
          {selectedPersona && selectedMap ? (
            <EmpathyMapDetail
              key={selectedPersona.id}
              persona={selectedPersona}
              empathyMap={selectedMap}
              currentIndex={currentIndex}
              total={activePersonas.length}
              onPrev={handlePrev}
              onNext={handleNext}
              onBack={() => setSelectedId("")}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center h-full">
              <div className="text-center p-8">
                <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4" aria-hidden="true">
                  <Brain className="w-8 h-8 text-muted-foreground" />
                </div>
                <p style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-semibold)" }}>
                  Selecione uma persona
                </p>
                <p className="text-muted-foreground mt-1 max-w-xs" style={{ fontSize: "var(--text-label)" }}>
                  Clique em um dos cards ao lado para explorar o mapa de empatia.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
