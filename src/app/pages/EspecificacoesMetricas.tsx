import { useState } from "react";
import { NavLink } from "react-router";
import {
  BarChart3,
  ChevronLeft,
  Loader2,
  RotateCcw,
  Download,
  Info,
  CheckCircle2,
  GitMerge,
  MousePointer,
  Clock,
  TrendingUp,
  AlertCircle,
  Upload,
  Link as LinkIcon,
  ExternalLink,
  X,
} from "lucide-react";

// ───────────── Types ─────────────

interface EventoFunil {
  etapa: string;
  stepIndex: number;
  totalSteps: number;
  eventos: {
    tipo: "task_step_start" | "task_step_complete" | "task_step_error" | "task_abandon";
    quando: string;
  }[];
}

interface EventoInteracao {
  elementId: string;
  elementType: string;
  elementLabel: string;
  tela: string;
}

interface ParamDicionario {
  param: string;
  tipo: string;
  descricao: string;
  exemplo: string;
}

interface MetricaCalculavel {
  nome: string;
  formula: string;
  categoria: string;
}

interface MetricasResult {
  id: string;
  timestamp: number;
  nomeTarefa: string;
  idSlug: string;
  modulo: string;
  persona: string;
  categorias: string[];
  etapasFunil: EventoFunil[];
  eventosInteracao: EventoInteracao[];
  dicionario: ParamDicionario[];
  metricas: MetricaCalculavel[];
}

// ───────────── Constants ─────────────

const MODULOS = [
  "Escrita Fiscal",
  "Contabilidade",
  "Folha de Pagamento",
  "Patrimônio",
  "Lalur",
  "Financeiro",
  "Fluxo de Caixa",
  "Conciliação Bancária",
  "Notas Fiscais",
  "Relatórios Gerenciais",
  "Gestão de Clientes",
  "Configurações",
];

const PERSONAS_OPCOES = [
  { id: "contador-operacional", label: "Juliana — Contadora operacional" },
  { id: "contador-gerencial", label: "Ricardo — Contador gerencial" },
  { id: "socio-contador", label: "Fernanda — Sócia-contadora" },
  { id: "analista-fiscal", label: "Bruno — Analista fiscal" },
  { id: "empresario-pme", label: "Marcos — Empresário PME" },
  { id: "gestora-financeira", label: "Ana Lúcia — Gestora financeira" },
  { id: "empregado", label: "Carlos — Empregado (app)" },
];

const CATEGORIAS_METRICAS = [
  { id: "funil", label: "Funil de conversão", icon: GitMerge, desc: "task_step_start/complete/error/abandon" },
  { id: "interacao", label: "Eventos de interação", icon: MousePointer, desc: "element_click, dead_click" },
  { id: "tempo", label: "Tempo e profundidade", icon: Clock, desc: "screen_time, scroll_depth" },
  { id: "erros", label: "Erros e validações", icon: AlertCircle, desc: "error_shown, form_error" },
  { id: "retorno", label: "Retorno e abandono", icon: TrendingUp, desc: "task_abandon, session_end" },
];

const SEV_TABS = ["jornada", "eventos", "dicionario", "metricas"] as const;
type Tab = typeof SEV_TABS[number];

