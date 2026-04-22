import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  X,
  ChevronRight,
  Copy,
  Check,
  Calendar,
  User,
  Tag,
  ExternalLink,
  FileText,
  Users,
  BarChart2,
  MessageSquare,
  ClipboardList,
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

interface Insight {
  id: string;
  descricao: string;
  severidade: "crítico" | "alto" | "médio" | "baixo";
  evidencia?: string;
}

interface Pesquisa {
  id: string;
  titulo: string;
  tipo: string;
  data: string;
  responsavel: string;
  personas_envolvidas: string[];
  modulos_relacionados: string[];
  problema_investigado: string;
  principais_insights: Insight[];
  recomendacoes: string[];
  status: "ativa" | "arquivada";
  tags: string[];
}

const pesquisas: Pesquisa[] = [
  {
    id: "research-001",
    titulo: "Dificuldades no fluxo de Escrita Fiscal",
    tipo: "Teste de usabilidade",
    data: "2024-11-10",
    responsavel: "Time de UX",
    personas_envolvidas: ["Juliana Santos", "Ricardo Mendes"],
    modulos_relacionados: ["Escrita Fiscal"],
    problema_investigado:
      "Identificar pontos de atrito no fluxo de lançamento de notas fiscais e entender por que a taxa de erro nessa etapa é alta.",
    principais_insights: [
      {
        id: "insight-001-01",
        descricao:
          "100% dos participantes não entenderam a mensagem de erro ao inserir CFOP inválido",
        severidade: "crítico",
        evidencia: "Todos pararam na tela de erro e tentaram fechar o sistema",
      },
      {
        id: "insight-001-02",
        descricao:
          "O fluxo de lançamento exige 12 cliques para uma tarefa que usuários esperam fazer em 4-5",
        severidade: "alto",
        evidencia:
          "Média de 12,3 cliques registrada; usuários verbalizaram frustração explícita",
      },
      {
        id: "insight-001-03",
        descricao:
          "Usuários não percebem o indicador de status da NF na cor atual",
        severidade: "médio",
        evidencia:
          "4 de 6 participantes não identificaram que a NF estava com pendência",
      },
      {
        id: "insight-001-04",
        descricao:
          "Nenhum participante usou o botão de ajuda contextual disponível na tela",
        severidade: "médio",
        evidencia:
          "Botão de ajuda tem baixo contraste e está posicionado fora da área de foco",
      },
    ],
    recomendacoes: [
      "Reescrever mensagens de erro de CFOP com linguagem clara e indicação do valor correto",
      "Reduzir fluxo de lançamento com campos inteligentes e preenchimento automático por histórico",
      "Aumentar contraste e tamanho do indicador de status da NF",
      "Repositionar e redesenhar o botão de ajuda contextual",
    ],
    status: "ativa",
    tags: ["escrita fiscal", "erros", "fluxo", "operador", "lançamento NF"],
  },
  {
    id: "research-002",
    titulo: "Experiência de acesso ao holerite no app Para Você",
    tipo: "Entrevista",
    data: "2024-09-05",
    responsavel: "Time de UX",
    personas_envolvidas: ["Marcos Aurélio Silva"],
    modulos_relacionados: ["Para Você", "Holerite"],
    problema_investigado:
      "Entender dificuldades do colaborador CLT ao acessar documentos de RH pelo aplicativo Para Você.",
    principais_insights: [
      {
        id: "insight-002-01",
        descricao:
          "62% dos entrevistados ainda pedem o holerite impresso ao RH mesmo tendo acesso ao app",
        severidade: "alto",
        evidencia:
          "Motivo principal: 'não sei se está certo o que aparece na tela' — falta de confiança no digital",
      },
      {
        id: "insight-002-02",
        descricao:
          "O processo de primeiro acesso ao app tem taxa de abandono de ~40% por senha temporária difícil",
        severidade: "crítico",
        evidencia:
          "5 de 8 entrevistados relataram dificuldade com a senha temporária no primeiro acesso",
      },
      {
        id: "insight-002-03",
        descricao:
          "Colaboradores não sabem que podem solicitar férias e adiantamento pelo app",
        severidade: "médio",
        evidencia: "7 de 8 entrevistados desconheciam essas funcionalidades",
      },
    ],
    recomendacoes: [
      "Simplificar o fluxo de primeiro acesso com link mágico ou código SMS",
      "Adicionar indicadores visuais de confiança no holerite (ex: 'Documento oficial gerado em...')",
      "Criar onboarding ativo para novas funcionalidades do app",
    ],
    status: "ativa",
    tags: ["holerite", "para você", "mobile", "colaborador", "acesso"],
  },
  {
    id: "research-003",
    titulo: "Emissão de NF-e para MEIs — barreiras e simplificação",
    tipo: "Survey",
    data: "2025-02-20",
    responsavel: "Time de UX",
    personas_envolvidas: ["Bruno Takahashi", "Maria das Graças"],
    modulos_relacionados: ["NF-e"],
    problema_investigado:
      "Mapear barreiras que impedem MEIs de emitir NF-e de forma autônoma sem precisar acionar o contador.",
    principais_insights: [
      {
        id: "insight-003-01",
        descricao:
          "58% dos MEIs acionam o contador para emitir NF-e 'quando têm dúvida no CFOP'",
        severidade: "alto",
        evidencia:
          "Campo aberto: 'nunca sei qual código colocar, aí ligo pro contador'",
      },
      {
        id: "insight-003-02",
        descricao:
          "MEIs com baixo letramento digital abandonam o fluxo na etapa de certificado digital",
        severidade: "crítico",
        evidencia:
          "34% dos respondentes 'baixo digital' reportaram parar nessa etapa",
      },
      {
        id: "insight-003-03",
        descricao:
          "MEIs digitais querem emissão em lote e via API",
        severidade: "médio",
        evidencia:
          "Pedido espontâneo em 22% das respostas abertas do grupo digital",
      },
    ],
    recomendacoes: [
      "Criar assistente de CFOP com busca por descrição da atividade (não pelo código)",
      "Simplificar o fluxo de certificado digital com guia passo-a-passo e detecção automática",
      "Criar modo de emissão em lote para MEIs digitais com integração por planilha ou API",
    ],
    status: "ativa",
    tags: ["NF-e", "MEI", "emissão", "simplificação", "autônomo"],
  },
];

