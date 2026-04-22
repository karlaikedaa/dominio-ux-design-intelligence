export interface Persona {
  id: string;
  name: string;
  age: number;
  role: string;
  category: "contabil" | "pme" | "empregado";
  tag: string;
  tagColor: string;
  tagTextColor: string;
  summary: string;
  location: string;
  modules: string[];
  avatar: string;
  digitalLevel?: number;
  digitalLevelLabel?: string;
  demographics: string[];
  context: string[];
  pains: { severity: "critica" | "alta" | "media"; text: string }[];
  goals: string[];
  behavior: string[];
  quotes: string[];
  metrics: string[];
  relationWithOffice?: string[];
  employmentTags?: string[];
}

export const personasContabil: Persona[] = [
  {
    id: "contador-operacional",
    name: "Juliana Santos",
    age: 28,
    role: "Contadora operacional",
    category: "contabil",
    tag: "Operador",
    tagColor: "bg-chart-1",
    tagTextColor: "text-white",
    summary: "Executa as obrigações contábeis diárias, busca eficiência e clareza nos processos do sistema.",
    location: "Porto Alegre, RS",
    modules: ["Escrita Fiscal", "Contabilidade", "Folha", "Patrimônio", "Lalur"],
    avatar: "https://images.unsplash.com/photo-1725623519605-02fdc0b7f59f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGJyYXppbGlhbiUyMGdvbWFuJTIwZ2xhc3NlcyUyMHByb2Zlc3Npb25hbCUyMG9mZmljZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzM0NjA2OHww&ixlib=rb-4.1.0&q=80&w=400",
    demographics: [
      "28 anos, solteira",
      "Graduação em Ciências Contábeis",
      "4 anos de experiência em escritório contábil",
      "Renda mensal: R$ 3.500 - R$ 5.000",
    ],
    context: [
      "Executa obrigações acessórias para 60 clientes",
      "Trabalha sob supervisão do gerente contábil",
      "Rotina altamente operacional com muitas tarefas repetitivas",
      "Usa o Domínio 100% do tempo de trabalho",
    ],
    pains: [
      { severity: "critica", text: "Muitos cliques para realizar tarefas simples e repetitivas" },
      { severity: "alta", text: "Mensagens de erro pouco claras dificultam a resolução de problemas" },
      { severity: "alta", text: "Falta de atalhos para fluxos que executa dezenas de vezes ao dia" },
      { severity: "media", text: "Interface visualmente poluída com informações irrelevantes" },
    ],
    goals: [
      "Completar tarefas com menos cliques e mais agilidade",
      "Entender erros rapidamente para corrigi-los sem ajuda",
      "Ter fluxos otimizados para tarefas recorrentes",
      "Sentir que o sistema foi feito para quem trabalha nele todo dia",
    ],
    behavior: [
      "Usuária power user — conhece atalhos e caminhos alternativos",
      "Pede ajuda ao gerente quando encontra erros desconhecidos",
      "Sugere melhorias mas sente que não é ouvida",
      "Prefere interface limpa com foco na tarefa atual",
    ],
    quotes: [
      "São tantos cliques pra fazer uma coisa simples que dá vontade de desistir.",
      "Quando aparece um erro, eu nunca sei o que fazer com aquela mensagem.",
      "Se o sistema fosse mais limpo, eu renderia o dobro.",
    ],
    metrics: [
      "Tempo médio por tarefa operacional",
      "Número de erros encontrados por dia",
      "Satisfação com a experiência de uso diário",
      "Volume de tarefas completadas por dia",
    ],
  },
  {
    id: "contador-mono-usuario",
    name: "Ricardo Mendes",
    age: 43,
    role: "Contador e sócio-proprietário",
    category: "contabil",
    tag: "Mono usuário",
    tagColor: "bg-primary",
    tagTextColor: "text-primary-foreground",
    summary: "Trabalha sozinho e precisa de agilidade para atender múltiplos clientes sem equipe de apoio.",
    location: "Interior de São Paulo",
    modules: ["Escrita Fiscal", "Contabilidade", "Folha", "Honorários"],
    avatar: "https://images.unsplash.com/photo-1654931801074-42933341e31a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXR1cmUlMjBtaWRkbGUtYWdlZCUyMG1hbiUyMGFjY291bnRhbnQlMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzMzNDYwNjl8MA&ixlib=rb-4.1.0&q=80&w=400",
    demographics: [
      "43 anos, casado, dois filhos",
      "Graduação em Ciências Contábeis, pós-graduação em Tributação",
      "Atua há 18 anos como contador autônomo",
      "Renda mensal: R$ 8.000 - R$ 12.000",
    ],
    context: [
      "Trabalha sozinho em escritório próprio com 45 clientes ativos",
      "Usa o Domínio para todas as obrigações — é o único operador",
      "Rotina intensa com picos no início do mês e datas de obrigações acessórias",
      "Atende clientes por WhatsApp e e-mail, sem secretária",
    ],
    pains: [
      { severity: "critica", text: "Processos manuais repetitivos que consomem horas do dia" },
      { severity: "critica", text: "Risco de perder prazos por sobrecarga de trabalho" },
      { severity: "alta", text: "Dificuldade em encontrar informações rapidamente no sistema" },
      { severity: "alta", text: "Falta de automação para tarefas recorrentes" },
      { severity: "media", text: "Interface do sistema não prioriza ações urgentes" },
    ],
    goals: [
      "Automatizar tarefas repetitivas para ganhar tempo",
      "Ter visão clara de prazos e obrigações pendentes",
      "Reduzir erros em declarações e apurações",
      "Conseguir atender mais clientes sem contratar",
    ],
    behavior: [
      "Usa o sistema diariamente, em média 8 horas",
      "Prefere atalhos de teclado e fluxos diretos",
      "Busca tutoriais no YouTube quando tem dúvidas",
      "Resiste a mudanças de interface por medo de perder produtividade",
    ],
    quotes: [
      "Eu preciso que o sistema me ajude, não que me atrapalhe.",
      "Cada clique a mais é tempo que eu não tenho.",
      "Se o Domínio me avisasse dos prazos, eu dormia mais tranquilo.",
    ],
    metrics: [
      "Tempo médio por obrigação acessória",
      "Número de clientes atendidos por mês",
      "Quantidade de erros em declarações",
      "Satisfação com o tempo de resposta do sistema",
    ],
  },
  {
    id: "gerente-contabil",
    name: "Thiago Carvalho",
    age: 36,
    role: "Gerente contábil de escritório",
    category: "contabil",
    tag: "Gerente contábil",
    tagColor: "bg-chart-3",
    tagTextColor: "text-foreground",
    summary: "Coordena equipe operacional e garante qualidade das entregas, ponte entre diretoria e operação.",
    location: "Curitiba, PR",
    modules: ["Processos", "Escrita Fiscal", "Folha", "Contabilidade"],
    avatar: "https://images.unsplash.com/photo-1769628027250-d2a7a5a4eb64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMGJlYXJkJTIwcHJvZmVzc2lvbmFsJTIwYnVzaW5lc3MlMjBvZmZpY2UlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzMzNDYwNzB8MA&ixlib=rb-4.1.0&q=80&w=400",
    demographics: [
      "36 anos, casado, sem filhos",
      "Graduação em Contabilidade, cursando MBA",
      "8 anos de experiência, 3 como gerente",
      "Renda mensal: R$ 7.000 - R$ 10.000",
    ],
    context: [
      "Coordena 6 contadores operacionais no dia a dia",
      "Responsável por revisão de entregas e controle de qualidade",
      "Reporta indicadores para a diretoria semanalmente",
      "Lida com treinamento de novos colaboradores no sistema",
    ],
    pains: [
      { severity: "critica", text: "Sem visão consolidada do status de entregas da equipe" },
      { severity: "alta", text: "Revisão manual de trabalhos consome 40% do seu tempo" },
      { severity: "alta", text: "Dificuldade em treinar novos colaboradores no sistema" },
      { severity: "media", text: "Comunicação fragmentada entre equipe e clientes" },
    ],
    goals: [
      "Dashboard de status de entregas por cliente e colaborador",
      "Checklist automatizado de revisão de qualidade",
      "Material de treinamento integrado ao sistema",
      "Fluxo de comunicação centralizado com clientes",
    ],
    behavior: [
      "Usa o sistema intensamente para revisão e acompanhamento",
      "Cria planilhas paralelas para controlar o que o sistema não oferece",
      "Prefere aprender fazendo, testa funcionalidades por conta própria",
      "Compartilha dicas com a equipe via grupo de WhatsApp",
    ],
    quotes: [
      "Eu vivo fazendo planilha porque o sistema não me dá a visão que preciso.",
      "Treinar gente nova no Domínio leva semanas. Devia ser mais intuitivo.",
      "Se eu pudesse ver o que cada um está fazendo sem perguntar, seria perfeito.",
    ],
    metrics: [
      "Tempo de revisão por entrega",
      "Taxa de retrabalho da equipe",
      "Tempo de onboarding de novos colaboradores",
      "Entregas no prazo vs. atrasadas",
    ],
  },
  {
    id: "dono-escritorio",
    name: "Fernanda Oliveira",
    age: 51,
    role: "Sócia-diretora de escritório contábil",
    category: "contabil",
    tag: "Dono de escritório",
    tagColor: "bg-chart-2",
    tagTextColor: "text-white",
    summary: "Gerencia equipe e carteira de clientes, precisa de visão estratégica e controle de produtividade.",
    location: "Belo Horizonte, MG",
    modules: ["Conta Digital", "Cobranças", "Processos", "Honorários", "Custos", "Administrar"],
    avatar: "https://images.unsplash.com/photo-1738943892652-5ac88beb6c35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXR1cmUlMjB3b21hbiUyMDUwcyUyMHByb2Zlc3Npb25hbCUyMGJ1c2luZXNzJTIwZXhlY3V0aXZlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMzQ2MDcwfDA&ixlib=rb-4.1.0&q=80&w=400",
    demographics: [
      "51 anos, divorciada, um filho adulto",
      "MBA em Gestão Empresarial",
      "Escritório com 12 funcionários e 280 clientes",
      "Renda mensal: R$ 25.000 - R$ 35.000",
    ],
    context: [
      "Gerencia equipe de 12 pessoas divididas por departamento",
      "Usa o Domínio principalmente para relatórios gerenciais e acompanhamento",
      "Preocupa-se com a produtividade da equipe e a qualidade das entregas",
      "Negocia diretamente com clientes estratégicos",
    ],
    pains: [
      { severity: "critica", text: "Falta de dashboards gerenciais para acompanhar produtividade da equipe" },
      { severity: "alta", text: "Dificuldade em identificar gargalos no fluxo de trabalho" },
      { severity: "alta", text: "Relatórios manuais para clientes consomem tempo da equipe" },
      { severity: "media", text: "Integração limitada com outros sistemas do escritório" },
    ],
    goals: [
      "Ter visão em tempo real da produtividade do escritório",
      "Automatizar relatórios para clientes",
      "Reduzir o retrabalho causado por erros operacionais",
      "Escalar o escritório sem aumentar proporcionalmente a equipe",
    ],
    behavior: [
      "Acessa o sistema 2-3 vezes ao dia para verificações rápidas",
      "Delega operações mas quer controle sobre indicadores",
      "Participa de eventos do setor para networking",
      "Avalia constantemente ferramentas complementares",
    ],
    quotes: [
      "Preciso saber o que está acontecendo no escritório sem perguntar pra cada um.",
      "Se eu tivesse um painel de controle decente, conseguiria tomar decisões mais rápido.",
      "Meu maior medo é perder um prazo por falha de comunicação interna.",
    ],
    metrics: [
      "Produtividade da equipe por departamento",
      "Taxa de cumprimento de prazos",
      "NPS dos clientes do escritório",
      "Faturamento por colaborador",
    ],
  },
];