// ───────────── Mock generator ─────────────

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function gerarResultado(
  nomeTarefa: string,
  idSlug: string,
  modulo: string,
  persona: string,
  categorias: string[]
): MetricasResult {
  const etapasFunil: EventoFunil[] = [
    {
      etapa: "Início da tarefa",
      stepIndex: 1,
      totalSteps: 3,
      eventos: [
        { tipo: "task_step_start", quando: "Usuário acessa a tela pela primeira vez" },
        { tipo: "task_abandon", quando: "Usuário fecha a aba ou navega para outra seção" },
      ],
    },
    {
      etapa: "Preenchimento dos dados",
      stepIndex: 2,
      totalSteps: 3,
      eventos: [
        { tipo: "task_step_start", quando: "Usuário começa a preencher o primeiro campo" },
        { tipo: "task_step_complete", quando: "Todos os campos obrigatórios preenchidos e sem erro" },
        { tipo: "task_step_error", quando: "Validação falha em algum campo" },
        { tipo: "task_abandon", quando: "Usuário não interage por 2+ min ou fecha sem salvar" },
      ],
    },
    {
      etapa: "Confirmação e salvamento",
      stepIndex: 3,
      totalSteps: 3,
      eventos: [
        { tipo: "task_step_start", quando: "Usuário clica no botão de salvar" },
        { tipo: "task_step_complete", quando: "API retorna sucesso (HTTP 200/201)" },
        { tipo: "task_step_error", quando: "API retorna erro ou timeout" },
      ],
    },
  ];

  const eventosInteracao: EventoInteracao[] = [
    { elementId: `btn-salvar-${idSlug}`, elementType: "button", elementLabel: "Salvar", tela: nomeTarefa },
    { elementId: `btn-cancelar-${idSlug}`, elementType: "button", elementLabel: "Cancelar", tela: nomeTarefa },
    { elementId: `link-ajuda-${idSlug}`, elementType: "link", elementLabel: "Ajuda", tela: nomeTarefa },
    { elementId: `tab-${idSlug}-dados`, elementType: "tab", elementLabel: "Dados principais", tela: nomeTarefa },
  ];

  const dicionario: ParamDicionario[] = [
    { param: "task_id", tipo: "string", descricao: "Identificador único da tarefa/fluxo", exemplo: `"${idSlug}"` },
    { param: "step_name", tipo: "string", descricao: "Nome descritivo da etapa do funil", exemplo: '"preenchimento-dados"' },
    { param: "step_index", tipo: "number", descricao: "Posição da etapa no funil (começa em 1)", exemplo: "2" },
    { param: "total_steps", tipo: "number", descricao: "Total de etapas do funil", exemplo: "3" },
    { param: "element_id", tipo: "string", descricao: "ID único do elemento interativo no DOM", exemplo: `"btn-salvar-${idSlug}"` },
    { param: "element_type", tipo: "string", descricao: "Tipo do elemento (button, link, tab, input)", exemplo: '"button"' },
    { param: "element_label", tipo: "string", descricao: "Texto visível ou aria-label do elemento", exemplo: '"Salvar"' },
    { param: "error_type", tipo: "string", descricao: "Categoria do erro (validation, api, timeout)", exemplo: '"validation"' },
    { param: "error_message", tipo: "string", descricao: "Mensagem de erro exibida ao usuário", exemplo: '"CPF inválido. Verifique os 11 dígitos."' },
    { param: "field_id", tipo: "string", descricao: "ID do campo onde o erro ocorreu", exemplo: '"campo-cpf"' },
    { param: "screen_time_ms", tipo: "number", descricao: "Tempo em milissegundos que o usuário ficou na tela", exemplo: "45200" },
    { param: "scroll_depth_pct", tipo: "number", descricao: "Porcentagem máxima de rolagem da tela (0–100)", exemplo: "72" },
    { param: "persona_segment", tipo: "string", descricao: "Segmento da persona do usuário logado", exemplo: '"contador-operacional"' },
    { param: "modulo", tipo: "string", descricao: "Módulo do sistema onde a tarefa ocorre", exemplo: `"${slugify(modulo)}"` },
  ];

  const metricas: MetricaCalculavel[] = [];

  if (categorias.includes("funil")) {
    metricas.push(
      { nome: "Taxa de conclusão da tarefa", formula: "task_step_complete(step=3) / task_step_start(step=1)", categoria: "Funil" },
      { nome: "Taxa de abandono por etapa", formula: "task_abandon(step=N) / task_step_start(step=N)", categoria: "Funil" },
      { nome: "Taxa de erro por etapa", formula: "task_step_error(step=N) / task_step_start(step=N)", categoria: "Funil" }
    );
  }
  if (categorias.includes("tempo")) {
    metricas.push(
      { nome: "Tempo médio de conclusão", formula: "AVG(screen_time_ms) WHERE task_step_complete(step=3)", categoria: "Tempo" },
      { nome: "Profundidade de rolagem média", formula: "AVG(scroll_depth_pct) por tela e por segmento", categoria: "Tempo" }
    );
  }
  if (categorias.includes("interacao")) {
    metricas.push(
      { nome: "Elementos com dead click frequente", formula: "COUNT(dead_click) por element_id, ordena desc", categoria: "Interação" },
      { nome: "Cliques no link de ajuda por sessão", formula: "COUNT(element_click WHERE element_id='link-ajuda') / sessão", categoria: "Interação" }
    );
  }
  if (categorias.includes("erros")) {
    metricas.push(
      { nome: "Taxa de erro de validação por campo", formula: "COUNT(error_shown WHERE error_type='validation') GROUP BY field_id", categoria: "Erros" },
      { nome: "Campos com maior frequência de erro", formula: "COUNT(form_error) GROUP BY field_id, ORDER BY count desc", categoria: "Erros" }
    );
  }
  if (categorias.includes("retorno")) {
    metricas.push(
      { nome: "Taxa de retorno após abandono", formula: "Sessões com task_step_start após task_abandon na mesma tarefa", categoria: "Retorno" }
    );
  }

  if (metricas.length === 0) {
    metricas.push(
      { nome: "Taxa de conclusão da tarefa", formula: "task_step_complete(step=3) / task_step_start(step=1)", categoria: "Funil" },
      { nome: "Tempo médio de conclusão", formula: "AVG(screen_time_ms) WHERE task_step_complete(step=3)", categoria: "Tempo" }
    );
  }

  return {
    id: `TG-${Date.now()}`,
    timestamp: Date.now(),
    nomeTarefa,
    idSlug,
    modulo,
    persona,
    categorias,
    etapasFunil,
    eventosInteracao,
    dicionario,
    metricas,
  };
}

