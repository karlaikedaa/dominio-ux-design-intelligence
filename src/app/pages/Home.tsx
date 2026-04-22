import { NavLink } from "react-router";
import {
  GraduationCap,
  FlaskConical,
  Users,
  Lightbulb,
  PenLine,
  Accessibility,
  BarChart3,
  ArrowRight,
  Sparkles,
  Building,
  Bot,
  FileSearch,
} from "lucide-react";

interface CardConfig {
  path: string;
  titulo: string;
  descricao: string;
  icone: React.ElementType;
  status: "disponivel" | "em-breve";
  iconeBg: string;
  iconeColor: string;
  destaque?: string;
}

interface SecaoConfig {
  titulo: string;
  cards: CardConfig[];
}

const secoes: SecaoConfig[] = [
  {
    titulo: "Central de conhecimento",
    cards: [
      {
        path: "/onboarding",
        titulo: "Comece aqui",
        descricao:
          "Processos, ferramentas, cultura e contexto da empresa para novos membros do time.",
        icone: GraduationCap,
        status: "disponivel",
        iconeBg: "bg-violet-100",
        iconeColor: "text-violet-600",
        destaque: "Processos · Glossário · Ferramentas",
      },
      {
        path: "/produtos",
        titulo: "Nossos produtos",
        descricao:
          "Informações sobre produtos, personas de marketing e materiais de comercialização.",
        icone: Building,
        status: "disponivel",
        iconeBg: "bg-blue-100",
        iconeColor: "text-blue-600",
        destaque: "Contábil · Inova · Comercial",
      },
      {
        path: "/personas",
        titulo: "Personas Sintéticas",
        descricao:
          "Perfis detalhados dos usuários do Domínio Sistemas — Contábil, PME e Empregado.",
        icone: Users,
        status: "disponivel",
        iconeBg: "bg-teal-100",
        iconeColor: "text-teal-600",
        destaque: "9 personas · Mapas de empatia",
      },
      {
        path: "/ai-first",
        titulo: "AI First",
        descricao:
          "Como o time de UX utiliza inteligência artificial para acelerar e elevar a qualidade do design.",
        icone: Sparkles,
        status: "disponivel",
        iconeBg: "bg-amber-100",
        iconeColor: "text-amber-600",
        destaque: "Agentes · Prompts · Guias",
      },
    ],
  },
  {
    titulo: "Processos de Discovery",
    cards: [
      {
        path: "/brainstorm",
        titulo: "Geração de briefing",
        descricao:
          "Geração de sugestões de interface e funcionalidades contextualizadas por persona.",
        icone: Lightbulb,
        status: "disponivel",
        iconeBg: "bg-amber-100",
        iconeColor: "text-amber-600",
        destaque: "Sugestões · Justificativas · Tensões",
      },
      {
        path: "/benchmark",
        titulo: "Agente Benchmark",
        descricao:
          "Análise comparativa automática de soluções de interface e padrões de mercado.",
        icone: FileSearch,
        status: "em-breve",
        iconeBg: "bg-purple-100",
        iconeColor: "text-purple-600",
        destaque: "Análise automática · Referências",
      },
      {
        path: "/repositorio-pesquisa",
        titulo: "Repositório de pesquisa",
        descricao:
          "Acervo centralizado de pesquisas de UX com busca por insight, módulo e persona.",
        icone: FlaskConical,
        status: "disponivel",
        iconeBg: "bg-teal-100",
        iconeColor: "text-teal-600",
        destaque: "Insights · Recomendações · Citações",
      },
    ],
  },
  {
    titulo: "Processos de Cocriação",
    cards: [
      {
        path: "/brainstorm",
        titulo: "Brainstorm",
        descricao:
          "Geração colaborativa de ideias e soluções de interface para problemas de design.",
        icone: Lightbulb,
        status: "disponivel",
        iconeBg: "bg-amber-100",
        iconeColor: "text-amber-600",
        destaque: "Colaborativo · Contextualizado",
      },
      {
        path: "/defesa-tecnica",
        titulo: "Defesa Técnica",
        descricao:
          "Argumentos e justificativas técnicas para decisões de design e trade-offs.",
        icone: Bot,
        status: "em-breve",
        iconeBg: "bg-rose-100",
        iconeColor: "text-rose-600",
        destaque: "Justificativas · Trade-offs",
      },
      {
        path: "/validador",
        titulo: "Validador de Writing e Visual",
        descricao:
          "Verificação de conformidade de textos e componentes com o guia de UX Writing e o Design System.",
        icone: PenLine,
        status: "disponivel",
        iconeBg: "bg-blue-100",
        iconeColor: "text-blue-600",
        destaque: "UX Writing · Design System",
      },
    ],
  },
  {
    titulo: "Processo de Delivery",
    cards: [
      {
        path: "/acessibilidade",
        titulo: "Especificações de acessibilidade",
        descricao:
          "Geração automática de tabelas ARIA e fluxos de foco para todas as telas entregues.",
        icone: Accessibility,
        status: "disponivel",
        iconeBg: "bg-green-100",
        iconeColor: "text-green-600",
        destaque: "WCAG 2.1 AA · WAI-ARIA · Roles",
      },
      {
        path: "/metricas",
        titulo: "Especificação de dados",
        descricao:
          "Dicionário de eventos de analytics gerado a partir do fluxo — pronto para o time de dados.",
        icone: BarChart3,
        status: "disponivel",
        iconeBg: "bg-purple-100",
        iconeColor: "text-purple-600",
        destaque: "Funil · Interação · Erros · Tempo",
      },
    ],
  },
];

