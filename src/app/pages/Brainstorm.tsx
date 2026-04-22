import { useState, useEffect, useRef, useCallback } from "react";
import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Lightbulb,
  Copy,
  RefreshCw,
  Trash2,
  X,
  ChevronDown,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { allPersonas, type Persona } from "../data/personas";

type TipoDemanda = "nova_feature" | "melhoria" | "novo_produto" | "correcao_ux";

const tipoLabels: Record<TipoDemanda, string> = {
  nova_feature: "Nova feature",
  melhoria: "Melhoria",
  novo_produto: "Novo produto",
  correcao_ux: "Correção de UX",
};

const modulosDisponiveis = [
  "Escrita Fiscal",
  "Contabilidade",
  "Folha",
  "Patrimônio",
  "Lalur",
  "NF-e",
  "Financeiro",
  "Para Você",
  "Holerite",
  "Relatórios",
  "BI",
  "Compliance",
];

interface BrainstormResult {
  id: string;
  timestamp: number;
  titulo: string;
  tipo: TipoDemanda;
  description: string;
  modulos: string[];
  restricoes: string;
  referencias: string;
  personaIds: string[];
  result: string;
}

// ── Keyword extraction helpers ──────────────────────────────────────
function extractKeywords(text: string): string[] {
  const lower = text.toLowerCase();
  const keywords: string[] = [];
  const domainTerms: Record<string, string[]> = {
    painel: ["dashboard", "painel", "visão", "tela", "visualização"],
    fechamento: ["fechamento", "encerramento", "apuração", "mensal"],
    notificação: ["notificação", "alerta", "aviso", "lembrete", "push", "notificar"],
    relatório: ["relatório", "report", "exportar", "exportação", "pdf", "excel"],
    automação: ["automação", "automatizar", "automatizado", "batch", "lote"],
    cliente: ["cliente", "carteira", "empresa", "empresas"],
    folha: ["folha", "holerite", "contracheque", "salário", "pagamento", "rescisão", "admissão", "férias"],
    fiscal: ["fiscal", "imposto", "tributo", "das", "obrigação", "declaração", "nfe", "nota fiscal"],
    contábil: ["contábil", "contabilidade", "lançamento", "balancete", "balanço"],
    onboarding: ["onboarding", "treinamento", "novo", "colaborador", "integração"],
    mobile: ["mobile", "celular", "app", "aplicativo", "responsivo"],
    integração: ["integração", "integrar", "api", "sincronizar", "sincronização"],
    produtividade: ["produtividade", "eficiência", "performance", "desempenho", "kpi"],
    comunicação: ["comunicação", "mensagem", "chat", "whatsapp", "email", "contato"],
    prazo: ["prazo", "deadline", "vencimento", "agenda", "calendário"],
    busca: ["busca", "pesquisa", "filtro", "pesquisar", "encontrar"],
    rh: ["rh", "recursos humanos", "pessoal", "departamento pessoal", "dp"],
    benefício: ["benefício", "benefícios", "vale", "consignado", "empréstimo"],
    simulação: ["simulação", "simular", "simulador", "cenário", "projeção"],
    status: ["status", "acompanhamento", "progresso", "andamento", "monitoramento"],
  };
  for (const [key, terms] of Object.entries(domainTerms)) {
    if (terms.some((t) => lower.includes(t))) keywords.push(key);
  }
  if (keywords.length === 0) keywords.push("geral");
  return keywords;
}

// ── Relevance scoring ───────────────────────────────────────────────
function scorePainRelevance(painText: string, keywords: string[]): number {
  const lower = painText.toLowerCase();
  return keywords.reduce((s, kw) => s + (lower.includes(kw) ? 2 : 0), 0);
}

function scoreGoalRelevance(goalText: string, keywords: string[]): number {
  const lower = goalText.toLowerCase();
  return keywords.reduce((s, kw) => s + (lower.includes(kw) ? 2 : 0), 0);
}

// ── Per-persona suggestion generator ────────────────────────────────
interface Suggestion {
  name: string;
  justificativa: string;
  detalhe: string;
}

