# Domínio UX — Design Intelligence System

## O que é este projeto
Sistema de apoio ao processo de design da Domínio Sistemas. Centraliza personas sintéticas, pesquisas e automatiza brainstorm, verificação de UX Writing, specs de acessibilidade e specs de dados.

## Estrutura de módulos
- `/knowledge-base/personas/` → JSONs das personas por segmento
- `/knowledge-base/research/` → repositório de pesquisas
- `/knowledge-base/products/` → histórico de features internas
- `/modules/brainstorm/` → agente de brainstorm (intake + síntese)
- `/modules/ux-review/` → agente de verificação UX Writing
- `/modules/accessibility/` → agente de spec de acessibilidade
- `/modules/data-specs/` → agente de spec de dados
- `/onboarding/` → conteúdo estático do time de UX
- `/outputs/` → artefatos gerados por demanda
- `/src/` → aplicação React (frontend da plataforma)

## Regras gerais
- Sempre consulte o JSON de personas antes de gerar sugestões
- Nunca carregue todos os JSONs de pesquisa — use o `index.json` primeiro
- Outputs sempre em Markdown estruturado, salvos em `/outputs/[id]/`
- Ao gerar specs (acessibilidade, dados), use os templates fixos dos JSONs

## Segmentos de personas disponíveis
- `contabil` (Juliana Santos/Operador, Ricardo Mendes/Mono usuário, Thiago Carvalho/Gerente, Fernanda Oliveira/Sócia-diretora)
- `pme` (Bruno Takahashi/MEI-digital, Maria das Graças/MEI-analógica, Alexandre Freitas/PME-distribuidora, Camila Rodrigues/PME-clínicas)
- `empregado` (Marcos Aurélio Silva/CLT-operador)

## Como iniciar uma tarefa
Diga qual módulo quer usar:
- **"brainstorm"** → leia `/modules/brainstorm/agent-intake.md` e siga o fluxo
- **"revisar ux"** → leia `/modules/ux-review/agent-ux-review.md`
- **"spec acessibilidade"** → leia `/modules/accessibility/agent-accessibility.md`
- **"spec dados"** → leia `/modules/data-specs/agent-data-specs.md`

## Fluxo recomendado por módulo

### Brainstorm (2 agentes em sequência)
1. Usuário preenche o formulário de intake
2. **Agente 1 (Haiku)**: classifica e valida o intake → gera JSON de contexto
3. **Agente 2 (Sonnet)**: lê o contexto + personas + pesquisas relevantes → gera brainstorm completo
4. Output salvo em `/outputs/[demanda_id]/brainstorm.md`

### Verificação UX Writing (1 agente)
1. Usuário envia imagem ou descrição da tela
2. **Agente UX Review (Sonnet)**: analisa contra regras → gera relatório de conformidade
3. Output salvo em `/outputs/[tela]/ux-review.md`

### Spec Acessibilidade (1 agente)
1. Usuário envia imagem ou descrição da tela
2. **Agente Accessibility (Sonnet)**: gera tabela ARIA completa
3. Output salvo em `/outputs/[tela]/accessibility-spec.md`

### Spec Dados (1 agente)
1. Usuário descreve a jornada/tela
2. **Agente Data Specs (Sonnet)**: gera especificação de eventos de analytics
3. Output salvo em `/outputs/[jornada]/data-spec.md`