const tiposIcons: Record<string, React.ElementType> = {
  "Teste de usabilidade": ClipboardList,
  Entrevista: MessageSquare,
  Survey: BarChart2,
  "Desk research": FileText,
  "Análise heurística": Search,
};

const severidadeCores: Record<string, string> = {
  crítico: "bg-red-100 text-red-700 border-red-200",
  alto: "bg-orange-100 text-orange-700 border-orange-200",
  médio: "bg-yellow-100 text-yellow-700 border-yellow-200",
  baixo: "bg-green-100 text-green-700 border-green-200",
};

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

function InsightCopyButton({ insight, pesquisaTitulo }: { insight: Insight; pesquisaTitulo: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `"${insight.descricao}" — Fonte: ${pesquisaTitulo} (${insight.id})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      title="Copiar insight formatado para uso no Brainstorm"
      className="p-1 rounded hover:bg-muted transition-colors opacity-0 group-hover:opacity-100"
      aria-label="Copiar insight"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-green-600" />
      ) : (
        <Copy className="w-3.5 h-3.5 text-muted-foreground" />
      )}
    </button>
  );
}

export function RepositorioPesquisa() {
  const [busca, setBusca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState<string>("");
  const [filtroModulo, setFiltroModulo] = useState<string>("");
  const [filtroPersona, setFiltroPersona] = useState<string>("");
  const [pesquisaSelecionada, setPesquisaSelecionada] = useState<Pesquisa | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const todosModulos = useMemo(() => {
    const set = new Set<string>();
    pesquisas.forEach((p) => p.modulos_relacionados.forEach((m) => set.add(m)));
    return Array.from(set).sort();
  }, []);

  const todasPersonas = useMemo(() => {
    const set = new Set<string>();
    pesquisas.forEach((p) => p.personas_envolvidas.forEach((pn) => set.add(pn)));
    return Array.from(set).sort();
  }, []);

  const todosTipos = useMemo(() => {
    const set = new Set<string>();
    pesquisas.forEach((p) => set.add(p.tipo));
    return Array.from(set).sort();
  }, []);

  const resultados = useMemo(() => {
    return pesquisas.filter((p) => {
      const textoBusca = busca.toLowerCase();
      const matchBusca =
        !busca ||
        p.titulo.toLowerCase().includes(textoBusca) ||
        p.problema_investigado.toLowerCase().includes(textoBusca) ||
        p.principais_insights.some((i) =>
          i.descricao.toLowerCase().includes(textoBusca)
        ) ||
        p.recomendacoes.some((r) => r.toLowerCase().includes(textoBusca)) ||
        p.tags.some((t) => t.toLowerCase().includes(textoBusca));

      const matchTipo = !filtroTipo || p.tipo === filtroTipo;
      const matchModulo =
        !filtroModulo || p.modulos_relacionados.includes(filtroModulo);
      const matchPersona =
        !filtroPersona || p.personas_envolvidas.includes(filtroPersona);

      return matchBusca && matchTipo && matchModulo && matchPersona;
    });
  }, [busca, filtroTipo, filtroModulo, filtroPersona]);

  const filtrosAtivos = [filtroTipo, filtroModulo, filtroPersona].filter(Boolean).length;

  const pesquisasRelacionadas = useMemo(() => {
    if (!pesquisaSelecionada) return [];
    return pesquisas.filter(
      (p) =>
        p.id !== pesquisaSelecionada.id &&
        (p.modulos_relacionados.some((m) =>
          pesquisaSelecionada.modulos_relacionados.includes(m)
        ) ||
          p.personas_envolvidas.some((pn) =>
            pesquisaSelecionada.personas_envolvidas.includes(pn)
          ))
    );
  }, [pesquisaSelecionada]);

  return (
    <div className="flex h-full">
      {/* Lista */}
      <div
        className={`flex flex-col ${
          pesquisaSelecionada ? "hidden lg:flex lg:w-[420px]" : "flex-1"
        } border-r border-border`}
      >
        {/* Header com busca */}
        <div className="p-4 border-b border-border space-y-3">
          <div className="flex items-center gap-2">
            <h1
              style={{
                fontSize: "var(--text-h3)",
                fontWeight: "var(--font-weight-semibold)",
              }}
            >
              Repositório de Pesquisa
            </h1>
            <span className="ml-auto text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
              {resultados.length} pesquisa{resultados.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Buscar por título, insights, recomendações..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-[var(--radius)] outline-none focus:ring-2 focus:ring-ring/50"
              style={{ fontSize: "var(--text-label)" }}
            />
            {busca && (
              <button
                onClick={() => setBusca("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                aria-label="Limpar busca"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius)] border text-sm transition-colors ${
                filtrosAtivos > 0
                  ? "border-primary text-primary bg-primary/5"
                  : "border-border text-muted-foreground hover:bg-muted"
              }`}
              style={{ fontSize: "var(--text-caption)" }}
            >
              <Filter className="w-3.5 h-3.5" />
              Filtros
              {filtrosAtivos > 0 && (
                <span className="bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  {filtrosAtivos}
                </span>
              )}
            </button>
            {filtrosAtivos > 0 && (
              <button
                onClick={() => {
                  setFiltroTipo("");
                  setFiltroModulo("");
                  setFiltroPersona("");
                }}
                className="text-muted-foreground hover:text-foreground"
                style={{ fontSize: "var(--text-caption)" }}
              >
                Limpar filtros
              </button>
            )}
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 gap-2 pt-1">
              <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="px-3 py-1.5 bg-background border border-border rounded-[var(--radius)] outline-none focus:ring-2 focus:ring-ring/50"
                style={{ fontSize: "var(--text-caption)" }}
                aria-label="Filtrar por tipo"
              >
                <option value="">Todos os tipos</option>
                {todosTipos.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <select
                value={filtroModulo}
                onChange={(e) => setFiltroModulo(e.target.value)}
                className="px-3 py-1.5 bg-background border border-border rounded-[var(--radius)] outline-none focus:ring-2 focus:ring-ring/50"
                style={{ fontSize: "var(--text-caption)" }}
                aria-label="Filtrar por módulo"
              >
                <option value="">Todos os módulos</option>
                {todosModulos.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                value={filtroPersona}
                onChange={(e) => setFiltroPersona(e.target.value)}
                className="px-3 py-1.5 bg-background border border-border rounded-[var(--radius)] outline-none focus:ring-2 focus:ring-ring/50"
                style={{ fontSize: "var(--text-caption)" }}
                aria-label="Filtrar por persona"
              >
                <option value="">Todas as personas</option>
                {todasPersonas.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Cards de pesquisa */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {resultados.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Search className="w-8 h-8 mx-auto mb-3 opacity-40" />
              <p style={{ fontSize: "var(--text-base)" }}>Nenhuma pesquisa encontrada.</p>
              <p style={{ fontSize: "var(--text-caption)" }} className="mt-1">
                Tente ajustar os filtros ou a busca.
              </p>
            </div>
          ) : (
            resultados.map((pesquisa) => {
              const TipoIcon = tiposIcons[pesquisa.tipo] || FileText;
              const isSelected = pesquisaSelecionada?.id === pesquisa.id;
              return (
                <button
                  key={pesquisa.id}
                  onClick={() =>
                    setPesquisaSelecionada(isSelected ? null : pesquisa)
                  }
                  className={`w-full text-left p-4 rounded-[var(--radius-card)] border transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/40 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-[var(--radius)] bg-muted flex items-center justify-center shrink-0 mt-0.5">
                      <TipoIcon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        style={{
                          fontSize: "var(--text-label)",
                          fontWeight: "var(--font-weight-semibold)",
                        }}
                        className="line-clamp-2"
                      >
                        {pesquisa.titulo}
                      </p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span
                          className="text-muted-foreground"
                          style={{ fontSize: "var(--text-caption)" }}
                        >
                          {pesquisa.tipo}
                        </span>
                        <span className="text-muted-foreground">·</span>
                        <span
                          className="text-muted-foreground"
                          style={{ fontSize: "var(--text-caption)" }}
                        >
                          {formatDate(pesquisa.data)}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {pesquisa.modulos_relacionados.map((m) => (
                          <Badge key={m} variant="secondary" className="text-[10px] py-0">
                            {m}
                          </Badge>
                        ))}
                      </div>
                      <p
                        className="text-muted-foreground mt-2 line-clamp-2"
                        style={{ fontSize: "var(--text-caption)" }}
                      >
                        {pesquisa.problema_investigado}
                      </p>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 mt-0.5 transition-transform ${
                        isSelected ? "rotate-90 text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Painel de detalhe */}
      {pesquisaSelecionada && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header do detalhe */}
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <button
              onClick={() => setPesquisaSelecionada(null)}
              className="lg:hidden p-2 rounded-[var(--radius)] hover:bg-muted"
              aria-label="Voltar para lista"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex-1 min-w-0">
              <p
                className="truncate"
                style={{
                  fontSize: "var(--text-base)",
                  fontWeight: "var(--font-weight-semibold)",
                }}
              >
                {pesquisaSelecionada.titulo}
              </p>
              <div className="flex items-center gap-3 mt-0.5">
                <span
                  className="text-muted-foreground"
                  style={{ fontSize: "var(--text-caption)" }}
                >
                  {pesquisaSelecionada.tipo}
                </span>
                <span className="text-muted-foreground">·</span>
                <span
                  className="text-muted-foreground flex items-center gap-1"
                  style={{ fontSize: "var(--text-caption)" }}
                >
                  <Calendar className="w-3 h-3" />
                  {formatDate(pesquisaSelecionada.data)}
                </span>
                <span className="text-muted-foreground">·</span>
                <span
                  className="text-muted-foreground flex items-center gap-1"
                  style={{ fontSize: "var(--text-caption)" }}
                >
                  <User className="w-3 h-3" />
                  {pesquisaSelecionada.responsavel}
                </span>
              </div>
            </div>
            <Badge
              variant={pesquisaSelecionada.status === "ativa" ? "default" : "secondary"}
            >
              {pesquisaSelecionada.status}
            </Badge>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Problema investigado */}
            <section>
              <h2
                style={{
                  fontSize: "var(--text-label)",
                  fontWeight: "var(--font-weight-semibold)",
                }}
                className="mb-2"
              >
                Problema investigado
              </h2>
              <p
                className="text-muted-foreground"
                style={{ fontSize: "var(--text-label)" }}
              >
                {pesquisaSelecionada.problema_investigado}
              </p>
            </section>

            {/* Tags */}
            <section>
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-3.5 h-3.5 text-muted-foreground" />
                {pesquisaSelecionada.personas_envolvidas.map((p) => (
                  <Badge key={p} variant="outline" className="gap-1">
                    <Users className="w-3 h-3" />
                    {p}
                  </Badge>
                ))}
                {pesquisaSelecionada.modulos_relacionados.map((m) => (
                  <Badge key={m} variant="secondary">
                    {m}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Insights */}
            <section>
              <h2
                style={{
                  fontSize: "var(--text-label)",
                  fontWeight: "var(--font-weight-semibold)",
                }}
                className="mb-3"
              >
                Principais insights
              </h2>
              <div className="space-y-3">
                {pesquisaSelecionada.principais_insights.map((insight) => (
                  <div
                    key={insight.id}
                    className="group p-3 rounded-[var(--radius)] border border-border bg-card"
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border shrink-0 mt-0.5 ${
                          severidadeCores[insight.severidade]
                        }`}
                      >
                        {insight.severidade}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p style={{ fontSize: "var(--text-label)" }}>
                          {insight.descricao}
                        </p>
                        {insight.evidencia && (
                          <p
                            className="text-muted-foreground mt-1 italic"
                            style={{ fontSize: "var(--text-caption)" }}
                          >
                            "{insight.evidencia}"
                          </p>
                        )}
                      </div>
                      <InsightCopyButton
                        insight={insight}
                        pesquisaTitulo={pesquisaSelecionada.titulo}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recomendações */}
            <section>
              <h2
                style={{
                  fontSize: "var(--text-label)",
                  fontWeight: "var(--font-weight-semibold)",
                }}
                className="mb-3"
              >
                Recomendações
              </h2>
              <ul className="space-y-2">
                {pesquisaSelecionada.recomendacoes.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span
                      className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5"
                      style={{ fontSize: "var(--text-caption)" }}
                    >
                      {i + 1}
                    </span>
                    <p style={{ fontSize: "var(--text-label)" }}>{rec}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Pesquisas relacionadas */}
            {pesquisasRelacionadas.length > 0 && (
              <section>
                <h2
                  style={{
                    fontSize: "var(--text-label)",
                    fontWeight: "var(--font-weight-semibold)",
                  }}
                  className="mb-3"
                >
                  Pesquisas relacionadas
                </h2>
                <div className="space-y-2">
                  {pesquisasRelacionadas.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPesquisaSelecionada(p)}
                      className="w-full text-left p-3 rounded-[var(--radius)] border border-border hover:border-primary/40 hover:bg-muted/50 transition-colors flex items-center gap-2"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <span style={{ fontSize: "var(--text-label)" }}>
                        {p.titulo}
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      )}

      {/* Estado vazio do painel de detalhe */}
      {!pesquisaSelecionada && (
        <div className="hidden lg:flex flex-1 items-center justify-center text-muted-foreground">
          <div className="text-center">
            <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p style={{ fontSize: "var(--text-base)" }}>
              Selecione uma pesquisa para ver os detalhes
            </p>
            <p style={{ fontSize: "var(--text-caption)" }} className="mt-1 max-w-xs">
              Os insights podem ser copiados para uso no Brainstorm
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
