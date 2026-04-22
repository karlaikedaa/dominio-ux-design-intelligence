import { Link } from "react-router";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import type { Persona } from "../data/personas";

interface PersonaCardProps {
  persona: Persona;
  basePath: string;
  showDigitalLevel?: boolean;
}

export function PersonaCard({ persona, basePath, showDigitalLevel }: PersonaCardProps) {
  const linkPath = `${basePath}/${persona.id}`;

  return (
    <article
      className="group bg-card border border-border rounded-[var(--radius-card)] p-5 transition-all duration-200 hover:shadow-[var(--elevation-sm)] hover:border-primary/40 focus-within:ring-2 focus-within:ring-ring/50 focus-within:ring-offset-2"
    >
      <div className="flex items-start gap-4">
        <img
          src={persona.avatar}
          alt={`Ilustração de ${persona.name}, ${persona.role}`}
          className="w-16 h-16 rounded-full object-cover shrink-0"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <span
            className={`inline-block px-2 py-0.5 rounded-[var(--radius)] text-xs mb-2 ${persona.tagColor} ${persona.tagTextColor}`}
            style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" }}
          >
            {persona.tag}
          </span>
          <h3 style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-semibold)", lineHeight: "1.3" }}>
            {persona.name}, {persona.age} anos
          </h3>
          <p className="text-muted-foreground" style={{ fontSize: "var(--text-label)" }}>
            {persona.role}
          </p>
        </div>
      </div>

      <p className="mt-3 text-foreground" style={{ fontSize: "var(--text-label)", lineHeight: "1.5" }}>
        {persona.summary}
      </p>

      {showDigitalLevel && persona.digitalLevel !== undefined && (
        <div className="mt-3">
          <span
            className="text-muted-foreground"
            style={{ fontSize: "var(--text-caption)" }}
            id={`digital-level-label-${persona.id}`}
          >
            Nível de maturidade digital
          </span>
          <div
            className="flex items-center gap-2 mt-1"
            role="img"
            aria-label={`Nível digital: ${persona.digitalLevel} de 5 — ${persona.digitalLevelLabel}`}
          >
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-full ${
                    level <= persona.digitalLevel!
                      ? "bg-primary"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <span style={{ fontSize: "var(--text-caption)" }} className="text-muted-foreground">
              {persona.digitalLevelLabel}
            </span>
          </div>
        </div>
      )}

      <div className="mt-3" aria-label="Módulos utilizados">
        <span className="text-muted-foreground block mb-1.5" style={{ fontSize: "var(--text-caption)" }}>
          Módulos utilizados
        </span>
        <div className="flex flex-wrap gap-1.5">
          {persona.modules.map((mod) => (
            <Badge key={mod} variant="outline" className="text-xs px-2 py-0.5">
              {mod}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <Button asChild variant="default" size="sm" className="w-full">
          <Link
            to={linkPath}
            aria-label={`Ver perfil completo de ${persona.name}`}
          >
            Ver perfil completo
          </Link>
        </Button>
      </div>
    </article>
  );
}