function generatePersonaSuggestions(
  persona: Persona,
  featureDescription: string,
  keywords: string[]
): Suggestion[] {
  const suggestions: Suggestion[] = [];
  const descLower = featureDescription.toLowerCase();

  // 1. Match pains to feature — most relevant first
  const rankedPains = persona.pains
    .map((p) => ({ ...p, score: scorePainRelevance(p.text, keywords) + (p.severity === "critica" ? 3 : p.severity === "alta" ? 1 : 0) }))
    .sort((a, b) => b.score - a.score);

  const topPain = rankedPains[0];
  if (topPain) {
    const severityLabel = topPain.severity === "critica" ? "crítica" : topPain.severity === "alta" ? "alta" : "moderada";

    // Context-aware suggestion name
    const painKeyword = keywords.find((kw) => topPain.text.toLowerCase().includes(kw));
    const suggestionName = painKeyword
      ? `Resolução de fricção em ${painKeyword}: ${topPain.text.substring(0, 60)}${topPain.text.length > 60 ? "..." : ""}`
      : `Solução para dor ${severityLabel}: ${topPain.text.substring(0, 60)}${topPain.text.length > 60 ? "..." : ""}`;

    suggestions.push({
      name: suggestionName,
      justificativa: `${persona.name} enfrenta uma dor de severidade ${severityLabel}: "${topPain.text}". No contexto de "${featureDescription}", esta funcionalidade deve tratar essa fricção diretamente, pois ela impacta ${persona.context[0]?.toLowerCase() || "a rotina diária desta persona"}.`,
      detalhe: `Comportamento observado: ${persona.behavior[0] || "Usa o sistema frequentemente"}. A solução deve considerar que ${persona.name} ${persona.summary.toLowerCase()}.`,
    });
  }

  // 2. Match goals to feature — map persona goals to the feature
  const rankedGoals = persona.goals
    .map((g) => ({ text: g, score: scoreGoalRelevance(g, keywords) }))
    .sort((a, b) => b.score - a.score);

  const topGoal = rankedGoals[0];
  if (topGoal) {
    const modulesContext = persona.modules.length > 0
      ? `Considerando que ${persona.name} usa os módulos ${persona.modules.join(", ")}`
      : `Considerando o perfil de ${persona.name}`;

    suggestions.push({
      name: `Funcionalidade alinhada ao objetivo: "${topGoal.text}"`,
      justificativa: `${modulesContext}, a funcionalidade "${featureDescription}" pode ser desenhada para atender diretamente ao objetivo "${topGoal.text}". Isso é particularmente relevante porque ${persona.context[1]?.toLowerCase() || persona.context[0]?.toLowerCase() || "esse perfil usa o sistema intensamente"}.`,
      detalhe: `Frase típica de ${persona.name}: "${persona.quotes[0] || "Preciso que o sistema me ajude."}". A solução deve refletir essa expectativa.`,
    });
  }

  // 3. Behavioral adaptation — adjust feature UX to persona's behavior
  const behaviorInsights = persona.behavior.slice(0, 2);
  if (behaviorInsights.length > 0) {
    const isDigitalNative = persona.digitalLevel !== undefined && persona.digitalLevel >= 4;
    const isLowDigital = persona.digitalLevel !== undefined && persona.digitalLevel <= 2;

    let uxRecommendation: string;
    if (isLowDigital) {
      uxRecommendation = `Interface simplificada com linguagem acessível, poucos campos visíveis por vez e confirmações visuais claras. Evitar jargões técnicos e priorizar indicadores visuais de status (ex: "Tudo certo" vs código de status).`;
    } else if (isDigitalNative) {
      uxRecommendation = `Interface avançada com atalhos, filtros rápidos e bulk actions. ${persona.name} espera uma experiência de nível SaaS moderno, com notificações push e autoatendimento completo.`;
    } else if (persona.category === "contabil" && persona.tag.includes("Operacional")) {
      uxRecommendation = `Foco em eficiência operacional: reduzir cliques, oferecer atalhos de teclado, templates para tarefas recorrentes e feedback imediato em cada ação. ${persona.name} executa essa ação dezenas de vezes ao dia.`;
    } else if (persona.category === "contabil" && (persona.tag.includes("Dono") || persona.tag.includes("Gerente"))) {
      uxRecommendation = `Visão gerencial com KPIs de alto nível, drill-down sob demanda e exportação rápida. ${persona.name} precisa de informação consolidada, não operacional.`;
    } else {
      uxRecommendation = `Adaptar a complexidade da interface ao nível de familiaridade de ${persona.name} com tecnologia: ${behaviorInsights[0]?.toLowerCase() || "uso moderado de sistemas"}.`;
    }

    suggestions.push({
      name: `Adaptação de UX para o perfil de ${persona.name}`,
      justificativa: `Com base no comportamento observado — "${behaviorInsights.join("; ")}" — a funcionalidade precisa ser adaptada: ${uxRecommendation}`,
      detalhe: persona.location ? `Contexto geográfico: ${persona.location}. ${persona.demographics[0] || ""}` : "",
    });
  }

  // 4. Module-specific integration
  const featureModuleOverlap = persona.modules.filter((m) =>
    keywords.some((kw) => m.toLowerCase().includes(kw)) || descLower.includes(m.toLowerCase())
  );

  if (featureModuleOverlap.length > 0) {
    suggestions.push({
      name: `Integração direta com ${featureModuleOverlap.join(" e ")}`,
      justificativa: `${persona.name} já utiliza ${featureModuleOverlap.join(", ")} no Domínio. A funcionalidade "${featureDescription}" deve se integrar nativamente a ${featureModuleOverlap.length > 1 ? "esses módulos" : "esse módulo"}, aproveitando os dados já disponíveis para evitar retrabalho e entrada duplicada de informações.`,
      detalhe: `${persona.context[0] || ""} — a integração reduz fricção no fluxo de trabalho diário.`,
    });
  } else if (persona.modules.length > 0) {
    suggestions.push({
      name: `Conexão contextual com ${persona.modules[0]}`,
      justificativa: `Embora "${featureDescription}" não esteja diretamente ligada aos módulos atuais de ${persona.name} (${persona.modules.join(", ")}), há oportunidade de criar links contextuais que conectem dados do módulo ${persona.modules[0]} para enriquecer a experiência na nova funcionalidade.`,
      detalhe: `Quanto mais a funcionalidade aproveitar dados existentes, menor será a curva de adoção para ${persona.name}.`,
    });
  }

  // 5. Quote-driven insight — if a second pain is relevant
  if (rankedPains.length > 1 && persona.quotes.length > 1) {
    const secondPain = rankedPains[1];
    const relevantQuote = persona.quotes.find((q) =>
      keywords.some((kw) => q.toLowerCase().includes(kw))
    ) || persona.quotes[1] || persona.quotes[0];

    suggestions.push({
      name: `Mitigação adicional: ${secondPain.text.substring(0, 50)}${secondPain.text.length > 50 ? "..." : ""}`,
      justificativa: `Além da dor principal, ${persona.name} também enfrenta: "${secondPain.text}". No contexto desta funcionalidade, endereçar esse ponto secundário pode diferenciar significativamente a experiência.`,
      detalhe: `Nas palavras de ${persona.name}: "${relevantQuote}".`,
    });
  }

  return suggestions;
}

