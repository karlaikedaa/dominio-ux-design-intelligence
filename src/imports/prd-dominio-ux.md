PRD — Plataforma de Personas & Brainstorming UX Domínio Contábil
Documento: Product Requirements Document (PRD)
Versão: 1.0
Status: Draft
Público-alvo do documento: Times de Produto, UX/UI Design, Engenharia e QA
Design System: Design System - TR

________________________________________
1. Visão Geral do Produto
1.1 Propósito
Esta plataforma web responsiva centraliza o acesso às personas sintéticas, mapas de empatia e ferramentas de brainstorming de funcionalidades do ecossistema Domínio Contábil. Seu objetivo é apoiar designers, product managers e times de desenvolvimento a tomarem decisões centradas no usuário com base em pesquisa estruturada.
1.2 Problema que resolve
Times de produto frequentemente tomam decisões sem referência clara aos perfis reais de usuários. Esta ferramenta elimina esse gap ao tornar as personas e mapas de empatia acessíveis, navegáveis e acionáveis — com um mecanismo de brainstorming guiado por IA integrado ao contexto das personas.
1.3 Público-alvo da plataforma
•	UX Designers e Researchers
•	Product Managers
•	Desenvolvedores que precisam de contexto de usuário
•	Líderes de produto e estratégia
1.4 Princípios norteadores
•	Acessibilidade primeiro: WCAG 2.1 nível AA como padrão mínimo
•	UX Writing consistente: Linguagem clara, objetiva e orientada à ação
•	Responsividade real: Experiência funcional em desktop, tablet e mobile
•	Progressão de informação: Do macro ao detalhe, sem sobrecarga cognitiva
________________________________________
2. Arquitetura de Informação
2.1 Estrutura de navegação
Plataforma Domínio UX
│
├── 🧑‍💼 Personas Contábil
│   ├── Contador Mono Usuário (Ricardo)
│   ├── Dono de Escritório (Fernanda)
│   ├── Gerente Contábil (Thiago)
│   └── Contador Operacional (Juliana)
│
├── 🏢 Personas PME
│   ├── MEI Digitalizado (Bruno)
│   ├── MEI Não Digitalizado (Dona Maria)
│   ├── PME sem RH (Alexandre)
│   └── PME com RH (Camila)
│
├── 👤 Persona Empregado
│   └── Empregado CLT (Marcos Aurélio)
│
├── 🗺️ Mapas de Empatia
│   └── [Todas as 9 personas]
│
└── 💡 Brainstorm de Funcionalidades
2.2 Navegação global
•	Barra lateral fixa em desktop (colapsável)
•	Bottom navigation em mobile com os 5 itens principais
•	Breadcrumb em todas as telas de detalhe
•	Indicador de seção ativa com destaque visual e aria-current="page"
________________________________________
3. Especificações por Tela
________________________________________
3.1 Tela: Personas Contábil
3.1.1 Objetivo da tela
Permitir que o usuário da plataforma explore os perfis dos quatro subtipos de contadores, entendendo rapidamente as diferenças entre eles antes de aprofundar em um perfil específico.
3.1.2 Componentes e layout
Header da seção
Título: "Personas Contábil"
Subtítulo: "Conheça os quatro perfis de contadores que usam o Domínio.
            Selecione um perfil para ver todos os detalhes."
