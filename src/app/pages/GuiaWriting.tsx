import { useEffect, useRef, useState } from 'react';
import { SidebarNav } from '../components/SidebarNav';
import { GuiaWritingContent } from '../components/guia-writing/GuiaWritingContent';

interface NavigationItem {
  id: string;
  title: string;
  subsections?: Array<{ id: string; title: string }>;
}

export function GuiaWriting() {
  const [activeId, setActiveId] = useState<string>('');
  const [navSections, setNavSections] = useState<NavigationItem[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Setup IntersectionObserver for scroll-spy
  useEffect(() => {
    const setupObserver = () => {
      const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -35% 0px',
        threshold: 0
      };

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      }, observerOptions);

      // Observe all headings with IDs
      const headingElements = document.querySelectorAll('h2[id], h3[id], h4[id]');
      headingElements.forEach(el => observerRef.current?.observe(el));
    };

    // Setup observer after a short delay to ensure content is rendered
    const timer = setTimeout(setupObserver, 500);

    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [navSections]);

  // Definição manual dos headings do GuiaWritingContent
  useEffect(() => {
    const sections: NavigationItem[] = [
      {
        id: '1-regras-gerais',
        title: '1. Regras gerais',
        subsections: [
          { id: '11-seja-claro-objetivo', title: '1.1 Seja claro e objetivo' },
          { id: '12-principios-gerais', title: '1.2 Princípios gerais' },
          { id: '13-estrutura-texto', title: '1.3 Estrutura de texto' },
        ]
      },
      {
        id: '2-tom-de-voz',
        title: '2. Tom de voz da marca',
        subsections: [
          { id: '21-simplifique-complexo', title: '2.1 Simplifique o complexo' },
          { id: '22-referir-marca', title: '2.2 Como nos referir à marca' },
          { id: '23-referir-produtos', title: '2.3 Como nos referir aos produtos' },
          { id: '24-personalidade-marca', title: '2.4 Personalidade de marca' },
          { id: '25-somos-confiantes', title: '2.5 Somos confiantes' },
          { id: '26-somos-precisos', title: '2.6 Somos precisos' },
          { id: '27-somos-genuinos', title: '2.7 Somos genuínos' },
          { id: '28-somos-apaixonados', title: '2.8 Somos apaixonados' },
        ]
      },
      {
        id: '3-acessibilidade',
        title: '3. Acessibilidade',
        subsections: [
          { id: '31-todas-pessoas', title: '3.1 Todas as pessoas' },
          { id: '32-boas-praticas-linguagem', title: '3.2 Boas práticas' },
          { id: '33-boas-praticas-de-design', title: '3.3 Boas práticas de design' },
        ]
      },
      {
        id: '4-padronizacao',
        title: '4. Padronização',
        subsections: [
          { id: '41-utilize-um-padrao-de-linguagem-em-todos-os-mo', title: '4.1 Utilize um padrão' },
          { id: '42-escritorio-empresa-e-cliente', title: '4.2 Escritório, empresa e cliente' },
          { id: '43-usuario-interno-usuario-externo-funcionario', title: '4.3 Usuários' },
          { id: '44-utilize-palavras-e-expressoes-mais-simples', title: '4.4 Palavras mais simples' },
          { id: '45-rotulos-comuns-no-sistema', title: '4.5 Rótulos comuns' },
        ]
      },
      {
        id: '5-maiusculas-minusculas',
        title: '5. Maiúsculas e minúsculas',
        subsections: [
          { id: '51-saiba-quando-utilizar-letras-maiusculas-e-min', title: '5.1 Quando utilizar' },
          { id: '52-caixa-alta-maiusculas', title: '5.2 Maiúsculas' },
          { id: '53-caixa-baixa-minusculas', title: '5.3 Minúsculas' },
        ]
      },
      {
        id: '6-botoes',
        title: '6. Botões',
        subsections: [
          { id: '61-convide-para-uma-acao-especifica', title: '6.1 Convide para ação' },
          { id: '62-primeira-letra-maiuscula', title: '6.2 Primeira letra maiúscula' },
          { id: '63-atencao-aos-verbos', title: '6.3 Atenção aos verbos' },
          { id: '64-utilize-de-3-a-4-palavras-apenas', title: '6.4 Utilize 3 a 4 palavras' },
          { id: '65-exclua-palavras-acessorias', title: '6.5 Exclua palavras acessórias' },
          { id: '66-nao-traga-informacoes-vagas', title: '6.6 Não traga informações vagas' },
          { id: '67-nao-faca-perguntas', title: '6.7 Não faça perguntas' },
          { id: '68-botoes-primario--botao-secundario', title: '6.8 Botões primário e secundário' },
          { id: '69-cuidado-com-a-acessibilidade', title: '6.9 Cuidado com acessibilidade' },
        ]
      },
      {
        id: '7-telas-feedback',
        title: '7. Telas de feedback',
        subsections: [
          { id: '71-mantenha-o-cliente-nas-nossas-aplicacoes', title: '7.1 Mantenha o cliente' },
          { id: '72-cuidado-com-a-acessibilidade', title: '7.2 Cuidado com acessibilidade' },
          { id: '73-telas-de-sucesso', title: '7.3 Telas de sucesso' },
          { id: '74-estrutura-da-tela-de-sucesso', title: '7.4 Estrutura de sucesso' },
          { id: '76-telas-de-processamento', title: '7.6 Telas de processamento' },
          { id: '77-estrutura-da-tela-de-processamento', title: '7.7 Estrutura de processamento' },
          { id: '79-telas-de-erro', title: '7.9 Telas de erro' },
          { id: '710-estrutura-da-tela-de-erro', title: '7.10 Estrutura de erro' },
        ]
      },
      {
        id: '8-empty-spaces',
        title: '8. Empty spaces',
        subsections: [
          { id: '81-analise-cada-caso-para-escolher-o-melhor-form', title: '8.1 Analise cada caso' },
          { id: '82-empty-space-boas-vindas', title: '8.2 Boas-vindas' },
          { id: '83-empty-space-padrao', title: '8.3 Padrão' },
          { id: '84-empty-space-sem-retorno', title: '8.4 Sem retorno' },
          { id: '85-empty-space-pos-exclusao', title: '8.5 Pós-exclusão' },
          { id: '86-use-ilustracoes-adequadas', title: '8.6 Use ilustrações' },
          { id: '87-estrutura-geral-empty-space', title: '8.7 Estrutura geral' },
        ]
      },
      {
        id: '9-loading',
        title: '9. Loading',
        subsections: [
          { id: '91-saiba-quando-usar-o-loading', title: '9.1 Quando usar' },
          { id: '92-quando-e-como-usar-o-loading-de-pagina', title: '9.2 Como usar' },
        ]
      },
      {
        id: '10-notificacoes',
        title: '10. Notificações',
        subsections: [
          { id: '101-utilize-o-formato-mais-adequado-para-cada-si', title: '10.1 Formato adequado' },
          { id: '102-quando-utilizar-cada-formato-e-mail', title: '10.2 E-mail' },
          { id: '103-quando-utilizar-cada-formato-push--sms', title: '10.3 Push / SMS' },
          { id: '104-quando-utilizar-cada-formato-whatsapp-e-notif', title: '10.4 WhatsApp e notificação' },
          { id: '105-importante', title: '10.5 Importante' },
          { id: '106-arquivos-anexos-ou-para-download', title: '10.6 Arquivos anexos' },
        ]
      },
      {
        id: '11-alerts-hover-tooltips',
        title: '11. Alerts, hover e tooltips',
        subsections: [
          { id: '111-escreva-textos-curtos-que-nao-prejudiquem-o-', title: '11.1 Textos curtos' },
          { id: '112-cuidado-com-a-acessibilidade', title: '11.2 Cuidado com acessibilidade' },
          { id: '113-alert', title: '11.3 Alert' },
          { id: '114-hover', title: '11.4 Hover' },
          { id: '115-tooltip', title: '11.5 Tooltip' },
        ]
      },
      {
        id: '12-datas-valores',
        title: '12. Datas e valores',
        subsections: [
          { id: '121-saiba-como-escrever-dias-da-semana-mes-e-ano', title: '12.1 Como escrever' },
          { id: '122-regra-geral', title: '12.2 Regra geral' },
          { id: '123-regras-gerais-na-pratica', title: '12.3 Regras na prática' },
          { id: '124-datas-e-dias-da-semana', title: '12.4 Datas e dias da semana' },
          { id: '125-datas-e-dias-da-semana-na-pratica', title: '12.5 Datas na prática' },
          { id: '126-horarios', title: '12.6 Horários' },
          { id: '127-horarios-na-pratica', title: '12.7 Horários na prática' },
          { id: '128-valores-monetarios', title: '12.8 Valores monetários' },
          { id: '129-valores-monetarios-na-pratica', title: '12.9 Valores na prática' },
          { id: '1210-telefones', title: '12.10 Telefones' },
          { id: '1211-telefones-na-pratica', title: '12.11 Telefones na prática' },
        ]
      },
      {
        id: '13-pontuacao',
        title: '13. Pontuação',
        subsections: [
          { id: '131-utilize-a-pontuacao-a-favor-da-interface', title: '13.1 Utilize a pontuação' },
          { id: '132-ponto-final-', title: '13.2 Ponto final' },
          { id: '133-exclamacao--e-interrogacao-', title: '13.3 Exclamação e interrogação' },
          { id: '134-dois-pontos-', title: '13.4 Dois pontos' },
          { id: '135-reticencias-', title: '13.5 Reticências' },
          { id: '136-virgula--e-ponto-e-virgula-', title: '13.6 Vírgula e ponto e vírgula' },
          { id: '137-sinais-matematicos------e-maior-e-menor--e-p', title: '13.7 Sinais matemáticos' },
          { id: '138-parenteses-----e-traco-hifem---', title: '13.8 Parênteses e traço/hífen' },
          { id: '139-aspas-----e-comercial-underline---e-hashtag-', title: '13.9 Aspas e E comercial' },
          { id: '1310-asterisco---chaves-----colchetes-----barras-', title: '13.10 Asterisco e colchetes' },
        ]
      },
    ];

    setNavSections(sections);
  }, []);

  return (
    <div className="flex gap-8 p-6 max-w-7xl mx-auto">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <header className="mb-12 pb-6 border-b border-border">
          <h1
            className="text-foreground mb-3"
            style={{
              fontSize: 'var(--text-h1)',
              fontWeight: 'var(--font-weight-semibold)',
              lineHeight: '1.2'
            }}
          >
            Guia de UX Writing
          </h1>
          <p
            className="text-muted-foreground"
            style={{
              fontSize: 'var(--text-lg)',
              lineHeight: '1.6'
            }}
          >
            Padrões de linguagem para produtos Domínio
          </p>
        </header>

        <GuiaWritingContent />
      </div>

      {/* Sidebar Navigation */}
      {navSections.length > 0 && (
        <SidebarNav sections={navSections} activeId={activeId} />
      )}
    </div>
  );
}