// ── Synthesis generator ─────────────────────────────────────────────
function generateSynthesis(
  personas: Persona[],
  featureDescription: string,
  keywords: string[]
): string[] {
  const lines: string[] = [];

  // Common pains
  const allPainTexts = personas.flatMap((p) => p.pains.map((pain) => pain.text.toLowerCase()));
  const painFrequency: Record<string, number> = {};
  allPainTexts.forEach((t) => {
    const key = t.substring(0, 40);
    painFrequency[key] = (painFrequency[key] || 0) + 1;
  });
  const commonThemes = Object.entries(painFrequency)
    .filter(([, count]) => count > 1)
    .map(([theme]) => theme);

  lines.push(`  Pontos comuns entre personas:`);
  if (commonThemes.length > 0) {
    lines.push(`  • Dores compartilhadas: ${commonThemes.slice(0, 3).map((t) => `"${t}..."`).join(", ")}`);
  }

  // Keyword-specific common needs
  const needsMap: Record<string, string> = {
    painel: "Todas as personas selecionadas se beneficiam de visibilidade centralizada de informações",
    automação: "Automação de processos é necessidade transversal — reduz erros para operacionais e libera tempo para gestores",
    notificação: "Alertas proativos atendem desde o MEI que esquece prazos até o gerente que precisa monitorar a equipe",
    relatório: "Relatórios são consumidos de forma diferente: operacional quer dados brutos, gestão quer sínteses e tendências",
    mobile: "Acesso mobile é essencial para PMEs e empregados, mas secundário para contadores que usam desktop",
    folha: "Folha de pagamento cruza múltiplos perfis: contador processa, empresário consulta custos, empregado acessa holerite",
    integração: "Integração entre sistemas é a dor mais crítica para PMEs com RH e uma oportunidade de diferenciação",
    produtividade: "Produtividade tem significados diferentes: para operacional é menos cliques, para gestão é melhor visibilidade",
  };

  keywords.forEach((kw) => {
    if (needsMap[kw]) lines.push(`  • ${needsMap[kw]}`);
  });

  if (lines.length <= 1) {
    lines.push(`  • Necessidade comum de simplificação, clareza e redução de esforço manual`);
  }

  // Differences
  lines.push(``);
  lines.push(`  Diferenças críticas:`);

  const categories = new Set(personas.map((p) => p.category));
  if (categories.size > 1) {
    lines.push(`  • As personas cruzam categorias diferentes (${Array.from(categories).join(", ")}), o que exige uma interface adaptável por perfil de acesso`);
  }

  const digitalLevels = personas.filter((p) => p.digitalLevel !== undefined);
  if (digitalLevels.length > 0) {
    const min = Math.min(...digitalLevels.map((p) => p.digitalLevel!));
    const max = Math.max(...digitalLevels.map((p) => p.digitalLevel!));
    if (max - min >= 2) {
      lines.push(`  • Maturidade digital varia de ${min}/5 a ${max}/5 — a funcionalidade precisa de níveis de complexidade progressiva`);
    }
  }

  const hasOperacional = personas.some((p) => p.tag.includes("Operacional"));
  const hasGestor = personas.some((p) => p.tag.includes("Dono") || p.tag.includes("Gerente"));
  if (hasOperacional && hasGestor) {
    lines.push(`  • Conflito de perspectiva: operacionais querem execução rápida, gestores querem visão consolidada — considerar views diferentes`);
  }

  // Unification opportunities
  lines.push(``);
  lines.push(`  Oportunidades de unificação:`);
  lines.push(`  • Interface adaptativa com role-based views: mesma funcionalidade, diferentes níveis de detalhe conforme o perfil`);

  if (keywords.includes("painel") || keywords.includes("status")) {
    lines.push(`  • Dashboard unificado com widgets personalizáveis — cada persona configura o que é relevante para seu contexto`);
  }
  if (keywords.includes("notificação") || keywords.includes("prazo")) {
    lines.push(`  • Sistema de alertas com regras personalizáveis: urgência, canal (push, e-mail, WhatsApp) e frequência por perfil`);
  }

  lines.push(`  • Design progressivo: funcionalidades avançadas acessíveis sob demanda, sem poluir a experiência básica`);

  return lines;
}

