import { useState } from "react";
import { NavLink } from "react-router";
import {
  ChevronLeft,
  Building,
  Info,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Tag,
  User,
  Monitor,
  Palette
} from "lucide-react";

interface Modulo {
  nome: string;
  resumo: string;
  categoria: string;
  paraQuem: string;
  plataforma: string;
  designSystem?: string;
  responsavel: string;
  link?: string;
  funcionalidades: string[];
}

const MODULOS_CONTABIL: Modulo[] = [
  // Core
  {
    nome: "Contabilidade",
    resumo: "Sistema que automatiza o fechamento contábil, conciliação bancária e geração de relatórios fiscais e balancetes para o contador responsável pelo fluxo de caixa da empresa.",
    categoria: "Core",
    paraQuem: "Contador responsável pelo fluxo de caixa e fechamento contábil",
    plataforma: "Instalado · Web (Onvio, em desenvolvimento — atualmente atende MEI)",
    designSystem: "Bento NG",
    responsavel: "Kassiane Mesquita · Gestor: Aline Mezzari",
    link: "https://onvio.com.br/br-accounting/home",
    funcionalidades: [
      "Importação de extratos bancários para conciliação automática de contas",
      "Geração de balancetes, DRE e demais relatórios contábeis",
      "Integração com módulos Escrita Fiscal e Folha para cruzamento de dados",
      "Entrega automatizada de documentos informativos ao Governo",
      "Conciliação de contas bancárias versus taxas e encargos"
    ]
  },
  {
    nome: "Escrita Fiscal",
    resumo: "Sistema de escrituração fiscal que recebe, analisa e processa notas fiscais, calcula automaticamente os impostos devidos e emite guias de pagamento e declarações estaduais e federais.",
    categoria: "Core",
    paraQuem: "Contador responsável pela parte fiscal e tributária da empresa",
    plataforma: "Instalado · Web (Onvio, em desenvolvimento — atualmente atende MEI)",
    designSystem: "Bento NG",
    responsavel: "Marielli Neves · Gestor: Mariana Sartori",
    link: "https://onvio.com.br/br-escrita-fiscal/home",
    funcionalidades: [
      "Recebimento e escrituração de notas fiscais de entrada e saída",
      "Cálculo automático de impostos por segmento e localização (ICMS, PIS, COFINS, IPI etc.)",
      "Emissão de guias de pagamento de impostos",
      "Geração de declarações estaduais (SPED Fiscal, GIA) e federais (EFD Contribuições)",
      "Emissão de manifesto de transporte (MDF-e)",
      "Importação automática de notas via integração com Busca NF-e"
    ]
  },
  {
    nome: "Folha",
    resumo: "Sistema de departamento pessoal que gerencia funcionários, calcula encargos trabalhistas e se integra ao eSocial e demais sistemas governamentais para envio de obrigações.",
    categoria: "Core",
    paraQuem: "Contador responsável pelo departamento pessoal operacional",
    plataforma: "Instalado · Web (Onvio, em desenvolvimento — atualmente atende MEI)",
    designSystem: "Bento NG",
    responsavel: "Marcio Inácio · Gestor: Marianna Saggiorato",
    link: "https://onvio.com.br/br-payroll/home",
    funcionalidades: [
      "Cadastro de empregados CLT, contribuintes (PJ) e estagiários com dependentes",
      "Cálculo de salários, férias, 13º, FGTS, INSS e demais encargos trabalhistas",
      "Integração com eSocial para envio de admissões, demissões e eventos periódicos",
      "Integração com FGTS Digital para geração automática de guias de pagamento",
      "Integração com Portal do Cliente para cadastro de funcionários pela própria empresa",
      "Integração com Portal do Empregado (Premium) para acesso a recibos"
    ]
  },
  // Acessório
  {
    nome: "Patrimônio",
    resumo: "Extensão dos módulos core que monitora e gerencia os bens tangíveis e intangíveis da empresa, calculando automaticamente depreciação e amortização com integração à Contabilidade e Escrita Fiscal.",
    categoria: "Acessório",
    paraQuem: "Contador responsável pelo controle patrimonial",
    plataforma: "Instalado",
    responsavel: "Cláudia Savóis · Kassiane Mesquita",
    funcionalidades: [
      "Cadastro de bens via nota fiscal (importação automática)",
      "Cálculo automático diário de depreciação e amortização",
      "Controle de movimentações, condições e transferências de bens",
      "Geração de relatórios de gestão patrimonial",
      "Integração com Escrita Fiscal para aproveitamento de créditos de impostos na aquisição de bens",
      "Integração com Contabilidade para lançamentos automáticos"
    ]
  },
  {
    nome: "Lalur",
    resumo: "Módulo fiscal voltado a empresas do regime de Lucro Real, responsável pelo controle do Livro de Apuração do Lucro Real e cálculo do IRPJ e CSLL com base nas adições e exclusões contábeis.",
    categoria: "Acessório",
    paraQuem: "Contador que atende clientes do regime de Lucro Real",
    plataforma: "Instalado",
    responsavel: "Kassiane Mesquita",
    funcionalidades: [
      "Escrituração do LALUR (Livro de Apuração do Lucro Real) e LACS",
      "Cálculo automático de IRPJ e CSLL",
      "Controle de adições, exclusões e compensações de prejuízos fiscais",
      "Geração da ECF (Escrituração Contábil Fiscal) para entrega à Receita Federal",
      "Integração com módulo Contabilidade para importação de dados contábeis"
    ]
  },
  {
    nome: "Atualizar",
    resumo: "Extensão dos módulos core que recalcula automaticamente impostos em atraso, aplicando multas e juros vigentes, evitando que o contador precise fazer esses cálculos manualmente.",
    categoria: "Acessório",
    paraQuem: "Contadores que gerenciam pagamento de guias de impostos",
    plataforma: "Instalado",
    responsavel: "Kassiane Mesquita",
    funcionalidades: [
      "Recálculo automático de guias de impostos em atraso com multa e juros",
      "Acompanhamento de guias pagas e não pagas",
      "Utilização dos dados da guia original para evitar reentrada manual de informações",
      "Histórico de guias atualizadas por cliente"
    ]
  },
  {
    nome: "Registro",
    resumo: "Sistema que guarda documentos contratuais das empresas clientes e facilita a emissão de requerimentos e solicitações junto a órgãos públicos em nome do cliente.",
    categoria: "Acessório",
    paraQuem: "Contadores que fazem solicitações junto a órgãos públicos",
    plataforma: "Instalado",
    responsavel: "Kassiane Mesquita",
    funcionalidades: [
      "Guarda e gestão de documentos contratuais das empresas clientes",
      "Geração automática de requerimentos a partir dos documentos salvos",
      "Emissão de solicitações em nome do cliente para órgãos públicos (Junta Comercial, Receita etc.)",
      "Histórico de solicitações realizadas por cliente"
    ]
  },
  {
    nome: "Administrar",
    resumo: "Solução de gestão interna que permite ao dono ou gestor do escritório analisar a produtividade dos contadores, o tempo de trabalho por usuário e a relação de custo por cliente.",
    categoria: "Acessório",
    paraQuem: "Contador / dono do escritório / gestores",
    plataforma: "Instalado",
    responsavel: "Kassiane Mesquita",
    funcionalidades: [
      "Análise de produtividade por contador e por cliente",
      "Controle de tempo de trabalho por usuário",
      "Relatórios de desempenho e custo por cliente",
      "Visão gerencial do escritório em um único painel"
    ]
  },
  {
    nome: "Protocolo",
    resumo: "Funcionalidade que controla a entrada e saída de documentos físicos no escritório, gerando protocolos impressos e mantendo histórico por cliente de forma integrada ao sistema.",
    categoria: "Acessório",
    paraQuem: "Contadores que gerenciam documentos físicos do dia a dia",
    plataforma: "Instalado",
    responsavel: "Eric Pereira",
    funcionalidades: [
      "Geração de protocolos de entrada e saída de documentos físicos",
      "Histórico de protocolos por cliente",
      "Impressão de comprovantes de protocolo",
      "Integração com os demais módulos para contextualizar os documentos protocolados"
    ]
  },
  {
    nome: "Auditoria",
    resumo: "Módulo acessório que registra todas as ações realizadas no sistema (inclusões, alterações e exclusões), indicando data, hora e usuário responsável, para maior controle e rastreabilidade.",
    categoria: "Acessório",
    paraQuem: "Contador / dono de contabilidade / administrador do sistema",
    plataforma: "Instalado",
    responsavel: "Eric Pereira",
    funcionalidades: [
      "Log completo de inclusões, alterações e exclusões nos principais cadastros e movimentos",
      "Identificação de usuário, data e hora de cada ação",
      "Relatórios de auditoria por período, usuário ou tipo de ação",
      "Suporte a processos de correção e educação de usuários"
    ]
  },
  {
    nome: "Honorários",
    resumo: "Sistema periférico que gerencia a cobrança de honorários do escritório de contabilidade, controlando contratos, fechamento de horas e geração de cobranças por cliente.",
    categoria: "Acessório",
    paraQuem: "Contador / dono de contabilidade",
    plataforma: "Instalado",
    responsavel: "Kassiane Mesquita",
    funcionalidades: [
      "Gestão de contratos de honorários por cliente",
      "Fechamento de horas conforme tipo de contrato (fixo, por hora, por serviço)",
      "Geração automática de cobranças e boletos",
      "Controle de inadimplência e histórico de pagamentos",
      "Relatórios de receita por cliente e período"
    ]
  },
  {
    nome: "Busca NF-e",
    resumo: "Funcionalidade que busca automaticamente nos órgãos competentes todas as notas fiscais vinculadas ao CNPJ do cliente, eliminando a necessidade de importação manual.",
    categoria: "Acessório",
    paraQuem: "Contador responsável pela parte fiscal e tributária",
    plataforma: "Instalado",
    responsavel: "Bruna Ferro",
    funcionalidades: [
      "Busca automática de NF-e na SEFAZ por CNPJ",
      "Importação direta das notas para o módulo Escrita Fiscal",
      "Manifesto de notas de transporte (MDF-e)",
      "Histórico de notas importadas por período e cliente"
    ]
  },
  {
    nome: "BOX-e",
    resumo: "Central de armazenamento digital de documentos dos clientes, integrada ao Portal do Cliente, que substitui o arquivo físico por um ambiente seguro, organizado e de fácil consulta.",
    categoria: "Acessório",
    paraQuem: "Contadores que precisam guardar documentos pelo prazo legal",
    plataforma: "Web (dentro do Onvio)",
    responsavel: "Bruna Ferro",
    funcionalidades: [
      "Armazenamento digital de documentos por cliente e período",
      "Organização por categorias e tipos de documento",
      "Pesquisa e consulta rápida de documentos armazenados",
      "Integração com Portal do Cliente para entrega de documentos",
      "Controle de prazo legal de guarda de documentos"
    ]
  },
  // Periférico
  {
    nome: "Conteúdo Tributário",
    resumo: "Banco de dados da legislação tributária constantemente atualizado, com geração automática de tabelas comparativas para apoiar o contador na tomada de decisão e orientação ao cliente.",
    categoria: "Periférico",
    paraQuem: "Contador que precisa se manter atualizado sobre legislação vigente",
    plataforma: "Web",
    responsavel: "Denner Rodrigues",
    funcionalidades: [
      "Acervo completo e atualizado da legislação tributária federal, estadual e municipal",
      "Geração automática de tabelas comparativas entre regimes tributários",
      "Busca categorizada por tributo, segmento ou localização",
      "Alertas de alterações legislativas relevantes",
      "Apoio à tomada de decisão para enquadramento tributário de clientes"
    ]
  },
  {
    nome: "Onvio Custos",
    resumo: "Sistema analítico que permite ao dono do escritório verificar o custo de cada cliente, cruzando volume de notas, horas trabalhadas e senioridade do contador para identificar clientes lucrativos ou deficitários.",
    categoria: "Periférico",
    paraQuem: "Contador / dono da contabilidade",
    plataforma: "Web",
    responsavel: "Lucas Claro",
    funcionalidades: [
      "Análise de custo por cliente (notas emitidas × valor cobrado)",
      "Controle de hora/tempo de trabalho por senioridade de contador",
      "Identificação de clientes lucrativos e deficitários",
      "Relatórios de rentabilidade por cliente e período",
      "Parametrização de custos fixos e variáveis do escritório"
    ]
  },
  {
    nome: "Kolossus Auditor",
    resumo: "Sistema terceiro integrado ao Domínio que verifica o enquadramento fiscal dos documentos de notas e folha, identificando inconsistências antes que a Receita Federal notifique o cliente.",
    categoria: "Periférico",
    paraQuem: "Contador / dono da contabilidade",
    plataforma: "Web",
    responsavel: "Eric Pereira",
    funcionalidades: [
      "Verificação do enquadramento de impostos em documentos fiscais e de folha",
      "Identificação de inconsistências e pontos de correção antes do recolhimento",
      "Relatório de divergências por cliente e tipo de imposto",
      "Integração com módulos Escrita Fiscal e Folha"
    ]
  },
  {
    nome: "Processos",
    resumo: "Produto periférico web que permite controlar atividades, prazos legais e a performance do time do escritório por meio de dashboards, com integração ao sistema Contábil para sincronização de tarefas recorrentes.",
    categoria: "Periférico",
    paraQuem: "Todas as pessoas do escritório envolvidas em processos; donos e gestores",
    plataforma: "Web (integração com Contábil)",
    designSystem: "Gestta Design System",
    responsavel: "Felipe Brandão · Gestor: Adão Dutra",
    link: "https://app.gestta.com.br/dashboard-v2",
    funcionalidades: [
      "Criação e gestão de tarefas com prazos e responsáveis",
      "Dashboards de acompanhamento de performance do time",
      "Controle de obrigações legais recorrentes (SPED, DCTF, DEFIS etc.)",
      "Integração com Contábil: tarefa finalizada no módulo é automaticamente encerrada no Processos",
      "Relatórios de produtividade por contador e por cliente"
    ]
  },
  {
    nome: "Messenger",
    resumo: "Produto periférico que centraliza e registra as comunicações via WhatsApp entre escritório e clientes, com bot para automatizar respostas.",
    categoria: "Periférico",
    paraQuem: "Contadores e equipe de atendimento",
    plataforma: "Web",
    responsavel: "Leticia Santiago · Gestor: Adão Dutra",
    funcionalidades: [
      "Centralização de conversas do WhatsApp em uma única interface",
      "Histórico completo de comunicações por cliente",
      "Bot automatizado para respostas frequentes",
      "Gestão de múltiplos atendentes"
    ]
  }
];