function StatusBadge({ status }: { status: CardConfig["status"] }) {
  if (status === "disponivel") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
        Disponível
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-medium">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
      Em breve
    </span>
  );
}

function ModuleCard({ card }: { card: CardConfig }) {
  const Icone = card.icone;

  return (
    <NavLink
      to={card.path}
      className="group flex flex-col p-5 bg-card border border-border rounded-[var(--radius-card)] hover:border-primary/30 hover:shadow-[var(--elevation-sm)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`${card.titulo} — ${card.status === "disponivel" ? "Disponível" : "Em breve"}`}
    >
      {/* Topo: ícone + badge */}
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-11 h-11 rounded-[var(--radius-card)] flex items-center justify-center shrink-0 ${card.iconeBg}`}
        >
          <Icone className={`w-5 h-5 ${card.iconeColor}`} aria-hidden="true" />
        </div>
        <StatusBadge status={card.status} />
      </div>

      {/* Título */}
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

      {/* Descrição */}
      <p
        className="text-muted-foreground mb-4 flex-1"
        style={{ fontSize: "var(--text-label)", lineHeight: "1.5" }}
      >
        {card.descricao}
      </p>

      {/* Rodapé: tags + seta */}
      <div className="flex items-end justify-between gap-2 mt-auto">
        {card.destaque && (
          <p
            className="text-muted-foreground/70 line-clamp-1"
            style={{ fontSize: "var(--text-caption)" }}
          >
            {card.destaque}
          </p>
        )}
        <ArrowRight
          className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1 ${card.status === "disponivel" ? "text-primary" : "text-muted-foreground"}`}
          aria-hidden="true"
        />
      </div>
    </NavLink>
  );
}

export function Home() {
  const totalCards = secoes.reduce((acc, secao) => acc + secao.cards.length, 0);
  const totalDisponiveis = secoes.reduce(
    (acc, secao) => acc + secao.cards.filter((c) => c.status === "disponivel").length,
    0
  );

  return (
    <div className="min-h-full bg-background">
      {/* Hero */}
      <div className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-6 py-10 md:py-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-[var(--radius-card)] bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" aria-hidden="true" />
            </div>
            <span
              className="text-muted-foreground"
              style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}
            >
              Design Team TR
            </span>
          </div>
          <h1
            className="text-foreground mb-3"
            style={{
              fontSize: "var(--text-h2)",
              fontWeight: "var(--font-weight-semibold)",
              lineHeight: "1.2",
            }}
          >
            Designflow – Design Team TR
          </h1>
          <p
            className="text-muted-foreground max-w-xl"
            style={{ fontSize: "var(--text-base)", lineHeight: "1.6" }}
          >
            Acelere, padronize e eleve a qualidade do processo de design
          </p>
        </div>
      </div>

      {/* Seções de módulos */}
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-12">
        {secoes.map((secao) => (
          <section key={secao.titulo}>
            <div className="flex items-center justify-between mb-5">
              <h2
                className="text-foreground"
                style={{
                  fontSize: "var(--text-h4)",
                  fontWeight: "var(--font-weight-semibold)",
                }}
              >
                {secao.titulo}
              </h2>
              <span
                className="text-muted-foreground"
                style={{ fontSize: "var(--text-caption)" }}
              >
                {secao.cards.length} {secao.cards.length === 1 ? "módulo" : "módulos"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {secao.cards.map((card) => (
                <ModuleCard key={card.path} card={card} />
              ))}
            </div>
          </section>
        ))}

        {/* Rodapé */}
        <p
          className="text-muted-foreground/60 text-center pt-8"
          style={{ fontSize: "var(--text-caption)" }}
        >
          Designflow · Design Intelligence System · {totalDisponiveis} de {totalCards} módulos ativos
        </p>
      </div>
    </div>
  );
}
