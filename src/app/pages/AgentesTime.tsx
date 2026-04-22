import { NavLink } from "react-router";
import { ChevronLeft, Bot, ExternalLink } from "lucide-react";

interface Agente {
  id: string;
  nome: string;
  criador: string;
  link: string;
  instrucoes?: string;
  descricao: string;
  categoria: 'Discovery' | 'Cocriação' | 'Delivery';
}

// Discovery Agents (8)
const agentesDiscovery: Agente[] = [
  {
    id: 'benchmarking-copilot',
    nome: 'Agente de Benchmarking Copilot',
    criador: 'Filipe Pinheiro',
    link: 'https://claude.ai/chat/benchmarking-copilot',
    descricao: 'Agente especializado em análise de benchmarking e comparação competitiva',
    categoria: 'Discovery',
  },
  {
    id: 'benchmarking-open-arena',
    nome: 'Agente de Benchmarking - Open Arena',
    criador: 'Filipe Pinheiro',
    link: 'https://claude.ai/chat/benchmarking-open-arena',
    descricao: 'Análise de benchmarking através do Open Arena framework',
    categoria: 'Discovery',
  },
  {
    id: 'tradutor-contabil',
    nome: 'Tradutor Contábil',
    criador: 'Tassiana Mafioletti',
    link: 'https://claude.ai/chat/tradutor-contabil',
    instrucoes: 'Use este agente para traduzir termos técnicos contábeis em linguagem simples e vice-versa',
    descricao: 'Traduz conceitos contábeis complexos para linguagem acessível e vice-versa',
    categoria: 'Discovery',
  },
  {
    id: 'analise-dados',
    nome: 'Análise de dados',
    criador: 'Lucas Lima',
    link: 'https://claude.ai/chat/analise-dados',
    instrucoes: 'Envie seus dados em CSV ou descreva o conjunto de dados para análise exploratória',
    descricao: 'Realiza análise exploratória de dados e identificação de padrões',
    categoria: 'Discovery',
  },
  {
    id: 'perguntas-sem-vies',
    nome: 'Gerador de perguntas sem viés',
    criador: 'Lucas Lima',
    link: 'https://claude.ai/chat/perguntas-sem-vies',
    instrucoes: 'Descreva o tópico ou objetivo da pesquisa para gerar perguntas neutras e imparciais',
    descricao: 'Gera questões de pesquisa eliminando vieses cognitivos e manipulação',
    categoria: 'Discovery',
  },
  {
    id: 'criacao-briefings',
    nome: 'Agente de criação de briefings',
    criador: 'Adelino Oliveira',
    link: 'https://claude.ai/chat/criacao-briefings',
    instrucoes: 'Forneça o contexto do projeto, stakeholders envolvidos e objetivos principais',
    descricao: 'Estrutura e cria briefings completos para projetos de design',
    categoria: 'Discovery',
  },
  {
    id: 'resumo-alinhamento',
    nome: 'Resumo de alinhamento',
    criador: 'Sabrina Ezequiel',
    link: 'https://claude.ai/chat/resumo-alinhamento',
    instrucoes: 'Compartilhe os pontos discutidos na reunião de alinhamento para gerar o resumo',
    descricao: 'Sintetiza alinhamentos e decisões de reuniões em documentos estruturados',
    categoria: 'Discovery',
  },
  {
    id: 'produtos-personas-dominio',
    nome: 'Produtos e Personas Sintéticas Domínio',
    criador: 'Karla Ikeda',
    link: 'https://claude.ai/chat/produtos-personas-dominio',
    instrucoes: 'Consulte este agente para informações sobre personas e produtos do Domínio Sistemas',
    descricao: 'Repositório de personas sintéticas e produtos do portfólio Domínio',
    categoria: 'Discovery',
  },
];

