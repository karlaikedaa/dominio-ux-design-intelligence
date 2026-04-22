import { useState, useCallback } from "react";
import { NavLink } from "react-router";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ArrowLeft, AlertCircle, AlertTriangle, Info, Lightbulb, Target, Eye, Ear, Brain, MessageSquare } from "lucide-react";
import type { Persona } from "../data/personas";
import { empathyMaps } from "../data/personas";

interface PersonaMasterDetailProps {
  personas: Persona[];
  title: string;
  description: string;
  showDigitalLevel?: boolean;
}

function SeverityIcon({ severity }: { severity: string }) {
  switch (severity) {
    case "critica":
      return (
        <span className="flex items-center gap-1.5" aria-label="Severidade crítica">
          <AlertCircle className="w-4 h-4 text-destructive" aria-hidden="true" />
          <span className="text-destructive" style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" }}>
            Crítica
          </span>
        </span>
      );
    case "alta":
      return (
        <span className="flex items-center gap-1.5" aria-label="Severidade alta">
          <AlertTriangle className="w-4 h-4 text-chart-3" aria-hidden="true" />
          <span className="text-chart-3" style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" }}>
            Alta
          </span>
        </span>
      );
    default:
      return (
        <span className="flex items-center gap-1.5" aria-label="Severidade média">
          <Info className="w-4 h-4 text-chart-2" aria-hidden="true" />
          <span className="text-chart-2" style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" }}>
            Média
          </span>
        </span>
      );
  }
}

