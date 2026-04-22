import { NavLink } from "react-router";
import { ChevronLeft, Clock } from "lucide-react";

interface EmBreveProps {
  titulo?: string;
  mensagem?: string;
  voltarPara?: string;
  voltarLabel?: string;
}

export function EmBreve({
  titulo = "Em breve",
  mensagem = "Esta funcionalidade está em desenvolvimento e estará disponível em breve.",
  voltarPara = "/",
  voltarLabel = "Início",
}: EmBreveProps) {
  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6 lg:p-8">
      {/* Breadcrumb */}
      <NavLink
        to={voltarPara}
        className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors mb-6"
        style={{ fontSize: "var(--text-caption)" }}
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        {voltarLabel}
      </NavLink>

      {/* Conteúdo centralizado */}
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
          <Clock className="w-8 h-8 text-amber-600" aria-hidden="true" />
        </div>
        <h1
          className="text-foreground mb-3"
          style={{
            fontSize: "var(--text-h3)",
            fontWeight: "var(--font-weight-semibold)",
          }}
        >
          {titulo}
        </h1>
        <p
          className="text-muted-foreground max-w-md"
          style={{ fontSize: "var(--text-label)", lineHeight: "1.6" }}
        >
          {mensagem}
        </p>
        <NavLink
          to={voltarPara}
          className="mt-6 px-4 py-2 rounded-[var(--radius)] bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          style={{ fontSize: "var(--text-label)" }}
        >
          Voltar para {voltarLabel}
        </NavLink>
      </div>
    </div>
  );
}
