import { useState } from "react";
import { NavLink } from "react-router";
import {
  Accessibility,
  ChevronLeft,
  AlertTriangle,
  Loader2,
  RotateCcw,
  Download,
  Info,
  CheckCircle2,
  XCircle,
  Upload,
  Link as LinkIcon,
  BookOpen,
  Bot,
  X,
} from "lucide-react";

type NivelAlerta = "critico" | "alerta";

interface AlertaAcessibilidade {
  id: string;
  nivel: NivelAlerta;
  componente: string;
  problema: string;
  nota: string;
}

interface ItemARIA {
  n: number;
  componente: string;
  role: string;
  atributo: string;
  valor: string;
  rotulo: string;
  ordem: number | "-";
}

interface ItemFoco {
  ordem: number;
  componente: string;
  acao: string;
  regra?: string;
}

interface AccessibilityResult {
  id: string;
  timestamp: number;
  nomeTela: string;
  contexto: string;
  componentesDinamicos: string[];
  alertas: AlertaAcessibilidade[];
  tabelaARIA: ItemARIA[];
  fluxoFoco: ItemFoco[];
  notas: string[];
}

const COMPONENTES_DINAMICOS = [
  { id: "modal", label: "Modal / Dialog" },
  { id: "drawer", label: "Drawer / Painel lateral" },
  { id: "tooltip", label: "Tooltip" },
  { id: "toast", label: "Toast / Notificação" },
  { id: "tabs", label: "Tabs" },
  { id: "accordion", label: "Accordion" },
  { id: "autocomplete", label: "Autocomplete / Combobox" },
  { id: "datepicker", label: "Date picker" },
];

function gerarResultado(nomeTela: string, contexto: string, dinamicos: string[]): AccessibilityResult {
  const alertas: AlertaAcessibilidade[] = [
    {
      id: "a1",
      nivel: "critico",
      componente: "Campo CPF",
      problema: "Mensagem de erro não está associada ao campo via aria-describedby.",
      nota: "Adicionar aria-describedby=\"erro-cpf\" no input e id=\"erro-cpf\" no elemento de erro.",
    },
    {
      id: "a2",
      nivel: "alerta",
      componente: "Botão de upload",
      problema: "Ícone sem texto alternativo — leitores de tela anunciam apenas \"button\".",
      nota: "Adicionar aria-label=\"Anexar documento\" ao botão.",
    },
  ];

  const tabelaBase: ItemARIA[] = [
    { n: 1, componente: "Campo CPF", role: "textbox", atributo: "aria-required", valor: "true", rotulo: "CPF do responsável legal", ordem: 1 },
    { n: 2, componente: "Mensagem de erro CPF", role: "alert", atributo: "aria-live", valor: "assertive", rotulo: "CPF inválido. Verifique os 11 dígitos.", ordem: "-" },
    { n: 3, componente: "Campo Razão Social", role: "textbox", atributo: "aria-required", valor: "true", rotulo: "Razão social da empresa", ordem: 2 },
    { n: 4, componente: "Botão Salvar", role: "button", atributo: "aria-label", valor: '"Salvar cadastro"', rotulo: "Salvar cadastro", ordem: 5 },
    { n: 5, componente: "Botão Cancelar", role: "button", atributo: "aria-label", valor: '"Cancelar e voltar"', rotulo: "Cancelar e voltar", ordem: 6 },
  ];

  const tabelaDinamicos: ItemARIA[] = [];
  let n = tabelaBase.length + 1;
  if (dinamicos.includes("modal")) {
    tabelaDinamicos.push({ n: n++, componente: "Modal de confirmação", role: "dialog", atributo: "aria-modal", valor: "true", rotulo: "Confirmar exclusão de cadastro", ordem: "-" });
    tabelaDinamicos.push({ n: n++, componente: "Título do modal", role: "heading", atributo: "aria-level", valor: "2", rotulo: "Tem certeza que deseja excluir?", ordem: "-" });
  }
  if (dinamicos.includes("toast")) {
    tabelaDinamicos.push({ n: n++, componente: "Toast de sucesso", role: "status", atributo: "aria-live", valor: "polite", rotulo: "Cadastro salvo com sucesso.", ordem: "-" });
  }
  if (dinamicos.includes("tabs")) {
    tabelaDinamicos.push({ n: n++, componente: "Grupo de abas", role: "tablist", atributo: "aria-label", valor: '"Seções do cadastro"', rotulo: "Seções do cadastro", ordem: 3 });
    tabelaDinamicos.push({ n: n++, componente: "Aba ativa", role: "tab", atributo: "aria-selected", valor: "true", rotulo: "Dados fiscais (aba 1 de 3)", ordem: 4 });
  }

  const fluxoFoco: ItemFoco[] = [
    { ordem: 1, componente: "Campo CPF", acao: "Tab — entra no campo; Screen reader anuncia \"CPF do responsável legal, campo obrigatório\"" },
    { ordem: 2, componente: "Campo Razão Social", acao: "Tab" },
    { ordem: 3, componente: "Campo CNPJ", acao: "Tab" },
    { ordem: 4, componente: "Botão Salvar", acao: "Tab — Screen reader anuncia \"Salvar cadastro, botão\"" },
    { ordem: 5, componente: "Botão Cancelar", acao: "Tab" },
  ];

  if (dinamicos.includes("modal")) {
    fluxoFoco.push({
      ordem: 6,
      componente: "Modal de confirmação",
      acao: "Foco aprisionado dentro do modal (focus trap). Tab circula apenas entre os elementos do modal. Esc fecha o modal e devolve o foco ao elemento que o abriu.",
      regra: "WAI-ARIA: Dialog Pattern",
    });
  }

  const notas = [
    "Todos os campos obrigatórios devem ter aria-required=\"true\" — não confie apenas em asterisco visual.",
    "Mensagens de erro inline: usar role=\"alert\" com aria-live=\"assertive\" para anúncio imediato.",
    "Botões apenas com ícone precisam de aria-label descritivo. O título (title) não é suficiente para leitores de tela.",
    "Padrão de cores: contraste mínimo 4.5:1 para texto normal (WCAG 2.1 AA). Verificar tokens primary e muted-foreground.",
  ];

  return {
    id: `A11Y-${Date.now()}`,
    timestamp: Date.now(),
    nomeTela,
    contexto,
    componentesDinamicos: dinamicos,
    alertas,
    tabelaARIA: [...tabelaBase, ...tabelaDinamicos],
    fluxoFoco,
    notas,
  };
}

