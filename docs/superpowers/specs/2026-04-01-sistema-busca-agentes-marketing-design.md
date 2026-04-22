# Design: Sistema de Busca, Agentes e Marketing

**Data:** 2026-04-01  
**Status:** Aprovado para implementação  
**Abordagem:** Implementação incremental (ordem de complexidade crescente)

---

## 1. Visão Geral

Este documento especifica melhorias no sistema Domínio UX em quatro áreas principais:

1. **Atualização de responsáveis** — Correção de dados de 8 módulos contábeis
2. **Busca inteligente melhorada** — Expansão de conteúdo indexado e feedback visual
3. **Página de agentes IA** — Nova página com 17 agentes categorizados
4. **Aba Comercial e Marketing** — Conversão completa do HTML de marketing para React

**Ordem de implementação:** Seguir numeração acima (1→2→3→4) para entregas incrementais.

---

## 2. Atualização de Responsáveis

### 2.1 Objetivo
Atualizar campo `responsavel` de 8 módulos no array `MODULOS_CONTABIL`.

### 2.2 Arquivo afetado
- `src/app/pages/NossosProdutos.tsx`

### 2.3 Mudanças específicas

| Módulo | Linha aprox. | Responsável atual | Novo responsável |
|--------|-------------|-------------------|------------------|
| Patrimônio | ~90 | `"Cláudia Savóis · Validar: Kassiane Mesquita"` | `"Cláudia Savóis · Kassiane Mesquita"` |
| Lalur | ~106 | `"Validar: Kassiane Mesquita"` | `"Kassiane Mesquita"` |
| Atualizar | ~121 | `"Validar: Kassiane Mesquita"` | `"Kassiane Mesquita"` |
| Registro | ~135 | `"Validar: Kassiane Mesquita"` | `"Kassiane Mesquita"` |
| Administrar | ~149 | `"Validar: Kassiane Mesquita"` | `"Kassiane Mesquita"` |
| Honorários | ~191 | `"Validar: Kassiane Mesquita"` | `"Kassiane Mesquita"` |
| Onvio Custos | ~251 | `"Lucas Claro (validado)"` | `"Lucas Claro"` |
| Messenger | ~297 | `"Validar"` | `"Leticia Santiago · Gestor: Adão Dutra"` |

### 2.4 Implementação
- Substituição simples de strings no array de dados
- Nenhuma mudança de lógica ou UI
- Teste: verificar exibição correta ao expandir cada módulo

---

## 3. Busca Inteligente Melhorada

### 3.1 Objetivo
Expandir conteúdo indexado e melhorar feedback visual da busca no header.

### 3.2 Arquivo afetado
- `src/app/components/Layout.tsx`

### 3.3 Estado atual
- Busca já mostra **todos** os resultados sem limite ✓
- Sugestões relacionadas limitadas a 3 itens ✓ (manter)
- Array `searchableContent` com ~20 itens (linhas 103-132)

### 3.4 Melhorias necessárias

#### 3.4.1 Expansão de conteúdo indexado
Adicionar ao array `searchableContent`:

**Seções do Guia de Writing:**
- Linguagem inclusiva
- Capitalização
- Pontuação
- Abreviações e siglas
- Unidades de medida
- Confirmações e cancelamentos
- Títulos de seções

**Módulos contábeis individuais:**
- Patrimônio, Lalur, Atualizar, Registro, Administrar, etc.
- Com tags: nome do módulo, categoria (Core/Acessório/Periférico)

**Agentes de IA:**
- Adicionar os 17 agentes com nome, criador e tags
- Tags: discovery, cocriação, delivery, nome do criador

**Meta:** Expandir de ~20 para ~50-60 itens indexados

#### 3.4.2 Feedback visual melhorado
```tsx
{searchQuery.length >= 2 && (
  <div className="border-t border-border">
    {/* Contador de resultados */}
    <div className="px-3 py-2 bg-muted/30 border-b border-border">
      <p className="text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
        {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''} encontrado{searchResults.length !== 1 ? 's' : ''}
      </p>
    </div>
    
    {/* Resultados com scroll */}
    <div className="max-h-96 overflow-y-auto">
      {/* ... resultados existentes ... */}
    </div>
  </div>
)}
```

#### 3.4.3 Melhorias de tags
- Adicionar tags alternativas (sinônimos)
- Ex: "acessibilidade" → tags: ["a11y", "wcag", "aria", "inclusão", "leitor de tela"]
- Ex: "escrita fiscal" → tags: ["impostos", "tributos", "fiscal", "nfe", "sped"]