// === MARKETING TAB COMPONENTS ===

function HeroMarketing() {
  const stats = [
    { value: "+35mil", label: "Escritórios atendidos" },
    { value: "+180mil", label: "Usuários ativos" },
    { value: "+25 anos", label: "De expertise contábil" },
    { value: "4 pacotes", label: "Start · Plus · Premium · Empresarial" },
  ];

  return (
    <section aria-label="Marketing hero" className="bg-gradient-to-br from-gray-900 via-gray-800 to-orange-950 text-white rounded-[var(--radius-card)] p-8 md:p-12">
      <span className="inline-block bg-orange-600 text-white text-xs font-bold tracking-wider uppercase px-3 py-1 rounded mb-4">
        <span aria-hidden="true">🔶 </span>PRD · Personas & Comercialização
      </span>

      <h2 className="text-3xl md:text-4xl font-bold mb-3">
        Soluções <span className="text-orange-500">Domínio</span>
        <br />Thomson Reuters
      </h2>

      <p className="text-gray-300 max-w-2xl mb-6" style={{ fontSize: "var(--text-base)", lineHeight: "1.6" }}>
        Plataforma líder em inteligência contábil no Brasil. Este documento consolida personas, pacotes de contratação, módulos e estratégias de comercialização para apoiar times de marketing e vendas.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.value}>
            <strong className="block text-2xl md:text-3xl font-bold text-orange-500">{stat.value}</strong>
            <span className="text-xs text-gray-400 uppercase tracking-wide">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// === PERSONAS MARKETING ===

interface PersonaMarketing {
  emoji: string;
  nome: string;
  tag: string;
  tarefas: string[];
  desafios: string[];
  motivacoes: string[];
  foco: string;
  bgColor: string;
}

const personasMarketing: PersonaMarketing[] = [
  {
    emoji: '🎯',
    nome: 'CEO / Sócio',
    tag: 'Estratégico · Decisor',
    tarefas: [
      'Aprova ferramentas, recursos e projetos',
      'Garante missão, essência e cultura da empresa',
      'Traça planejamentos estratégicos',
      'Acompanha tendências do mercado',
      'Estuda gestão de pessoas e marketing'
    ],
    desafios: [
      'Obter e reter talentos',
      'Reduzir custos e operacionalidade',
      'Conquistar autoridade de marca no mercado',
      'Escalar sem perder qualidade'
    ],
    motivacoes: [
      'Aumento de performance da equipe (87% CEOs)',
      'Reputação sólida no mercado (73,8%)',
      'Satisfação do cliente como diferencial'
    ],
    foco: 'Visão estratégica e autoridade de marca',
    bgColor: 'bg-orange-50'
  },
  {
    emoji: '📊',
    nome: 'Gestor / Coordenador',
    tag: 'Tático · Influenciador',
    tarefas: [
      'Distribuição e aprovação de verbas',
      'Contratação e desligamento de pessoal',
      'Gestão de cargos e salários',
      'Gestão de relacionamento com clientes',
      'Relatórios para tomada de decisão (70,8% grandes)'
    ],
    desafios: [
      'Melhorar motivação e desempenho do time',
      'Desenvolver equipe tecnicamente',
      'Reduzir erros, multas e retrabalhos',
      'Melhorar comunicação interna'
    ],
    motivacoes: [
      'Equipe mais produtiva e motivada (79,7% médios)',
      'Baixa rotatividade de funcionários',
      'Nível de capacitação da equipe'
    ],
    foco: 'Eficiência da equipe e qualidade de entrega',
    bgColor: 'bg-green-50'
  },
  {
    emoji: '💼',
    nome: 'Operacional / Analista',
    tag: 'Operacional · Usuário final',
    tarefas: [
      'Apuração de impostos tributários',
      'Escrituração contábil',
      'Obrigações municipais, estaduais e federais',
      'Emissão de certidões (Federal/Estadual/Municipal)',
      'Prestação de consultoria a clientes',
      'Folha de pagamento e abertura de empresas'
    ],
    desafios: [
      'Melhorar auto-gestão e produtividade',
      'Se atualizar nas questões burocráticas legais',
      'Crescer como micro-generalista (escritórios pequenos)',
      'Satisfazer e resolver questões dos clientes'
    ],
    motivacoes: [
      'Satisfação do cliente como nº1 (81,9% grandes)',
      'Zerar multas por atraso (52,7% grandes)',
      'Ser reconhecido pelos líderes (40,3%)'
    ],
    foco: 'Produtividade, compliance e satisfação do cliente',
    bgColor: 'bg-blue-50'
  }
];

function PersonaCardMarketing({ persona }: { persona: PersonaMarketing }) {
  return (
    <div className="bg-card border border-border rounded-[var(--radius-card)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-5 border-b border-border">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${persona.bgColor}`}>
          {persona.emoji}
        </div>
        <div>
          <h3 className="font-bold" style={{ fontSize: "var(--text-base)" }}>
            {persona.nome}
          </h3>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {persona.tag}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wide text-orange-600 mb-2">
            Principais tarefas
          </h4>
          <ul className="space-y-1.5">
            {persona.tarefas.map((tarefa, idx) => (
              <li key={idx} className="text-sm text-muted-foreground pl-3 border-l-2 border-border">
                {tarefa}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wide text-orange-600 mb-2">
            Desafios
          </h4>
          <ul className="space-y-1.5">
            {persona.desafios.map((desafio, idx) => (
              <li key={idx} className="text-sm text-muted-foreground pl-3 border-l-2 border-border">
                {desafio}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wide text-orange-600 mb-2">
            Motivações
          </h4>
          <ul className="space-y-1.5">
            {persona.motivacoes.map((motivacao, idx) => (
              <li key={idx} className="text-sm text-muted-foreground pl-3 border-l-2 border-border">
                {motivacao}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-orange-50 border-t border-orange-100">
        <p className="text-xs font-semibold text-orange-700">
          🎯 Foco: {persona.foco}
        </p>
      </div>
    </div>
  );
}

function SecaoPersonas() {
  return (
    <section>
      <div className="mb-6">
        <p className="text-xs font-bold tracking-widest uppercase text-orange-600 mb-2">
          Personas identificadas
        </p>
        <h2 className="text-2xl font-bold mb-2">Quem são nossos clientes?</h2>
        <p className="text-muted-foreground max-w-2xl" style={{ fontSize: "var(--text-label)", lineHeight: "1.6" }}>
          Com base em pesquisa com 1.642 respondentes (escritórios pequenos, médios e grandes), identificamos três perfis principais que orientam nossas estratégias de produto e comunicação.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {personasMarketing.map(persona => (
          <PersonaCardMarketing key={persona.nome} persona={persona} />
        ))}
      </div>
    </section>
  );
}

function ModuloCard({ modulo, isOpen, onToggle }: { modulo: Modulo; isOpen: boolean; onToggle: () => void }) {
  const getCategoryColor = (cat: string) => {
    if (cat === "Core") return "bg-blue-100 text-blue-700";
    if (cat === "Acessório") return "bg-green-100 text-green-700";
    return "bg-purple-100 text-purple-700";
  };

  return (
    <div className="border border-border rounded-[var(--radius-card)] overflow-hidden bg-card">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left"
      >
        <div className="flex-1 mr-3">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}>
              {modulo.nome}
            </h3>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getCategoryColor(modulo.categoria)}`}>
              {modulo.categoria}
            </span>
            {modulo.plataforma.includes("Web") && (
              <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-[10px] font-medium">
                Web
              </span>
            )}
          </div>
          <p className="text-muted-foreground line-clamp-2" style={{ fontSize: "var(--text-caption)", lineHeight: "1.5" }}>
            {modulo.resumo}
          </p>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
        )}
      </button>

      {isOpen && (
        <div className="border-t border-border p-4 bg-muted/20 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <User className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-muted-foreground" style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" }}>
                  Para quem
                </span>
              </div>
              <p style={{ fontSize: "var(--text-caption)" }}>{modulo.paraQuem}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Monitor className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-muted-foreground" style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" }}>
                  Plataforma
                </span>
              </div>
              <p style={{ fontSize: "var(--text-caption)" }}>{modulo.plataforma}</p>
            </div>

            {modulo.designSystem && (
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Palette className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground" style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" }}>
                    Design System
                  </span>
                </div>
                <p style={{ fontSize: "var(--text-caption)" }}>{modulo.designSystem}</p>
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Tag className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-muted-foreground" style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" }}>
                  Responsável
                </span>
              </div>
              <p style={{ fontSize: "var(--text-caption)" }}>{modulo.responsavel}</p>
            </div>
          </div>

          <div>
            <p className="text-muted-foreground mb-2" style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" }}>
              Principais funcionalidades
            </p>
            <ul className="space-y-1.5">
              {modulo.funcionalidades.map((func, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span className="text-muted-foreground" style={{ fontSize: "var(--text-caption)", lineHeight: "1.5" }}>
                    {func}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {modulo.link && (
            <a
              href={modulo.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[var(--radius)] bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" }}
            >
              Acessar módulo
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export function NossosProdutos() {
  const [activeTab, setActiveTab] = useState<string>("contabil");
  const [openModulos, setOpenModulos] = useState<string[]>([]);
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todos");

  const toggleModulo = (nome: string) => {
    setOpenModulos(prev =>
      prev.includes(nome) ? prev.filter(n => n !== nome) : [...prev, nome]
    );
  };

  const modulosFiltrados = filtroCategoria === "todos"
    ? MODULOS_CONTABIL
    : MODULOS_CONTABIL.filter(m => m.categoria === filtroCategoria);

  const categorias = ["Core", "Acessório", "Periférico"];
  const countByCategoria = (cat: string) => MODULOS_CONTABIL.filter(m => m.categoria === cat).length;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
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
        <div className="w-12 h-12 rounded-[var(--radius-card)] bg-blue-100 flex items-center justify-center shrink-0">
          <Building className="w-6 h-6 text-blue-600" aria-hidden="true" />
        </div>
        <div>
          <h1
            style={{
              fontSize: "var(--text-h3)",
              fontWeight: "var(--font-weight-semibold)",
            }}
          >
            Nossos produtos
          </h1>
          <p
            className="text-muted-foreground mt-1"
            style={{ fontSize: "var(--text-label)", lineHeight: "1.5" }}
          >
            Informações sobre módulos Domínio, personas de marketing e materiais de comercialização.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border mb-6">
        <nav className="flex gap-0 overflow-x-auto" aria-label="Categorias de produtos">
          <button
            onClick={() => setActiveTab("contabil")}
            className={`px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "contabil"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
            style={{ fontSize: "var(--text-label)" }}
          >
            Contábil
          </button>
          <button
            onClick={() => setActiveTab("inova")}
            className={`px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "inova"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
            style={{ fontSize: "var(--text-label)" }}
          >
            Inova
          </button>
          <button
            onClick={() => setActiveTab("comercial-marketing")}
            className={`px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "comercial-marketing"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
            style={{ fontSize: "var(--text-label)" }}
          >
            Comercial e Marketing
          </button>
        </nav>
      </div>

      {/* Tab content */}
      {activeTab === "contabil" && (
        <div className="space-y-6">
          {/* Filtros por categoria */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFiltroCategoria("todos")}
              className={`px-3 py-1.5 rounded-full transition-colors ${
                filtroCategoria === "todos"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" }}
            >
              Todos ({MODULOS_CONTABIL.length})
            </button>
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setFiltroCategoria(cat)}
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  filtroCategoria === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
                style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" }}
              >
                {cat} ({countByCategoria(cat)})
              </button>
            ))}
          </div>

          {/* Lista de módulos */}
          <div className="space-y-3">
            {modulosFiltrados.map((modulo) => (
              <ModuloCard
                key={modulo.nome}
                modulo={modulo}
                isOpen={openModulos.includes(modulo.nome)}
                onToggle={() => toggleModulo(modulo.nome)}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === "inova" && (
        <div className="bg-blue-50 border border-blue-200 rounded-[var(--radius-card)] p-6 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p
              className="text-blue-700 mb-2"
              style={{
                fontSize: "var(--text-label)",
                fontWeight: "var(--font-weight-semibold)",
              }}
            >
              Em breve
            </p>
            <p className="text-blue-700" style={{ fontSize: "var(--text-label)" }}>
              Informações sobre produtos Inova estarão disponíveis em breve.
            </p>
          </div>
        </div>
      )}

      {activeTab === "comercial-marketing" && (
        <div className="space-y-16">
          <HeroMarketing />
          <SecaoPersonas />
        </div>
      )}
    </div>
  );
}