function gerarMarkdown(r: AccessibilityResult): string {
  const data = new Date(r.timestamp).toLocaleDateString("pt-BR");
  const criticos = r.alertas.filter((a) => a.nivel === "critico");
  const alertas = r.alertas.filter((a) => a.nivel === "alerta");

  const tabelaMd =
    "| # | Componente | Role | Atributo ARIA | Valor | Rótulo para Leitor de Tela | Ordem Tab |\n" +
    "|---|------------|------|---------------|-------|---------------------------|----------|\n" +
    r.tabelaARIA
      .map((row) => `| ${row.n} | ${row.componente} | \`${row.role}\` | \`${row.atributo}\` | ${row.valor} | "${row.rotulo}" | ${row.ordem} |`)
      .join("\n");

  const fluxoMd = r.fluxoFoco
    .map((f) => `${f.ordem}. **${f.componente}** — ${f.acao}${f.regra ? ` _(${f.regra})_` : ""}`)
    .join("\n");

  const alertasMd = (nivel: string, items: AlertaAcessibilidade[]) =>
    items.length === 0
      ? ""
      : `### ${nivel}\n` +
        items.map((a) => `- **${a.componente}:** ${a.problema}\n  > Nota: ${a.nota}`).join("\n") + "\n\n";

  return `# Especificações de Acessibilidade — ${r.nomeTela}

**Data:** ${data}
**Padrão:** WCAG 2.1 AA · WAI-ARIA 1.2
**ID:** ${r.id}

## Alertas
${alertasMd("Crítico", criticos)}${alertasMd("Alerta", alertas)}

## Tabela ARIA

${tabelaMd}

## Fluxo de Foco por Teclado

${fluxoMd}

## Notas de Implementação

${r.notas.map((n, i) => `${i + 1}. ${n}`).join("\n")}
`;
}