### 3.5 Comportamento mantido
- Busca em: título, descrição, tags
- Busca em personas: nome, role, modules
- Sugestões relacionadas baseadas em tags comuns (max 3)
- Mínimo 2 caracteres para ativar busca

---

## 4. Página de Agentes Criados pelo Time

### 4.1 Objetivo
Criar página dedicada exibindo 17 agentes categorizados por tipo de uso.

### 4.2 Arquivos afetados
- **Novo:** `src/app/pages/AgentesTime.tsx`
- **Editar:** `src/app/pages/AIFirst.tsx` (transformar card em NavLink)
- **Editar:** `src/app/routes.tsx` (adicionar rota)

### 4.3 Estrutura da página

#### 4.3.1 Header
```
┌─────────────────────────────────────────┐
│ ← Início → AI First                     │
│                                         │
│ 🤖 Agentes criados pelo time            │
│                                         │
│ Catálogo de agentes Claude customizados│
│ para automação de tarefas de UX         │
│                                         │
│ 17 agentes · 3 categorias               │
└─────────────────────────────────────────┘
```

- Breadcrumb: Início → AI First → Agentes criados pelo time
- Título com ícone Bot
- Subtítulo descritivo
- Estatísticas

#### 4.3.2 Organização por categorias

**Discovery (8 agentes):**
1. Agente de Benchmarking Copilot — Filipe Pinheiro
2. Agente de Benchmarking - Open Arena — Filipe Pinheiro
3. Tradutor Contábil — Tassiana Mafioletti
4. Análise de dados — Lucas Lima
5. Gerador de perguntas sem viés — Lucas Lima
6. Agente de criação de briefings — Adelino Oliveira
7. Resumo de alinhamento — Sabrina Ezequiel
8. Produtos e Personas Sintéticas Domínio — Karla Ikeda

**Cocriação (7 agentes):**
1. Gerador de prompts para Figma Make — Daniel Andrade
2. Especialista em usabilidade — Sabrina Ezequiel
3. Norman de bolso — Tassiana Mafioletti
4. Chain do Open Arena para UX Writing — Natalia De Marco
5. Agente de Requisitos de Componente p/ DS — Luis Augusto Domingues
6. Agente de Recomendações de uso de componentes — Luis Augusto Domingues
7. Agente de acessibilidade (análise) — Karla Ikeda

**Delivery (2 agentes):**
1. Agente de criação de especificação de acessibilidade — Karla Ikeda
2. Agente de IA para relatórios de pesquisa CSAT — Natalia De Marco

#### 4.3.3 Estrutura de cada seção
```tsx
<section key={categoria}>
  <div className="flex items-center justify-between mb-5">
    <h2>{categoria}</h2>
    <span className="text-muted-foreground">
      {agentes.length} {agentes.length === 1 ? 'agente' : 'agentes'}
    </span>
  </div>
  
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {agentes.map(agente => <AgenteCard key={agente.id} agente={agente} />)}
  </div>
</section>
```

#### 4.3.4 Card de agente (componente AgenteCard)
```
┌──────────────────────────────────┐
│ [Discovery] 🔍                   │
│                                  │
│ Gerador de prompts Figma Make    │
│                                  │
│ 👤 Daniel Andrade                │
│                                  │
│ Esta chain foi criada para       │
│ acelerar a criação de prompts... │
│                                  │
│ 📝 Instruções:                   │
│ Adicione sua instrução do que... │
│                                  │
│ [ Acessar agente → ]             │
└──────────────────────────────────┘
```

**Estrutura do card:**
- Badge de categoria no topo (com cor por tipo)
- Nome da chain (título em negrito)
- Criador com ícone de usuário
- "O que ela faz" (descrição principal)
- "Instruções" (se houver, com ícone 📝)
- Botão "Acessar agente" que abre link em nova aba
- Link não visível no card, apenas no botão

**Cores de badge:**
- Discovery: `bg-blue-100 text-blue-700`
- Cocriação: `bg-amber-100 text-amber-700`
- Delivery: `bg-green-100 text-green-700`

**Efeitos hover:**
- `hover:border-primary/30`
- `hover:shadow-[var(--elevation-sm)]`
- `transition-all duration-200`

#### 4.3.5 Estrutura de dados

