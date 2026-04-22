import { Link, useParams, useNavigate } from "react-router";
import { ChevronLeft, ChevronRight, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import type { Persona } from "../data/personas";

interface PersonaDetailProps {
  personas: Persona[];
  basePath: string;
  breadcrumbLabel: string;
}

function SeverityIcon({ severity }: { severity: string }) {
  switch (severity) {
    case "critica":
      return (
        <span className="flex items-center gap-1.5" aria-label="Severidade crítica">
          <AlertCircle className="w-4 h-4 text-destructive" aria-hidden="true" />
          <span className="text-destructive" style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" }}>
            Crítica
          </span>
        </span>
      );
    case "alta":
      return (
        <span className="flex items-center gap-1.5" aria-label="Severidade alta">
          <AlertTriangle className="w-4 h-4 text-chart-3" aria-hidden="true" />
          <span className="text-chart-3" style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" }}>
            Alta
          </span>
        </span>
      );
    default:
      return (
        <span className="flex items-center gap-1.5" aria-label="Severidade média">
          <Info className="w-4 h-4 text-chart-2" aria-hidden="true" />
          <span className="text-chart-2" style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" }}>
            Média
          </span>
        </span>
      );
  }
}

export function PersonaDetail({ personas, basePath, breadcrumbLabel }: PersonaDetailProps) {
  const { personaId } = useParams();
  const navigate = useNavigate();

  const currentIndex = personas.findIndex((p) => p.id === personaId);
  const persona = personas[currentIndex];

  if (!persona) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">Persona não encontrada.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link to={basePath}>Voltar</Link>
        </Button>
      </div>
    );
  }

  const prevPersona = currentIndex > 0 ? personas[currentIndex - 1] : null;
  const nextPersona = currentIndex < personas.length - 1 ? personas[currentIndex + 1] : null;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
      {/* Breadcrumb */}
      <nav aria-label="Localização atual" className="mb-6">
        <ol className="flex items-center gap-1.5 flex-wrap" style={{ fontSize: "var(--text-label)" }}>
          <li>
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              Início
            </Link>
          </li>
          <li className="text-muted-foreground" aria-hidden="true">/</li>
          <li>
            <Link to={basePath} className="text-muted-foreground hover:text-primary transition-colors">
              {breadcrumbLabel}
            </Link>
          </li>
          <li className="text-muted-foreground" aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground" style={{ fontWeight: "var(--font-weight-semibold)" }}>
            {persona.name}
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="flex flex-col sm:flex-row items-start gap-5 mb-8">
        <img
          src={persona.avatar}
          alt={`Ilustração de ${persona.name}, ${persona.role}`}
          className="w-24 h-24 rounded-full object-cover shrink-0"
        />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className={`inline-block px-2.5 py-0.5 rounded-[var(--radius)] ${persona.tagColor} ${persona.tagTextColor}`}
              style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" }}
            >
              {persona.tag}
            </span>
          </div>
          <h1 style={{ fontSize: "var(--text-h3)", fontWeight: "var(--font-weight-semibold)", lineHeight: "1.3" }}>
            {persona.name}, {persona.age} anos
          </h1>
          <p className="text-muted-foreground mt-1" style={{ fontSize: "var(--text-base)" }}>
            {persona.role}
          </p>
          <p className="text-muted-foreground mt-0.5" style={{ fontSize: "var(--text-label)" }}>
            {persona.location}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-3" aria-label="Módulos utilizados">
            {persona.modules.map((mod) => (
              <Badge key={mod} variant="outline" className="text-xs">
                {mod}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <Tabs defaultValue="demographics">
        <TabsList className="flex flex-wrap h-auto gap-1 mb-4 bg-transparent p-0">
          {[
            { value: "demographics", label: "Perfil" },
            { value: "context", label: "Contexto" },
            { value: "pains", label: "Dores" },
            { value: "goals", label: "Objetivos" },
            { value: "behavior", label: "Comportamento" },
            { value: "quotes", label: "Frases" },
            { value: "metrics", label: "Métricas" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-[var(--radius)] px-3 py-1.5 bg-muted"
              style={{ fontSize: "var(--text-label)" }}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="demographics" className="bg-card border border-border rounded-[var(--radius-card)] p-5">
          <h2 style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-semibold)" }} className="mb-3">
            Características Demográficas
          </h2>
          <ul className="space-y-2">
            {persona.demographics.map((item, i) => (
              <li key={i} className="flex items-start gap-2" style={{ fontSize: "var(--text-label)" }}>
                <span className="text-primary mt-1" aria-hidden="true">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="context" className="bg-card border border-border rounded-[var(--radius-card)] p-5">
          <h2 style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-semibold)" }} className="mb-3">
            Contexto e Rotina
          </h2>
          <ul className="space-y-2">
            {persona.context.map((item, i) => (
              <li key={i} className="flex items-start gap-2" style={{ fontSize: "var(--text-label)" }}>
                <span className="text-primary mt-1" aria-hidden="true">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {persona.relationWithOffice && (
            <div className="mt-5 pt-4 border-t border-border">
              <h3 style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-semibold)" }} className="mb-3">
                Relação com o escritório contábil
              </h3>
              <ul className="space-y-2">
                {persona.relationWithOffice.map((item, i) => (
                  <li key={i} className="flex items-start gap-2" style={{ fontSize: "var(--text-label)" }}>
                    <span className="text-primary mt-1" aria-hidden="true">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </TabsContent>

        <TabsContent value="pains" className="bg-card border border-border rounded-[var(--radius-card)] p-5">
          <h2 style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-semibold)" }} className="mb-3">
            Dores e Frustrações
          </h2>
          <div className="space-y-3">
            {persona.pains.map((pain, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-input-background rounded-[var(--radius)]">
                <SeverityIcon severity={pain.severity} />
                <span className="flex-1" style={{ fontSize: "var(--text-label)" }}>
                  {pain.text}
                </span>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="goals" className="bg-card border border-border rounded-[var(--radius-card)] p-5">
          <h2 style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-semibold)" }} className="mb-3">
            Objetivos e Necessidades
          </h2>
          <ul className="space-y-2">
            {persona.goals.map((goal, i) => (
              <li key={i} className="flex items-start gap-2" style={{ fontSize: "var(--text-label)" }}>
                <span className="text-chart-1 mt-1" aria-hidden="true">✓</span>
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="behavior" className="bg-card border border-border rounded-[var(--radius-card)] p-5">
          <h2 style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-semibold)" }} className="mb-3">
            Comportamento com Software
          </h2>
          <ul className="space-y-2">
            {persona.behavior.map((item, i) => (
              <li key={i} className="flex items-start gap-2" style={{ fontSize: "var(--text-label)" }}>
                <span className="text-primary mt-1" aria-hidden="true">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="quotes" className="bg-card border border-border rounded-[var(--radius-card)] p-5">
          <h2 style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-semibold)" }} className="mb-3">
            Frases Típicas
          </h2>
          <div className="space-y-4">
            {persona.quotes.map((quote, i) => (
              <blockquote
                key={i}
                className="border-l-4 border-primary/40 pl-4 py-2"
              >
                <p className="italic text-foreground" style={{ fontSize: "var(--text-label)", lineHeight: "1.6" }}>
                  "{quote}"
                </p>
                <cite className="block mt-1 text-muted-foreground not-italic" style={{ fontSize: "var(--text-caption)" }}>
                  {persona.name} — {persona.tag}
                </cite>
              </blockquote>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="bg-card border border-border rounded-[var(--radius-card)] p-5">
          <h2 style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-semibold)" }} className="mb-3">
            Métricas de Sucesso
          </h2>
          <ul className="space-y-2">
            {persona.metrics.map((metric, i) => (
              <li key={i} className="flex items-start gap-2" style={{ fontSize: "var(--text-label)" }}>
                <span className="text-chart-2 mt-1" aria-hidden="true">📊</span>
                <span>{metric}</span>
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>

      {/* Navigation between personas */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
        {prevPersona ? (
          <Button
            variant="outline"
            onClick={() => navigate(`${basePath}/${prevPersona.id}`)}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline" style={{ fontSize: "var(--text-label)" }}>
              {prevPersona.name}
            </span>
            <span className="sm:hidden" style={{ fontSize: "var(--text-label)" }}>Anterior</span>
          </Button>
        ) : (
          <div />
        )}
        {nextPersona ? (
          <Button
            variant="outline"
            onClick={() => navigate(`${basePath}/${nextPersona.id}`)}
            className="flex items-center gap-2"
          >
            <span className="hidden sm:inline" style={{ fontSize: "var(--text-label)" }}>
              {nextPersona.name}
            </span>
            <span className="sm:hidden" style={{ fontSize: "var(--text-label)" }}>Próxima</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