function gerarCSV(r: AccessibilityResult): string {
  const header = "#,Componente,Role,Atributo ARIA,Valor,Rótulo para Leitor de Tela,Ordem Tab";
  const rows = r.tabelaARIA.map(
    (row) =>
      `${row.n},"${row.componente}","${row.role}","${row.atributo}","${row.valor}","${row.rotulo}","${row.ordem}"`
  );
  return [header, ...rows].join("\n");
}

export function EspecificacoesAcessibilidade() {
  const [view, setView] = useState<"form" | "result">("form");
  const [nomeTela, setNomeTela] = useState("");
  const [contexto, setContexto] = useState("");
  const [dinamicos, setDinamicos] = useState<string[]>([]);
  const [descricao, setDescricao] = useState("");
  const [figmaUrl, setFigmaUrl] = useState("");
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<AccessibilityResult | null>(null);

  const canGenerate = nomeTela.trim().length > 0;

  function toggleDinamico(id: string) {
    setDinamicos((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  }

  function handleGerar() {
    setIsGenerating(true);
    setTimeout(() => {
      setResult(gerarResultado(nomeTela, contexto, dinamicos));
      setIsGenerating(false);
      setView("result");
    }, 1800);
  }

  function handleNova() {
    setView("form");
    setResult(null);
    setNomeTela("");
    setContexto("");
    setDinamicos([]);
    setDescricao("");
    setFigmaUrl("");
    setArquivo(null);
  }

  function baixar(content: string, ext: string, mime: string) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `a11y-${nomeTela.toLowerCase().replace(/\s+/g, "-")}-${result!.id}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (view === "result" && result) {
    const criticos = result.alertas.filter((a) => a.nivel === "critico");
    const alertas = result.alertas.filter((a) => a.nivel === "alerta");

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
              {result.nomeTela}
            </h1>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-medium">
                WCAG 2.1 AA · WAI-ARIA 1.2
              </span>
              <span className="text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
                {result.id} · {new Date(result.timestamp).toLocaleString("pt-BR")}
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
              onClick={() => baixar(gerarCSV(result), "csv", "text/csv")}
              className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius)] border border-border hover:bg-muted transition-colors"
              style={{ fontSize: "var(--text-label)" }}
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">.csv</span>
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

        <div className="space-y-6">
          {/* Alertas */}
          {result.alertas.length > 0 && (
            <section>
              <h2
                style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)", textTransform: "uppercase", letterSpacing: "0.06em" }}
                className="text-muted-foreground mb-3"
              >
                Alertas de acessibilidade
              </h2>
              <div className="space-y-3">
                {criticos.map((a) => (
                  <div key={a.id} className="bg-red-50 border border-red-200 rounded-[var(--radius-card)] p-4 flex gap-3">
                    <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-700 text-[10px] font-medium">Crítico</span>
                        <span style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}>{a.componente}</span>
                      </div>
                      <p style={{ fontSize: "var(--text-caption)" }} className="text-red-800 mb-1">{a.problema}</p>
                      <p style={{ fontSize: "var(--text-caption)" }} className="text-red-700 font-mono bg-red-100/60 px-2 py-1 rounded">
                        {a.nota}
                      </p>
                    </div>
                  </div>
                ))}
                {alertas.map((a) => (
                  <div key={a.id} className="bg-amber-50 border border-amber-200 rounded-[var(--radius-card)] p-4 flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 text-[10px] font-medium">Alerta</span>
                        <span style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}>{a.componente}</span>
                      </div>
                      <p style={{ fontSize: "var(--text-caption)" }} className="text-amber-800 mb-1">{a.problema}</p>
                      <p style={{ fontSize: "var(--text-caption)" }} className="text-amber-700 font-mono bg-amber-100/60 px-2 py-1 rounded">
                        {a.nota}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tabela ARIA */}
          <section>
            <h2
              style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)", textTransform: "uppercase", letterSpacing: "0.06em" }}
              className="text-muted-foreground mb-3"
            >
              Tabela ARIA completa
            </h2>
            <div className="overflow-x-auto rounded-[var(--radius-card)] border border-border">
              <table className="w-full text-left">
                <thead className="bg-muted/50">
                  <tr>
                    {["#", "Componente", "Role", "Atributo ARIA", "Valor", "Rótulo para Leitor de Tela", "Ordem Tab"].map((h) => (
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
                  {result.tabelaARIA.map((row, i) => (
                    <tr key={i} className={`border-t border-border ${i % 2 === 0 ? "bg-card" : "bg-muted/20"}`}>
                      <td className="px-3 py-2.5 text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>{row.n}</td>
                      <td className="px-3 py-2.5 font-medium" style={{ fontSize: "var(--text-caption)" }}>{row.componente}</td>
                      <td className="px-3 py-2.5 font-mono text-primary" style={{ fontSize: "var(--text-caption)" }}>{row.role}</td>
                      <td className="px-3 py-2.5 font-mono" style={{ fontSize: "var(--text-caption)" }}>{row.atributo}</td>
                      <td className="px-3 py-2.5 font-mono text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>{row.valor}</td>
                      <td className="px-3 py-2.5 text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>"{row.rotulo}"</td>
                      <td className="px-3 py-2.5 text-center" style={{ fontSize: "var(--text-caption)" }}>
                        {row.ordem === "-" ? (
                          <span className="text-muted-foreground">—</span>
                        ) : (
                          row.ordem
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mt-2" style={{ fontSize: "var(--text-caption)" }}>
              Padrão: WCAG 2.1 AA · WAI-ARIA 1.2
            </p>
          </section>

          {/* Fluxo de foco */}
          <section>
            <h2
              style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)", textTransform: "uppercase", letterSpacing: "0.06em" }}
              className="text-muted-foreground mb-3"
            >
              Fluxo de foco por teclado
            </h2>
            <ol className="space-y-2">
              {result.fluxoFoco.map((f) => (
                <li key={f.ordem} className="flex gap-3 bg-card border border-border rounded-[var(--radius)] px-4 py-3">
                  <span
                    className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5"
                    style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" }}
                  >
                    {f.ordem}
                  </span>
                  <div>
                    <p style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}>{f.componente}</p>
                    <p style={{ fontSize: "var(--text-caption)" }} className="text-muted-foreground">{f.acao}</p>
                    {f.regra && (
                      <p style={{ fontSize: "var(--text-caption)" }} className="text-primary mt-0.5">Ref: {f.regra}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Notas de implementação */}
          <section className="bg-muted/40 border border-border rounded-[var(--radius-card)] p-5">
            <h2 style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }} className="mb-3">
              Notas de implementação
            </h2>
            <ul className="space-y-2">
              {result.notas.map((n, i) => (
                <li key={i} className="flex gap-2.5" style={{ fontSize: "var(--text-caption)" }}>
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </section>
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
        <div className="w-12 h-12 rounded-[var(--radius-card)] bg-green-100 flex items-center justify-center shrink-0">
          <Accessibility className="w-6 h-6 text-green-600" aria-hidden="true" />
        </div>
        <div>
          <h1 style={{ fontSize: "var(--text-h3)", fontWeight: "var(--font-weight-semibold)" }}>
            Especificações de acessibilidade
          </h1>
          <p className="text-muted-foreground mt-1" style={{ fontSize: "var(--text-label)", lineHeight: "1.5" }}>
            Gere a tabela ARIA, o fluxo de foco e as notas de implementação para o dev — padrão WCAG 2.1 AA.
          </p>
        </div>
      </div>

      {/* Cards de recursos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Card Guia de Acessibilidade */}
        <div className="flex flex-col gap-3 p-4 bg-card border border-border rounded-[var(--radius-card)] opacity-60">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-[var(--radius)] bg-green-100 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-green-600" aria-hidden="true" />
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
              Guia de Acessibilidade
            </p>
            <p className="text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
              Regras WCAG 2.1 AA e padrões WAI-ARIA
            </p>
          </div>
        </div>

        {/* Card Agente de acessibilidade */}
        <div className="flex flex-col gap-3 p-4 bg-card border border-border rounded-[var(--radius-card)] opacity-60">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-[var(--radius)] bg-violet-100 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 text-violet-600" aria-hidden="true" />
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
              Agente de acessibilidade
            </p>
            <p className="text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
              Análise automática de conformidade WCAG
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
            htmlFor="nome-tela-a11y"
            style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}
            className="block mb-1.5"
          >
            Nome da tela <span className="text-red-500">*</span>
          </label>
          <input
            id="nome-tela-a11y"
            type="text"
            placeholder="Ex: Cadastro de cliente — dados fiscais"
            value={nomeTela}
            onChange={(e) => setNomeTela(e.target.value)}
            className="w-full px-3 py-2.5 bg-input-background border border-border rounded-[var(--radius)] outline-none focus:ring-2 focus:ring-ring/50"
            style={{ fontSize: "var(--text-label)" }}
          />
        </div>

        {/* Contexto da tarefa */}
        <div>
          <label
            htmlFor="contexto-a11y"
            style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}
            className="block mb-1.5"
          >
            Contexto da tarefa <span className="text-muted-foreground font-normal">(opcional)</span>
          </label>
          <p className="text-muted-foreground mb-2" style={{ fontSize: "var(--text-caption)" }}>
            O que o usuário está tentando realizar nesta tela?
          </p>
          <textarea
            id="contexto-a11y"
            rows={3}
            placeholder="Ex: O contador está cadastrando os dados fiscais de um novo cliente PJ. Preenche razão social, CNPJ, CPF do responsável e inscrição estadual."
            value={contexto}
            onChange={(e) => setContexto(e.target.value)}
            className="w-full px-3 py-2.5 bg-input-background border border-border rounded-[var(--radius)] outline-none focus:ring-2 focus:ring-ring/50 resize-y"
            style={{ fontSize: "var(--text-label)" }}
          />
        </div>

        {/* Componentes dinâmicos */}
        <fieldset>
          <legend
            style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}
            className="mb-1.5"
          >
            Componentes dinâmicos presentes
          </legend>
          <p className="text-muted-foreground mb-3" style={{ fontSize: "var(--text-caption)" }}>
            Marque os componentes que requerem regras especiais de acessibilidade.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {COMPONENTES_DINAMICOS.map((comp) => (
              <label
                key={comp.id}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-[var(--radius)] border cursor-pointer transition-colors ${
                  dinamicos.includes(comp.id)
                    ? "border-primary/60 bg-primary/5"
                    : "border-border hover:bg-muted/50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={dinamicos.includes(comp.id)}
                  onChange={() => toggleDinamico(comp.id)}
                  className="shrink-0"
                />
                <span style={{ fontSize: "var(--text-caption)" }}>{comp.label}</span>
              </label>
            ))}
          </div>
          {dinamicos.length > 0 && (
            <p className="text-primary mt-2" style={{ fontSize: "var(--text-caption)" }}>
              {dinamicos.length} componente{dinamicos.length !== 1 ? "s" : ""} selecionado{dinamicos.length !== 1 ? "s" : ""} — regras de focus trap e ARIA roles serão incluídas.
            </p>
          )}
        </fieldset>

        {/* Descrição adicional */}
        <div>
          <label
            htmlFor="descricao-a11y"
            style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}
            className="block mb-1.5"
          >
            Descrição dos componentes <span className="text-muted-foreground font-normal">(opcional)</span>
          </label>
          <textarea
            id="descricao-a11y"
            rows={4}
            placeholder={"Liste os componentes interativos da tela:\n- Campo CPF (obrigatório)\n- Campo Razão Social (obrigatório)\n- Botão Salvar\n- Botão Cancelar\n..."}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
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
              htmlFor="arquivo-upload-a11y"
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
                id="arquivo-upload-a11y"
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

        {/* Output preview */}
        <div className="bg-muted/40 rounded-[var(--radius-card)] border border-border p-4">
          <p style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)", textTransform: "uppercase", letterSpacing: "0.06em" }} className="text-muted-foreground mb-2.5">
            O que será gerado
          </p>
          <ul className="space-y-1.5">
            {[
              "Alertas críticos e de alerta com notas de implementação",
              "Tabela ARIA completa (Role, Atributo, Valor, Rótulo, Ordem Tab)",
              "Fluxo de foco por teclado passo a passo",
              "Notas de implementação para o desenvolvedor",
              "Exportação em .md e .csv",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2" style={{ fontSize: "var(--text-caption)" }}>
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                {item}
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
              Gerando especificações…
            </>
          ) : (
            <>
              <Accessibility className="w-4 h-4" />
              Gerar especificações ARIA
            </>
          )}
        </button>
        {!canGenerate && !isGenerating && (
          <p className="text-center text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
            Preencha o nome da tela para habilitar a geração.
          </p>
        )}
      </div>
    </div>
  );
}