// ── Main generator ──────────────────────────────────────────────────
function generateMockResult(
  titulo: string,
  tipo: TipoDemanda,
  description: string,
  modulos: string[],
  restricoes: string,
  selectedPersonas: Persona[]
): string {
  const keywords = extractKeywords(description);
  const lines: string[] = [];

  lines.push(`ANÁLISE DE DEMANDA: ${titulo}`);
  lines.push(`Tipo: ${tipoLabels[tipo]}`);
  if (modulos.length > 0) lines.push(`Módulos relacionados: ${modulos.join(", ")}`);
  if (restricoes) lines.push(`Restrições: ${restricoes}`);
  lines.push(`Objetivo: Analisar como a demanda "${titulo}" pode ser desenhada de forma centrada no usuário, considerando o contexto, as dores, os objetivos e o comportamento de cada persona selecionada.`);
  lines.push(`Contexto: ${description}`);
  lines.push(`Palavras-chave identificadas: ${keywords.join(", ")}`);
  lines.push(``);

  selectedPersonas.forEach((persona, idx) => {
    lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    lines.push(``);
    lines.push(`PERSONA ${idx + 1} — ${persona.name}`);
    lines.push(`${persona.role} · ${persona.tag} · ${persona.age} anos · ${persona.location}`);
    lines.push(`Módulos: ${persona.modules.join(", ")}`);
    lines.push(`Contexto: ${persona.summary}`);
    lines.push(``);

    const suggestions = generatePersonaSuggestions(persona, description, keywords);

    lines.push(`Funcionalidades sugeridas:`);
    lines.push(``);
    suggestions.forEach((s, i) => {
      lines.push(`${i + 1}. ${s.name}`);
      lines.push(`   Justificativa: ${s.justificativa}`);
      if (s.detalhe) {
        lines.push(`   Detalhe: ${s.detalhe}`);
      }
      lines.push(``);
    });
  });

  lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(``);
  lines.push(`SÍNTESE GERAL`);
  lines.push(``);
  lines.push(...generateSynthesis(selectedPersonas, description, keywords));
  lines.push(``);
  lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`Gerado em ${new Date().toLocaleString("pt-BR")} · ${selectedPersonas.length} persona${selectedPersonas.length !== 1 ? "s" : ""} analisada${selectedPersonas.length !== 1 ? "s" : ""}`);

  return lines.join("\n");
}

