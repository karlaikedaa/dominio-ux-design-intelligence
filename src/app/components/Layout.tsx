import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import {
  Users,
  Building2,
  UserCircle,
  Map,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Search,
  GraduationCap,
  FlaskConical,
  Home,
  PenLine,
  Accessibility,
  BarChart3,
  Sparkles,
  FileSearch,
  Bot,
} from "lucide-react";
import { Button } from "./ui/button";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./ui/collapsible";
import { allPersonas } from "../data/personas";

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
  exact?: boolean;
}

interface NavSection {
  titulo: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    titulo: "Central de conhecimento",
    items: [
      { path: "/onboarding", label: "Comece aqui", icon: GraduationCap },
      { path: "/produtos", label: "Nossos produtos", icon: Building2 },
      { path: "/personas", label: "Personas Sintéticas", icon: Users },
      { path: "/ai-first", label: "AI First", icon: Sparkles },
    ],
  },
  {
    titulo: "Processos de Discovery",
    items: [
      { path: "/brainstorm", label: "Geração de briefing", icon: Lightbulb },
      { path: "/benchmark", label: "Agente Benchmark", icon: FileSearch },
      { path: "/repositorio-pesquisa", label: "Repositório de pesquisa", icon: FlaskConical },
    ],
  },
  {
    titulo: "Processos de Cocriação",
    items: [
      { path: "/brainstorm", label: "Brainstorm", icon: Lightbulb },
      { path: "/defesa-tecnica", label: "Defesa Técnica", icon: Bot },
      { path: "/validador", label: "Validador de Writing", icon: PenLine },
    ],
  },
  {
    titulo: "Processo de Delivery",
    items: [
      { path: "/acessibilidade", label: "Especif. Acessibilidade", icon: Accessibility },
      { path: "/metricas", label: "Especificação de dados", icon: BarChart3 },
    ],
  },
];

const navItems: NavItem[] = [
  { path: "/", label: "Início", icon: Home, exact: true },
  ...navSections.flatMap(section => section.items),
];

