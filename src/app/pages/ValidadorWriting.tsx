import { useState } from "react";
import { NavLink } from "react-router";
import {
  PenLine,
  ChevronLeft,
  AlertTriangle,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Download,
  Loader2,
  Eye,
  Type,
  Layers,
  ArrowRight,
  Info,
  Upload,
  Link as LinkIcon,
  Palette,
} from "lucide-react";

type Severidade = "critico" | "alerta" | "sugestao";
type StatusProblema = "pendente" | "aceito" | "rejeitado";
type TipoVerificacao = "writing" | "visual" | "ambos";

interface Problema {
  id: string;
  severidade: Severidade;
  regra: string;
  nomeRegra: string;
  elemento: string;
  textAtual: string;
  textSugerido: string;
  status: StatusProblema;
}

interface WritingResult {
  id: string;
  timestamp: number;
  nomeTela: string;
  tipoVerificacao: TipoVerificacao;
  problemas: Problema[];
}

const REGRAS: Record<string, string> = {
  R01: "Voz ativa",
  R02: "Botões de ação primária",
  R03: "Mensagens de erro acionáveis",
  R04: "Labels descritivos",
  R05: "Sentence case em títulos",
  R06: "Sem jargão técnico",
  R07: "Consistência terminológica",
  R08: "Placeholders não substituem labels",
  R09: "Estados vazios com ação",
  R10: "Confirmação de ação destrutiva",
};

const SEV: Record<Severidade, { label: string; badge: string; dot: string; section: string }> = {
  critico: { label: "Crítico", badge: "bg-red-100 text-red-700", dot: "bg-red-500", section: "border-red-200 bg-red-50/40" },
  alerta: { label: "Alerta", badge: "bg-amber-100 text-amber-700", dot: "bg-amber-400", section: "border-amber-200 bg-amber-50/40" },
  sugestao: { label: "Sugestão", badge: "bg-blue-100 text-blue-700", dot: "bg-blue-400", section: "border-blue-200 bg-blue-50/40" },
};

const MOCK_PROBLEMAS_WRITING: Omit<Problema, "status">[] = [
  {
    id: "p1",
    severidade: "critico",
    regra: "R03",
    nomeRegra: REGRAS.R03,
    elemento: "Mensagem de erro — campo CPF",
    textAtual: "Erro de validação",
    textSugerido: "CPF inválido. Verifique se você digitou os 11 dígitos corretamente.",
  },
  {
    id: "p2",
    severidade: "critico",
    regra: "R02",
    nomeRegra: REGRAS.R02,
    elemento: "Botão de ação primária",
    textAtual: "OK",
    textSugerido: "Salvar cadastro",
  },
  {
    id: "p3",
    severidade: "alerta",
    regra: "R05",
    nomeRegra: REGRAS.R05,
    elemento: "Título da tela",
    textAtual: "Cadastro De Cliente",
    textSugerido: "Cadastro de cliente",
  },
  {
    id: "p4",
    severidade: "alerta",
    regra: "R08",
    nomeRegra: REGRAS.R08,
    elemento: "Campo Razão Social",
    textAtual: "Placeholder \"Razão social\" sem label visível",
    textSugerido: "Adicionar label visível \"Razão social\" acima do campo; usar placeholder apenas como dica de formato.",
  },
  {
    id: "p5",
    severidade: "sugestao",
    regra: "R07",
    nomeRegra: REGRAS.R07,
    elemento: "Terminologia — identificador de empresa",
    textAtual: "\"Empresa\" e \"Contribuinte\" usados de forma intercambiável na tela",
    textSugerido: "Padronizar para \"Empresa\" em toda a interface deste fluxo",
  },
];