```typescript
interface Agente {
  id: string;
  nome: string;
  criador: string;
  link: string;
  instrucoes?: string;
  descricao: string;
  categoria: 'Discovery' | 'Cocriação' | 'Delivery';
}

const agentes: Agente[] = [
  {
    id: 'prompts-figma-make',
    nome: 'Gerador de prompts para Figma Make',
    criador: 'Daniel Andrade',
    link: 'https://dataandanalytics.int.thomsonreuters.com/ai-platform/ai-chains/use/427cc8bd-3beb-46ba-8843-72e3821a8bf8?chain_builder=true',
    instrucoes: 'Adicione sua instrução do que gostaria de fazer e a chain gerará um prompt estruturado no formato do Figma Make',
    descricao: 'Esta chain foi criada para acelerar a criação de prompts estruturados para o Figma Make com a visão e expertise de um especialista.',
    categoria: 'Cocriação'
  },
  // ... outros 16 agentes
];
```

### 4.4 Navegação

#### 4.4.1 Modificação no AIFirst.tsx
Transformar o card "Agentes criados pelo time" em NavLink:

```tsx
// Antes (card estático):
<div className="group flex flex-col p-5 bg-card...">

// Depois (card navegável):
<NavLink 
  to="/agentes-time"
  className="group flex flex-col p-5 bg-card..."
>
```

#### 4.4.2 Nova rota
Adicionar em `src/app/routes.tsx`:

```tsx
{
  path: "/agentes-time",
  element: <AgentesTime />,
}
```

### 4.5 Responsividade
- Grid adapta: 3 colunas (desktop) → 2 colunas (tablet) → 1 coluna (mobile)
- Cards mantêm largura mínima adequada
- Instruções longas com `line-clamp-3` e expansão opcional (implementação futura)

### 4.6 Acessibilidade
- Links com `target="_blank"` incluem `rel="noopener noreferrer"`
- Ícones decorativos com `aria-hidden="true"`
- Botão "Acessar agente" com label descritivo
- Cards com foco visível: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`

---

## 5. Aba Comercial e Marketing

### 5.1 Objetivo
Converter o HTML completo do mkt.txt para componentes React nativos, mantendo todas as seções e emojis.

### 5.2 Arquivo afetado
- `src/app/pages/NossosProdutos.tsx`

### 5.3 Estrutura geral

Quando `activeTab === "comercial-marketing"`, renderizar:

```tsx
{activeTab === "comercial-marketing" && (
  <div className="space-y-16">
    <HeroMarketing />
    <SecaoPersonas />
    <SecaoPacotes />
    <TabelaComparativa />
    <SecaoOnvio />
    <SecaoSuiteFinanceira />
    <JornadaCliente />
    <SecaoInsights />
    <SecaoSegmentos />
  </div>
)}
```

### 5.4 Seções detalhadas

#### 5.4.1 Hero Marketing
```tsx
function HeroMarketing() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-orange-950 text-white rounded-[var(--radius-card)] p-8 md:p-12">
      <span className="inline-block bg-orange-600 text-white text-xs font-bold tracking-wider uppercase px-3 py-1 rounded mb-4">
        🔶 PRD · Personas & Comercialização
      </span>
      
      <h2 className="text-3xl md:text-4xl font-bold mb-3">
        Soluções <span className="text-orange-500">Domínio</span>
        <br />Thomson Reuters
      </h2>
      
      <p className="text-gray-300 max-w-2xl mb-6" style={{ fontSize: "var(--text-base)", lineHeight: "1.6" }}>
        Plataforma líder em inteligência contábil no Brasil. Este documento consolida personas, pacotes de contratação, módulos e estratégias de comercialização para apoiar times de marketing e vendas.
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <strong className="block text-2xl md:text-3xl font-bold text-orange-500">+35mil</strong>
          <span className="text-xs text-gray-400 uppercase tracking-wide">Escritórios atendidos</span>
        </div>
        <div>
          <strong className="block text-2xl md:text-3xl font-bold text-orange-500">+180mil</strong>
          <span className="text-xs text-gray-400 uppercase tracking-wide">Usuários ativos</span>
        </div>
        <div>
          <strong className="block text-2xl md:text-3xl font-bold text-orange-500">+25 anos</strong>
          <span className="text-xs text-gray-400 uppercase tracking-wide">De expertise contábil</span>
        </div>
        <div>
          <strong className="block text-2xl md:text-3xl font-bold text-orange-500">4 pacotes</strong>
          <span className="text-xs text-gray-400 uppercase tracking-wide">Start · Plus · Premium · Empresarial</span>
        </div>
      </div>
    </div>
  );
}
```

**Design notes:**
- Gradiente escuro com toque de laranja
- Stats em grid responsivo (2 cols mobile, 4 cols desktop)
- Badge laranja para tag PRD
- Texto laranja (#E87722 ou similar do sistema) para destaques

#### 5.4.2 Seção Personas
```tsx
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
  // ... outras 2 personas
];

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
```

**Design notes:**
- 3 cards em grid (1 col mobile, 3 cols desktop)
- Emojis nos avatares circulares
- Listas com border-left para hierarquia visual
- Footer colorido com foco

#### 5.4.3 Seção Pacotes
```tsx
interface PacoteMarketing {
  emoji: string;
  nome: string;
  descricao: string;
  modulosCount: number;
  modulos: Array<{ nome: string; descricao: string; isNew?: boolean }>;
  perfilIdeal: string;
  destaque?: boolean;
}