export const personasPME: Persona[] = [
  {
    id: "mei-digitalizado",
    name: "Bruno Takahashi",
    age: 31,
    role: "Dono de loja virtual de eletrônicos",
    category: "pme",
    tag: "MEI - Digitalizado",
    tagColor: "bg-chart-1",
    tagTextColor: "text-white",
    summary: "Empreendedor digital que valoriza autonomia e autoatendimento em ferramentas online.",
    location: "São Paulo, SP",
    modules: ["Portal do Cliente", "NFe"],
    avatar: "https://images.unsplash.com/photo-1739362035426-9cbea57808fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGphcGFuZXNlJTIwbWFuJTIwMzBzJTIwdGVjaCUyMGVudHJlcHJlbmV1ciUyMHBvcnRyYWl0JTIwc21pbGV8ZW58MXx8fHwxNzczMzQ2OTgwfDA&ixlib=rb-4.1.0&q=80&w=400",
    digitalLevel: 4,
    digitalLevelLabel: "Alto",
    demographics: [
      "31 anos, solteiro",
      "Formação em Administração",
      "MEI há 3 anos, faturamento médio R$ 6.500/mês",
      "Nativo digital, usa apps para tudo",
    ],
    context: [
      "Vende eletrônicos em marketplace e loja própria",
      "Contrata contador para DAS e declaração anual",
      "Quer resolver tudo pelo celular, sem ligação telefônica",
      "Valoriza transparência e acesso rápido a documentos",
    ],
    pains: [
      { severity: "alta", text: "Não consegue acessar boletos e guias facilmente" },
      { severity: "alta", text: "Precisa ligar para o contador para informações simples" },
      { severity: "media", text: "Não sabe se está em dia com obrigações fiscais" },
    ],
    goals: [
      "Autoatendimento digital completo",
      "Visualizar situação fiscal em tempo real",
      "Receber notificações de vencimentos por push/WhatsApp",
    ],
    behavior: [
      "Acessa serviços exclusivamente pelo celular",
      "Compara preços e serviços online antes de decidir",
      "Prefere chat a ligação telefônica",
      "Espera experiência de app moderno",
    ],
    quotes: [
      "Não quero ter que ligar pro contador pra saber se tá tudo certo.",
      "Se eu tivesse um app que mostra tudo, seria perfeito.",
      "Eu pago o contador pra não me preocupar, mas ainda me preocupo.",
    ],
    metrics: [
      "Frequência de acesso ao portal do cliente",
      "Redução de ligações ao escritório",
      "Satisfação com canais digitais",
    ],
    relationWithOffice: [
      "Contato majoritariamente digital (WhatsApp e e-mail)",
      "Autonomia alta — quer resolver sozinho quando possível",
      "Frequência de contato: mensal, pontual em datas fiscais",
    ],
  },
  {
    id: "mei-nao-digitalizado",
    name: "Maria das Graças",
    age: 58,
    role: "Dona de salão de beleza de bairro",
    category: "pme",
    tag: "MEI - Não digitalizado",
    tagColor: "bg-chart-3",
    tagTextColor: "text-foreground",
    summary: "Empreendedora tradicional com baixa familiaridade digital, depende do contador para tudo.",
    location: "Recife, PE",
    modules: ["Portal do Cliente"],
    avatar: "https://images.unsplash.com/photo-1581475319737-4ae69b8926c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGRlciUyMGJsYWNrJTIwYnJhemlsaWFuJTIwd29tYW4lMjBuYXR1cmFsJTIwaGFpciUyMHNtaWxlJTIwd2FybSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzM0Njk3Nnww&ixlib=rb-4.1.0&q=80&w=400",
    digitalLevel: 1,
    digitalLevelLabel: "Baixo",
    demographics: [
      "58 anos, viúva, três filhos",
      "Ensino médio completo",
      "MEI há 6 anos, faturamento R$ 3.000/mês",
      "Usa apenas WhatsApp e redes sociais básicas",
    ],
    context: [
      "Salão com 2 funcionárias informais",
      "Contador cuida de tudo — DAS, declaração, regularização",
      "Não entende termos fiscais e contábeis",
      "Vai pessoalmente ao escritório quando precisa",
    ],
    pains: [
      { severity: "critica", text: "Não entende boletos e guias que recebe por e-mail" },
      { severity: "alta", text: "Medo de estar irregular sem saber" },
      { severity: "alta", text: "Dificuldade em usar qualquer sistema online" },
      { severity: "media", text: "Depende dos filhos para resolver questões digitais" },
    ],
    goals: [
      "Saber se está em dia sem precisar entender os detalhes",
      "Receber avisos simples e claros sobre o que precisa fazer",
      "Ter alguém de confiança que resolva tudo por ela",
    ],
    behavior: [
      "Prefere atendimento presencial ou por telefone",
      "Confia no contador como figura de autoridade",
      "Não clica em links por medo de golpe",
      "Anota tudo em caderno físico",
    ],
    quotes: [
      "Eu não entendo nada disso, eu confio no meu contador.",
      "Esses negócio de internet me dá medo, vai que é golpe.",
      "Só quero saber se tá tudo certo e quanto eu pago.",
    ],
    metrics: [
      "Redução de visitas presenciais desnecessárias",
      "Compreensão de comunicações recebidas",
      "Sentimento de segurança fiscal",
    ],
    relationWithOffice: [
      "Contato presencial e telefônico",
      "Autonomia muito baixa — depende totalmente do contador",
      "Frequência de contato: quinzenal, com visitas presenciais",
    ],
  },
  {
    id: "pme-sem-rh",
    name: "Alexandre Freitas",
    age: 45,
    role: "Dono de distribuidora de alimentos",
    category: "pme",
    tag: "PME - Sem área de RH",
    tagColor: "bg-chart-2",
    tagTextColor: "text-white",
    summary: "Empresário que centraliza decisões e depende do contador para toda a gestão de pessoal.",
    location: "Goiânia, GO",
    modules: ["Portal do Cliente", "NFe", "Folha (via escritório)"],
    avatar: "https://images.unsplash.com/photo-1609741200119-b292937ea2eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBhZ2VkJTIwbWFuJTIwZ2xhc3NlcyUyMGJ1c2luZXNzJTIwY2FzdWFsJTIwbGF0aW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzMzNDY5NzZ8MA&ixlib=rb-4.1.0&q=80&w=400",
    digitalLevel: 3,
    digitalLevelLabel: "Intermediário",
    demographics: [
      "45 anos, casado, dois filhos",
      "Ensino superior incompleto",
      "Empresa com 18 funcionários, 8 anos no mercado",
      "Faturamento: R$ 120.000/mês",
    ],
    context: [
      "Não tem departamento de RH — contador faz tudo",
      "Precisa de informações rápidas sobre custo de funcionário",
      "Toma decisões de contratação/demissão sem assessoria interna",
      "Preocupa-se com custos trabalhistas e compliance",
    ],
    pains: [
      { severity: "critica", text: "Não sabe o custo real de cada funcionário" },
      { severity: "alta", text: "Demora para obter simulações de rescisão ou admissão" },
      { severity: "alta", text: "Risco trabalhista por falta de orientação próxima" },
      { severity: "media", text: "Comunicação com contador é lenta para urgências" },
    ],
    goals: [
      "Ter visão clara do custo de pessoal",
      "Simulador de cenários (admissão, demissão, férias)",
      "Acesso rápido a documentos de funcionários",
      "Alertas de compliance trabalhista",
    ],
    behavior: [
      "Usa computador e celular com familiaridade moderada",
      "Toma decisões baseadas em custo, nem sempre com visão completa",
      "Liga para o contador com frequência para tirar dúvidas",
      "Valoriza respostas rápidas e objetivas",
    ],
    quotes: [
      "Quanto me custa esse funcionário? Nunca sei responder na hora.",
      "Se eu pudesse simular antes de contratar, evitaria muita dor de cabeça.",
      "Preciso do contador mas não posso esperar dois dias por uma resposta.",
    ],
    metrics: [
      "Tempo de resposta para simulações",
      "Redução de riscos trabalhistas",
      "Satisfação com a comunicação com o escritório",
    ],
    relationWithOffice: [
      "Contato frequente por WhatsApp e telefone",
      "Autonomia média — decide mas precisa de orientação",
      "Frequência de contato: semanal, com picos em folha",
    ],
  },
  {
    id: "pme-com-rh",
    name: "Camila Rodrigues",
    age: 38,
    role: "Diretora de operações de rede de clínicas",
    category: "pme",
    tag: "PME - Com área de RH",
    tagColor: "bg-[#6A1B9A]",
    tagTextColor: "text-white",
    summary: "Empresa estruturada com RH interno que precisa de integração eficiente com o escritório.",
    location: "Campinas, SP",
    modules: ["Portal do Cliente", "NFe", "Folha", "Gestor"],
    avatar: "https://images.unsplash.com/photo-1661705128745-bb819fe14fe5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGJyYXppbGlhbiUyMHdvbWFuJTIwY3VybHklMjBoYWlyJTIwcHJvZmVzc2lvbmFsJTIwY29ycG9yYXRlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMzQ2OTc2fDA&ixlib=rb-4.1.0&q=80&w=400",
    digitalLevel: 4,
    digitalLevelLabel: "Alto",
    demographics: [
      "38 anos, casada",
      "MBA em Gestão de Pessoas",
      "Empresa com 85 funcionários, 3 unidades",
      "Faturamento: R$ 600.000/mês",
    ],
    context: [
      "RH interno com 2 analistas, mas contabilidade é terceirizada",
      "Precisa de integração fluida entre RH interno e escritório",
      "Demanda relatórios consolidados e dados em tempo real",
      "Processo de admissão/demissão frequente",
    ],
    pains: [
      { severity: "critica", text: "Integração manual de dados entre RH e escritório gera erros" },
      { severity: "alta", text: "Relatórios consolidados exigem cruzamento manual de planilhas" },
      { severity: "alta", text: "Demora na troca de informações para fechamento de folha" },
      { severity: "media", text: "Falta de histórico unificado de movimentações" },
    ],
    goals: [
      "Integração automatizada entre sistemas de RH e contabilidade",
      "Relatórios gerenciais de pessoal em tempo real",
      "Workflow digital para admissão e demissão",
      "Histórico completo e auditável de movimentações",
    ],
    behavior: [
      "Alta maturidade digital, usa múltiplas ferramentas SaaS",
      "Exige organização e rastreabilidade",
      "Participa de decisões estratégicas de pessoal",
      "Avalia ROI de ferramentas com critério",
    ],
    quotes: [
      "Não é possível que em 2025 a gente ainda troque planilha por e-mail.",
      "Preciso de dados em tempo real, não de relatórios de 15 dias atrás.",
      "Integração é a palavra-chave. Se não integra, não serve.",
    ],
    metrics: [
      "Tempo de fechamento de folha",
      "Taxa de erros em movimentações",
      "Satisfação do RH interno com o escritório",
      "Tempo médio de admissão digital",
    ],
    relationWithOffice: [
      "Contato digital estruturado (e-mail, portal, chamados)",
      "Autonomia alta — RH resolve internamente, escritório processa",
      "Frequência de contato: diário em período de folha, semanal fora",
    ],
  },
];