•	Título em H1 (semântico), fonte 24px desktop / 20px mobile
•	Subtítulo em body regular, cor secundária (#666 ou equivalente no design system)
•	Aria-label na seção: aria-label="Perfis de personas contábeis"
Grid de cards
Layout: 2 colunas em desktop, 1 coluna em mobile, gap de 24px
Especificação do Card de Persona:
Cada card deve conter:
Elemento	Conteúdo	Notas de acessibilidade
Avatar ilustrativo	Ilustração conceitual do perfil	alt="Ilustração de [nome], [cargo]"
Tag de subtipo	Ex: "Mono usuário"	Cor com contraste mínimo 4.5:1
Nome e idade	Ex: "Ricardo Mendes, 43 anos"	Hierarquia H3 dentro do card
Cargo	Ex: "Contador e sócio-proprietário"	Texto body
Resumo de 2 linhas	Frase síntese do perfil	Max 120 caracteres
Módulos do Domínio	Chips com os módulos que usa	Aria-label: "Módulos utilizados"
CTA	Botão "Ver perfil completo"	aria-label="Ver perfil completo de Ricardo Mendes"
Estado de hover do card:
•	Elevação de sombra (box-shadow)
•	Borda com cor de destaque da marca
•	Cursor pointer
•	Transição suave 200ms
Estado de foco (teclado):
•	Outline visível com 3px, cor contrastante
•	Nunca remover outline sem substituto visual
3.1.3 Tela de detalhe — Perfil completo
Acionada ao clicar em "Ver perfil completo". Pode ser implementada como:
•	Opção A: Modal (overlay) — recomendado para manter contexto da listagem
•	Opção B: Página dedicada com URL própria — recomendado para deep linking e compartilhamento
Recomendação: Usar página dedicada com URL (ex: /personas/contabil/contador-mono-usuario) para permitir compartilhamento de links entre times.
Estrutura da página de detalhe:
[Breadcrumb: Início > Personas Contábil > Ricardo Mendes]

[Hero do perfil]
  - Avatar grande (ilustrativo)
  - Nome, idade, cargo
  - Localização
  - Tags de módulos do Domínio

[Seções colapsáveis ou em tabs:]
  1. Características Demográficas
  2. Contexto e Rotina
  3. Dores e Frustrações
  4. Objetivos e Necessidades
  5. Comportamento com Software
  6. Frases Típicas
  7. Métricas de Sucesso

[Botões de navegação]
  ← Persona anterior | Próxima persona →
Tabs / Acordeão:
•	Usar role="tablist", role="tab", role="tabpanel" com atributos ARIA corretos
•	Tab ativa com aria-selected="true"
•	Conteúdo inativo com aria-hidden="true"
Seção de Dores e Frustrações:
•	Usar ícones de severidade (🔴 🟠 🟡) com texto alternativo: aria-label="Severidade crítica", aria-label="Severidade alta", aria-label="Severidade média"
•	Nunca usar cor como único indicador de severidade
Seção de Frases Típicas:
•	Usar elemento <blockquote> semanticamente
•	Estilo visual de citação com aspas decorativas
•	Atribuição clara: <cite>Ricardo Mendes — Contador Mono Usuário</cite>
3.1.4 UX Writing — Microcopy desta tela
Elemento	Texto
Título da seção	"Personas Contábil"
Subtítulo	"Conheça os quatro perfis de contadores que usam o Domínio. Selecione um perfil para ver todos os detalhes."
CTA do card	"Ver perfil completo"
Estado vazio (erro de carregamento)	"Não foi possível carregar os perfis agora. Tente novamente em alguns instantes."
Botão de retry	"Tentar novamente"
Label de módulos	"Módulos utilizados"
Tooltip no avatar	"Ilustração representativa do perfil"
________________________________________
3.2 Tela: Personas PME
3.2.1 Objetivo da tela
Apresentar os quatro perfis de clientes PME do escritório contábil, evidenciando as diferenças de maturidade digital e de demanda por serviços contábeis.
3.2.2 Componentes e layout
Segue a mesma estrutura base de Personas Contábil, com as seguintes diferenças:
Diferenciador visual por subtipo:
Cada card recebe uma cor de categoria para facilitar a distinção rápida:
Subtipo	Cor de categoria	Tag
MEI Digitalizado	Verde (#2E7D32)	"MEI · Digital"
MEI Não Digitalizado	Amarelo-âmbar (#F57F17)	"MEI · Baixa digitalização"
PME sem RH	Azul (#1565C0)	"PME · Sem RH"
PME com RH	Roxo (#6A1B9A)	"PME · Com RH"
Todas as cores devem passar no teste de contraste WCAG AA (4.5:1 para texto normal). As tags coloridas devem ter texto branco ou escuro conforme o contraste exigido.
Indicador de nível digital:
Adicionar ao card um indicador visual de nível de maturidade digital:
Nível digital: [●●●○○] Intermediário-alto
               aria-label="Nível digital: 3 de 5 — Intermediário-alto"
3.2.3 Tela de detalhe
Mesma estrutura da tela de detalhe de Personas Contábil.
Adição específica para PME: Seção "Relação com o escritório contábil" destacando como essa persona interage com o contador — nível de autonomia, canal preferido e frequência de contato.
3.2.4 UX Writing — Microcopy desta tela
Elemento	Texto
Título da seção	"Personas PME"
Subtítulo	"Veja os perfis das empresas e empreendedores que são clientes do escritório. Cada perfil tem necessidades e formas de interação bem diferentes."
CTA do card	"Ver perfil completo"
Label de nível digital	"Nível de maturidade digital"
Tooltip do indicador	"Escala de 1 a 5, baseada em comportamentos e uso de tecnologia"
________________________________________
3.3 Tela: Persona Empregado
3.3.1 Objetivo da tela
Apresentar o perfil do trabalhador CLT (Marcos Aurélio), usuário final dos módulos voltados ao empregado (holerite digital, empréstimo consignado, benefícios).
3.3.2 Componentes e layout
Por ser uma persona única nesta categoria, o layout é diferente das telas anteriores:
Layout de página única (não card → detalhe):
[Header da seção]
  Título: "Persona Empregado"
  Subtítulo: "Perfil do trabalhador CLT que acessa os serviços
              do empregado pelo sistema."

[Hero do perfil — largura total]
  - Avatar ilustrativo (maior, centralizado)
  - Nome: Marcos Aurélio Silva, 29 anos
  - Cargo: Assistente Comercial / Operador de Logística
  - Tags: "CLT", "Renda variável", "Comissão"

[Conteúdo em duas colunas — desktop]
  Coluna esquerda (60%): Contexto, rotina, comportamento
  Coluna direita (40%): Dores, objetivos, métricas

[Mobile: coluna única, seções em acordeão]
Nota de design: Como há apenas uma persona nesta categoria, evitar o padrão de card de seleção. Exibir o perfil diretamente, com navegação por âncoras nas seções.
Navegação por âncoras:
[Barra de navegação sticky — abaixo do hero]
  Contexto | Dores | Objetivos | Comportamento | Frases | Métricas
•	Implementar com <nav aria-label="Seções do perfil de Marcos Aurélio">
•	Scroll suave ao clicar: scroll-behavior: smooth
•	Item ativo destacado conforme posição de scroll (IntersectionObserver)
3.3.3 UX Writing — Microcopy desta tela
Elemento	Texto
Título da seção	"Persona Empregado"
Subtítulo	"Conheça o perfil do trabalhador CLT que usa os serviços de holerite, benefícios e empréstimo consignado."
Label de tags	"Características do vínculo"
Seção de dores	"O que dificulta o dia a dia de Marcos"
Seção de objetivos	"O que Marcos precisa conseguir"
Seção de frases	"Como Marcos fala sobre suas necessidades"
________________________________________
3.4 Tela: Mapas de Empatia
3.4.1 Objetivo da tela
Permitir a seleção de qualquer uma das 9 personas e a exploração do seu mapa de empatia de forma navegável — com visão macro de cada quadrante e acesso ao detalhe por interação.
3.4.2 Seleção de persona — Grid de cards
Layout: Grid de 3 colunas em desktop, 2 em tablet, 1 em mobile
Card de seleção de mapa:
Elemento	Conteúdo
Avatar miniatura	Ilustração do perfil
Nome	Ex: "Ricardo Mendes"
Subtítulo	Ex: "Contador Mono Usuário"
Categoria	Tag colorida: "Contábil", "PME" ou "Empregado"
CTA	"Ver mapa de empatia"
3.4.3 Mapa de empatia — Tela de detalhe
Estrutura do mapa navegável:
O mapa de empatia é exibido em dois modos:
Modo Visão Geral (padrão):
Layout em grade 2×2 + 2 colunas inferiores:
┌─────────────────────┬─────────────────────┐
│  🧠 Pensa e Sente   │  👂 Ouve            │
│  [3 bullets macro]  │  [3 bullets macro]  │
│  [+ Ver mais]       │  [+ Ver mais]       │
├─────────────────────┼─────────────────────┤
│  👀 Vê              │  🗣️ Fala e Faz      │
│  [3 bullets macro]  │  [3 bullets macro]  │
│  [+ Ver mais]       │  [+ Ver mais]       │
└─────────────────────┴─────────────────────┘
┌─────────────────────┬─────────────────────┐
│  😣 Dores           │  🏆 Ganhos          │
│  [Tabela resumida]  │  [Tabela resumida]  │
│  [+ Ver mais]       │  [+ Ver mais]       │
└─────────────────────┴─────────────────────┘
Modo Detalhe de Quadrante (ao clicar em "+ Ver mais"):
Abre um painel lateral (drawer) ou modal com:
•	Título do quadrante
•	Todos os itens do quadrante
•	Para Dores: tabela com colunas Intensidade | Descrição | Ícone de severidade
•	Para Ganhos: tabela com colunas Prioridade | Descrição | Ícone de prioridade
•	Botão "Fechar" com aria-label="Fechar detalhe de [nome do quadrante]"
•	Navegação entre quadrantes dentro do painel: ← Quadrante anterior | Próximo quadrante →
Especificações de acessibilidade do mapa:
•	Cada quadrante é um <section> com aria-labelledby apontando para o título do quadrante
•	O botão "+ Ver mais" deve ter aria-expanded="false/true" e aria-controls apontando para o painel
•	Emojis decorativos devem ter aria-hidden="true" com texto alternativo textual adjacente
•	Foco deve ser capturado no painel ao abrir e retornar ao botão que o acionou ao fechar
•	Esc fecha o painel
Responsividade do mapa:
Breakpoint	Layout
Desktop (≥1024px)	Grade 2×2 + 2 colunas inferiores
Tablet (768–1023px)	Grade 2×2 com cards menores + 2 colunas inferiores
Mobile (<768px)	Acordeão vertical com 6 seções colapsáveis
Mobile — Acordeão:
[▼] 🧠 Pensa e Sente
    [conteúdo macro]
    [Ver todos os itens →]

[▼] 👂 Ouve
    ...
•	Usar <details> e <summary> nativos do HTML para acordeão básico, ou componente customizado com ARIA correto
•	Primeiro quadrante aberto por padrão
3.4.4 Indicador de persona no topo do mapa
[← Voltar para seleção]

[Avatar] Mapa de Empatia — Ricardo Mendes
         Contador Mono Usuário · 43 anos

[Botões: Persona anterior ← | → Próxima persona]
3.4.5 UX Writing — Microcopy desta tela
Elemento	Texto
Título da seção	"Mapas de Empatia"
Subtítulo da seleção	"Selecione uma persona para explorar o que ela pensa, sente, vê, ouve e o que a motiva ou frustra."
CTA do card	"Ver mapa de empatia"
Botão de expandir quadrante	"Ver todos os itens"
Botão de fechar painel	"Fechar"
Label do quadrante Dores	"O que dificulta e frustra"
Label do quadrante Ganhos	"O que traz satisfação e sucesso"
Estado vazio de quadrante	"Nenhum item registrado para este quadrante."
Tooltip de severidade 🔴	"Dor crítica — impacto direto na produtividade ou resultado"
Tooltip de severidade 🟠	"Dor alta — gera fricção significativa no fluxo de trabalho"
Tooltip de severidade 🟡	"Dor média — incomoda, mas não bloqueia a tarefa"
Tooltip de prioridade ⭐	"Ganho essencial — resolve uma dor crítica"
Tooltip de prioridade 🔹	"Ganho importante — melhora a experiência de forma relevante"
Tooltip de prioridade 🔸	"Ganho desejável — agrega valor, mas não é bloqueador"
________________________________________
3.5 Tela: Brainstorm de Funcionalidades
3.5.1 Objetivo da tela
Permitir que UX designers descrevam uma funcionalidade macro e recebam, com base nas personas selecionadas, uma lista estruturada de sugestões de funcionalidades e informações relevantes por perfil.
3.5.2 Layout geral
[Header da seção]
  Título: "Brainstorm de Funcionalidades"
  Subtítulo: "Descreva a funcionalidade que você está desenhando
              e selecione as personas para receber sugestões
              contextualizadas por perfil."

[Painel de configuração — lado esquerdo ou topo]
  1. Seleção de personas
  2. Campo de descrição
  3. Botão de ação

[Área de resultado — lado direito ou abaixo]
  Resultado do brainstorming estruturado
Layout desktop: Dois painéis lado a lado (40% configuração / 60% resultado)
Layout mobile: Empilhado (configuração no topo, resultado abaixo)
3.5.3 Componente: Seleção de personas
Título do campo: "Para quais personas você quer gerar sugestões?"
Opção "Todas as personas":
•	Checkbox com label "Todas as personas"
•	Ao marcar, seleciona todas as demais automaticamente
•	Ao desmarcar qualquer individual, desmarca "Todas" automaticamente
•	aria-label="Selecionar todas as personas"
Grupos de personas com múltipla seleção:
Grupo: Contábil
  ☐ Ricardo Mendes — Contador Mono Usuário
  ☐ Fernanda Oliveira — Dono de Escritório
  ☐ Thiago Carvalho — Gerente Contábil
  ☐ Juliana Santos — Contadora Operacional

Grupo: PME
  ☐ Bruno Takahashi — MEI Digitalizado
  ☐ Dona Maria das Graças — MEI Não Digitalizado
  ☐ Alexandre Freitas — PME sem RH
  ☐ Camila Rodrigues — PME com RH

Grupo: Empregado
  ☐ Marcos Aurélio Silva — Empregado CLT
•	Grupos com <fieldset> e <legend> semânticos
•	Checkboxes com aria-describedby apontando para descrição resumida da persona (tooltip ou texto oculto)
•	Contador de selecionadas: "3 personas selecionadas" atualizado dinamicamente com aria-live="polite"
Chips de personas selecionadas:
Após seleção, exibir chips removíveis abaixo do seletor:
[Ricardo ×] [Fernanda ×] [Juliana ×]
•	Botão de remoção com aria-label="Remover Ricardo Mendes da seleção"
3.5.4 Componente: Campo de descrição da funcionalidade
Label: "Descreva a funcionalidade"
Placeholder: "Ex: Painel de fechamento mensal com status por cliente e módulo"
Texto de apoio abaixo do campo: "Seja específico sobre o objetivo da funcionalidade. Quanto mais contexto você der, melhores serão as sugestões."
Contador de caracteres: "0 / 500 caracteres" — atualizado em tempo real com aria-live="polite"
Validação:
•	Mínimo de 20 caracteres para habilitar o botão de gerar
•	Mensagem de erro inline: "Descreva a funcionalidade com pelo menos 20 caracteres para continuar."
•	aria-invalid="true" no campo quando inválido
•	aria-describedby apontando para a mensagem de erro
Especificações do textarea:
•	rows="4" como padrão, redimensionável verticalmente
•	maxlength="500"
•	Label associada via for/id
3.5.5 Botão de ação
[💡 Gerar sugestões]
•	Estado desabilitado quando: nenhuma persona selecionada OU campo com menos de 20 caracteres
•	aria-disabled="true" quando desabilitado (não usar disabled nativo para manter foco)
•	Tooltip no estado desabilitado: "Selecione ao menos uma persona e descreva a funcionalidade para continuar"
•	Estado de carregamento: spinner + "Gerando sugestões..." com aria-live="assertive" anunciando o início do processamento
•	aria-busy="true" durante o carregamento
3.5.6 Área de resultado
Estado inicial (antes de gerar):
[Ícone ilustrativo de brainstorming]

"Suas sugestões aparecerão aqui."

"Configure as personas e descreva a funcionalidade
 para começar o brainstorming."
Estado de carregamento:
[Skeleton loader com 3 blocos de persona]
"Analisando personas e gerando sugestões..."
Estado de resultado:
Seguindo exatamente o formato do prompt especificado:
💡 ANÁLISE DE FUNCIONALIDADE: [Nome da funcionalidade]
   Objetivo: [Síntese]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 PERSONA 1 — [Nome]
   [Resumo do perfil]

   Funcionalidades sugeridas:
   1. [Nome]
      Justificativa: [...]
   2. [Nome]
      Justificativa: [...]
   ...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Repetir para cada persona selecionada]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 SÍNTESE GERAL
   • Pontos comuns entre personas
   • Diferenças críticas
   • Oportunidades de unificação
Ações disponíveis no resultado:
[📋 Copiar resultado] [⬇️ Exportar como PDF] [🔄 Gerar novamente] [🗑️ Limpar]
•	"Copiar resultado": copia o texto formatado para a área de transferência. Feedback: "Copiado!" por 2 segundos com aria-live="polite"
•	"Exportar como PDF": gera PDF com cabeçalho da plataforma, data e hora, personas selecionadas e resultado
•	"Gerar novamente": mantém as configurações e regera (com confirmação: "Isso vai substituir o resultado atual. Continuar?")
•	"Limpar": limpa resultado e campo de descrição (com confirmação)
Histórico de brainstormings (sessão):
[Histórico desta sessão ▼]
  • Painel de fechamento mensal — Ricardo, Juliana — há 5 min
  • Notificações de prazo — Todas as personas — há 12 min
•	Clicar em um item restaura a configuração e o resultado
•	Limite de 10 itens por sessão
•	Persistência em sessionStorage
3.5.7 UX Writing — Microcopy desta tela
Elemento	Texto
Título da seção	"Brainstorm de Funcionalidades"
Subtítulo	"Descreva a funcionalidade que você está desenhando e selecione as personas para receber sugestões contextualizadas por perfil."
Label do seletor	"Para quais personas você quer gerar sugestões?"
Opção geral	"Todas as personas"
Label do campo	"Descreva a funcionalidade"
Placeholder	"Ex: Painel de fechamento mensal com status por cliente e módulo"
Texto de apoio	"Seja específico sobre o objetivo da funcionalidade. Quanto mais contexto você der, melhores serão as sugestões."
Contador de seleção	"1 persona selecionada" / "3 personas selecionadas"
Botão principal	"Gerar sugestões"
Botão — carregando	"Gerando sugestões..."
Tooltip — desabilitado	"Selecione ao menos uma persona e descreva a funcionalidade para continuar"
Estado vazio	"Suas sugestões aparecerão aqui."
Subtexto do estado vazio	"Configure as personas e descreva a funcionalidade para começar o brainstorming."
Feedback de cópia	"Resultado copiado!"
Confirmação de regerar	"Isso vai substituir o resultado atual. Deseja continuar?"
Botão confirmar	"Sim, gerar novamente"
Botão cancelar	"Cancelar"
Erro de geração	"Não foi possível gerar as sugestões agora. Verifique sua conexão e tente novamente."
Botão de retry	"Tentar novamente"
Label do histórico	"Histórico desta sessão"
Item do histórico	"[Nome da funcionalidade] — [N personas] — há [X] min"
________________________________________
4. Componentes Globais
4.1 Barra de navegação lateral (desktop)
[Logo Domínio UX]

━━━━━━━━━━━━━━━━
🧑‍💼 Personas Contábil
🏢 Personas PME
👤 Persona Empregado
🗺️ Mapas de Empatia
💡 Brainstorm

━━━━━━━━━━━━━━━━
[Ícone de ajuda] Ajuda
•	<nav aria-label="Navegação principal">
•	Item ativo com aria-current="page"
•	Emojis com aria-hidden="true" — o texto do item é suficiente como label
•	Colapsável: botão aria-label="Recolher menu lateral" / aria-label="Expandir menu lateral" com aria-expanded
•	Largura expandida: 240px | Colapsada: 64px (apenas ícones)
4.2 Bottom navigation (mobile)
[🧑‍💼]    [🏢]    [👤]    [🗺️]    [💡]
Contábil  PME  Empregado  Empatia  Brainstorm
•	<nav aria-label="Navegação principal">
•	Item ativo com destaque visual e aria-current="page"
•	Touch target mínimo: 44×44px
4.3 Header global
[Menu ≡ — mobile]  [Logo]  [Título da seção atual]  [Busca 🔍]
•	Busca global: permite encontrar personas por nome, cargo ou módulo do Domínio
•	role="search" na área de busca
•	Resultados com aria-live="polite" para anúncio de quantidade: "5 resultados encontrados"
4.4 Breadcrumb
<nav aria-label="Localização atual">
  <ol>
    <li><a href="/">Início</a></li>
    <li><a href="/personas/contabil">Personas Contábil</a></li>
    <li aria-current="page">Ricardo Mendes</li>
  </ol>
</nav>
4.5 Skeleton loaders
•	Usar para todos os estados de carregamento
•	Animação de shimmer (gradiente animado)
•	aria-busy="true" no container durante carregamento
•	Texto para leitores de tela: <span class="sr-only">Carregando conteúdo...</span>
4.6 Toast notifications
•	Posição: canto inferior direito (desktop) / topo centralizado (mobile)
•	role="status" para notificações informativas
•	role="alert" para erros
•	Auto-dismiss em 4 segundos para informativos, persistente para erros
•	Botão de fechar sempre presente: aria-label="Fechar notificação"
________________________________________
5. Design System e Tokens
5.1 Tipografia
Elemento	Tamanho desktop	Tamanho mobile	Peso
H1 (título de seção)	24px	20px	700
H2 (título de card)	18px	16px	600
H3 (subtítulo)	16px	14px	600
Body regular	14px	14px	400
Body small	12px	12px	400
Label	12px	12px	500
Caption	11px	11px	400
•	Linha base mínima: 1.5 para body text
•	Nunca usar texto menor que 11px
•	Fonte principal: Inter ou similar (sem serifa, alta legibilidade)
5.2 Espaçamento (escala de 4px)
4 | 8 | 12 | 16 | 24 | 32 | 48 | 64px
5.3 Cores (requisitos de contraste)
Uso	Requisito WCAG
Texto normal sobre fundo	Mínimo 4.5:1
Texto grande (≥18px ou ≥14px bold)	Mínimo 3:1
Componentes de UI e foco	Mínimo 3:1
Texto decorativo	Nenhum
•	Nunca usar cor como único meio de transmitir informação
•	Todos os ícones de severidade/prioridade acompanham texto
•	Modo escuro: desejável, não obrigatório na v1
5.4 Interação e foco
•	Outline de foco: 3px solid, offset 2px, cor com contraste ≥3:1 sobre qualquer fundo
•	Nunca outline: none sem substituto visual equivalente
•	Ordem de foco lógica seguindo a ordem visual
•	Skip link: "Ir para o conteúdo principal" — visível apenas no foco, primeiro elemento focável da página
________________________________________
6. Acessibilidade — Requisitos Consolidados
6.1 Conformidade alvo
WCAG 2.1 Nível AA como padrão mínimo para todos os componentes.
6.2 Checklist por categoria
Percepção:
•	 Todas as imagens têm texto alternativo adequado
•	 Emojis decorativos têm aria-hidden="true"
•	 Cor nunca é o único meio de transmitir informação
•	 Contraste de texto ≥4.5:1 (normal) e ≥3:1 (grande)
•	 Conteúdo não depende de orientação de tela específica
Operabilidade:
•	 Todo conteúdo acessível por teclado
•	 Sem armadilhas de teclado
•	 Skip link presente e funcional
•	 Touch targets ≥44×44px em mobile
•	 Sem conteúdo que pisca mais de 3 vezes por segundo
Compreensão:
•	 Labels descritivas em todos os campos de formulário
•	 Mensagens de erro identificam o campo e descrevem o problema
•	 Mudanças de contexto não ocorrem sem ação do usuário
•	 Linguagem da interface definida no <html lang="pt-BR">
Robustez:
•	 HTML semântico e válido
•	 ARIA usado corretamente (não em substituição ao HTML nativo quando possível)
•	 Componentes testados com NVDA, VoiceOver e JAWS
•	 Compatível com Chrome, Firefox, Safari e Edge (últimas 2 versões)
________________________________________
7. Responsividade
7.1 Breakpoints
Nome	Faixa	Layout principal
Mobile	< 768px	1 coluna, bottom nav
Tablet	768–1023px	2 colunas, sidebar colapsada
Desktop	≥ 1024px	Sidebar fixa + conteúdo
Wide	≥ 1440px	Sidebar fixa + conteúdo com max-width
7.2 Comportamentos críticos por breakpoint
Cards de persona:
•	Desktop: 2 colunas
•	Tablet: 2 colunas (menores)
•	Mobile: 1 coluna
Mapa de empatia:
•	Desktop/Tablet: Grade 2×2 + 2 inferiores
•	Mobile: Acordeão vertical
Brainstorm — painel duplo:
•	Desktop: Lado a lado (40/60)
•	Tablet: Empilhado com configuração colapsável
•	Mobile: Empilhado
Painel de detalhe (drawer):
•	Desktop: Drawer lateral (400px)
•	Mobile: Bottom sheet (80vh, com handle de arraste)
________________________________________
8. Estados de Interface
Para todos os componentes interativos, especificar e implementar:
Estado	Descrição
Default	Estado padrão de repouso
Hover	Feedback visual ao passar o mouse
Focus	Outline visível para navegação por teclado
Active	Feedback ao pressionar/clicar
Disabled	Visual atenuado, não interativo, com explicação
Loading	Skeleton ou spinner com feedback textual
Error	Mensagem inline, ícone, cor (nunca só cor)
Success	Confirmação visual e textual
Empty	Estado vazio com orientação de ação
________________________________________
9. Performance e Requisitos Técnicos
9.1 Metas de performance (Core Web Vitals)
Métrica	Meta
LCP (Largest Contentful Paint)	≤ 2.5s
FID / INP (Interaction to Next Paint)	≤ 200ms
CLS (Cumulative Layout Shift)	≤ 0.1
9.2 Requisitos técnicos
•	Imagens de avatar: formato WebP com fallback PNG, lazy loading
•	Fontes: preload das variantes usadas, font-display: swap
•	Dados de personas: JSON estático ou API REST simples
•	Integração com IA (brainstorm): chamada assíncrona à API com tratamento de timeout (30s) e retry automático (1x)
•	Sem dependência de JavaScript para conteúdo crítico (personas e mapas devem ser acessíveis sem JS para fins de indexação e fallback)
________________________________________
10. Critérios de Aceite por Tela
Personas Contábil / PME
•	 4 cards exibidos corretamente com todos os elementos especificados
•	 Clique no card navega para a página de detalhe com URL própria
•	 Página de detalhe exibe todas as 7 seções do perfil
•	 Navegação entre personas (anterior/próxima) funciona corretamente
•	 Breadcrumb reflete a localização correta
•	 Todo o conteúdo é acessível por teclado
•	 Leitores de tela anunciam corretamente os elementos interativos
Persona Empregado
•	 Perfil exibido diretamente (sem card intermediário)
•	 Navegação por âncoras funciona com scroll suave
•	 Item ativo na barra de âncoras atualiza conforme scroll
•	 Layout responsivo em todos os breakpoints
Mapas de Empatia
•	 9 cards de seleção exibidos corretamente
•	 Clique abre o mapa correto para a persona selecionada
•	 Cada quadrante exibe versão macro com opção de expandir
•	 Expansão abre painel com conteúdo completo
•	 Foco é capturado no painel ao abrir
•	 Esc fecha o painel e retorna foco ao botão de origem
•	 Layout de acordeão funciona corretamente em mobile
•	 Indicadores de severidade/prioridade têm texto alternativo
Brainstorm de Funcionalidades
•	 Seleção de personas funciona individualmente e com "Todas"
•	 Chips de seleção exibem personas escolhidas com opção de remover
•	 Campo de descrição valida mínimo de 20 caracteres
•	 Botão desabilitado quando critérios não atendidos
•	 Estado de carregamento exibido durante processamento
•	 Resultado formatado conforme estrutura do prompt especificado
•	 Ações de copiar, exportar e limpar funcionam corretamente
•	 Histórico da sessão persiste e permite restaurar configurações
•	 Erros de API tratados com mensagem amigável e opção de retry
________________________________________
11. Fora do Escopo (v1)
•	Autenticação e controle de acesso por usuário
•	Edição de personas diretamente na plataforma
•	Comentários ou anotações colaborativas em personas
•	Exportação de personas em formato Figma ou Sketch
•	Modo escuro
•	Internacionalização (i18n) — somente pt-BR na v1
•	Histórico persistente entre sessões (apenas sessionStorage na v1)
________________________________________
12. Glossário de UX Writing
Termo técnico	Como escrever na interface
Persona	"Perfil de usuário" (quando necessário explicar)
Mapa de empatia	"Mapa de empatia" (já é compreensível para o público-alvo)
Brainstorming	"Brainstorm de funcionalidades"
Quadrante	"Seção do mapa" (em contextos de ajuda)
Severidade	"Nível de impacto" (em tooltips explicativos)
Heurística	Não usar — substituir por descrição da boa prática
API	Não expor ao usuário
Timeout	"Não foi possível conectar. Tente novamente."
________________________________________
PRD elaborado com base nas personas sintéticas e mapas de empatia do ecossistema Domínio Contábil. Versão 1.0 — sujeito a revisão após validação com stakeholders e testes de usabilidade.