// Cocriação Agents (7)
const agentesCocriacao: Agente[] = [
  {
    id: 'prompts-figma-make',
    nome: 'Gerador de prompts para Figma Make',
    criador: 'Daniel Andrade',
    link: 'https://claude.ai/chat/prompts-figma-make',
    instrucoes: 'Descreva o componente ou padrão desejado para gerar prompts otimizados para Figma',
    descricao: 'Gera prompts otimizados para criar designs automáticos no Figma com Make',
    categoria: 'Cocriação',
  },
  {
    id: 'especialista-usabilidade',
    nome: 'Especialista em usabilidade',
    criador: 'Sabrina Ezequiel',
    link: 'https://claude.ai/chat/especialista-usabilidade',
    instrucoes: 'Compartilhe screenshots ou descrições de interfaces para análise de usabilidade',
    descricao: 'Avalia interfaces quanto a princípios de usabilidade e propõe melhorias',
    categoria: 'Cocriação',
  },
  {
    id: 'norman-bolso',
    nome: 'Norman de bolso',
    criador: 'Tassiana Mafioletti',
    link: 'https://claude.ai/chat/norman-bolso',
    instrucoes: 'Descreva problemas de UX ou comportamentos de usuários para análise com design theory',
    descricao: 'Aplica principles de design thinking e psicologia cognitiva (Norman) a problemas de UX',
    categoria: 'Cocriação',
  },
  {
    id: 'chain-ux-writing',
    nome: 'Chain do Open Arena para UX Writing',
    criador: 'Natalia De Marco',
    link: 'https://claude.ai/chat/chain-ux-writing',
    descricao: 'Pipeline de análise e melhoria de microcópias usando a metodologia Open Arena',
    categoria: 'Cocriação',
  },
  {
    id: 'requisitos-componente-ds',
    nome: 'Agente de Requisitos de Componente p/ DS',
    criador: 'Luis Augusto Domingues',
    link: 'https://claude.ai/chat/requisitos-componente-ds',
    instrucoes: 'Descreva o componente desejado para gerar especificações para Design System',
    descricao: 'Define requisitos e especificações para componentes do Design System',
    categoria: 'Cocriação',
  },
  {
    id: 'recomendacoes-componentes',
    nome: 'Agente de Recomendações de uso de componentes',
    criador: 'Luis Augusto Domingues',
    link: 'https://claude.ai/chat/recomendacoes-componentes',
    instrucoes: 'Descreva sua necessidade de interface para receber recomendações de componentes',
    descricao: 'Recomenda componentes apropriados do Design System para cada caso de uso',
    categoria: 'Cocriação',
  },
  {
    id: 'acessibilidade-analise',
    nome: 'Agente de acessibilidade',
    criador: 'Karla Ikeda',
    link: 'https://claude.ai/chat/acessibilidade-analise',
    instrucoes: 'Envie screenshots ou descrições de interfaces para análise de acessibilidade',
    descricao: 'Avalia e propõe melhorias em acessibilidade conforme WCAG 2.1',
    categoria: 'Cocriação',
  },
];

// Delivery Agents (2)
const agentesDelivery: Agente[] = [
  {
    id: 'especificacao-acessibilidade',
    nome: 'Agente de criação de especificação de acessibilidade',
    criador: 'Karla Ikeda',
    link: 'https://claude.ai/chat/especificacao-acessibilidade',
    instrucoes: 'Envie a tela ou componente para gerar especificação completa de acessibilidade',
    descricao: 'Gera especificações técnicas de acessibilidade com ARIA, labels e roles',
    categoria: 'Delivery',
  },
  {
    id: 'relatorios-csat',
    nome: 'Agente de IA para relatórios de pesquisa CSAT',
    criador: 'Natalia De Marco',
    link: 'https://claude.ai/chat/relatorios-csat',
    instrucoes: 'Compartilhe dados brutos de pesquisa CSAT para análise e geração de relatório',
    descricao: 'Analisa dados de pesquisa de satisfação CSAT e gera relatórios insights',
    categoria: 'Delivery',
  },
];

// Combine all agents
const todosAgentes: Agente[] = [
  ...agentesDiscovery,
  ...agentesCocriacao,
  ...agentesDelivery,
];