const MOCK_PROBLEMAS_VISUAL: Omit<Problema, "status">[] = [
  {
    id: "v1",
    severidade: "critico",
    regra: "DS-01",
    nomeRegra: "Tokens de cor",
    elemento: "Botão secundário — cor de fundo",
    textAtual: "#e5e5e5 (hardcoded)",
    textSugerido: "Usar token bg-secondary do Design System",
  },
  {
    id: "v2",
    severidade: "alerta",
    regra: "DS-04",
    nomeRegra: "Tipografia — tamanho",
    elemento: "Label do campo de busca",
    textAtual: "font-size: 11px (abaixo do mínimo legível)",
    textSugerido: "Usar var(--text-caption) = 12px (mínimo para labels secundários)",
  },
];

function gerarResultado(nomeTela: string, tipo: TipoVerificacao): WritingResult {
  const base =
    tipo === "writing"
      ? MOCK_PROBLEMAS_WRITING
      : tipo === "visual"
      ? MOCK_PROBLEMAS_VISUAL
      : [...MOCK_PROBLEMAS_WRITING, ...MOCK_PROBLEMAS_VISUAL];

  return {
    id: `VW-${Date.now()}`,
    timestamp: Date.now(),
    nomeTela,
    tipoVerificacao: tipo,
    problemas: base.map((p) => ({ ...p, status: "pendente" })),
  };
}

function gerarMarkdown(r: WritingResult): string {
  const data = new Date(r.timestamp).toLocaleDateString("pt-BR");
  const tipoLabel = { writing: "Writing", visual: "Visual", ambos: "Writing + Visual" }[r.tipoVerificacao];
  const criticos = r.problemas.filter((p) => p.severidade === "critico");
  const alertas = r.problemas.filter((p) => p.severidade === "alerta");
  const sugestoes = r.problemas.filter((p) => p.severidade === "sugestao");

  const bloco = (label: string, items: Problema[]) =>
    items.length === 0
      ? ""
      : `\n## ${label} (${items.length})\n\n` +
        items
          .map(
            (p) =>
              `### ${p.elemento}\n- **Regra:** ${p.regra} — ${p.nomeRegra}\n- **Atual:** "${p.textAtual}"\n- **Sugerido:** "${p.textSugerido}"\n- **Status:** ${p.status}\n`
          )
          .join("\n");

  return `# Relatório de Validação — ${r.nomeTela}\n\n**Data:** ${data}  \n**Tipo:** ${tipoLabel}  \n**ID:** ${r.id}\n\n**Resumo:** ${criticos.length} crítico(s) · ${alertas.length} alerta(s) · ${sugestoes.length} sugestão(ões)\n${bloco("Críticos", criticos)}${bloco("Alertas", alertas)}${bloco("Sugestões", sugestoes)}`;
}