/* ── Compact card for the left panel ──────────────────────────── */
function CompactCard({
  persona,
  isSelected,
  onClick,
  showDigitalLevel,
}: {
  persona: Persona;
  isSelected: boolean;
  onClick: () => void;
  showDigitalLevel?: boolean;
}) {
  const showModules =
    !showDigitalLevel &&
    persona.modules &&
    persona.modules.length > 0 &&
    persona.category !== "empregado";

  const showLevel = showDigitalLevel && persona.digitalLevel !== undefined;

  return (
    <div
      className={`rounded-[var(--radius-card)] border bg-card transition-all duration-200 overflow-hidden ${
        isSelected
          ? "border-primary shadow-[var(--elevation-sm)]"
          : "border-border hover:border-primary/40 hover:shadow-[var(--elevation-sm)]"
      }`}
    >
      <div className="p-4 pb-3">
        {/* Tag badge — always blue (chart-2) */}
        <div className="mb-3">
          <span
            className="inline-block px-3 py-1 rounded-[var(--radius)] bg-chart-2 text-white"
            style={{
              fontSize: "var(--text-caption)",
              fontWeight: "var(--font-weight-semibold)",
            }}
          >
            {persona.tag}
          </span>
        </div>

        {/* Avatar + Name + Role */}
        <div className="flex items-center gap-3 mb-3">
          <img
            src={persona.avatar}
            alt=""
            aria-hidden="true"
            className="w-16 h-16 rounded-full object-cover shrink-0"
            loading="lazy"
          />
          <div className="min-w-0">
            <p
              style={{
                fontSize: "var(--text-base)",
                fontWeight: "var(--font-weight-semibold)",
                lineHeight: "1.3",
              }}
            >
              {persona.name}, {persona.age} anos
            </p>
            <p
              className="text-muted-foreground"
              style={{ fontSize: "var(--text-label)", lineHeight: "1.4" }}
            >
              {persona.role}
            </p>
          </div>
        </div>

        {/* Summary */}
        <p
          className="text-foreground mb-4"
          style={{ fontSize: "var(--text-label)", lineHeight: "1.5" }}
        >
          {persona.summary}
        </p>

        {/* Modules */}
        {showModules && (
          <div className="mb-4">
            <p
              className="text-muted-foreground mb-2"
              style={{ fontSize: "var(--text-caption)" }}
            >
              Módulos mais utilizados
            </p>
            <div className="flex flex-wrap gap-1.5">
              {persona.modules.map((mod) => (
                <span
                  key={mod}
                  className="border border-border rounded-[var(--radius)] px-3 py-1 bg-card"
                  style={{ fontSize: "var(--text-label)" }}
                >
                  {mod}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Digital level */}
        {showLevel && (
          <div className="mb-4">
            <p
              className="text-muted-foreground mb-1.5"
              style={{ fontSize: "var(--text-caption)" }}
            >
              Nível de digitalização:
            </p>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`w-3 h-3 rounded-full ${
                      level <= persona.digitalLevel! ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
              <span
                className="text-muted-foreground"
                style={{ fontSize: "var(--text-caption)" }}
              >
                {persona.digitalLevelLabel}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Full-width CTA */}
      <div className="px-4 pb-4">
        <button
          onClick={onClick}
          aria-pressed={isSelected}
          aria-label={`Ver perfil completo de ${persona.name}, ${persona.role}`}
          className="w-full bg-primary text-primary-foreground rounded-[var(--radius-button)] py-2.5 hover:opacity-90 active:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          style={{
            fontSize: "var(--text-label)",
            fontWeight: "var(--font-weight-semibold)",
          }}
        >
          Ver perfil completo
        </button>
      </div>
    </div>
  );
}

/* ── Per-persona recommendations ──────────────────────────────── */
interface PersonaRecommendation {
  features: string[];
  behaviors: string[];
}

const personaRecommendations: Record<string, PersonaRecommendation> = {
  "contador-mono-usuario": {
    features: [
      "Painel unificado de obrigações com prazos e status por cliente, eliminando a necessidade de consultar múltiplos módulos",
      "Automação de lançamentos recorrentes e importação inteligente de extratos para reduzir trabalho manual",
      "Alertas proativos por WhatsApp ou push sobre vencimentos próximos e pendências fiscais",
      "Templates de relatórios personalizáveis para envio rápido aos clientes",
      "Modo de trabalho em lote para processar obrigações de múltiplos clientes de uma vez",
    ],
    behaviors: [
      "Usa o sistema intensivamente e sozinho — priorizar atalhos de teclado e navegação rápida entre clientes",
      "Trabalha sob pressão de prazos — oferecer feedback visual claro sobre o que está pendente vs. concluído",
      "Faz tudo por conta própria — evitar fluxos que dependam de aprovação ou colaboração com outros usuários",
      "Picos de uso no início do mês — garantir performance estável em períodos de alta demanda",
    ],
  },
  "dono-escritorio": {
    features: [
      "Dashboard gerencial com KPIs do escritório: produtividade por colaborador, clientes atendidos, receita por módulo",
      "Visão consolidada de obrigações pendentes de toda a equipe com filtros por status e responsável",
      "Relatórios de performance exportáveis para reuniões de gestão e planejamento estratégico",
      "Painel de controle de SLA por cliente — tempo médio de atendimento e índice de conformidade",
      "Funcionalidade de delegação e redistribuição de tarefas entre membros da equipe",
    ],
    behaviors: [
      "Perfil estratégico que precisa de visão consolidada, não operacional — dashboards com drill-down sob demanda",
      "Toma decisões baseadas em dados — priorizar visualizações gráficas e comparativos temporais",
      "Gerencia equipe e clientes simultaneamente — interface deve separar claramente as duas visões",
      "Não executa tarefas operacionais diariamente — manter a interface de gestão simples e de alto nível",
    ],
  },
  "gerente-contabil": {
    features: [
      "Painel de acompanhamento da equipe com status das entregas por colaborador e prazo",
      "Sistema de alertas configuráveis para atrasos, gargalos e pendências da equipe",
      "Ferramenta de distribuição de carga de trabalho com visualização da capacidade de cada membro",
      "Relatórios de produtividade da equipe com comparativos entre períodos",
      "Canal de comunicação integrado para alinhar prioridades sem sair do sistema",
    ],
    behaviors: [
      "Atua como ponte entre a equipe operacional e a diretoria — precisa de visões nos dois níveis de detalhe",
      "Monitora múltiplas frentes ao mesmo tempo — notificações priorizadas por urgência são essenciais",
      "Precisa identificar gargalos rapidamente — indicadores visuais de status (verde/amarelo/vermelho)",
      "Faz acompanhamento frequente — a interface deve permitir check-ins rápidos sem navegação profunda",
    ],
  },
  "contador-operacional": {
    features: [
      "Fluxo de trabalho guiado para obrigações acessórias com checklist de etapas e validações automáticas",
      "Atalhos de teclado e actions em lote para lançamentos repetitivos (ex: processar folha de 10 clientes)",
      "Validação em tempo real de dados inseridos com correção sugerida antes do envio",
      "Histórico de ações recentes com possibilidade de desfazer e refazer operações",
      "Modo de foco que esconde elementos desnecessários durante tarefas intensivas de lançamento",
    ],
    behaviors: [
      "Executa tarefas repetitivas dezenas de vezes ao dia — cada clique a menos faz diferença real",
      "Prioriza velocidade e precisão — feedback instantâneo sobre erros e confirmações visuais de sucesso",
      "Segue processos definidos — fluxos guiados com progresso visual reduzem erro e aumentam confiança",
      "Usa o sistema por longas horas contínuas — interface deve minimizar fadiga visual com espaçamento adequado",
    ],
  },
  "mei-digitalizado": {
    features: [
      "Dashboard simplificado com resumo financeiro mensal, DAS pendente e faturamento acumulado",
      "Emissão rápida de NF-e direto do celular com templates por tipo de serviço/produto",
      "Notificações push sobre vencimento do DAS e limite de faturamento do MEI",
      "Chat integrado com o contador para dúvidas rápidas sem sair do app",
      "Área de autoatendimento com guias interativos sobre obrigações do MEI",
    ],
    behaviors: [
      "Nativo digital e mobile-first — toda funcionalidade deve ser pensada primeiro para tela pequena",
      "Espera experiência similar a apps de banco e delivery — interface moderna, rápida e intuitiva",
      "Autonomia alta — prefere resolver sozinho antes de consultar o contador",
      "Usa o sistema em momentos curtos ao longo do dia — priorizar ações rápidas e tela inicial informativa",
    ],
  },
  "mei-nao-digitalizado": {
    features: [
      "Tela inicial ultra-simplificada com no máximo 3 ações visíveis: emitir nota, ver boleto, falar com contador",
      "Assistente passo a passo com linguagem acessível para emissão de notas e consulta de impostos",
      "Lembretes por WhatsApp sobre prazos, com link direto para a ação necessária no sistema",
      "Modo de confirmação visual com ícones e cores para indicar sucesso/pendência/erro",
      "Tutorial interativo de primeiro uso com vídeos curtos em cada funcionalidade",
    ],
    behaviors: [
      "Baixa familiaridade com tecnologia — evitar jargões, usar linguagem do dia a dia e ícones explicativos",
      "Insegurança ao usar sistemas — cada ação precisa de confirmação clara e possibilidade de voltar atrás",
      "Prefere ligação ou WhatsApp — integrar canais de comunicação familiar ao fluxo digital",
      "Usa o sistema com pouca frequência — a interface precisa ser reaprendida rapidamente a cada acesso",
    ],
  },
  "pme-sem-rh": {
    features: [
      "Painel de custos com pessoal consolidado: folha, encargos, benefícios e projeções de contratação",
      "Fluxo simplificado de admissão e demissão que guia o empresário pelas etapas com linguagem acessível",
      "Alertas sobre obrigações trabalhistas próximas (férias vencendo, exames periódicos, etc.)",
      "Simulador de custo de contratação para tomada de decisão rápida",
      "Central de documentos do funcionário com upload facilitado e checklist de pendências",
    ],
    behaviors: [
      "Não é especialista em RH — precisa de orientação contextual embutida na interface",
      "Toma decisões de pessoal com base em custo — priorizar visualizações financeiras claras",
      "Delega ao contador o que não entende — facilitar o encaminhamento de dúvidas e tarefas ao escritório",
      "Usa o sistema pontualmente — interface deve ser autoexplicativa sem curva de aprendizado",
    ],
  },
  "pme-com-rh": {
    features: [
      "Portal completo de gestão de pessoal: admissão, férias, rescisão, benefícios e controle de ponto",
      "Integração nativa entre folha de pagamento e contabilidade para eliminação de retrabalho",
      "Relatórios analíticos de RH: turnover, absenteísmo, custo por departamento e headcount",
      "Workflow de aprovação para solicitações de funcionários (férias, adiantamentos, etc.)",
      "API e integrações com sistemas de ponto, benefícios e plataformas de recrutamento",
    ],
    behaviors: [
      "Equipe de RH estruturada com processos definidos — interface deve suportar fluxos complexos e multi-etapas",
      "Precisa de dados confiáveis para compliance — priorizar rastreabilidade e histórico de alterações",
      "Usa múltiplos sistemas — integrações e importação/exportação de dados são críticas",
      "Alta frequência de uso — investir em eficiência operacional, bulk actions e templates",
    ],
  },
  "empregado-clt": {
    features: [
      "App mobile para consulta de holerite com detalhamento de cada verba (salário, descontos, FGTS, INSS)",
      "Simulador de empréstimo consignado com visualização clara de parcelas e impacto no salário líquido",
      "Central de benefícios com saldo de vale-transporte, vale-refeição e outras informações úteis",
      "Solicitação digital de férias, declarações e documentos sem precisar ir ao RH",
      "Notificações sobre depósito de salário, disponibilização do informe de rendimentos e atualização cadastral",
    ],
    behaviors: [
      "Acessa exclusivamente pelo celular — design 100% mobile-first com telas leves e carregamento rápido",
      "Baixa familiaridade com termos contábeis — traduzir jargões (ex: 'proventos' → 'o que você recebe')",
      "Usa o sistema esporadicamente — a interface precisa ser imediatamente compreensível sem treinamento",
      "Preocupação com privacidade — biometria ou PIN para acessar dados financeiros pessoais",
    ],
  },
};

/* ── Detail panel for the right side ──────────────────────────── */
function DetailPanel({ persona }: { persona: Persona }) {
  const tabItems = [
    { value: "perfil", label: "Perfil" },
    { value: "contexto-comportamento", label: "Contexto e Comportamento" },
    { value: "dores-objetivos", label: "Dores e Objetivos" },
    { value: "mapa-empatia", label: "Mapa da Empatia" },
    { value: "como-ajudar", label: "Como podemos ajudar" },
  ];

  const recommendations = personaRecommendations[persona.id];

  return (
    <div className="flex flex-col h-full">
      {/* Hero */}
      <section className="bg-card border border-border rounded-[var(--radius-card)] p-5">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <img
            src={persona.avatar}
            alt={`Ilustração de ${persona.name}, ${persona.role}`}
            className="w-20 h-20 rounded-full object-cover shrink-0"
          />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1.5 justify-center sm:justify-start">
              <span
                className={`inline-block px-2.5 py-0.5 rounded-[var(--radius)] ${persona.tagColor} ${persona.tagTextColor}`}
                style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" }}
              >
                {persona.tag}
              </span>
            </div>
            <h2 style={{ fontSize: "var(--text-h4)", fontWeight: "var(--font-weight-semibold)", lineHeight: "1.3" }}>
              {persona.name}, {persona.age} anos
            </h2>
            <p className="text-muted-foreground mt-0.5" style={{ fontSize: "var(--text-label)" }}>
              {persona.role} · {persona.location}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2.5 justify-center sm:justify-start" aria-label="Módulos utilizados">
              {persona.modules.map((mod) => (
                <Badge key={mod} variant="outline" style={{ fontSize: "var(--text-badge)" }}>
                  {mod}
                </Badge>
              ))}
            </div>
            {persona.employmentTags && persona.employmentTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2 justify-center sm:justify-start" aria-label="Características do vínculo">
                {persona.employmentTags.map((t) => (
                  <Badge key={t} variant="outline" style={{ fontSize: "var(--text-badge)" }}>
                    {t}
                  </Badge>
                ))}
              </div>
            )}
            {persona.digitalLevel !== undefined && (
              <div className="mt-2.5 flex items-center gap-2 justify-center sm:justify-start">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`w-3 h-3 rounded-full ${
                        level <= persona.digitalLevel! ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
                  {persona.digitalLevelLabel}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Summary */}
      <p className="mt-4 text-foreground" style={{ fontSize: "var(--text-label)", lineHeight: "1.6" }}>
        {persona.summary}
      </p>

      {/* Tabs */}
      <Tabs defaultValue="perfil" className="mt-4 flex-1">
        <TabsList className="flex flex-wrap h-auto gap-1 mb-4 bg-transparent p-0">
          {tabItems.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-[var(--radius)] px-3 py-1.5 bg-muted"
              style={{ fontSize: "var(--text-caption)" }}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ── Perfil (Demographics + Quotes) ── */}
        <TabsContent value="perfil" className="bg-card border border-border rounded-[var(--radius-card)] p-5">
          <h3 style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }} className="mb-3">
            Características Demográficas
          </h3>
          <ul className="space-y-2">
            {persona.demographics.map((item, i) => (
              <li key={i} className="flex items-start gap-2" style={{ fontSize: "var(--text-label)" }}>
                <span className="text-primary mt-0.5" aria-hidden="true">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {persona.quotes.length > 0 && (
            <div className="mt-5 pt-4 border-t border-border">
              <h3 style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }} className="mb-3">
                Frases Típicas
              </h3>
              <div className="space-y-4">
                {persona.quotes.map((quote, i) => (
                  <blockquote key={i} className="border-l-4 border-primary/40 pl-4 py-2">
                    <p className="italic text-foreground" style={{ fontSize: "var(--text-label)", lineHeight: "1.6" }}>
                      "{quote}"
                    </p>
                    <cite className="block mt-1 text-muted-foreground not-italic" style={{ fontSize: "var(--text-caption)" }}>
                      {persona.name} — {persona.tag}
                    </cite>
                  </blockquote>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        {/* ── Contexto e Comportamento ── */}
        <TabsContent value="contexto-comportamento" className="bg-card border border-border rounded-[var(--radius-card)] p-5">
          <h3 style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }} className="mb-3">
            Contexto e Rotina
          </h3>
          <ul className="space-y-2">
            {persona.context.map((item, i) => (
              <li key={i} className="flex items-start gap-2" style={{ fontSize: "var(--text-label)" }}>
                <span className="text-primary mt-0.5" aria-hidden="true">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {persona.relationWithOffice && (
            <div className="mt-5 pt-4 border-t border-border">
              <h4 style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }} className="mb-3">
                Relação com o escritório contábil
              </h4>
              <ul className="space-y-2">
                {persona.relationWithOffice.map((item, i) => (
                  <li key={i} className="flex items-start gap-2" style={{ fontSize: "var(--text-label)" }}>
                    <span className="text-primary mt-0.5" aria-hidden="true">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-5 pt-4 border-t border-border">
            <h3 style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }} className="mb-3">
              Comportamento com Software
            </h3>
            <ul className="space-y-2">
              {persona.behavior.map((item, i) => (
                <li key={i} className="flex items-start gap-2" style={{ fontSize: "var(--text-label)" }}>
                  <span className="text-primary mt-0.5" aria-hidden="true">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>

        {/* ── Dores e Objetivos ── */}
        <TabsContent value="dores-objetivos" className="bg-card border border-border rounded-[var(--radius-card)] p-5">
          <h3 style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }} className="mb-3">
            Dores e Frustrações
          </h3>
          <div className="space-y-3">
            {persona.pains.map((pain, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-input-background rounded-[var(--radius)]">
                <SeverityIcon severity={pain.severity} />
                <span className="flex-1" style={{ fontSize: "var(--text-label)" }}>
                  {pain.text}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-border">
            <h3 style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }} className="mb-3">
              Objetivos e Necessidades
            </h3>
            <ul className="space-y-2">
              {persona.goals.map((goal, i) => (
                <li key={i} className="flex items-start gap-2" style={{ fontSize: "var(--text-label)" }}>
                  <span className="text-chart-1 mt-0.5" aria-hidden="true">✓</span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>

        {/* ── Mapa da Empatia ── */}
        <TabsContent value="mapa-empatia" className="space-y-4">
          {empathyMaps[persona.id] ? (
            <>
              {/* Pensa e Sente */}
              <section className="bg-card border border-border rounded-[var(--radius-card)] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="w-4 h-4 text-chart-2" aria-hidden="true" />
                  <h3 style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}>
                    Pensa e Sente
                  </h3>
                </div>
                <ul className="space-y-2">
                  {empathyMaps[persona.id].thinksFeels.map((item, i) => (
                    <li key={i} className="flex items-start gap-2" style={{ fontSize: "var(--text-label)" }}>
                      <span className="text-chart-2 mt-0.5" aria-hidden="true">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* O que Ouve */}
              <section className="bg-card border border-border rounded-[var(--radius-card)] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Ear className="w-4 h-4 text-chart-3" aria-hidden="true" />
                  <h3 style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}>
                    O que Ouve
                  </h3>
                </div>
                <ul className="space-y-2">
                  {empathyMaps[persona.id].hears.map((item, i) => (
                    <li key={i} className="flex items-start gap-2" style={{ fontSize: "var(--text-label)" }}>
                      <span className="text-chart-3 mt-0.5" aria-hidden="true">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* O que Vê */}
              <section className="bg-card border border-border rounded-[var(--radius-card)] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="w-4 h-4 text-chart-1" aria-hidden="true" />
                  <h3 style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}>
                    O que Vê
                  </h3>
                </div>
                <ul className="space-y-2">
                  {empathyMaps[persona.id].sees.map((item, i) => (
                    <li key={i} className="flex items-start gap-2" style={{ fontSize: "var(--text-label)" }}>
                      <span className="text-chart-1 mt-0.5" aria-hidden="true">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Diz e Faz */}
              <section className="bg-card border border-border rounded-[var(--radius-card)] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-4 h-4 text-primary" aria-hidden="true" />
                  <h3 style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}>
                    Diz e Faz
                  </h3>
                </div>
                <ul className="space-y-2">
                  {empathyMaps[persona.id].saysDoes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2" style={{ fontSize: "var(--text-label)" }}>
                      <span className="text-primary mt-0.5" aria-hidden="true">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Dores (do mapa de empatia) */}
              <section className="bg-card border border-red-200 rounded-[var(--radius-card)] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-destructive" aria-hidden="true" />
                  <h3 style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}>
                    Dores
                  </h3>
                </div>
                <div className="space-y-3">
                  {empathyMaps[persona.id].pains.map((pain, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-red-50 rounded-[var(--radius)]">
                      <span className="text-destructive" style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" }}>
                        {pain.intensity === "critica" ? "Crítica" : pain.intensity === "alta" ? "Alta" : "Média"}
                      </span>
                      <span className="flex-1" style={{ fontSize: "var(--text-label)" }}>
                        {pain.text}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Ganhos */}
              <section className="bg-card border border-green-200 rounded-[var(--radius-card)] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-green-600" aria-hidden="true" />
                  <h3 style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}>
                    Ganhos
                  </h3>
                </div>
                <div className="space-y-3">
                  {empathyMaps[persona.id].gains.map((gain, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-green-50 rounded-[var(--radius)]">
                      <span className="text-green-700" style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" }}>
                        {gain.priority === "essencial" ? "Essencial" : gain.priority === "importante" ? "Importante" : "Desejável"}
                      </span>
                      <span className="flex-1" style={{ fontSize: "var(--text-label)" }}>
                        {gain.text}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </>
          ) : (
            <div className="bg-card border border-border rounded-[var(--radius-card)] p-8 text-center">
              <p className="text-muted-foreground" style={{ fontSize: "var(--text-label)" }}>
                Mapa de empatia não disponível para esta persona.
              </p>
            </div>
          )}
        </TabsContent>

        {/* ── Como podemos ajudar? (Metrics + Recommendations) ── */}
        <TabsContent value="como-ajudar" className="bg-card border border-border rounded-[var(--radius-card)] p-5">
          <h3 style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }} className="mb-3">
            Métricas de Sucesso
          </h3>
          <ul className="space-y-2">
            {persona.metrics.map((metric, i) => (
              <li key={i} className="flex items-start gap-2" style={{ fontSize: "var(--text-label)" }}>
                <span className="text-chart-2 mt-0.5" aria-hidden="true">📊</span>
                <span>{metric}</span>
              </li>
            ))}
          </ul>

          {recommendations && (
            <>
              {/* Feature recommendations */}
              <div className="mt-5 pt-4 border-t border-border">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-chart-3" aria-hidden="true" />
                  <h3 style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}>
                    Recomendações de funcionalidades
                  </h3>
                </div>
                <p className="text-muted-foreground mb-3" style={{ fontSize: "var(--text-caption)", lineHeight: "1.4" }}>
                  Funcionalidades que podem gerar mais valor para {persona.name} com base nas dores e objetivos identificados.
                </p>
                <div className="space-y-2.5">
                  {recommendations.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 bg-input-background rounded-[var(--radius)]">
                      <span
                        className="shrink-0 w-5 h-5 rounded-full bg-chart-3/15 text-chart-3 flex items-center justify-center"
                        style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" }}
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                      <span style={{ fontSize: "var(--text-label)", lineHeight: "1.5" }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Behavior recommendations */}
              <div className="mt-5 pt-4 border-t border-border">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4 text-chart-2" aria-hidden="true" />
                  <h3 style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-semibold)" }}>
                    Comportamentos de uso do sistema
                  </h3>
                </div>
                <p className="text-muted-foreground mb-3" style={{ fontSize: "var(--text-caption)", lineHeight: "1.4" }}>
                  Padrões de interação que devem guiar as decisões de design para este perfil.
                </p>
                <div className="space-y-2.5">
                  {recommendations.behaviors.map((behavior, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 bg-input-background rounded-[var(--radius)]">
                      <span className="text-chart-2 mt-0.5 shrink-0" aria-hidden="true">→</span>
                      <span style={{ fontSize: "var(--text-label)", lineHeight: "1.5" }}>{behavior}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* ── Main master-detail component ─────────────────────────────── */
export function PersonaMasterDetail({
  personas,
  title,
  description,
  showDigitalLevel,
}: PersonaMasterDetailProps) {
  const [selectedId, setSelectedId] = useState<string | null>(
    personas.length > 0 ? personas[0].id : null
  );

  const selectedPersona = personas.find((p) => p.id === selectedId) ?? null;

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  return (
    <div className="flex flex-col p-4 md:p-6 lg:p-8" style={{ height: "calc(100vh - 3.5rem)" }}>
      {/* Header */}
      <section className="mb-5 shrink-0">
        <NavLink
          to="/personas"
          className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors mb-3"
          style={{ fontSize: "var(--text-caption)" }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar para Personas
        </NavLink>
        <h1 style={{ fontSize: "var(--text-h3)", fontWeight: "var(--font-weight-semibold)", lineHeight: "1.3" }}>
          {title}
        </h1>
        <p className="text-muted-foreground mt-1.5 max-w-2xl" style={{ fontSize: "var(--text-label)", lineHeight: "1.5" }}>
          {description}
        </p>
      </section>

      {/* Master-detail layout */}
      <div className="flex-1 min-h-0 flex gap-6">
        {/* Left panel: cards list */}
        <aside
          className="w-80 shrink-0 overflow-y-auto hidden lg:block"
          role="list"
          aria-label="Lista de personas"
        >
          <div className="space-y-3">
            {personas.map((persona) => (
              <div key={persona.id} role="listitem">
                <CompactCard
                  persona={persona}
                  isSelected={selectedId === persona.id}
                  onClick={() => handleSelect(persona.id)}
                  showDigitalLevel={showDigitalLevel}
                />
              </div>
            ))}
          </div>
        </aside>

        {/* Right panel: detail view */}
        <main
          className="flex-1 min-w-0 overflow-y-auto"
          aria-live="polite"
        >
          {selectedPersona ? (
            <DetailPanel key={selectedPersona.id} persona={selectedPersona} />
          ) : (
            <div className="lg:hidden space-y-3">
              {personas.map((persona) => (
                <CompactCard
                  key={persona.id}
                  persona={persona}
                  isSelected={selectedId === persona.id}
                  onClick={() => handleSelect(persona.id)}
                  showDigitalLevel={showDigitalLevel}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}