// AgenteCard Component
function AgenteCard({ agente }: { agente: Agente }) {
  const getCategoryColor = (cat: string) => {
    if (cat === 'Discovery') return 'bg-blue-100 text-blue-700';
    if (cat === 'Cocriação') return 'bg-amber-100 text-amber-700';
    return 'bg-green-100 text-green-700';
  };

  return (
    <div className="group flex flex-col bg-card border border-border rounded-[var(--radius-card)] overflow-hidden hover:border-primary/30 hover:shadow-[var(--elevation-sm)] transition-all duration-200">
      {/* Header com badge de categoria */}
      <div className="flex items-start justify-between p-5 pb-4 border-b border-border">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(agente.categoria)}`}>
          {agente.categoria === 'Discovery' && '🔍'}
          {agente.categoria === 'Cocriação' && '🎨'}
          {agente.categoria === 'Delivery' && '🚀'}
          <span>{agente.categoria}</span>
        </span>
      </div>

      {/* Body */}
      <div className="flex-1 p-5 space-y-3">
        <h3
          className="font-bold text-foreground"
          style={{ fontSize: "var(--text-base)", lineHeight: "1.3" }}
        >
          {agente.nome}
        </h3>

        <div className="flex items-center gap-2 text-muted-foreground">
          <Bot className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span style={{ fontSize: "var(--text-caption)" }}>{agente.criador}</span>
        </div>

        <p
          className="text-muted-foreground"
          style={{ fontSize: "var(--text-label)", lineHeight: "1.5" }}
        >
          {agente.descricao}
        </p>

        {agente.instrucoes && (
          <div className="pt-2 border-t border-border">
            <p
              className="text-muted-foreground mb-1"
              style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" }}
            >
              📝 Instruções:
            </p>
            <p
              className="text-muted-foreground"
              style={{ fontSize: "var(--text-caption)", lineHeight: "1.5" }}
            >
              {agente.instrucoes}
            </p>
          </div>
        )}
      </div>

      {/* Footer com botão */}
      <div className="p-5 pt-4 border-t border-border">
        <a
          href={agente.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 rounded-[var(--radius)] bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}
        >
          Acessar agente
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

// AgentesTime Page Component
export function AgentesTime() {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
      {/* Breadcrumb */}
      <nav aria-label="Navegação estrutural" className="mb-6">
        <ol className="inline-flex items-center gap-1.5 text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
          <li>
            <NavLink to="/" className="hover:text-foreground transition-colors">
              Início
            </NavLink>
          </li>
          <li><ChevronLeft className="w-3.5 h-3.5 rotate-180" aria-hidden="true" /></li>
          <li>
            <NavLink to="/ai-first" className="hover:text-foreground transition-colors">
              AI First
            </NavLink>
          </li>
          <li><ChevronLeft className="w-3.5 h-3.5 rotate-180" aria-hidden="true" /></li>
          <li className="text-foreground">Agentes criados pelo time</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-[var(--radius-card)] bg-blue-100 flex items-center justify-center">
            <Bot className="w-5 h-5 text-blue-600" aria-hidden="true" />
          </div>
          <h1
            style={{
              fontSize: "var(--text-h3)",
              fontWeight: "var(--font-weight-semibold)",
            }}
          >
            Agentes criados pelo time
          </h1>
        </div>
        <p
          className="text-muted-foreground mb-4"
          style={{ fontSize: "var(--text-label)", lineHeight: "1.5" }}
        >
          Catálogo de agentes Claude customizados para automação de tarefas de UX.
        </p>
        <p
          className="text-muted-foreground"
          style={{ fontSize: "var(--text-caption)" }}
        >
          <strong>{todosAgentes.length} agentes</strong> · 3 categorias
        </p>
      </div>

      {/* Seções por categoria */}
      <div className="space-y-12">
        {/* Discovery */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2
              className="text-foreground"
              style={{
                fontSize: "var(--text-h4)",
                fontWeight: "var(--font-weight-semibold)",
              }}
            >
              Discovery
            </h2>
            <span
              className="text-muted-foreground"
              style={{ fontSize: "var(--text-caption)" }}
            >
              {agentesDiscovery.length} {agentesDiscovery.length === 1 ? 'agente' : 'agentes'}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {agentesDiscovery.map((agente) => (
              <AgenteCard key={agente.id} agente={agente} />
            ))}
          </div>
        </section>

        {/* Cocriação */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2
              className="text-foreground"
              style={{
                fontSize: "var(--text-h4)",
                fontWeight: "var(--font-weight-semibold)",
              }}
            >
              Cocriação
            </h2>
            <span
              className="text-muted-foreground"
              style={{ fontSize: "var(--text-caption)" }}
            >
              {agentesCocriacao.length} {agentesCocriacao.length === 1 ? 'agente' : 'agentes'}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {agentesCocriacao.map((agente) => (
              <AgenteCard key={agente.id} agente={agente} />
            ))}
          </div>
        </section>

        {/* Delivery */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2
              className="text-foreground"
              style={{
                fontSize: "var(--text-h4)",
                fontWeight: "var(--font-weight-semibold)",
              }}
            >
              Delivery
            </h2>
            <span
              className="text-muted-foreground"
              style={{ fontSize: "var(--text-caption)" }}
            >
              {agentesDelivery.length} {agentesDelivery.length === 1 ? 'agente' : 'agentes'}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {agentesDelivery.map((agente) => (
              <AgenteCard key={agente.id} agente={agente} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export { Agente, agentesDiscovery, agentesCocriacao, agentesDelivery, todosAgentes };