// ───────────── Export helpers ─────────────

function gerarMarkdown(r: MetricasResult): string {
  const data = new Date(r.timestamp).toLocaleDateString("pt-BR");

  const funilMd = r.etapasFunil
    .map(
      (e) =>
        `### Etapa ${e.stepIndex}: ${e.etapa}\n\n` +
        e.eventos
          .map((ev) => `- \`${ev.tipo}\` (step_index: ${e.stepIndex}, total_steps: ${e.totalSteps}) — ${ev.quando}`)
          .join("\n")
    )
    .join("\n\n");

  const interacaoMd = r.eventosInteracao
    .map(
      (ev) =>
        `- \`element_click\`: element_id="${ev.elementId}", element_type="${ev.elementType}", element_label="${ev.elementLabel}"`
    )
    .join("\n");

  const dicMd =
    "| Parâmetro | Tipo | Descrição | Exemplo |\n|-----------|------|-----------|--------|\n" +
    r.dicionario.map((d) => `| \`${d.param}\` | ${d.tipo} | ${d.descricao} | ${d.exemplo} |`).join("\n");

  const metricasMd = r.metricas
    .map((m) => `- **${m.nome}** _(${m.categoria})_\n  \`${m.formula}\``)
    .join("\n");

  return `# Especificações de Tagueamento — ${r.nomeTarefa}

**Data:** ${data}
**Módulo:** ${r.modulo}
**Persona:** ${r.persona}
**task_id:** \`${r.idSlug}\`
**ID:** ${r.id}

## Mapa da Jornada — Eventos de Funil

${funilMd}

## Eventos de Interação

${interacaoMd}

## Dicionário de Parâmetros

${dicMd}

## Métricas Calculáveis

${metricasMd}
`;
}