const pacotesMarketing: PacoteMarketing[] = [
  {
    emoji: '🚀',
    nome: 'Domínio Start',
    descricao: 'Porta de entrada para escritórios iniciantes. Cobre as necessidades operacionais essenciais com os três módulos core.',
    modulosCount: 3,
    modulos: [
      { nome: 'Contabilidade', descricao: 'Escrituração e lançamentos contábeis' },
      { nome: 'Escrita Fiscal', descricao: 'Apuração de tributos e obrigações acessórias' },
      { nome: 'Folha de Pagamento', descricao: 'Cálculo de salários, férias e rescisões' }
    ],
    perfilIdeal: 'Escritórios iniciantes com carteira em formação. Foco operacional.'
  },
  // ... outros 3 pacotes
];

function SecaoPacotes() {
  return (
    <section className="bg-gray-50 -mx-6 md:-mx-8 px-6 md:px-8 py-12 md:py-16">
      <div className="mb-6">
        <p className="text-xs font-bold tracking-widest uppercase text-orange-600 mb-2">
          Portfólio de produtos
        </p>
        <h2 className="text-2xl font-bold mb-2">Pacotes de Contratação</h2>
        <p className="text-muted-foreground max-w-2xl" style={{ fontSize: "var(--text-label)", lineHeight: "1.6" }}>
          Quatro pacotes desenhados para escritórios contábeis em diferentes estágios de maturidade — do iniciante ao grande escritório que demanda soluções completas e integradas.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {pacotesMarketing.map(pacote => (
          <PacoteCard key={pacote.nome} pacote={pacote} />
        ))}
      </div>
    </section>
  );
}