export const personaEmpregado: Persona[] = [
  {
    id: "empregado-clt",
    name: "Marcos Aurélio Silva",
    age: 29,
    role: "Assistente Comercial / Operador de Logística",
    category: "empregado",
    tag: "Empregado CLT",
    tagColor: "bg-primary",
    tagTextColor: "text-primary-foreground",
    summary: "Trabalhador CLT que acessa holerite digital, benefícios e empréstimo consignado pelo sistema.",
    location: "São Paulo, SP",
    modules: ["Holerite Digital", "Empréstimo Consignado", "Benefícios"],
    avatar: "https://images.unsplash.com/photo-1563649685437-a79731028cd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGJyYXppbGlhbiUyMG1hbGUlMjBjb21tZXJjaWFsJTIwYXNzaXN0YW50JTIwd29ya2VyfGVufDF8fHx8MTc3MzA4OTU1NHww&ixlib=rb-4.1.0&q=80&w=400",
    employmentTags: ["CLT", "Renda variável", "Comissão"],
    demographics: [
      "29 anos, união estável, um filho pequeno",
      "Ensino médio completo, cursando técnico em logística",
      "Renda fixa R$ 2.200 + comissão variável",
      "Mora em Guarulhos, trabalha em São Paulo",
    ],
    context: [
      "Trabalha em distribuidora como assistente comercial",
      "Renda varia bastante por causa da comissão",
      "Usa o celular para tudo, inclusive resolver questões de trabalho",
      "Precisa consultar holerite para comprovar renda em financiamentos",
    ],
    pains: [
      { severity: "critica", text: "Holerite chega atrasado ou em formato difícil de entender" },
      { severity: "alta", text: "Não entende os descontos e variações do salário" },
      { severity: "alta", text: "Dificuldade para solicitar empréstimo consignado" },
      { severity: "media", text: "Não sabe quando pode tirar férias" },
      { severity: "media", text: "Benefícios não ficam claros no contracheque" },
    ],
    goals: [
      "Acessar holerite digital a qualquer momento pelo celular",
      "Entender claramente cada item do contracheque",
      "Simular e solicitar empréstimo consignado de forma simples",
      "Consultar saldo de férias e benefícios disponíveis",
    ],
    behavior: [
      "Acessa pelo celular Android, muitas vezes com conexão lenta",
      "Não tem paciência para processos longos ou burocráticos",
      "Confia em colegas para indicações de ferramentas",
      "Valoriza apps que funcionam bem em telas pequenas",
    ],
    quotes: [
      "Todo mês eu fico sem entender por que o salário veio diferente.",
      "Preciso do holerite pra financiamento e nunca acho no e-mail.",
      "Se tivesse um app simples, eu resolvia tudo sozinho.",
    ],
    metrics: [
      "Tempo para acessar holerite digital",
      "Compreensão dos itens do contracheque",
      "Taxa de conclusão de solicitação de consignado",
      "Satisfação com experiência mobile",
    ],
  },
];

