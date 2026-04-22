import { NavLink } from "react-router";
import {
  ChevronLeft,
  Sparkles,
  Bot,
  BookText,
  Download,
  ArrowRight,
} from "lucide-react";

interface CardConfig {
  id: string;
  titulo: string;
  descricao: string;
  icone: React.ElementType;
  iconeBg: string;
  iconeColor: string;
}

// Constants
const AGENTES_ROUTE = "/agentes-time";
const CARD_CLASS = "group flex flex-col p-5 bg-card border border-border rounded-[var(--radius-card)] hover:border-primary/30 hover:shadow-[var(--elevation-sm)] transition-all duration-200";

const cards: CardConfig[] = [
  {
    id: "como-usamos",
    titulo: "Como usamos IA no time",
    descricao: "Práticas, ferramentas e casos de uso de IA no processo de design.",
    icone: Sparkles,
    iconeBg: "bg-violet-100",
    iconeColor: "text-violet-600",
  },
  {
    id: "agentes",
    titulo: "Agentes criados pelo time",
    descricao:
      "Catálogo de agentes Claude customizados para automação de tarefas de UX.",
    icone: Bot,
    iconeBg: "bg-blue-100",
    iconeColor: "text-blue-600",
  },
  {
    id: "prompts",
    titulo: "Bibliotecas de prompts",
    descricao:
      "Repositório de prompts testados e aprovados para tarefas recorrentes.",
    icone: BookText,
    iconeBg: "bg-teal-100",
    iconeColor: "text-teal-600",
  },
  {
    id: "guia-instalacao",
    titulo: "Guia de uso e instalação de ferramentas",
    descricao: "Tutoriais de configuração e boas práticas com ferramentas de IA.",
    icone: Download,
    iconeBg: "bg-amber-100",
    iconeColor: "text-amber-600",
  },
];

function AICard({ card }: { card: CardConfig }) {
  const Icone = card.icone;

  const cardContent = (
    <>
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-11 h-11 rounded-[var(--radius-card)] flex items-center justify-center shrink-0 ${card.iconeBg}`}
        >
          <Icone className={`w-5 h-5 ${card.iconeColor}`} aria-hidden="true" />
        </div>
        <span
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-medium"
        >
          Em construção
        </span>
      </div>

      <h2
        className="text-foreground mb-1.5"
        style={{
          fontSize: "var(--text-base)",
          fontWeight: "var(--font-weight-semibold)",
          lineHeight: "1.3",
        }}
      >
        {card.titulo}
      </h2>

      <p
        className="text-muted-foreground mb-4 flex-1"
        style={{ fontSize: "var(--text-label)", lineHeight: "1.5" }}
      >
        {card.descricao}
      </p>

      <div className="flex items-end justify-end">
        <ArrowRight
          className="w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </div>
    </>
  );

  const isAgentes = card.id === "agentes";

  if (isAgentes) {
    return (
      <NavLink
        to={AGENTES_ROUTE}
        className={CARD_CLASS}
      >
        {cardContent}
      </NavLink>
    );
  }

  return (
    <div className={CARD_CLASS}>
      {cardContent}
    </div>
  );
}

export function AIFirst() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
      {/* Breadcrumb */}
      <NavLink
        to="/"
        className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors mb-6"
        style={{ fontSize: "var(--text-caption)" }}
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        Início
      </NavLink>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-[var(--radius-card)] bg-violet-100 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-violet-600" aria-hidden="true" />
          </div>
          <h1
            style={{
              fontSize: "var(--text-h3)",
              fontWeight: "var(--font-weight-semibold)",
            }}
          >
            AI First
          </h1>
        </div>
        <p
          className="text-muted-foreground"
          style={{ fontSize: "var(--text-label)", lineHeight: "1.5" }}
        >
          Como o time de UX utiliza inteligência artificial para acelerar e
          elevar a qualidade do processo de design.
        </p>
      </div>

      {/* Grid de cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card) => (
          <AICard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