function ProblemaCard({
  problema,
  onAceitar,
  onRejeitar,
}: {
  problema: Problema;
  onAceitar: (id: string) => void;
  onRejeitar: (id: string) => void;
}) {
  return (
    <div
      className={`rounded-[var(--radius)] border p-4 transition-opacity ${
        problema.status === "rejeitado" ? "opacity-40" : ""
      } bg-card border-border`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] font-medium font-mono ${SEV[problema.severidade].badge}`}
            >
              {problema.regra}
            </span>
            <span style={{ fontSize: "var(--text-caption)" }} className="text-muted-foreground">
              {problema.nomeRegra}
            </span>
          </div>
          <p style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }} className="mb-3">
            {problema.elemento}
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-muted-foreground mt-0.5 shrink-0" style={{ fontSize: "var(--text-caption)" }}>Atual</span>
              <p
                className="text-muted-foreground line-through flex-1"
                style={{ fontSize: "var(--text-caption)", fontFamily: "monospace" }}
              >
                "{problema.textAtual}"
              </p>
            </div>
            <div className="flex items-start gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
              <p
                className="text-foreground flex-1"
                style={{ fontSize: "var(--text-caption)", fontFamily: "monospace" }}
              >
                "{problema.textSugerido}"
              </p>
            </div>
          </div>
        </div>
        {problema.status === "pendente" && (
          <div className="flex gap-1.5 shrink-0">
            <button
              onClick={() => onAceitar(problema.id)}
              title="Aceitar sugestão"
              className="w-8 h-8 rounded-[var(--radius)] bg-green-100 text-green-700 hover:bg-green-200 flex items-center justify-center transition-colors"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={() => onRejeitar(problema.id)}
              title="Rejeitar sugestão"
              className="w-8 h-8 rounded-[var(--radius)] bg-muted text-muted-foreground hover:bg-red-100 hover:text-red-700 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        {problema.status === "aceito" && (
          <span className="shrink-0 flex items-center gap-1 text-green-700" style={{ fontSize: "var(--text-caption)" }}>
            <Check className="w-3.5 h-3.5" /> Aceito
          </span>
        )}
        {problema.status === "rejeitado" && (
          <span className="shrink-0 flex items-center gap-1 text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
            <X className="w-3.5 h-3.5" /> Rejeitado
          </span>
        )}
      </div>
    </div>
  );
}

function GrupoSeveridade({
  severidade,
  problemas,
  onAceitar,
  onRejeitar,
}: {
  severidade: Severidade;
  problemas: Problema[];
  onAceitar: (id: string) => void;
  onRejeitar: (id: string) => void;
}) {
  const [open, setOpen] = useState(true);
  if (problemas.length === 0) return null;
  const cfg = SEV[severidade];
  return (
    <section className={`rounded-[var(--radius-card)] border ${cfg.section} overflow-hidden`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-black/5 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
          <span style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}>
            {cfg.label}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${cfg.badge}`}>
            {problemas.length}
          </span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3">
          {problemas.map((p) => (
            <ProblemaCard key={p.id} problema={p} onAceitar={onAceitar} onRejeitar={onRejeitar} />
          ))}
        </div>
      )}
    </section>
  );
}