export const allPersonas: Persona[] = [
  ...personasContabil,
  ...personasPME,
  ...personaEmpregado,
];

export interface EmpathyMap {
  personaId: string;
  thinksFeels: string[];
  hears: string[];
  sees: string[];
  saysDoes: string[];
  pains: { intensity: "critica" | "alta" | "media"; text: string }[];
  gains: { priority: "essencial" | "importante" | "desejavel"; text: string }[];
}

export const empathyMaps: Record<string, EmpathyMap> = {
  "contador-operacional": {
    personaId: "contador-operacional",
    thinksFeels: [
      "Sente-se uma engrenagem na máquina, sem voz para mudanças",
      "Frustração com interface que não foi pensada para quem usa o dia todo",
      "Satisfação quando consegue resolver problemas complexos sozinha",
      "Desejo de crescer na carreira mas sente limitada pela ferramenta",
    ],
    hears: [
      "Gerente pedindo mais produtividade",
      "Colegas reclamando dos mesmos problemas no sistema",
      "Promessas de atualizações que nunca priorizam o que importa",
      "Feedback positivo de clientes quando entrega com qualidade",
    ],
    sees: [
      "Telas com dezenas de campos dos quais usa apenas 5",
      "Mensagens de erro crípticas que não ajudam a resolver",
      "Fluxos de 10 cliques para tarefas que faz 50 vezes ao dia",
      "Colegas mais novos com dificuldade ainda maior",
    ],
    saysDoes: [
      "Usa atalhos e workarounds para ser mais rápida",
      "Pede ajuda ao gerente quando encontra erros desconhecidos",
      "Sugere melhorias em reuniões mas raramente vê implementação",
      "Organiza seus próprios cheat sheets de procedimentos",
    ],
    pains: [
      { intensity: "critica", text: "Excesso de cliques para tarefas simples e repetitivas" },
      { intensity: "critica", text: "Mensagens de erro incompreensíveis sem orientação de solução" },
      { intensity: "alta", text: "Interface poluída que dificulta foco na tarefa atual" },
      { intensity: "media", text: "Falta de reconhecimento por sugestões de melhoria" },
    ],
    gains: [
      { priority: "essencial", text: "Fluxos otimizados com menos cliques para tarefas recorrentes" },
      { priority: "essencial", text: "Mensagens de erro claras com sugestão de solução" },
      { priority: "importante", text: "Interface limpa com foco progressivo na tarefa" },
      { priority: "desejavel", text: "Canal de feedback que mostra que sugestões são ouvidas" },
    ],
  },
  "contador-mono-usuario": {
    personaId: "contador-mono-usuario",
    thinksFeels: [
      "Se sente sobrecarregado pela quantidade de obrigações de 45 clientes",
      "Preocupa-se em perder prazos fiscais por trabalhar sozinho",
      "Orgulha-se da autonomia mas sente falta de suporte",
      "Ansiedade constante em períodos de pico",
      "Deseja que a tecnologia resolva mais problemas sozinha",
    ],
    hears: [
      "Clientes reclamando de prazos e exigindo rapidez",
      "Colegas contadores falando sobre automação e IA",
      "Propaganda de sistemas que prometem simplicidade",
      "Notícias sobre mudanças na legislação tributária",
    ],
    sees: [
      "Telas complexas com muitas opções irrelevantes para sua rotina",
      "Colegas maiores usando equipes grandes para o mesmo volume",
      "Concorrentes oferecendo preços menores com ferramentas modernas",
      "Sistemas que mudaram a interface e quebraram seu fluxo de trabalho",
    ],
    saysDoes: [
      "Trabalha 10+ horas por dia em período de pico",
      "Usa atalhos do teclado e memoriza caminhos do sistema",
      "Reclama de atualizações que mudam a interface",
      "Busca tutoriais no YouTube quando não encontra ajuda no sistema",
      "Mantém caderno com anotações de procedimentos",
    ],
    pains: [
      { intensity: "critica", text: "Risco de multa por perda de prazo sem sistema de alertas" },
      { intensity: "critica", text: "Horas gastas em tarefas que poderiam ser automatizadas" },
      { intensity: "alta", text: "Busca de informações em múltiplas telas sem visão unificada" },
      { intensity: "alta", text: "Erros por fadiga em tarefas repetitivas" },
      { intensity: "media", text: "Falta de suporte técnico rápido quando tem problemas" },
    ],
    gains: [
      { priority: "essencial", text: "Dashboard de prazos e obrigações com alertas automáticos" },
      { priority: "essencial", text: "Automação de tarefas repetitivas de apuração" },
      { priority: "importante", text: "Interface simplificada com foco na tarefa atual" },
      { priority: "importante", text: "Atalhos personalizáveis para fluxos frequentes" },
      { priority: "desejavel", text: "Relatório de produtividade pessoal" },
    ],
  },
  "gerente-contabil": {
    personaId: "gerente-contabil",
    thinksFeels: [
      "Pressão por entregar com qualidade e dentro do prazo",
      "Frustração por gastar mais tempo revisando do que orientando",
      "Vontade de implementar processos melhores mas sem tempo",
      "Preocupação com a curva de aprendizado de novos membros",
    ],
    hears: [
      "Diretoria cobrando indicadores de performance",
      "Equipe pedindo mais clareza nos processos",
      "Clientes reclamando de atrasos pontuais",
      "Outros gerentes compartilhando práticas de gestão",
    ],
    sees: [
      "Planilhas de controle paralelas em todos os computadores da equipe",
      "Novos colaboradores levando semanas para se tornarem produtivos",
      "Erros repetidos por falta de checklist padronizado",
      "Ferramentas de gestão de projetos que poderiam ser adaptadas",
    ],
    saysDoes: [
      "Cria planilhas de acompanhamento paralelas ao sistema",
      "Faz revisão manual de cada entrega antes de enviar ao cliente",
      "Treina novos colaboradores dedicando horas de seu dia",
      "Compartilha dicas e atalhos com a equipe via WhatsApp",
    ],
    pains: [
      { intensity: "critica", text: "40% do tempo gasto em revisão manual que poderia ser automatizada" },
      { intensity: "alta", text: "Sem visão consolidada do progresso de cada cliente" },
      { intensity: "alta", text: "Onboarding de novos membros leva 3+ semanas" },
      { intensity: "media", text: "Reuniões de status que poderiam ser substituídas por dashboards" },
    ],
    gains: [
      { priority: "essencial", text: "Dashboard de status por cliente e colaborador em tempo real" },
      { priority: "essencial", text: "Checklist automatizado de revisão com validações" },
      { priority: "importante", text: "Módulo de treinamento integrado para onboarding" },
      { priority: "desejavel", text: "Métricas de performance individual e comparativa" },
    ],
  },
  "dono-escritorio": {
    personaId: "dono-escritorio",
    thinksFeels: [
      "Preocupa-se com a sustentabilidade financeira do escritório",
      "Sente necessidade de modernizar processos para competir",
      "Frustração por não ter visibilidade do que a equipe está fazendo",
      "Orgulho por ter construído o escritório do zero",
    ],
    hears: [
      "Clientes pedindo mais agilidade e serviços digitais",
      "Funcionários reclamando de sobrecarga",
      "Consultores sugerindo transformação digital",
      "Concorrentes oferecendo serviços online mais baratos",
    ],
    sees: [
      "Equipe usando planilhas paralelas porque o sistema não basta",
      "Clientes migrando para escritórios mais modernos",
      "Dashboards de gestão em ferramentas de outros setores",
      "Erros operacionais que geram retrabalho e custo",
    ],
    saysDoes: [
      "Pede relatórios semanais manualmente para cada departamento",
      "Investe em treinamentos mas vê pouco resultado prático",
      "Negocia com clientes estratégicos pessoalmente",
      "Testa ferramentas complementares para suprir gaps do Domínio",
    ],
    pains: [
      { intensity: "critica", text: "Sem dashboards de produtividade — toma decisões no escuro" },
      { intensity: "alta", text: "Relatórios para clientes são manuais e consomem horas" },
      { intensity: "alta", text: "Retrabalho por falhas de comunicação interna" },
      { intensity: "media", text: "Dificuldade em medir ROI de melhorias implementadas" },
    ],
    gains: [
      { priority: "essencial", text: "Painel gerencial em tempo real com KPIs do escritório" },
      { priority: "essencial", text: "Automação de relatórios recorrentes para clientes" },
      { priority: "importante", text: "Visão de gargalos por departamento e colaborador" },
      { priority: "desejavel", text: "Benchmark com outros escritórios do mesmo porte" },
    ],
  },
  "mei-digitalizado": {
    personaId: "mei-digitalizado",
    thinksFeels: [
      "Quer resolver tudo rápido e sem depender de ninguém",
      "Frustração quando precisa ligar para obter informações simples",
      "Valoriza transparência e acesso a dados em tempo real",
      "Sente que paga pelo serviço mas não tem visibilidade do que recebe",
    ],
    hears: [
      "Outros MEIs falando sobre plataformas de contabilidade online",
      "Propaganda de fintechs com experiência digital superior",
      "Contador pedindo documentos por WhatsApp de forma desorganizada",
    ],
    sees: [
      "Apps de banco com experiência excelente de autoatendimento",
      "Portal do contador com design ultrapassado",
      "Concorrentes usando contabilidade 100% digital",
    ],
    saysDoes: [
      "Resolve tudo pelo celular entre uma venda e outra",
      "Compara experiências digitais entre serviços que usa",
      "Avalia trocar de contador se encontrar opção mais digital",
    ],
    pains: [
      { intensity: "alta", text: "Portal do cliente não funciona bem no celular" },
      { intensity: "alta", text: "Precisa ligar para obter boletos e comprovantes" },
      { intensity: "media", text: "Não sabe se está regular sem perguntar ao contador" },
    ],
    gains: [
      { priority: "essencial", text: "App mobile com todas as informações fiscais" },
      { priority: "importante", text: "Notificações automáticas de vencimentos" },
      { priority: "desejavel", text: "Dashboard de saúde fiscal simplificado" },
    ],
  },
  "mei-nao-digitalizado": {
    personaId: "mei-nao-digitalizado",
    thinksFeels: [
      "Medo de fazer algo errado e ser punida pelo governo",
      "Confusão com termos técnicos que não entende",
      "Confiança total no contador como figura de proteção",
      "Desejo de simplicidade e clareza em tudo",
    ],
    hears: [
      "Filhos dizendo que precisa se modernizar",
      "Vizinhos contando histórias de golpes na internet",
      "Contador explicando obrigações que não compreende",
    ],
    sees: [
      "E-mails e mensagens que não sabe se são legítimos",
      "Boletos com informações que não entende",
      "Outras pessoas resolvendo tudo pelo celular enquanto ela não consegue",
    ],
    saysDoes: [
      "Vai ao escritório pessoalmente para pagar e tirar dúvidas",
      "Pede para os filhos lerem mensagens do contador",
      "Anota tudo em caderno com caneta",
    ],
    pains: [
      { intensity: "critica", text: "Não entende comunicações digitais sobre sua situação fiscal" },
      { intensity: "alta", text: "Medo constante de estar irregular" },
      { intensity: "media", text: "Vergonha de pedir ajuda para coisas que parecem simples" },
    ],
    gains: [
      { priority: "essencial", text: "Comunicação simplificada em linguagem acessível" },
      { priority: "importante", text: "Indicador visual simples: 'está tudo certo' vs 'precisa de atenção'" },
      { priority: "desejavel", text: "Canal de atendimento humanizado por voz ou presencial" },
    ],
  },
  "pme-sem-rh": {
    personaId: "pme-sem-rh",
    thinksFeels: [
      "Ansiedade sobre custos trabalhistas que não controla totalmente",
      "Frustração por depender do contador para decisões urgentes",
      "Preocupação com compliance trabalhista",
      "Desejo de ter mais autonomia na gestão de pessoal",
    ],
    hears: [
      "Funcionários perguntando sobre férias e benefícios",
      "Advogado alertando sobre riscos trabalhistas",
      "Contador pedindo prazo para simulações simples",
    ],
    sees: [
      "Empresas maiores com RH estruturado tomando decisões mais rápido",
      "Planilhas de custo de pessoal sempre desatualizadas",
      "Processos trabalhistas de concorrentes que não se preveniram",
    ],
    saysDoes: [
      "Liga para o contador várias vezes por semana",
      "Toma decisões de contratação baseado em feeling mais que dados",
      "Adia decisões por falta de informação rápida",
    ],
    pains: [
      { intensity: "critica", text: "Custo real de funcionário é um mistério — decide sem dados" },
      { intensity: "alta", text: "Simulações de rescisão levam dias para ficar prontas" },
      { intensity: "media", text: "Não sabe se está cumprindo todas as obrigações trabalhistas" },
    ],
    gains: [
      { priority: "essencial", text: "Simulador de custo de pessoal em tempo real" },
      { priority: "importante", text: "Alertas automáticos de compliance trabalhista" },
      { priority: "desejavel", text: "Comparativo de custo de pessoal com mercado" },
    ],
  },
  "pme-com-rh": {
    personaId: "pme-com-rh",
    thinksFeels: [
      "Frustração com processos manuais que não deveriam existir em 2025",
      "Confiança na equipe de RH mas sente falta de ferramentas adequadas",
      "Pressão por eficiência operacional e redução de custos",
      "Visão estratégica de dados mas sem ferramentas para executar",
    ],
    hears: [
      "RH pedindo melhor integração com o escritório",
      "Diretoria cobrando relatórios consolidados",
      "Fornecedores de software prometendo integração total",
    ],
    sees: [
      "E-mails com planilhas anexadas como principal forma de troca de dados",
      "Erros de folha causados por informação desatualizada",
      "Empresas do mesmo porte usando sistemas integrados",
    ],
    saysDoes: [
      "Cobra SLAs do escritório contábil para fechamento de folha",
      "Avalia constantemente o ROI da terceirização contábil",
      "Prioriza ferramentas que integram com o ecossistema existente",
    ],
    pains: [
      { intensity: "critica", text: "Troca de dados manual entre RH e escritório gera erros frequentes" },
      { intensity: "alta", text: "Fechamento de folha atrasa por dependências externas" },
      { intensity: "media", text: "Histórico de movimentações fragmentado entre sistemas" },
    ],
    gains: [
      { priority: "essencial", text: "Integração API entre sistemas de RH e contabilidade" },
      { priority: "essencial", text: "Workflow digital completo para admissão e demissão" },
      { priority: "importante", text: "Dashboard de indicadores de pessoal em tempo real" },
    ],
  },
  "empregado-clt": {
    personaId: "empregado-clt",
    thinksFeels: [
      "Confusão mensal sobre por que o salário veio diferente do esperado",
      "Ansiedade quando precisa do holerite e não encontra",
      "Desejo de independência para resolver questões trabalhistas sozinho",
      "Frustração com processos burocráticos que não entende",
    ],
    hears: [
      "Colegas reclamando das mesmas dificuldades com holerite",
      "RH dizendo que o sistema não permite consulta online",
      "Banco pedindo comprovante de renda atualizado",
    ],
    sees: [
      "Apps de banco que mostram tudo de forma clara e acessível",
      "Holerite em PDF com formatação confusa",
      "Colegas pedindo print do holerite para o RH mandar",
    ],
    saysDoes: [
      "Pede holerite ao RH por WhatsApp todo mês",
      "Tira foto do contracheque para guardar no celular",
      "Não sabe calcular se a comissão foi paga corretamente",
    ],
    pains: [
      { intensity: "critica", text: "Holerite difícil de acessar e entender" },
      { intensity: "alta", text: "Não entende variações e descontos do salário" },
      { intensity: "alta", text: "Processo de consignado burocrático e demorado" },
      { intensity: "media", text: "Sem visibilidade de férias e benefícios disponíveis" },
    ],
    gains: [
      { priority: "essencial", text: "Holerite digital acessível pelo celular a qualquer momento" },
      { priority: "essencial", text: "Explicação clara de cada item do contracheque" },
      { priority: "importante", text: "Simulador de empréstimo consignado integrado" },
      { priority: "desejavel", text: "Consulta de saldo de férias e histórico de benefícios" },
    ],
  },
};