function gerarJSON(r: MetricasResult): string {
  return JSON.stringify(
    {
      meta: {
        id: r.id,
        task_id: r.idSlug,
        tarefa: r.nomeTarefa,
        modulo: r.modulo,
        persona: r.persona,
        geradoEm: new Date(r.timestamp).toISOString(),
      },
      funil: r.etapasFunil.map((e) => ({
        etapa: e.etapa,
        step_index: e.stepIndex,
        total_steps: e.totalSteps,
        eventos: e.eventos.map((ev) => ({
          nome: ev.tipo,
          params: {
            task_id: r.idSlug,
            step_name: slugify(e.etapa),
            step_index: e.stepIndex,
            total_steps: e.totalSteps,
          },
          quando: ev.quando,
        })),
      })),
      interacao: r.eventosInteracao.map((ev) => ({
        nome: "element_click",
        params: {
          element_id: ev.elementId,
          element_type: ev.elementType,
          element_label: ev.elementLabel,
          task_id: r.idSlug,
        },
      })),
      dicionario: r.dicionario,
      metricas_calculaveis: r.metricas,
    },
    null,
    2
  );
}

// ───────────── Event type badge ─────────────

const EVENTO_CORES: Record<string, string> = {
  task_step_start: "bg-blue-100 text-blue-700",
  task_step_complete: "bg-green-100 text-green-700",
  task_step_error: "bg-red-100 text-red-700",
  task_abandon: "bg-amber-100 text-amber-700",
};

// ───────────── Component ─────────────

