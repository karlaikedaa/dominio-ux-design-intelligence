import { NavLink } from "react-router";
import {
  Users,
  Building2,
  UserCircle,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";
import {
  personasContabil,
  personasPME,
  personaEmpregado,
} from "../data/personas";

interface SegmentoConfig {
  path: string;
  titulo: string;
  descricao: string;
  icone: React.ElementType;
  iconeBg: string;
  iconeColor: string;
  personas: typeof personasContabil;
  label: string;
}

const segmentos: SegmentoConfig[] = [
  {
    path: "/personas/contabil",
    titulo: "Personas Sintéticas Contador",
    descricao:
      "Contadores, gerentes e sócios de escritórios contábeis. Usuários diretos do sistema.",
    icone: Users,
    iconeBg: "bg-blue-100",
    iconeColor: "text-blue-600",
    personas: personasContabil,
    label: "Contábil",
  },
  {
    path: "/personas/pme",
    titulo: "Personas Sintéticas PME",
    descricao:
      "Empresários e MEIs — clientes dos escritórios que acessam notas fiscais e relatórios.",
    icone: Building2,
    iconeBg: "bg-teal-100",
    iconeColor: "text-teal-600",
    personas: personasPME,
    label: "PME",
  },
  {
    path: "/personas/empregado",
    titulo: "Personas Sintéticas Empregado",
    descricao:
      "Colaboradores CLT que acessam holerite, férias e benefícios pelo módulo Para Você.",
    icone: UserCircle,
    iconeBg: "bg-violet-100",
    iconeColor: "text-violet-600",
    personas: personaEmpregado,
    label: "Empregado",
  },
];

function AvatarStack({ personas }: { personas: typeof personasContabil }) {
  const visible = personas.slice(0, 4);
  const extra = personas.length - visible.length;
  return (
    <div className="flex items-center">
      {visible.map((p, i) => (
        <img
          key={p.id}
          src={p.avatar}
          alt={p.name}
          title={p.name}
          className="w-8 h-8 rounded-full object-cover border-2 border-card"
          style={{ marginLeft: i === 0 ? 0 : "-10px", zIndex: visible.length - i }}
        />
      ))}
      {extra > 0 && (
        <div
          className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center"
          style={{ marginLeft: "-10px" }}
        >
          <span style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" }}>
            +{extra}
          </span>
        </div>
      )}
    </div>
  );
}

function SegmentoCard({ seg }: { seg: SegmentoConfig }) {
  const Icone = seg.icone;
  return (
    <NavLink
      to={seg.path}
      className="group flex flex-col p-5 bg-card border border-border rounded-[var(--radius-card)] hover:border-primary/30 hover:shadow-[var(--elevation-sm)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-[var(--radius-card)] flex items-center justify-center ${seg.iconeBg}`}>
          <Icone className={`w-5 h-5 ${seg.iconeColor}`} aria-hidden="true" />
        </div>
        <span
          className="text-muted-foreground"
          style={{ fontSize: "var(--text-caption)" }}
        >
          {seg.personas.length} persona{seg.personas.length !== 1 ? "s" : ""}
        </span>
      </div>

      <h2
        className="text-foreground mb-1.5"
        style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-semibold)" }}
      >
        {seg.titulo}
      </h2>

      <p
        className="text-muted-foreground mb-5 flex-1"
        style={{ fontSize: "var(--text-label)", lineHeight: "1.5" }}
      >
        {seg.descricao}
      </p>

      <div className="flex items-center justify-between">
        <AvatarStack personas={seg.personas} />
        <div className="flex items-center gap-1 text-primary" style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" }}>
          Explorar
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </div>
      </div>
    </NavLink>
  );
}

export function PersonasHub() {
  const totalPersonas =
    personasContabil.length + personasPME.length + personaEmpregado.length;

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
          <div className="w-10 h-10 rounded-[var(--radius-card)] bg-blue-100 flex items-center justify-center">
            <Users className="w-5 h-5 text-blue-600" aria-hidden="true" />
          </div>
          <h1
            style={{ fontSize: "var(--text-h3)", fontWeight: "var(--font-weight-semibold)" }}
          >
            Personas sintéticas
          </h1>
        </div>
        <p className="text-muted-foreground" style={{ fontSize: "var(--text-label)", lineHeight: "1.5" }}>
          {totalPersonas} personas detalhadas em 3 segmentos de usuários do Domínio Sistemas.
          Selecione um segmento para explorar os perfis ou acesse os Mapas de Empatia.
        </p>
      </div>

      {/* Grid de segmentos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {segmentos.map((seg) => (
          <SegmentoCard key={seg.path} seg={seg} />
        ))}
      </div>
    </div>
  );
}