function PacoteCard({ pacote }: { pacote: PacoteMarketing }) {
  return (
    <div className={`bg-card rounded-[var(--radius-card)] overflow-hidden transition-all ${
      pacote.destaque 
        ? 'border-2 border-orange-500 shadow-lg' 
        : 'border border-border hover:border-orange-300 hover:shadow-md'
    }`}>
      {pacote.destaque && (
        <div className="bg-orange-500 text-white text-center py-1 text-xs font-bold tracking-wide uppercase">
          Mais vendido
        </div>
      )}
      
      {/* Header */}
      <div className="p-5 border-b border-border">
        <div className="text-3xl mb-2">{pacote.emoji}</div>
        <h3 className="font-bold text-lg mb-1">{pacote.nome}</h3>
        <p className="text-sm text-muted-foreground mb-3" style={{ lineHeight: "1.5" }}>
          {pacote.descricao}
        </p>
        <span className="inline-block bg-orange-50 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">
          {pacote.modulosCount} módulos
        </span>
      </div>
      
      {/* Body */}
      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-3">
          Módulos incluídos
        </p>
        <div className="space-y-2">
          {pacote.modulos.map((modulo, idx) => (
            <div key={idx} className="flex gap-2 items-start pb-2 border-b border-gray-100 last:border-0">
              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                modulo.isNew ? 'bg-green-500' : 'bg-orange-500'
              }`} />
              <div>
                <strong className="text-sm block">{modulo.nome}</strong>
                <small className="text-xs text-muted-foreground">{modulo.descricao}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <div className="px-5 py-3 bg-gray-50 border-t border-border">
        <p className="text-xs text-muted-foreground">
          <strong className="text-foreground">Perfil ideal:</strong> {pacote.perfilIdeal}
        </p>
      </div>
    </div>
  );
}
```

**Design notes:**
- 4 cards em grid (1 col mobile, 2 cols tablet, 4 cols desktop)
- Card "Premium" com border laranja e badge "Mais vendido"
- Dots laranja/verde para módulos (verde = novo)
- Background cinza claro na seção

#### 5.4.4 Tabela Comparativa
```tsx
function TabelaComparativa() {
  const recursos = [
    { nome: 'Contabilidade', start: true, plus: true, premium: true, empresarial: true },
    { nome: 'Escrita Fiscal', start: true, plus: true, premium: true, empresarial: true },
    { nome: 'Folha de Pagamento', start: true, plus: true, premium: true, empresarial: true },
    { nome: 'Patrimônio', start: false, plus: true, premium: true, empresarial: true },
    { nome: 'Lalur', start: false, plus: true, premium: true, empresarial: true },
    { nome: 'Portal do Cliente', start: false, plus: false, premium: true, empresarial: true },
    { nome: 'Portal Premium', start: false, plus: false, premium: true, empresarial: true },
    { nome: 'Busca NF-e', start: false, plus: false, premium: true, empresarial: true },
    { nome: 'Onvio Cloud (Web)', start: false, plus: false, premium: false, empresarial: true },
    { nome: 'Processos', start: false, plus: false, premium: false, empresarial: true },
    { nome: 'Kolossus Auditor', start: false, plus: false, premium: false, empresarial: true },
  ];
  
  return (
    <section>
      <div className="mb-6">
        <p className="text-xs font-bold tracking-widest uppercase text-orange-600 mb-2">
          Comparativo de recursos
        </p>
        <h2 className="text-2xl font-bold mb-2">Compare os pacotes</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-card rounded-[var(--radius-card)] overflow-hidden shadow-sm">
          <thead>
            <tr>
              <th className="bg-gray-900 text-white text-left px-4 py-3 text-sm font-semibold">
                Recurso
              </th>
              <th className="bg-gray-900 text-white text-center px-4 py-3 text-sm font-semibold">
                Start
              </th>
              <th className="bg-gray-900 text-white text-center px-4 py-3 text-sm font-semibold">
                Plus
              </th>
              <th className="bg-orange-600 text-white text-center px-4 py-3 text-sm font-semibold">
                Premium
              </th>
              <th className="bg-gray-900 text-white text-center px-4 py-3 text-sm font-semibold">
                Empresarial
              </th>
            </tr>
          </thead>
          <tbody>
            {recursos.map((recurso, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 border-b border-border font-semibold text-sm">
                  {recurso.nome}
                </td>
                <td className="px-4 py-3 border-b border-border text-center">
                  {recurso.start ? (
                    <span className="text-green-600 text-lg">✓</span>
                  ) : (
                    <span className="text-gray-300 text-lg">—</span>
                  )}
                </td>
                <td className="px-4 py-3 border-b border-border text-center">
                  {recurso.plus ? (
                    <span className="text-green-600 text-lg">✓</span>
                  ) : (
                    <span className="text-gray-300 text-lg">—</span>
                  )}
                </td>
                <td className="px-4 py-3 border-b border-border bg-orange-50 text-center">
                  {recurso.premium ? (
                    <span className="text-green-600 text-lg">✓</span>
                  ) : (
                    <span className="text-gray-300 text-lg">—</span>
                  )}
                </td>
                <td className="px-4 py-3 border-b border-border text-center">
                  {recurso.empresarial ? (
                    <span className="text-green-600 text-lg">✓</span>
                  ) : (
                    <span className="text-gray-300 text-lg">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
```

**Design notes:**
- Tabela responsiva com overflow-x
- Coluna Premium destacada (header laranja, células com bg-orange-50)
- Checks verdes (✓) e traços cinzas (—)
- Hover em linhas

#### 5.4.5 Seção Onvio Cloud
```tsx
function SecaoOnvio() {
  const features = [
    { emoji: '☁️', nome: 'Acesso Web', descricao: 'Trabalhe de qualquer lugar' },
    { emoji: '📱', nome: 'Mobile Ready', descricao: 'Responsivo e adaptável' },
    { emoji: '🔄', nome: 'Atualizações Automáticas', descricao: 'Sempre atualizado' },
    { emoji: '🔐', nome: 'Segurança TR', descricao: 'Proteção de dados' }
  ];
  
  const modulos = ['Contabilidade', 'Escrita Fiscal', 'Folha', 'Portal Cliente', 'BOX-e'];
  
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Coluna esquerda: texto + features */}
        <div>
          <h2 className="text-2xl font-bold mb-3">
            Onvio <span className="text-orange-600">Cloud</span>
          </h2>
          <p className="text-muted-foreground mb-6" style={{ fontSize: "var(--text-label)", lineHeight: "1.7" }}>
            Versão web dos módulos core da Domínio, disponível no pacote Empresarial. Acesse de qualquer lugar com a segurança e confiabilidade da Thomson Reuters.
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            {features.map(feat => (
              <div key={feat.nome} className="bg-card border border-border rounded-lg p-4">
                <div className="text-xl mb-2">{feat.emoji}</div>
                <strong className="block text-sm mb-1">{feat.nome}</strong>
                <span className="text-xs text-muted-foreground">{feat.descricao}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Coluna direita: visual card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-center text-white">
          <div className="text-6xl mb-4">☁️</div>
          <h3 className="text-xl font-bold mb-2">Onvio Cloud</h3>
          <p className="text-sm text-gray-300 mb-4" style={{ lineHeight: "1.6" }}>
            Plataforma web unificada com os principais módulos contábeis
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {modulos.map(mod => (
              <span key={mod} className="inline-block bg-orange-900/40 border border-orange-700/50 text-orange-400 text-xs font-semibold px-3 py-1 rounded-full">
                {mod}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Design notes:**
- 2 colunas (empilha em mobile)
- Grid 2×2 de features com emojis
- Card visual escuro com pills dos módulos

#### 5.4.6 Seção Suíte Financeira
```tsx
function SecaoSuiteFinanceira() {
  const produtos = [
    {
      emoji: '📊',
      nome: 'Conteúdo Tributário',
      descricao: 'Banco de dados legislativos sempre atualizado com comparativos automáticos.',
      tags: ['Legislação', 'Comparativos', 'Atualizações']
    },
    {
      emoji: '💰',
      nome: 'Onvio Custos',
      descricao: 'Análise de rentabilidade por cliente, cruzando volume e tempo trabalhado.',
      tags: ['Rentabilidade', 'Análise', 'Gestão']
    },
    {
      emoji: '🔍',
      nome: 'Kolossus Auditor',
      descricao: 'Verificação automática de enquadramentos fiscais antes da Receita notificar.',
      tags: ['Auditoria', 'Compliance', 'Prevenção']
    }
  ];
  
  return (
    <section className="bg-gray-50 -mx-6 md:-mx-8 px-6 md:px-8 py-12 md:py-16">
      <div className="mb-6">
        <p className="text-xs font-bold tracking-widest uppercase text-orange-600 mb-2">
          Produtos complementares
        </p>
        <h2 className="text-2xl font-bold mb-2">Suíte Financeira</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {produtos.map(prod => (
          <div key={prod.nome} className="bg-card border border-border rounded-[var(--radius-card)] p-6 hover:border-orange-300 hover:shadow-md transition-all">
            <div className="text-3xl mb-3">{prod.emoji}</div>
            <h3 className="font-bold text-base mb-2">{prod.nome}</h3>
            <p className="text-sm text-muted-foreground mb-4" style={{ lineHeight: "1.6" }}>
              {prod.descricao}
            </p>
            <div className="flex flex-wrap gap-2">
              {prod.tags.map(tag => (
                <span key={tag} className="inline-block bg-orange-50 text-orange-700 text-xs font-semibold px-2 py-1 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

**Design notes:**
- 3 cards em grid (1 col mobile, 3 cols desktop)
- Tags laranja nos cards
- Background cinza claro na seção

#### 5.4.7 Jornada do Cliente
```tsx
function JornadaCliente() {
  const steps = [
    { emoji: '🔍', titulo: 'Descoberta', descricao: 'Cliente conhece a Domínio' },
    { emoji: '💬', titulo: 'Contato', descricao: 'Consulta comercial' },
    { emoji: '✅', titulo: 'Escolha', descricao: 'Seleciona o pacote ideal' },
    { emoji: '🚀', titulo: 'Onboarding', descricao: 'Implantação e treinamento' },
    { emoji: '🎯', titulo: 'Sucesso', descricao: 'Cliente ativo e satisfeito' }
  ];
  
  return (
    <section>
      <div className="mb-6">
        <p className="text-xs font-bold tracking-widest uppercase text-orange-600 mb-2">
          Processo comercial
        </p>
        <h2 className="text-2xl font-bold mb-2">Jornada do Cliente</h2>
      </div>
      
      <div className="relative">
        {/* Linha conectora */}
        <div className="absolute top-7 left-0 right-0 h-0.5 bg-border hidden md:block" style={{ marginLeft: '28px', marginRight: '28px' }} />
        
        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="text-center">
              <div className="w-14 h-14 rounded-full bg-gray-900 text-white flex items-center justify-center text-2xl mx-auto mb-3 border-4 border-white shadow-md hover:bg-orange-600 transition-colors">
                {step.emoji}
              </div>
              <h4 className="font-bold text-sm mb-1">{step.titulo}</h4>
              <p className="text-xs text-muted-foreground" style={{ lineHeight: "1.5" }}>
                {step.descricao}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Design notes:**
- 5 steps horizontais (empilha vertical em mobile)
- Círculos conectados por linha em desktop
- Hover muda círculo para laranja

#### 5.4.8 Seção Insights
```tsx
function SecaoInsights() {
  const insights = [
    {
      numero: '87%',
      titulo: 'Performance da equipe',
      descricao: 'CEOs priorizam aumento de produtividade como principal motivador'
    },
    {
      numero: '73,8%',
      titulo: 'Reputação de marca',
      descricao: 'Gestores buscam autoridade e reconhecimento no mercado'
    },
    {
      numero: '81,9%',
      titulo: 'Satisfação do cliente',
      descricao: 'Operacionais colocam satisfação do cliente como métrica nº1'
    }
  ];
  
  return (
    <section className="bg-gray-50 -mx-6 md:-mx-8 px-6 md:px-8 py-12 md:py-16">
      <div className="mb-6">
        <p className="text-xs font-bold tracking-widest uppercase text-orange-600 mb-2">
          Dados da pesquisa
        </p>
        <h2 className="text-2xl font-bold mb-2">Insights Chave</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, idx) => (
          <div key={idx} className="bg-card border-l-4 border-orange-500 rounded-lg p-6 shadow-sm">
            <div className="text-4xl font-bold text-orange-600 mb-2" style={{ lineHeight: "1" }}>
              {insight.numero}
            </div>
            <h4 className="font-bold text-sm mb-2">{insight.titulo}</h4>
            <p className="text-sm text-muted-foreground" style={{ lineHeight: "1.5" }}>
              {insight.descricao}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

**Design notes:**
- 3 cards com border-left laranja
- Números grandes e destacados
- Background cinza claro na seção

#### 5.4.9 Seção Segmentos
```tsx
function SecaoSegmentos() {
  const segmentos = [
    {
      emoji: '🏢',
      nome: 'Escritórios Pequenos',
      descricao: 'Até 50 clientes, equipe enxuta, foco operacional. Buscam simplicidade e custo acessível.',
      recomendacao: 'Pacote Start ou Plus'
    },
    {
      emoji: '🏛️',
      nome: 'Escritórios Médios',
      descricao: '50-200 clientes, equipe estruturada, processos definidos. Querem produtividade e portais.',
      recomendacao: 'Pacote Premium'
    },
    {
      emoji: '🏰',
      nome: 'Escritórios Grandes',
      descricao: '+200 clientes, multi-filiais, gestão complexa. Precisam de visão web e integrações.',
      recomendacao: 'Pacote Empresarial'
    },
    {
      emoji: '🎓',
      nome: 'Contadores Iniciantes',
      descricao: 'Recém-formados, primeiros clientes, aprendendo processos. Valorizam suporte e documentação.',
      recomendacao: 'Pacote Start + Treinamento'
    }
  ];
  
  return (
    <section>
      <div className="mb-6">
        <p className="text-xs font-bold tracking-widest uppercase text-orange-600 mb-2">
          Segmentação de mercado
        </p>
        <h2 className="text-2xl font-bold mb-2">Segmentos Atendidos</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {segmentos.map(seg => (
          <div key={seg.nome} className="bg-card border border-border rounded-[var(--radius-card)] p-6 flex gap-4 hover:border-orange-300 hover:shadow-md transition-all">
            <div className="flex-shrink-0">
              <div className="w-13 h-13 rounded-lg bg-orange-50 flex items-center justify-center text-3xl">
                {seg.emoji}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base mb-2">{seg.nome}</h3>
              <p className="text-sm text-muted-foreground mb-3" style={{ lineHeight: "1.5" }}>
                {seg.descricao}
              </p>
              <span className="inline-block bg-orange-50 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full">
                {seg.recomendacao}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

**Design notes:**
- 4 cards em grid 2×2 (empilha em mobile)
- Layout horizontal com emoji + texto
- Badge de recomendação laranja

### 5.5 Paleta de cores

Manter consistência com design system existente, usando laranja (#E87722) como accent:

- **Laranja principal:** `text-orange-600`, `bg-orange-600`
- **Laranja claro:** `bg-orange-50`, `text-orange-700`
- **Borders:** `border-orange-500`, `border-orange-300` (hover)
- **Gradientes:** `from-gray-900 via-gray-800 to-orange-950`
- **Verde (success):** `text-green-600` para checks
- **Cinza backgrounds:** `bg-gray-50` para seções alternadas

### 5.6 Responsividade geral

- Seções com padding negativo para full-width backgrounds:
  ```tsx
  className="bg-gray-50 -mx-6 md:-mx-8 px-6 md:px-8 py-12 md:py-16"
  ```

- Grids adaptam conforme breakpoints:
  - `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
  - `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`

- Tabela com overflow:
  ```tsx
  <div className="overflow-x-auto">
    <table>...</table>
  </div>
  ```

### 5.7 Estrutura de dados

Todos os dados (personas, pacotes, recursos, etc.) devem ser definidos como arrays const no topo do arquivo, seguindo o padrão TypeScript com interfaces explícitas.

```typescript
// No topo do arquivo, após imports
const personasMarketing: PersonaMarketing[] = [...];
const pacotesMarketing: PacoteMarketing[] = [...];
const recursosComparativos = [...];
// etc.
```

### 5.8 Performance

- Evitar re-renders desnecessários mantendo dados como const
- Usar keys apropriadas em listas (.map)
- Imagens (se houver futuramente) com lazy loading
- Manter componentes puros e sem side effects

---

## 6. Checklist de Implementação

Para garantir que nada seja esquecido:

### 6.1 Fase 1: Responsáveis
- [ ] Atualizar 8 campos `responsavel` em MODULOS_CONTABIL
- [ ] Verificar exibição correta expandindo cada módulo
- [ ] Commit: "fix: atualizar responsáveis dos módulos contábeis"

### 6.2 Fase 2: Busca
- [ ] Expandir array `searchableContent` com ~30-40 novos itens
- [ ] Adicionar contador de resultados
- [ ] Testar busca com diversos termos
- [ ] Commit: "feat: expandir busca inteligente com mais conteúdo"

### 6.3 Fase 3: Agentes
- [ ] Criar arquivo `src/app/pages/AgentesTime.tsx`
- [ ] Definir interface e dados dos 17 agentes
- [ ] Implementar componente AgenteCard
- [ ] Implementar categorização (Discovery/Cocriação/Delivery)
- [ ] Modificar AIFirst.tsx (card → NavLink)
- [ ] Adicionar rota em routes.tsx
- [ ] Testar navegação e abertura de links em nova aba
- [ ] Commit: "feat: adicionar página de agentes criados pelo time"

### 6.4 Fase 4: Marketing
- [ ] Implementar HeroMarketing
- [ ] Implementar SecaoPersonas + PersonaCardMarketing
- [ ] Implementar SecaoPacotes + PacoteCard
- [ ] Implementar TabelaComparativa
- [ ] Implementar SecaoOnvio
- [ ] Implementar SecaoSuiteFinanceira
- [ ] Implementar JornadaCliente
- [ ] Implementar SecaoInsights
- [ ] Implementar SecaoSegmentos
- [ ] Integrar no switch de tabs em NossosProdutos.tsx
- [ ] Testar responsividade em mobile/tablet/desktop
- [ ] Commit: "feat: adicionar aba comercial e marketing completa"

### 6.5 Testes finais
- [ ] Busca funciona em todos os cenários
- [ ] Navegação entre páginas fluida
- [ ] Todos os links externos abrem em nova aba
- [ ] Responsividade em 3 breakpoints
- [ ] Acessibilidade (tab navigation, aria labels)
- [ ] Performance (sem lags, carregamento rápido)

---

## 7. Dependências

Nenhuma dependência externa adicional necessária. Projeto usa:
- React 18.3.1
- React Router 7.13.0
- Lucide React (ícones)
- Tailwind CSS 4.1.12

Todos já instalados e configurados.

---

## 8. Considerações Finais

### 8.1 Manutenibilidade
- Dados separados de componentes (arrays const no topo)
- Componentes pequenos e focados
- TypeScript para type safety
- Comentários onde necessário

### 8.2 Escalabilidade
- Fácil adicionar novos agentes (apenas array)
- Fácil adicionar novos conteúdos indexados (apenas array)
- Estrutura preparada para futuras seções de marketing

### 8.3 Consistência
- Seguir design system existente
- Usar CSS variables do sistema
- Manter padrões de nomenclatura
- Reaproveitar componentes (cards, badges, etc)

### 8.4 Acessibilidade
- Semantic HTML (section, nav, button, etc)
- ARIA labels onde necessário
- Foco visível (focus-visible)
- Links externos com rel="noopener noreferrer"
- Contraste adequado (WCAG AA)

---

**Fim do documento de design**

Próximo passo: Revisão pelo usuário e criação do plano de implementação.