export function EspecificacoesMetricas() {
  const [view, setView] = useState<"form" | "result">("form");
  const [nomeTarefa, setNomeTarefa] = useState("");
  const [modulo, setModulo] = useState("");
  const [persona, setPersona] = useState("");
  const [categorias, setCategorias] = useState<string[]>(["funil", "interacao"]);
  const [descricaoJornada, setDescricaoJornada] = useState("");
  const [figmaUrl, setFigmaUrl] = useState("");
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<MetricasResult | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("jornada");

  const idSlug = slugify(nomeTarefa || "tarefa");
  const canGenerate = nomeTarefa.trim().length > 0 && modulo.length > 0;

  function toggleCategoria(id: string) {
    setCategorias((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  function handleGerar() {
    setIsGenerating(true);
    setTimeout(() => {
      setResult(gerarResultado(nomeTarefa, idSlug, modulo, persona || "Não especificada", categorias));
      setIsGenerating(false);
      setView("result");
      setActiveTab("jornada");
    }, 1800);
  }

  function handleNova() {
    setView("form");
    setResult(null);
    setNomeTarefa("");
    setModulo("");
    setPersona("");
    setCategorias(["funil", "interacao"]);
    setDescricaoJornada("");
    setFigmaUrl("");
    setArquivo(null);
  }

  function baixar(content: string, ext: string, mime: string) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tagueamento-${result!.idSlug}-${result!.id}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ─── Result view ───

  if (view === "result" && result) {
    const tabLabels: Record<Tab, string> = {
      jornada: "Mapa da Jornada",
      eventos: "Eventos",
      dicionario: "Dicionário",
      metricas: "Métricas",
    };

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
              Nova especificação
            </button>
            <h1 style={{ fontSize: "var(--text-h3)", fontWeight: "var(--font-weight-semibold)" }}>
              {result.nomeTarefa}
            </h1>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <code className="px-2 py-0.5 rounded bg-muted font-mono text-[10px]">
                task_id: "{result.idSlug}"
              </code>
              <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[10px] font-medium">
                {result.modulo}
              </span>
              <span className="text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
                {result.id}
              </span>
            </div>
          </div>
          <div className="flex gap-2 shrink-0 flex-wrap justify-end">
            <button
              onClick={handleNova}
              className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius)] border border-border hover:bg-muted transition-colors"
              style={{ fontSize: "var(--text-label)" }}
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Nova</span>
            </button>
            <button
              onClick={() => baixar(gerarJSON(result), "json", "application/json")}
              className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius)] border border-border hover:bg-muted transition-colors"
              style={{ fontSize: "var(--text-label)" }}
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">.json</span>
            </button>
            <button
              onClick={() => baixar(gerarMarkdown(result), "md", "text/markdown")}
              className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius)] bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              style={{ fontSize: "var(--text-label)" }}
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Exportar .md</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border mb-6">
          <nav className="flex gap-0 overflow-x-auto" aria-label="Seções do resultado">
            {SEV_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                style={{ fontSize: "var(--text-label)" }}
              >
                {tabLabels[tab]}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab: Mapa da Jornada */}
        {activeTab === "jornada" && (
          <div className="space-y-4">
            <p className="text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
              Eventos de funil por etapa da jornada. Implemente na ordem apresentada.
            </p>
            {result.etapasFunil.map((etapa) => (
              <div key={etapa.stepIndex} className="bg-card border border-border rounded-[var(--radius-card)] overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 bg-muted/30 border-b border-border">
                  <span
                    className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"
                    style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" }}
                  >
                    {etapa.stepIndex}
                  </span>
                  <span style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}>
                    {etapa.etapa}
                  </span>
                  <code className="ml-auto text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
                    step_index: {etapa.stepIndex} / {etapa.totalSteps}
                  </code>
                </div>
                <div className="p-4 space-y-3">
                  {etapa.eventos.map((ev, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium font-mono shrink-0 ${EVENTO_CORES[ev.tipo] || "bg-muted text-muted-foreground"}`}>
                        {ev.tipo}
                      </span>
                      <p style={{ fontSize: "var(--text-caption)" }} className="text-muted-foreground pt-0.5">
                        {ev.quando}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Eventos */}
        {activeTab === "eventos" && (
          <div className="space-y-4">
            <p className="text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
              Catálogo completo de eventos com parâmetros prontos para implementação.
            </p>

            {/* Funil events as JSON blocks */}
            {result.etapasFunil.map((etapa) =>
              etapa.eventos.map((ev, j) => (
                <div key={`${etapa.stepIndex}-${j}`} className="bg-card border border-border rounded-[var(--radius-card)] overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/30">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium font-mono ${EVENTO_CORES[ev.tipo] || "bg-muted text-muted-foreground"}`}>
                      {ev.tipo}
                    </span>
                    <span className="text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
                      Etapa {etapa.stepIndex}: {etapa.etapa}
                    </span>
                  </div>
                  <pre className="px-4 py-3 text-muted-foreground overflow-x-auto" style={{ fontSize: "var(--text-caption)", lineHeight: "1.7" }}>
{`task_id: "${result.idSlug}"
step_name: "${slugify(etapa.etapa)}"
step_index: ${etapa.stepIndex}
total_steps: ${etapa.totalSteps}
modulo: "${slugify(result.modulo)}"
persona_segment: "${result.persona !== "Não especificada" ? slugify(result.persona.split(" — ")[0]) : ""}"`}
                  </pre>
                </div>
              ))
            )}

            {/* Interaction events */}
            {result.eventosInteracao.map((ev, i) => (
              <div key={i} className="bg-card border border-border rounded-[var(--radius-card)] overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/30">
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium font-mono bg-green-100 text-green-700">
                    element_click
                  </span>
                  <span className="text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
                    {ev.elementLabel}
                  </span>
                </div>
                <pre className="px-4 py-3 text-muted-foreground overflow-x-auto" style={{ fontSize: "var(--text-caption)", lineHeight: "1.7" }}>
{`element_id: "${ev.elementId}"
element_type: "${ev.elementType}"
element_label: "${ev.elementLabel}"
task_id: "${result.idSlug}"`}
                </pre>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Dicionário */}
        {activeTab === "dicionario" && (
          <div>
            <p className="text-muted-foreground mb-4" style={{ fontSize: "var(--text-caption)" }}>
              Definição de todos os parâmetros utilizados nos eventos. Compartilhe com o time de dados.
            </p>
            <div className="overflow-x-auto rounded-[var(--radius-card)] border border-border">
              <table className="w-full text-left">
                <thead className="bg-muted/50">
                  <tr>
                    {["Parâmetro", "Tipo", "Descrição", "Exemplo"].map((h) => (
                      <th
                        key={h}
                        className="px-3 py-2.5 text-muted-foreground whitespace-nowrap"
                        style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.dicionario.map((d, i) => (
                    <tr key={i} className={`border-t border-border ${i % 2 === 0 ? "bg-card" : "bg-muted/20"}`}>
                      <td className="px-3 py-2.5 font-mono text-primary" style={{ fontSize: "var(--text-caption)" }}>
                        {d.param}
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="px-1.5 py-0.5 rounded bg-muted font-mono" style={{ fontSize: "var(--text-caption)" }}>
                          {d.tipo}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
                        {d.descricao}
                      </td>
                      <td className="px-3 py-2.5 font-mono text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
                        {d.exemplo}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab: Métricas */}
        {activeTab === "metricas" && (
          <div>
            <p className="text-muted-foreground mb-4" style={{ fontSize: "var(--text-caption)" }}>
              Métricas que o time de dados poderá calcular com os eventos especificados.
            </p>
            <div className="space-y-3">
              {result.metricas.map((m, i) => (
                <div key={i} className="bg-card border border-border rounded-[var(--radius-card)] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                        <span style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}>
                          {m.nome}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-medium">{m.categoria}</span>
                      </div>
                      <code className="text-muted-foreground block mt-1.5 bg-muted/50 px-3 py-1.5 rounded-[var(--radius)]" style={{ fontSize: "var(--text-caption)" }}>
                        {m.formula}
                      </code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ─── Form view ───

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
        <div className="w-12 h-12 rounded-[var(--radius-card)] bg-purple-100 flex items-center justify-center shrink-0">
          <BarChart3 className="w-6 h-6 text-purple-600" aria-hidden="true" />
        </div>
        <div>
          <h1 style={{ fontSize: "var(--text-h3)", fontWeight: "var(--font-weight-semibold)" }}>
            Especificações de tagueamento
          </h1>
          <p className="text-muted-foreground mt-1" style={{ fontSize: "var(--text-label)", lineHeight: "1.5" }}>
            Gere o dicionário de eventos de analytics a partir da descrição da jornada.
          </p>
        </div>
      </div>

      {/* Card de recurso */}
      <a
        href="https://app.datadoghq.com"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-4 p-4 mb-6 bg-card border border-border rounded-[var(--radius-card)] hover:border-primary/30 hover:shadow-[var(--elevation-sm)] transition-all duration-200"
      >
        <div className="w-10 h-10 rounded-[var(--radius)] bg-purple-100 flex items-center justify-center shrink-0">
          <BarChart3 className="w-5 h-5 text-purple-600" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <p
            className="text-foreground mb-0.5 flex items-center gap-1.5"
            style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}
          >
            Datadog Inova
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
          </p>
          <p className="text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
            Dashboards e eventos de analytics em produção
          </p>
        </div>
      </a>

      {/* Info banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-[var(--radius-card)] p-3.5 mb-6 flex gap-3">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p style={{ fontSize: "var(--text-caption)" }} className="text-blue-700">
          Modo demonstração — os resultados são exemplos representativos. A integração com IA estará disponível em breve.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-5">
        {/* Nome da tarefa */}
        <div>
          <label
            htmlFor="nome-tarefa"
            style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}
            className="block mb-1.5"
          >
            Nome da tarefa / fluxo <span className="text-red-500">*</span>
          </label>
          <input
            id="nome-tarefa"
            type="text"
            placeholder="Ex: Cadastro de cliente — dados fiscais"
            value={nomeTarefa}
            onChange={(e) => setNomeTarefa(e.target.value)}
            className="w-full px-3 py-2.5 bg-input-background border border-border rounded-[var(--radius)] outline-none focus:ring-2 focus:ring-ring/50"
            style={{ fontSize: "var(--text-label)" }}
          />
          {nomeTarefa && (
            <p className="text-muted-foreground mt-1.5" style={{ fontSize: "var(--text-caption)" }}>
              task_id gerado:{" "}
              <code className="bg-muted px-1.5 py-0.5 rounded font-mono">{idSlug}</code>
            </p>
          )}
        </div>

        {/* Módulo */}
        <div>
          <label
            htmlFor="modulo-select"
            style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}
            className="block mb-1.5"
          >
            Módulo do sistema <span className="text-red-500">*</span>
          </label>
          <select
            id="modulo-select"
            value={modulo}
            onChange={(e) => setModulo(e.target.value)}
            className="w-full px-3 py-2.5 bg-input-background border border-border rounded-[var(--radius)] outline-none focus:ring-2 focus:ring-ring/50"
            style={{ fontSize: "var(--text-label)" }}
          >
            <option value="">Selecione o módulo…</option>
            {MODULOS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Persona */}
        <div>
          <label
            htmlFor="persona-select"
            style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}
            className="block mb-1.5"
          >
            Persona principal <span className="text-muted-foreground font-normal">(opcional)</span>
          </label>
          <select
            id="persona-select"
            value={persona}
            onChange={(e) => setPersona(e.target.value)}
            className="w-full px-3 py-2.5 bg-input-background border border-border rounded-[var(--radius)] outline-none focus:ring-2 focus:ring-ring/50"
            style={{ fontSize: "var(--text-label)" }}
          >
            <option value="">Não especificada</option>
            {PERSONAS_OPCOES.map((p) => (
              <option key={p.id} value={p.label}>{p.label}</option>
            ))}
          </select>
        </div>

        {/* Categorias de métricas */}
        <fieldset>
          <legend
            style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}
            className="mb-2"
          >
            Categorias de eventos a especificar
          </legend>
          <div className="space-y-2">
            {CATEGORIAS_METRICAS.map(({ id, label, icon: Icon, desc }) => (
              <label
                key={id}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-[var(--radius-card)] border cursor-pointer transition-colors ${
                  categorias.includes(id)
                    ? "border-primary/60 bg-primary/5"
                    : "border-border hover:bg-muted/50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={categorias.includes(id)}
                  onChange={() => toggleCategoria(id)}
                  className="shrink-0"
                />
                <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                <div>
                  <span style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}>{label}</span>
                  <span className="text-muted-foreground ml-2" style={{ fontSize: "var(--text-caption)" }}>{desc}</span>
                </div>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Descrição da jornada */}
        <div>
          <label
            htmlFor="descricao-jornada"
            style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}
            className="block mb-1.5"
          >
            Descrição da jornada <span className="text-muted-foreground font-normal">(opcional)</span>
          </label>
          <p className="text-muted-foreground mb-2" style={{ fontSize: "var(--text-caption)" }}>
            Descreva as etapas da jornada para refinar os eventos gerados.
          </p>
          <textarea
            id="descricao-jornada"
            rows={5}
            placeholder={"1. Usuário acessa a tela de cadastro de cliente\n2. Preenche os campos de dados fiscais (CPF, CNPJ, Razão Social)\n3. O sistema valida os campos em tempo real\n4. Usuário clica em Salvar\n5. Sistema confirma o cadastro"}
            value={descricaoJornada}
            onChange={(e) => setDescricaoJornada(e.target.value)}
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
                <AlertCircle className="w-3 h-3" />
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
              htmlFor="arquivo-upload-metricas"
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
                id="arquivo-upload-metricas"
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

        <button
          onClick={handleGerar}
          disabled={!canGenerate || isGenerating}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-[var(--radius)] bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Gerando especificações…
            </>
          ) : (
            <>
              <BarChart3 className="w-4 h-4" />
              Gerar dicionário de eventos
            </>
          )}
        </button>
        {!canGenerate && !isGenerating && (
          <p className="text-center text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
            Preencha o nome da tarefa e selecione o módulo para habilitar a geração.
          </p>
        )}
      </div>
    </div>
  );
}