export function Brainstorm() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState<TipoDemanda>("nova_feature");
  const [description, setDescription] = useState("");
  const [modulos, setModulos] = useState<string[]>([]);
  const [restricoes, setRestricoes] = useState("");
  const [referencias, setReferencias] = useState("");
  const [showOpcional, setShowOpcional] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<BrainstormResult | null>(null);
  const [history, setHistory] = useState<BrainstormResult[]>(() => {
    try {
      const saved = sessionStorage.getItem("brainstorm-history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showHistory, setShowHistory] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<"regenerate" | "clear" | null>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem("brainstorm-history", JSON.stringify(history.slice(0, 10)));
    } catch {}
  }, [history]);

  const togglePersona = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === allPersonas.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(allPersonas.map((p) => p.id)));
    }
  };

  const removePersona = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const toggleModulo = (m: string) => {
    setModulos((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );
  };

  const canGenerate = selectedIds.size > 0 && titulo.length > 0 && description.length >= 20;

  const handleGenerate = useCallback(async () => {
    if (!canGenerate) return;
    setIsLoading(true);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 2000));

    const selectedPersonas = allPersonas.filter((p) => selectedIds.has(p.id));
    const result: BrainstormResult = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      titulo,
      tipo,
      description,
      modulos,
      restricoes,
      referencias,
      personaIds: Array.from(selectedIds),
      result: generateMockResult(titulo, tipo, description, modulos, restricoes, selectedPersonas),
    };

    setCurrentResult(result);
    setHistory((prev) => [result, ...prev].slice(0, 10));
    setIsLoading(false);
  }, [canGenerate, selectedIds, description]);

  const handleCopy = async () => {
    if (!currentResult) return;
    try {
      await navigator.clipboard.writeText(currentResult.result);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    } catch {}
  };

  const handleClear = () => {
    setCurrentResult(null);
    setTitulo("");
    setTipo("nova_feature");
    setDescription("");
    setModulos([]);
    setRestricoes("");
    setReferencias("");
    setSelectedIds(new Set());
    setConfirmDialog(null);
  };

  const handleRegenerate = () => {
    setConfirmDialog(null);
    handleGenerate();
  };

  const restoreFromHistory = (item: BrainstormResult) => {
    setCurrentResult(item);
    setTitulo(item.titulo || "");
    setTipo(item.tipo || "nova_feature");
    setDescription(item.description);
    setModulos(item.modulos || []);
    setRestricoes(item.restricoes || "");
    setReferencias(item.referencias || "");
    setSelectedIds(new Set(item.personaIds));
    setShowHistory(false);
  };

  const timeAgo = (ts: number) => {
    const mins = Math.floor((Date.now() - ts) / 60000);
    if (mins < 1) return "agora";
    if (mins === 1) return "há 1 min";
    return `há ${mins} min`;
  };

  const groups = [
    { label: "Contábil", personas: allPersonas.filter((p) => p.category === "contabil") },
    { label: "PME", personas: allPersonas.filter((p) => p.category === "pme") },
    { label: "Empregado", personas: allPersonas.filter((p) => p.category === "empregado") },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
      <section>
        <h1 style={{ fontSize: "var(--text-h3)", fontWeight: "var(--font-weight-semibold)", lineHeight: "1.3" }}>
          Brainstorm de Funcionalidades
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl" style={{ fontSize: "var(--text-base)", lineHeight: "1.5" }}>
          Descreva a funcionalidade que você está desenhando e selecione as personas
          para receber sugestões contextualizadas por perfil.
        </p>
      </section>

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* Configuration panel */}
        <div className="lg:w-2/5 space-y-5">

          {/* Campos de intake */}
          <div className="bg-card border border-border rounded-[var(--radius-card)] p-5 space-y-4">
            {/* Título */}
            <div>
              <label
                htmlFor="titulo-demanda"
                style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}
                className="block mb-1.5"
              >
                Título da demanda <span className="text-destructive">*</span>
              </label>
              <input
                id="titulo-demanda"
                type="text"
                maxLength={80}
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Painel de fechamento mensal"
                className="w-full px-3 py-2 bg-input-background border border-border rounded-[var(--radius)] outline-none focus:ring-2 focus:ring-ring/50"
                style={{ fontSize: "var(--text-label)" }}
              />
            </div>

            {/* Tipo */}
            <div>
              <label
                htmlFor="tipo-demanda"
                style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}
                className="block mb-1.5"
              >
                Tipo <span className="text-destructive">*</span>
              </label>
              <select
                id="tipo-demanda"
                value={tipo}
                onChange={(e) => setTipo(e.target.value as TipoDemanda)}
                className="w-full px-3 py-2 bg-input-background border border-border rounded-[var(--radius)] outline-none focus:ring-2 focus:ring-ring/50"
                style={{ fontSize: "var(--text-label)" }}
              >
                {(Object.keys(tipoLabels) as TipoDemanda[]).map((k) => (
                  <option key={k} value={k}>{tipoLabels[k]}</option>
                ))}
              </select>
            </div>

            {/* Módulos */}
            <div>
              <p style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }} className="mb-1.5">
                Módulos relacionados
              </p>
              <div className="flex flex-wrap gap-1.5">
                {modulosDisponiveis.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => toggleModulo(m)}
                    className={`px-2.5 py-1 rounded-[var(--radius)] border text-xs transition-colors ${
                      modulos.includes(m)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/40 text-muted-foreground"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Persona selection */}
          <div className="bg-card border border-border rounded-[var(--radius-card)] p-5">
            <label
              style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-semibold)" }}
              className="block mb-3"
            >
              Para quais personas você quer gerar sugestões?
            </label>

            {/* Select all */}
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
              <Checkbox
                id="select-all"
                checked={selectedIds.size === allPersonas.length}
                onCheckedChange={toggleAll}
                aria-label="Selecionar todas as personas"
              />
              <label htmlFor="select-all" className="cursor-pointer" style={{ fontSize: "var(--text-label)" }}>
                Todas as personas
              </label>
            </div>

            {/* Groups */}
            {groups.map((group) => (
              <fieldset key={group.label} className="mb-3">
                <legend
                  className="text-muted-foreground mb-1.5"
                  style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" }}
                >
                  {group.label}
                </legend>
                <div className="space-y-2">
                  {group.personas.map((persona) => (
                    <div key={persona.id} className="flex items-center gap-2">
                      <Checkbox
                        id={`persona-${persona.id}`}
                        checked={selectedIds.has(persona.id)}
                        onCheckedChange={() => togglePersona(persona.id)}
                      />
                      <label
                        htmlFor={`persona-${persona.id}`}
                        className="cursor-pointer"
                        style={{ fontSize: "var(--text-label)" }}
                      >
                        {persona.name} — {persona.tag}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            ))}

            {/* Counter */}
            <p
              aria-live="polite"
              className="text-muted-foreground mt-3"
              style={{ fontSize: "var(--text-caption)" }}
            >
              {selectedIds.size === 0
                ? "Nenhuma persona selecionada"
                : `${selectedIds.size} persona${selectedIds.size !== 1 ? "s" : ""} selecionada${selectedIds.size !== 1 ? "s" : ""}`}
            </p>

            {/* Chips */}
            {selectedIds.size > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {Array.from(selectedIds).map((id) => {
                  const p = allPersonas.find((x) => x.id === id);
                  if (!p) return null;
                  return (
                    <span
                      key={id}
                      className="inline-flex items-center gap-1 bg-muted rounded-[var(--radius)] px-2 py-1"
                      style={{ fontSize: "var(--text-caption)" }}
                    >
                      {p.name.split(" ")[0]}
                      <button
                        onClick={() => removePersona(id)}
                        aria-label={`Remover ${p.name} da seleção`}
                        className="hover:text-destructive transition-colors ml-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          {/* Contexto de negócio */}
          <div className="bg-card border border-border rounded-[var(--radius-card)] p-5">
            <label
              htmlFor="feature-description"
              style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-semibold)" }}
              className="block mb-2"
            >
              Contexto do problema <span className="text-destructive">*</span>
            </label>
            <textarea
              id="feature-description"
              rows={4}
              maxLength={300}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Qual problema está sendo resolvido? Qual o impacto para o usuário?"
              className="w-full px-3 py-2 bg-input-background border border-border rounded-[var(--radius)] outline-none focus:ring-2 focus:ring-ring/50 resize-y"
              style={{ fontSize: "var(--text-label)" }}
              aria-describedby="desc-help desc-counter"
              aria-invalid={description.length > 0 && description.length < 20}
            />
            <div className="flex justify-between items-start mt-1.5">
              <div>
                <p id="desc-help" className="text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
                  Descreva o problema de negócio, não a solução. Quanto mais contexto, melhores as sugestões.
                </p>
                {description.length > 0 && description.length < 20 && (
                  <p className="text-destructive mt-1" style={{ fontSize: "var(--text-caption)" }} role="alert">
                    Descreva o contexto com pelo menos 20 caracteres para continuar.
                  </p>
                )}
              </div>
              <span
                id="desc-counter"
                aria-live="polite"
                className="text-muted-foreground shrink-0 ml-3"
                style={{ fontSize: "var(--text-caption)" }}
              >
                {description.length} / 300
              </span>
            </div>
          </div>

          {/* Campos opcionais */}
          <div className="bg-card border border-border rounded-[var(--radius-card)]">
            <button
              onClick={() => setShowOpcional(!showOpcional)}
              className="w-full flex items-center justify-between p-4 min-h-[44px]"
              style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}
              aria-expanded={showOpcional}
            >
              Campos opcionais
              <ChevronDown className={`w-4 h-4 transition-transform ${showOpcional ? "rotate-180" : ""}`} />
            </button>
            {showOpcional && (
              <div className="border-t border-border p-4 space-y-4">
                <div>
                  <label htmlFor="restricoes" style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }} className="block mb-1.5">
                    Restrições conhecidas
                  </label>
                  <textarea
                    id="restricoes"
                    rows={2}
                    value={restricoes}
                    onChange={(e) => setRestricoes(e.target.value)}
                    placeholder="Técnicas, prazo, regulatórias..."
                    className="w-full px-3 py-2 bg-input-background border border-border rounded-[var(--radius)] outline-none focus:ring-2 focus:ring-ring/50 resize-y"
                    style={{ fontSize: "var(--text-label)" }}
                  />
                </div>
                <div>
                  <label htmlFor="referencias" style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }} className="block mb-1.5">
                    Referências internas
                  </label>
                  <textarea
                    id="referencias"
                    rows={2}
                    value={referencias}
                    onChange={(e) => setReferencias(e.target.value)}
                    placeholder="IDs ou nomes de features/produtos relacionados..."
                    className="w-full px-3 py-2 bg-input-background border border-border rounded-[var(--radius)] outline-none focus:ring-2 focus:ring-ring/50 resize-y"
                    style={{ fontSize: "var(--text-label)" }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Generate button */}
          <Button
            onClick={handleGenerate}
            disabled={!canGenerate || isLoading}
            className="w-full"
            size="lg"
            aria-disabled={!canGenerate || isLoading}
            aria-busy={isLoading}
            title={!canGenerate ? "Selecione ao menos uma persona e descreva a funcionalidade para continuar" : undefined}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Gerando sugestões...
              </>
            ) : (
              <>
                <Lightbulb className="w-4 h-4" />
                Gerar sugestões
              </>
            )}
          </Button>

          {/* History */}
          {history.length > 0 && (
            <div className="bg-card border border-border rounded-[var(--radius-card)]">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="w-full flex items-center justify-between p-4 min-h-[44px]"
                style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}
                aria-expanded={showHistory}
              >
                Histórico desta sessão
                <ChevronDown className={`w-4 h-4 transition-transform ${showHistory ? "rotate-180" : ""}`} />
              </button>
              {showHistory && (
                <div className="border-t border-border">
                  {history.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => restoreFromHistory(item)}
                      className="w-full text-left px-4 py-3 hover:bg-muted transition-colors border-b border-border last:border-b-0"
                      style={{ fontSize: "var(--text-label)" }}
                    >
                      <span className="block truncate">{item.titulo || item.description}</span>
                      <span className="text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
                        {tipoLabels[item.tipo] || "Brainstorm"} · {item.personaIds.length} persona{item.personaIds.length !== 1 ? "s" : ""} — {timeAgo(item.timestamp)}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results panel */}
        <div className="lg:w-3/5">
          <div className="bg-card border border-border rounded-[var(--radius-card)] min-h-[400px] flex flex-col">
            {isLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8" aria-busy="true">
                <div className="space-y-4 w-full max-w-md">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-muted rounded w-2/3 mb-2" />
                      <div className="h-3 bg-muted rounded w-full mb-1" />
                      <div className="h-3 bg-muted rounded w-5/6" />
                    </div>
                  ))}
                </div>
                <p
                  className="text-muted-foreground mt-6"
                  style={{ fontSize: "var(--text-label)" }}
                  aria-live="assertive"
                >
                  Analisando personas e gerando sugestões...
                </p>
              </div>
            ) : currentResult ? (
              <div className="flex flex-col flex-1">
                {/* Action buttons */}
                <div className="flex flex-wrap gap-2 p-4 border-b border-border">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    {copyFeedback ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-chart-1" />
                        <span style={{ fontSize: "var(--text-label)" }}>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span style={{ fontSize: "var(--text-label)" }}>Copiar resultado</span>
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setConfirmDialog("regenerate")}
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span style={{ fontSize: "var(--text-label)" }}>Gerar novamente</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setConfirmDialog("clear")}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span style={{ fontSize: "var(--text-label)" }}>Limpar</span>
                  </Button>
                </div>

                {/* Feedback */}
                {copyFeedback && (
                  <div ref={feedbackRef} aria-live="polite" className="sr-only">
                    Resultado copiado!
                  </div>
                )}

                {/* Result content */}
                <div className="flex-1 p-5 overflow-y-auto">
                  <pre
                    className="whitespace-pre-wrap break-words text-foreground"
                    style={{ fontSize: "var(--text-label)", lineHeight: "1.6", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {currentResult.result}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Lightbulb className="w-8 h-8 text-muted-foreground" />
                </div>
                <p style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-semibold)" }}>
                  Suas sugestões aparecerão aqui.
                </p>
                <p className="text-muted-foreground mt-1 max-w-sm" style={{ fontSize: "var(--text-label)" }}>
                  Configure as personas e descreva a funcionalidade para começar o brainstorming.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation dialog */}
      {confirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setConfirmDialog(null)} />
          <div className="relative bg-card border border-border rounded-[var(--radius-card)] p-6 max-w-sm w-full mx-4 shadow-[var(--elevation-sm)]">
            <h2 style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-semibold)" }} className="mb-2">
              {confirmDialog === "regenerate"
                ? "Gerar novamente?"
                : "Limpar tudo?"}
            </h2>
            <p className="text-muted-foreground mb-4" style={{ fontSize: "var(--text-label)" }}>
              {confirmDialog === "regenerate"
                ? "Isso vai substituir o resultado atual. Deseja continuar?"
                : "Isso vai limpar o resultado e as configurações. Deseja continuar?"}
            </p>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => setConfirmDialog(null)}>
                Cancelar
              </Button>
              <Button
                size="sm"
                onClick={confirmDialog === "regenerate" ? handleRegenerate : handleClear}
              >
                {confirmDialog === "regenerate" ? "Sim, gerar novamente" : "Sim, limpar"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}