export function ValidadorWriting() {
  const [view, setView] = useState<"form" | "result">("form");
  const [nomeTela, setNomeTela] = useState("");
  const [tipo, setTipo] = useState<TipoVerificacao>("ambos");
  const [textos, setTextos] = useState("");
  const [contexto, setContexto] = useState("");
  const [figmaUrl, setFigmaUrl] = useState("");
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<WritingResult | null>(null);

  const canGenerate = nomeTela.trim().length > 0 && textos.trim().length >= 10;

  function handleGerar() {
    setIsGenerating(true);
    setTimeout(() => {
      setResult(gerarResultado(nomeTela, tipo));
      setIsGenerating(false);
      setView("result");
    }, 1800);
  }

  function handleNova() {
    setView("form");
    setResult(null);
    setNomeTela("");
    setTextos("");
    setContexto("");
    setTipo("ambos");
    setFigmaUrl("");
    setArquivo(null);
  }

  function handleStatus(id: string, status: StatusProblema) {
    if (!result) return;
    setResult({
      ...result,
      problemas: result.problemas.map((p) => (p.id === id ? { ...p, status } : p)),
    });
  }

  function handleExportar() {
    if (!result) return;
    const md = gerarMarkdown(result);
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `validacao-${nomeTela.toLowerCase().replace(/\s+/g, "-")}-${result.id}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (view === "result" && result) {
    const criticos = result.problemas.filter((p) => p.severidade === "critico");
    const alertas = result.problemas.filter((p) => p.severidade === "alerta");
    const sugestoes = result.problemas.filter((p) => p.severidade === "sugestao");
    const aceitos = result.problemas.filter((p) => p.status === "aceito").length;
    const tipoLabel = { writing: "Writing", visual: "Visual", ambos: "Writing + Visual" }[result.tipoVerificacao];

    return (
      <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <button
              onClick={handleNova}
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors mb-3"
              style={{ fontSize: "var(--text-caption)" }}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Nova verificação
            </button>
            <h1 style={{ fontSize: "var(--text-h3)", fontWeight: "var(--font-weight-semibold)" }}>
              {result.nomeTela}
            </h1>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-medium">
                {tipoLabel}
              </span>
              <span className="text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
                {result.id} · {new Date(result.timestamp).toLocaleString("pt-BR")}
              </span>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleNova}
              className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius)] border border-border hover:bg-muted transition-colors"
              style={{ fontSize: "var(--text-label)" }}
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Nova</span>
            </button>
            <button
              onClick={handleExportar}
              className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius)] bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              style={{ fontSize: "var(--text-label)" }}
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Exportar .md</span>
            </button>
          </div>
        </div>

        <div className="flex gap-6 flex-col lg:flex-row">
          {/* Sidebar — score */}
          <aside className="lg:w-48 shrink-0">
            <div className="bg-card border border-border rounded-[var(--radius-card)] p-4 space-y-3 lg:sticky lg:top-4">
              <p style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)", textTransform: "uppercase", letterSpacing: "0.06em" }} className="text-muted-foreground">
                Resumo
              </p>
              {(["critico", "alerta", "sugestao"] as Severidade[]).map((sev) => {
                const count = result.problemas.filter((p) => p.severidade === sev).length;
                return (
                  <div key={sev} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${SEV[sev].dot}`} />
                      <span style={{ fontSize: "var(--text-caption)" }}>{SEV[sev].label}</span>
                    </div>
                    <span style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}>{count}</span>
                  </div>
                );
              })}
              <div className="border-t border-border pt-3">
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: "var(--text-caption)" }} className="text-muted-foreground">Aceitos</span>
                  <span style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }} className="text-green-700">{aceitos}</span>
                </div>
              </div>
              {criticos.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-[var(--radius)] p-2 mt-2">
                  <p style={{ fontSize: "var(--text-caption)" }} className="text-red-700">
                    Resolva os itens críticos antes do handoff.
                  </p>
                </div>
              )}
            </div>
          </aside>

          {/* Problems */}
          <div className="flex-1 min-w-0 space-y-4">
            <GrupoSeveridade
              severidade="critico"
              problemas={criticos}
              onAceitar={(id) => handleStatus(id, "aceito")}
              onRejeitar={(id) => handleStatus(id, "rejeitado")}
            />
            <GrupoSeveridade
              severidade="alerta"
              problemas={alertas}
              onAceitar={(id) => handleStatus(id, "aceito")}
              onRejeitar={(id) => handleStatus(id, "rejeitado")}
            />
            <GrupoSeveridade
              severidade="sugestao"
              problemas={sugestoes}
              onAceitar={(id) => handleStatus(id, "aceito")}
              onRejeitar={(id) => handleStatus(id, "rejeitado")}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6 lg:p-8">
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
      <div className="flex items-start gap-4 mb-8">
        <div className="w-12 h-12 rounded-[var(--radius-card)] bg-rose-100 flex items-center justify-center shrink-0">
          <PenLine className="w-6 h-6 text-rose-600" aria-hidden="true" />
        </div>
        <div>
          <h1 style={{ fontSize: "var(--text-h3)", fontWeight: "var(--font-weight-semibold)" }}>
            Validador de Writing e Visual
          </h1>
          <p className="text-muted-foreground mt-1" style={{ fontSize: "var(--text-label)", lineHeight: "1.5" }}>
            Verifique conformidade com o Guia de UX Writing e o Design System da Domínio.
          </p>
        </div>
      </div>

      {/* Cards de recursos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Card Guia de UX Writing */}
        <NavLink
          to="/guia-writing"
          className="group flex flex-col gap-3 p-4 bg-card border border-border rounded-[var(--radius-card)] hover:border-primary/30 hover:shadow-[var(--elevation-sm)] transition-all duration-200"
        >
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-[var(--radius)] bg-blue-100 flex items-center justify-center shrink-0">
              <PenLine className="w-5 h-5 text-blue-600" aria-hidden="true" />
            </div>
            <ArrowRight
              className="w-4 h-4 text-primary shrink-0 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </div>
          <div>
            <p
              className="text-foreground mb-1"
              style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}
            >
              Guia de UX Writing
            </p>
            <p className="text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
              13 seções com regras de linguagem, tom e voz
            </p>
          </div>
        </NavLink>

        {/* Card DOM DS */}
        <div className="flex flex-col gap-3 p-4 bg-card border border-border rounded-[var(--radius-card)] opacity-60">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-[var(--radius)] bg-purple-100 flex items-center justify-center shrink-0">
              <Palette className="w-5 h-5 text-purple-600" aria-hidden="true" />
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-medium">
              Em breve
            </span>
          </div>
          <div>
            <p
              className="text-foreground mb-1"
              style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}
            >
              DOM Design System
            </p>
            <p className="text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
              Componentes, tokens e padrões visuais
            </p>
          </div>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-[var(--radius-card)] p-3.5 mb-6 flex gap-3">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p style={{ fontSize: "var(--text-caption)" }} className="text-blue-700">
          Modo demonstração — os resultados são exemplos representativos. A integração com IA estará disponível em breve.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-5">
        {/* Nome da tela */}
        <div>
          <label
            htmlFor="nome-tela"
            style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}
            className="block mb-1.5"
          >
            Nome da tela ou fluxo <span className="text-red-500">*</span>
          </label>
          <input
            id="nome-tela"
            type="text"
            placeholder="Ex: Cadastro de cliente — dados fiscais"
            value={nomeTela}
            onChange={(e) => setNomeTela(e.target.value)}
            className="w-full px-3 py-2.5 bg-input-background border border-border rounded-[var(--radius)] outline-none focus:ring-2 focus:ring-ring/50"
            style={{ fontSize: "var(--text-label)" }}
          />
        </div>

        {/* Tipo de verificação */}
        <fieldset>
          <legend
            style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}
            className="mb-2"
          >
            Tipo de verificação
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {(
              [
                { value: "writing", label: "UX Writing", desc: "Textos da interface", icon: Type },
                { value: "visual", label: "Visual / DS", desc: "Componentes e tokens", icon: Eye },
                { value: "ambos", label: "Completo", desc: "Writing + Visual", icon: Layers },
              ] as { value: TipoVerificacao; label: string; desc: string; icon: typeof Type }[]
            ).map(({ value, label, desc, icon: Icon }) => (
              <label
                key={value}
                className={`flex items-start gap-3 p-3.5 rounded-[var(--radius-card)] border cursor-pointer transition-colors ${
                  tipo === value
                    ? "border-primary/60 bg-primary/5"
                    : "border-border hover:bg-muted/50"
                }`}
              >
                <input
                  type="radio"
                  name="tipo"
                  value={value}
                  checked={tipo === value}
                  onChange={() => setTipo(value)}
                  className="mt-0.5"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    <span style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}>{label}</span>
                  </div>
                  <p className="text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>{desc}</p>
                </div>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Textos */}
        <div>
          <label
            htmlFor="textos"
            style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}
            className="block mb-1.5"
          >
            Textos da interface <span className="text-red-500">*</span>
          </label>
          <p className="text-muted-foreground mb-2" style={{ fontSize: "var(--text-caption)" }}>
            Cole os textos que aparecem na tela: títulos, labels, botões, mensagens de erro, placeholders.
          </p>
          <textarea
            id="textos"
            rows={6}
            placeholder={"Título: Cadastro De Cliente\nBotão principal: OK\nErro CPF: Erro de validação\nLabel razão social: [apenas placeholder]\n..."}
            value={textos}
            onChange={(e) => setTextos(e.target.value)}
            className="w-full px-3 py-2.5 bg-input-background border border-border rounded-[var(--radius)] outline-none focus:ring-2 focus:ring-ring/50 resize-y font-mono"
            style={{ fontSize: "var(--text-caption)" }}
          />
          <p className="text-muted-foreground mt-1" style={{ fontSize: "var(--text-caption)" }}>
            {textos.length} caracteres
          </p>
        </div>

        {/* Contexto adicional */}
        <div>
          <label
            htmlFor="contexto"
            style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}
            className="block mb-1.5"
          >
            Contexto adicional <span className="text-muted-foreground font-normal">(opcional)</span>
          </label>
          <textarea
            id="contexto"
            rows={3}
            placeholder="Descreva o objetivo da tela, o perfil do usuário e qualquer detalhe relevante para a validação..."
            value={contexto}
            onChange={(e) => setContexto(e.target.value)}
            className="w-full px-3 py-2.5 bg-input-background border border-border rounded-[var(--radius)] outline-none focus:ring-2 focus:ring-ring/50 resize-y"
            style={{ fontSize: "var(--text-label)" }}
          />
        </div>

        {/* Tela para análise */}
        <div>
          <label
            style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}
            className="block mb-1.5"
          >
            Tela para análise <span className="text-muted-foreground font-normal">(opcional)</span>
          </label>
          <p className="text-muted-foreground mb-3" style={{ fontSize: "var(--text-caption)" }}>
            Envie uma imagem da tela ou cole o link do Figma para análise visual.
          </p>

          {/* URL do Figma */}
          <div className="mb-3">
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="url"
                placeholder="https://figma.com/file/..."
                value={figmaUrl}
                onChange={(e) => {
                  setFigmaUrl(e.target.value);
                  if (e.target.value) setArquivo(null);
                }}
                className="w-full pl-10 pr-3 py-2.5 bg-input-background border border-border rounded-[var(--radius)] outline-none focus:ring-2 focus:ring-ring/50"
                style={{ fontSize: "var(--text-label)" }}
              />
            </div>
            {figmaUrl && !figmaUrl.includes("figma.com") && (
              <p className="text-red-600 mt-1 flex items-center gap-1" style={{ fontSize: "var(--text-caption)" }}>
                <AlertTriangle className="w-3 h-3" />
                URL inválida. Cole um link do Figma (figma.com)
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>ou</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Upload de arquivo */}
          <div>
            <label
              htmlFor="arquivo-upload"
              className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-border rounded-[var(--radius-card)] hover:border-primary/50 hover:bg-muted/30 transition-colors cursor-pointer"
            >
              <Upload className="w-5 h-5 text-muted-foreground" />
              <div className="text-center">
                <p style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }} className="text-foreground">
                  {arquivo ? arquivo.name : "Clique para enviar uma imagem"}
                </p>
                <p className="text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
                  PNG, JPG ou SVG até 10MB
                </p>
              </div>
              <input
                id="arquivo-upload"
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    if (file.size > 10 * 1024 * 1024) {
                      alert("Arquivo muito grande. Tamanho máximo: 10MB");
                      return;
                    }
                    setArquivo(file);
                    setFigmaUrl("");
                  }
                }}
                className="sr-only"
              />
            </label>
            {arquivo && (
              <button
                onClick={() => setArquivo(null)}
                className="mt-2 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                style={{ fontSize: "var(--text-caption)" }}
              >
                <X className="w-3 h-3" />
                Remover arquivo
              </button>
            )}
          </div>
        </div>

        {/* Regras que serão verificadas */}
        <div className="bg-muted/40 rounded-[var(--radius-card)] border border-border p-4">
          <p style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)", textTransform: "uppercase", letterSpacing: "0.06em" }} className="text-muted-foreground mb-2.5">
            Regras que serão verificadas
          </p>
          <ul className="space-y-1">
            {Object.entries(REGRAS).map(([cod, nome]) => (
              <li key={cod} className="flex items-center gap-2">
                <span className="w-8 shrink-0 text-center px-1 py-0.5 rounded bg-muted font-mono" style={{ fontSize: "var(--text-caption)" }}>{cod}</span>
                <span style={{ fontSize: "var(--text-caption)" }}>{nome}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleGerar}
          disabled={!canGenerate || isGenerating}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-[var(--radius)] bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Verificando conformidade…
            </>
          ) : (
            <>
              <PenLine className="w-4 h-4" />
              Verificar conformidade
            </>
          )}
        </button>
        {!canGenerate && !isGenerating && (
          <p className="text-center text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
            Preencha o nome da tela e cole os textos para habilitar a verificação.
          </p>
        )}
      </div>
    </div>
  );
}