export function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openSections, setOpenSections] = useState<string[]>(
    navSections.map(s => s.titulo) // Todas as seções abertas por padrão
  );
  const location = useLocation();

  const toggleSection = (titulo: string) => {
    setOpenSections(prev =>
      prev.includes(titulo)
        ? prev.filter(t => t !== titulo)
        : [...prev, titulo]
    );
  };

  const currentPage = navItems.find((item) =>
    item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path)
  );

  // Conteúdos searchable do sistema
  const searchableContent = [
    // Páginas principais
    { type: "page", title: "Onboarding UX", path: "/onboarding", description: "Comece aqui - boas vindas, dados da empresa, dia a dia", tags: ["início", "começar", "treinamento", "cultura", "time"] },
    { type: "page", title: "Nossos Produtos", path: "/produtos", description: "Módulos Domínio Contábil, Inova e Comercial", tags: ["módulos", "contábil", "fiscal", "folha", "produtos"] },
    { type: "page", title: "Personas Sintéticas", path: "/personas", description: "Personas de escritório contábil, empresa e funcionário", tags: ["usuários", "personas", "perfil", "contador"] },
    { type: "page", title: "AI First", path: "/ai-first", description: "Como usamos IA, agentes criados, bibliotecas de prompts", tags: ["inteligência artificial", "ia", "chains", "prompts", "agentes"] },
    { type: "page", title: "Geração de Briefing", path: "/brainstorm", description: "Brainstorm e defesa técnica de UX", tags: ["briefing", "brainstorm", "ideação", "discovery"] },
    { type: "page", title: "Agente Benchmark", path: "/benchmark", description: "Análise de competidores e referências de mercado", tags: ["competidores", "referências", "mercado", "benchmark"] },
    { type: "page", title: "Repositório de Pesquisa", path: "/repositorio-pesquisa", description: "Pesquisas de UX e dados de usuários", tags: ["pesquisa", "ux research", "dados", "insights"] },
    { type: "page", title: "Validador de Writing", path: "/validador", description: "Verificação de conformidade com Guia de UX Writing", tags: ["writing", "textos", "linguagem", "tom de voz"] },
    { type: "page", title: "Guia de UX Writing", path: "/guia-writing", description: "13 seções com regras de linguagem, tom e voz", tags: ["regras", "writing", "textos", "linguagem", "padronização"] },
    { type: "page", title: "Defesa Técnica", path: "/defesa-tecnica", description: "Argumentação técnica para decisões de UX", tags: ["defesa", "argumentação", "técnico", "decisões"] },
    { type: "page", title: "Acessibilidade", path: "/acessibilidade", description: "Especificações WCAG 2.1 AA e WAI-ARIA", tags: ["a11y", "wcag", "aria", "acessível", "inclusão"] },
    { type: "page", title: "Especificação de Dados", path: "/metricas", description: "Tagueamento e eventos de analytics", tags: ["métricas", "analytics", "dados", "eventos", "datadog"] },

    // Writing - seções principais
    { type: "content", title: "Regras gerais para textos", path: "/guia-writing", description: "Voz ativa, redundâncias, labels descritivos", tags: ["voz ativa", "clareza", "objetividade"] },
    { type: "content", title: "Tom de voz Thomson Reuters", path: "/guia-writing", description: "Profissional, acessível, conciso e direto", tags: ["tom", "voz", "marca", "comunicação"] },
    { type: "content", title: "Botões", path: "/guia-writing", description: "Verbos no infinitivo, ações destrutivas", tags: ["botões", "ações", "cta"] },
    { type: "content", title: "Mensagens de erro", path: "/guia-writing", description: "Explicar o problema e como resolver", tags: ["erro", "validação", "feedback"] },
    { type: "content", title: "Empty spaces", path: "/guia-writing", description: "Estados vazios com ação clara", tags: ["vazio", "empty", "sem conteúdo"] },
    { type: "content", title: "Datas e valores", path: "/guia-writing", description: "Formato brasileiro, horário 24h, moeda", tags: ["data", "horário", "valor", "moeda", "formato"] },

    // More Writing sections
    { type: "content", title: "Linguagem inclusiva", path: "/guia-writing", description: "Evitar linguagem que exclua grupos sociais", tags: ["inclusão", "diversidade", "linguagem"] },
    { type: "content", title: "Capitalização", path: "/guia-writing", description: "Quando usar maiúsculas e minúsculas", tags: ["maiúsculas", "caps", "título"] },
    { type: "content", title: "Pontuação", path: "/guia-writing", description: "Regras de pontuação em interfaces", tags: ["ponto", "vírgula", "pontuação"] },
    { type: "content", title: "Abreviações e siglas", path: "/guia-writing", description: "Como usar abreviações corretamente", tags: ["sigla", "abreviação", "acrônimo"] },
    { type: "content", title: "Unidades de medida", path: "/guia-writing", description: "Formato de valores, pesos e medidas", tags: ["medida", "unidade", "kg", "km"] },
    { type: "content", title: "Confirmações e cancelamentos", path: "/guia-writing", description: "Textos para ações destrutivas", tags: ["confirmação", "cancelar", "excluir"] },
    { type: "content", title: "Títulos de seções", path: "/guia-writing", description: "Como escrever títulos claros", tags: ["título", "heading", "seção"] },

    // Products - Core modules
    { type: "content", title: "Contabilidade (módulo)", path: "/produtos", description: "Fechamento contábil, conciliação bancária, balancetes", tags: ["contábil", "core", "balancete", "dre", "conciliação"] },
    { type: "content", title: "Escrita Fiscal (módulo)", path: "/produtos", description: "Notas fiscais, apuração de impostos, SPED", tags: ["fiscal", "core", "impostos", "nfe", "sped"] },
    { type: "content", title: "Folha de Pagamento (módulo)", path: "/produtos", description: "DP, eSocial, cálculo de encargos", tags: ["folha", "core", "dp", "esocial", "salário"] },

    // Products - Accessory modules
    { type: "content", title: "Patrimônio (módulo)", path: "/produtos", description: "Controle de bens e depreciação", tags: ["patrimônio", "acessório", "depreciação", "bens"] },
    { type: "content", title: "Lalur (módulo)", path: "/produtos", description: "Lucro Real, IRPJ e CSLL", tags: ["lalur", "acessório", "lucro real", "irpj", "csll"] },
    { type: "content", title: "Atualizar (módulo)", path: "/produtos", description: "Recálculo de impostos em atraso", tags: ["atualizar", "acessório", "multa", "juros"] },
    { type: "content", title: "Busca NF-e (módulo)", path: "/produtos", description: "Busca automática de notas fiscais", tags: ["busca nfe", "acessório", "sefaz", "notas"] },
    { type: "content", title: "BOX-e (módulo)", path: "/produtos", description: "Armazenamento digital de documentos", tags: ["boxe", "acessório", "documentos", "arquivo"] },

    // Products - Peripheral modules
    { type: "content", title: "Conteúdo Tributário", path: "/produtos", description: "Legislação e tabelas tributárias", tags: ["periférico", "legislação", "tributário", "conteúdo"] },
    { type: "content", title: "Processos (módulo)", path: "/produtos", description: "Gestão de tarefas e prazos", tags: ["processos", "periférico", "tarefas", "gestta"] },
    { type: "content", title: "Messenger (módulo)", path: "/produtos", description: "Comunicação via WhatsApp", tags: ["messenger", "periférico", "whatsapp", "comunicação"] },
  ];

  const searchQuery_lower = searchQuery.toLowerCase();

  // Relevance scoring function
  const calculateRelevance = (item: { name?: string; title?: string; role?: string; description?: string; tags?: string[] }, query: string): number => {
    const queryLower = query.toLowerCase();
    let score = 0;

    // Exact match in name/title: +100
    if (item.name?.toLowerCase() === queryLower) score += 100;
    if (item.title?.toLowerCase() === queryLower) score += 100;

    // Exact match in role/description: +50
    if (item.role?.toLowerCase() === queryLower) score += 50;
    if (item.description?.toLowerCase() === queryLower) score += 50;

    // Starts with query: +30
    if (item.name?.toLowerCase().startsWith(queryLower)) score += 30;
    if (item.title?.toLowerCase().startsWith(queryLower)) score += 30;

    // Partial match (includes): +10
    if (item.name?.toLowerCase().includes(queryLower)) score += 10;
    if (item.title?.toLowerCase().includes(queryLower)) score += 10;

    // Tag exact match: +40
    if (item.tags?.some(t => t.toLowerCase() === queryLower)) score += 40;

    // Tag partial match: +5
    if (item.tags?.some(t => t.toLowerCase().includes(queryLower))) score += 5;

    return score;
  };

  const searchResults = searchQuery.length >= 2
    ? [
        // Personas with scores
        ...allPersonas
          .map(p => ({ ...p, type: 'persona' as const, score: calculateRelevance(p, searchQuery_lower) }))
          .filter(p => p.score > 0),

        // Content with scores
        ...searchableContent
          .map(c => ({ ...c, score: calculateRelevance(c, searchQuery_lower) }))
          .filter(c => c.score > 0),
      ]
      .sort((a, b) => b.score - a.score) // Sort by score descending
    : [];

  // Sugestões relacionadas (quando há resultados)
  const relatedSuggestions = searchResults.length > 0 && searchQuery.length >= 2
    ? searchableContent
        .filter((c) =>
          !searchResults.some(r => r.type !== 'persona' && r.title === c.title) && // Não duplicar
          searchResults.some(r => {
            if (r.type === 'persona') return false;
            return r.tags?.some(tag => c.tags.includes(tag)); // Tags em comum
          })
        )
        .slice(0, 3)
    : [];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-[var(--radius)]"
      >
        Ir para o conteúdo principal
      </a>

      {/* Sidebar - Desktop */}
      <aside
        className={`hidden lg:flex flex-col border-r border-border bg-sidebar transition-all duration-200 ${
          collapsed ? "w-16" : "w-60"
        }`}
      >
        <NavLink
          to="/"
          className={`flex items-center h-14 border-b border-border px-4 hover:bg-muted/50 transition-colors ${collapsed ? "justify-center" : "gap-3"}`}
          aria-label="Ir para o início — Domínio UX"
        >
          <div className="w-8 h-8 rounded-[var(--radius)] bg-primary flex items-center justify-center shrink-0">
            <span className="text-primary-foreground" style={{ fontSize: "var(--text-label)" }}>D</span>
          </div>
          {!collapsed && (
            <span className="text-sidebar-foreground" style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}>
              Domínio UX
            </span>
          )}
        </NavLink>
        <nav aria-label="Navegação principal" className="flex-1 py-3 px-2 overflow-y-auto">
          {collapsed ? (
            // Modo colapsado: apenas ícones sem seções
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isItemActive = item.exact
                  ? location.pathname === item.path
                  : location.pathname.startsWith(item.path);
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      end={item.exact}
                      aria-current={isItemActive ? "page" : undefined}
                      className={({ isActive: navIsActive }) => {
                        const active = item.exact ? location.pathname === item.path : navIsActive;
                        return `flex items-center justify-center px-3 py-2.5 rounded-[var(--radius)] transition-colors duration-150 min-h-[44px] ${
                          active
                            ? "bg-primary/10 text-primary"
                            : "text-sidebar-foreground hover:bg-muted"
                        }`;
                      }}
                      title={item.label}
                    >
                      <item.icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          ) : (
            // Modo expandido: seções com sub-itens
            <div className="space-y-4">
              {/* Início sempre visível */}
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius)] transition-colors duration-150 min-h-[44px] ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-sidebar-foreground hover:bg-muted"
                  }`
                }
              >
                <Home className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span style={{ fontSize: "var(--text-label)" }}>Início</span>
              </NavLink>

              {/* Seções expansíveis */}
              {navSections.map((section) => (
                <Collapsible
                  key={section.titulo}
                  open={openSections.includes(section.titulo)}
                  onOpenChange={() => toggleSection(section.titulo)}
                >
                  <CollapsibleTrigger className="w-full flex items-center justify-between px-3 py-2 text-muted-foreground hover:text-foreground transition-colors group">
                    <span
                      style={{
                        fontSize: "var(--text-caption)",
                        fontWeight: "var(--font-weight-semibold)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {section.titulo}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        openSections.includes(section.titulo) ? "rotate-180" : ""
                      }`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <ul className="space-y-1 mt-1">
                      {section.items.map((item) => {
                        const isItemActive = location.pathname.startsWith(item.path) && item.path !== "/";
                        return (
                          <li key={item.path}>
                            <NavLink
                              to={item.path}
                              aria-current={isItemActive ? "page" : undefined}
                              className={({ isActive: navIsActive }) => {
                                const active = navIsActive && item.path !== "/";
                                return `flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius)] transition-colors duration-150 min-h-[44px] ${
                                  active
                                    ? "bg-primary/10 text-primary"
                                    : "text-sidebar-foreground hover:bg-muted"
                                }`;
                              }}
                            >
                              <item.icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                              <span style={{ fontSize: "var(--text-label)" }}>{item.label}</span>
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          )}
        </nav>
        <div className="px-2 py-3 border-t border-border">
          <button
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expandir menu lateral" : "Recolher menu lateral"}
            aria-expanded={!collapsed}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius)] w-full text-muted-foreground hover:bg-muted transition-colors min-h-[44px] ${
              collapsed ? "justify-center" : ""
            }`}
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span style={{ fontSize: "var(--text-label)" }}>Recolher</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-[var(--radius)] hover:bg-muted min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <NavLink to="/" className="lg:hidden w-8 h-8 rounded-[var(--radius)] bg-primary flex items-center justify-center" aria-label="Início">
              <span className="text-primary-foreground" style={{ fontSize: "var(--text-label)" }}>D</span>
            </NavLink>
            <h2 className="hidden sm:block" style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-semibold)" }}>
              {currentPage?.label || "Domínio UX"}
            </h2>
          </div>
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Buscar conteúdos"
              className="p-2 rounded-[var(--radius)] hover:bg-muted min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <Search className="w-5 h-5" />
            </button>
            {searchOpen && (
              <div className="absolute right-0 top-12 w-96 bg-card border border-border rounded-[var(--radius-card)] shadow-[var(--elevation-lg)] z-50">
                <div role="search" className="p-3">
                  <label htmlFor="global-search" className="sr-only">
                    Buscar páginas, personas ou conteúdos
                  </label>
                  <input
                    id="global-search"
                    type="search"
                    placeholder="Buscar páginas, personas ou conteúdos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 bg-input-background border border-border rounded-[var(--radius)] outline-none focus:ring-2 focus:ring-ring/50"
                    style={{ fontSize: "var(--text-label)" }}
                    autoFocus
                  />
                </div>
                {searchQuery.length >= 2 && (
                  <div className="border-t border-border max-h-96 overflow-y-auto" aria-live="polite">
                    {searchResults.length === 0 ? (
                      <p className="p-3 text-muted-foreground" style={{ fontSize: "var(--text-label)" }}>
                        Nenhum resultado encontrado.
                      </p>
                    ) : (
                      <>
                        <div className="px-3 py-2 bg-muted/30 border-b border-border sticky top-0">
                          <p className="text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
                            {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''} encontrado{searchResults.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                        <p className="sr-only">
                          {searchResults.length} resultado{searchResults.length !== 1 ? "s" : ""} encontrado{searchResults.length !== 1 ? "s" : ""}
                        </p>
                        <div>
                          {/* Resultados principais */}
                          <ul className="divide-y divide-border">
                            {searchResults.map((result, idx) => {
                              if (result.type === 'persona') {
                                const p = result;
                                return (
                                  <li key={`persona-${p.id}`}>
                                    <NavLink
                                      to={
                                        p.category === "empregado"
                                          ? "/personas/empregado"
                                          : `/personas/${p.category}`
                                      }
                                      onClick={() => {
                                        setSearchOpen(false);
                                        setSearchQuery("");
                                      }}
                                      className="flex items-center gap-3 px-3 py-2.5 hover:bg-muted transition-colors"
                                    >
                                      <img
                                        src={p.avatar}
                                        alt=""
                                        className="w-8 h-8 rounded-full object-cover shrink-0"
                                      />
                                      <div className="flex-1 min-w-0">
                                        <p style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}>
                                          {p.name}
                                        </p>
                                        <p className="text-muted-foreground truncate" style={{ fontSize: "var(--text-caption)" }}>
                                          {p.role}
                                        </p>
                                      </div>
                                      <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[10px] font-medium shrink-0">
                                        Persona
                                      </span>
                                    </NavLink>
                                  </li>
                                );
                              } else {
                                const c = result;
                                return (
                                  <li key={`content-${idx}`}>
                                    <NavLink
                                      to={c.path}
                                      onClick={() => {
                                        setSearchOpen(false);
                                        setSearchQuery("");
                                      }}
                                      className="flex items-start gap-3 px-3 py-2.5 hover:bg-muted transition-colors"
                                    >
                                      <div className={`w-8 h-8 rounded-[var(--radius)] flex items-center justify-center shrink-0 ${
                                        c.type === 'page' ? 'bg-blue-100' : 'bg-green-100'
                                      }`}>
                                        {c.type === 'page' ? (
                                          <FileSearch className="w-4 h-4 text-blue-600" />
                                        ) : (
                                          <Bot className="w-4 h-4 text-green-600" />
                                        )}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}>
                                          {c.title}
                                        </p>
                                        <p className="text-muted-foreground line-clamp-2" style={{ fontSize: "var(--text-caption)", lineHeight: "1.4" }}>
                                          {c.description}
                                        </p>
                                      </div>
                                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium shrink-0 ${
                                        c.type === 'page' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                                      }`}>
                                        {c.type === 'page' ? 'Página' : 'Conteúdo'}
                                      </span>
                                    </NavLink>
                                  </li>
                                );
                              }
                            })}
                          </ul>

                          {/* Sugestões relacionadas */}
                          {relatedSuggestions.length > 0 && (
                            <div className="border-t border-border bg-muted/30 p-3">
                              <p className="text-muted-foreground mb-2" style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                Conteúdos relacionados
                              </p>
                              <ul className="space-y-1">
                                {relatedSuggestions.map((c, idx) => (
                                  <li key={`related-${idx}`}>
                                    <NavLink
                                      to={c.path}
                                      onClick={() => {
                                        setSearchOpen(false);
                                        setSearchQuery("");
                                      }}
                                      className="flex items-center gap-2 px-2 py-1.5 rounded-[var(--radius)] hover:bg-card transition-colors group"
                                    >
                                      <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                      <span className="text-muted-foreground group-hover:text-foreground transition-colors flex-1" style={{ fontSize: "var(--text-caption)" }}>
                                        {c.title}
                                      </span>
                                    </NavLink>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileMenuOpen(false)}
            />
            <nav
              aria-label="Navegação principal"
              className="absolute left-0 top-0 bottom-0 w-64 bg-card border-r border-border z-50 pt-16 px-2"
            >
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      end={item.exact}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={
                        (item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path))
                          ? "page"
                          : undefined
                      }
                      className={({ isActive: navIsActive }) => {
                        const active = item.exact ? location.pathname === item.path : navIsActive;
                        return `flex items-center gap-3 px-3 py-3 rounded-[var(--radius)] transition-colors min-h-[44px] ${
                          active ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                        }`;
                      }}
                    >
                      <item.icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                      <span style={{ fontSize: "var(--text-label)" }}>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}

        {/* Main content */}
        <main id="main-content" className="flex-1 overflow-hidden" tabIndex={-1}>
          <div className="h-full overflow-y-auto">
            <Outlet />
          </div>
        </main>

        {/* Bottom navigation - Mobile */}
        <nav
          aria-label="Navegação principal"
          className="lg:hidden border-t border-border bg-card shrink-0"
        >
          <ul className="flex overflow-x-auto">
            {navItems.map((item) => {
              const isActive = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);
              const shortLabel = item.label
                .replace("Personas sintéticas", "Personas")
                .replace("Briefing e defesa de UX", "Briefing")
                .replace("Validador de Writing", "Writing")
                .replace("Especif. Acessibilidade", "Acessib.")
                .replace("Especif. Tagueamento", "Tagueam.")
                .replace("Repositório de Pesquisa", "Pesquisa")
                .replace("Onboarding UX", "Onboarding");
              return (
                <li key={item.path} className="flex-1 min-w-[56px]">
                  <NavLink
                    to={item.path}
                    end={item.exact}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex flex-col items-center justify-center py-2 min-h-[56px] transition-colors ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <item.icon className="w-5 h-5" aria-hidden="true" />
                    <span style={{ fontSize: "9px" }} className={isActive ? "text-primary" : "text-muted-foreground"}>
                      {shortLabel}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}