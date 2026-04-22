import { Check, X, Calendar, ExternalLink, AlertCircle } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';

// ========================================
// COMPONENTES AUXILIARES
// ========================================

interface TabelaComparativaProps {
  items: Array<{ evitar: string; prefira: string }>;
}

function TabelaComparativa({ items }: TabelaComparativaProps) {
  return (
    <div className="overflow-x-auto mb-8 rounded-lg border border-border">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th
              className="px-5 py-4 text-left font-semibold bg-red-50 border-b-2 border-red-200"
              style={{
                fontSize: 'var(--text-label)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)'
              }}
            >
              ☹️ Ao invés de
            </th>
            <th
              className="px-5 py-4 text-left font-semibold bg-green-50 border-b-2 border-green-200"
              style={{
                fontSize: 'var(--text-label)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)'
              }}
            >
              😊 Prefira
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td
                className="px-5 py-4 border-l-4 border-red-500 bg-red-50/30"
                style={{
                  borderBottom: '1px solid var(--border)',
                  fontSize: 'var(--text-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.6'
                }}
              >
                {item.evitar}
              </td>
              <td
                className="px-5 py-4 border-l-4 border-green-500 bg-green-50/30"
                style={{
                  borderBottom: '1px solid var(--border)',
                  fontSize: 'var(--text-base)',
                  color: 'var(--foreground)',
                  lineHeight: '1.6'
                }}
              >
                {item.prefira}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface CardsExemploProps {
  correto: string | React.ReactNode;
  incorreto: string | React.ReactNode;
}

function CardsExemplo({ correto, incorreto }: CardsExemploProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Correto */}
      <div className="p-4 border-2 border-green-500 rounded-[var(--radius-card)] bg-green-50/30">
        <div className="flex items-center gap-2 mb-3">
          <Check className="w-5 h-5 text-green-700" />
          <span className="font-semibold text-green-700" style={{ fontSize: 'var(--text-label)' }}>
            👍 Use assim
          </span>
        </div>
        <div className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          {correto}
        </div>
      </div>

      {/* Incorreto */}
      <div className="p-4 border-2 border-red-500 rounded-[var(--radius-card)] bg-red-50/30">
        <div className="flex items-center gap-2 mb-3">
          <X className="w-5 h-5 text-red-700" />
          <span className="font-semibold text-red-700" style={{ fontSize: 'var(--text-label)' }}>
            👎 Não assim
          </span>
        </div>
        <div className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          {incorreto}
        </div>
      </div>
    </div>
  );
}

function UpdateDate({ date }: { date: string }) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground mb-6">
      <Calendar className="w-4 h-4" />
      <span style={{ fontSize: 'var(--text-caption)' }}>Atualizado em {date}</span>
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="p-4 mb-6 rounded-[var(--radius-card)] border-l-4 flex items-start gap-3"
      style={{
        borderLeftColor: 'var(--primary)',
        backgroundColor: 'rgba(214, 64, 0, 0.05)'
      }}
    >
      <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
      <div className="text-foreground" style={{ fontSize: 'var(--text-label)', lineHeight: '1.6' }}>
        {children}
      </div>
    </div>
  );
}

// ========================================
// COMPONENTE PRINCIPAL
// ========================================

export function GuiaWritingContent() {
  return (
    <div className="space-y-16">
      {/* ========================================
          SEÇÃO 1: REGRAS GERAIS
      ======================================== */}
      <section id="1-regras-gerais">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <h2
            className="font-semibold scroll-mt-24"
            style={{
              fontSize: 'var(--text-h3)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--primary)',
              letterSpacing: '0.5px'
            }}
          >
            1. INÍCIO - REGRAS GERAIS PARA TEXTOS NAS INTERFACES
          </h2>
          <Badge variant="outline" className="bg-violet-100 text-violet-700 border-violet-200">
            Linguagem
          </Badge>
        </div>
        <div className="h-px bg-border mb-6" />
        <UpdateDate date="março de 2024" />

        <h3
          id="11-seja-claro-objetivo"
          className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          1.1 Seja claro e objetivo
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          A escrita focada na experiência do usuário tem como principal característica uma linguagem simples e intuitiva. O usuário deve ser capaz de absorver o conteúdo com facilidade, sem sobrecarga de informação.
        </p>

        <h3
          id="12-principios-gerais"
          className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          1.2 Princípios gerais
        </h3>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Escreva frases e parágrafos curtos
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Utilize a linguagem neutra, sem marcação de gênero
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Escolha palavras que sejam mais familiares às pessoas. Evite termos técnicos ou palavras estrangeiras
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Botões com 3 a 4 palavras devem dar um direcionamento completo ao usuário
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Deixe evidente onde a pessoa está, qual o próximo passo e alternativas de saída
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Apresente instruções úteis de forma que a pessoa se resolva na própria aplicação
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Evite usar a mesma palavra em uma tela. Busque sinônimos ou mude a ordem da frase
          </li>
        </ul>

        <h3
          id="13-estrutura-texto"
          className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          1.3 Estrutura de texto
        </h3>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Escreva um texto escaneável, isto é, aquele que a pessoa pode entender sem um grande esforço cognitivo
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            A informação principal deve estar clara nos títulos e botões
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Utilize negrito para destacar palavras-chaves ou pequenos trechos
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Para etapas ou passo a passo, utilize tópico
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Divida textos maiores em subtítulos
          </li>
        </ul>
      </section>

      <hr className="my-12 border-t border-border opacity-50" />

      {/* ========================================
          SEÇÃO 2: TOM DE VOZ DA MARCA
      ======================================== */}
      <section id="2-tom-de-voz">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <h2
            className="font-semibold scroll-mt-24"
            style={{
              fontSize: 'var(--text-h3)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--primary)',
              letterSpacing: '0.5px'
            }}
          >
            2. MARKETING - TOM DE VOZ DA MARCA THOMSON REUTERS
          </h2>
          <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
            Marca
          </Badge>
        </div>
        <div className="h-px bg-border mb-6" />
        <UpdateDate date="março de 2024" />

        <h3
          id="21-simplifique-complexo"
          className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          2.1 Simplifique o complexo para os nossos clientes
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          A promessa de marca da Thomson Reuters é de atuar em parceria com seus clientes de forma a trazer orientação em situações complexas, permitindo que eles entendam o momento presente e tenham segurança para os avanços do futuro.
        </p>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Ao desenvolvermos interfaces e conteúdos, devemos ter em mente o propósito da empresa, assim poderemos criar soluções de fácil usabilidade e navegação e que transmitam segurança e confiança aos nossos clientes.
        </p>

        <a
          href="https://brand.thomsonreuters.com/document/466#/-/overview"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-6"
          style={{ fontSize: 'var(--text-base)' }}
        >
          <strong>Confira nosso manual de marca completo</strong>
          <ExternalLink className="w-4 h-4" />
        </a>

        {/* 2.2 Como devemos nos referir à marca Thomson Reuters */}
        <h3
          id="22-referir-marca"
          className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          2.2 Como devemos nos referir à marca Thomson Reuters
        </h3>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Utilize sempre o nome todo da marca com pronome feminino: <strong>a Thomson Reuters</strong>, <strong>da Thomson Reuters</strong>
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Outras soluções da empresa são "da Thomson Reuters", elas não estão "na" ou "fazem da parte da"
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Nunca abrevie o nome da marca e não enfatize as letras TR propositalmente em comunicações
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Em interfaces e comunicações com o cliente, a sigla TR pode ser utilizada apenas em URLs e extensões de e-mail (www.tr.com / suporte@tr.com.br)
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            O aviso de direitos autorais (© direitos autorais 2024 Thomson Reuters) deve estar presente em todas as comunicações maiores do que uma página impressa
          </li>
        </ul>

        {/* 2.3 Como devemos nos referir aos nossos produtos */}
        <h3
          id="23-referir-produtos"
          className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          2.3 Como devemos nos referir aos nossos produtos
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Além do nome Thomson Reuters, também é importante saber se referir adequadamente aos nossos produtos:
        </p>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            O sistema de contabilidade que oferecemos é chamado de <strong>Soluções Domínio da Thomson Reuters</strong>, a primeira letra de todas as palavras é escrita em caixa alta, da mesma forma é a escrita dos <strong>Serviços Digitais da Thomson Reuters</strong>, nossos aplicativos para serviços bancários, benefícios e demais serviços
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            A plataforma em nuvem, <strong>Onvio</strong>, também deve sempre ser grafada apenas com a primeira letra em maiúscula. Os módulos acompanham a mesma estrutura: <strong>Onvio Gestão</strong>, <strong>Onvio Contabilidade</strong>, <strong>Onvio Folha</strong> etc.
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Os apps seguem a mesma forma de escrita, primeira letra de cada palavra maiúscula e demais minúsculas (<strong>Domínio Escritório</strong> e <strong>Domínio Empresa</strong> - ambos no singular). A exceção fica por conta do app para funcionários, <strong>Domínio para Você</strong>, onde a palavra "para" é sempre grafada toda em letra minúscula
          </li>
        </ul>

        {/* 2.4 Personalidade de marca */}
        <h3
          id="24-personalidade-marca"
          className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          2.4 Personalidade de marca
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Nosso tom de voz deve transmitir a nossa personalidade: a de um parceiro resoluto para o público profissional. Para isso, devemos nos comunicar oferecendo precisão e confiabilidade, sem deixar de lado uma abordagem mais próxima, humana, acessível e empática.
        </p>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Queremos transmitir segurança e inspirar paixão pela capacitação de profissionais e resolução de problemas.
        </p>
        <Callout>
          <strong>Somos confiantes, precisos, genuínos e apaixonados.</strong>
        </Callout>
        <a
          href="https://brand.thomsonreuters.com/document/461#/-/overview"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-6"
          style={{ fontSize: 'var(--text-base)' }}
        >
          <strong>Entenda mais sobre nosso tom de voz no Guia Global de Identidade Verbal</strong>
          <ExternalLink className="w-4 h-4" />
        </a>

        {/* 2.5 Somos confiantes, mas nunca arrogantes */}
        <h3
          id="25-somos-confiantes"
          className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          2.5 Somos confiantes, mas nunca arrogantes. O cliente se sente seguro
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          A tradição de marca da Thomson Reuters nos compete uma voz com muita força e integridade.
        </p>
        <p className="mb-3 text-foreground font-semibold" style={{ fontSize: 'var(--text-base)' }}>
          Para ser confiante na escrita devemos:
        </p>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Ser claros, informativos e precisos para esclarecer tópicos complexos
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Encorajar os clientes na tomada de decisão e apoiar seu progresso
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Evitar uma postura altamente emotiva, com expressões ou adjetivos exagerados
          </li>
        </ul>

        {/* 2.6 Somos precisos, mas nunca frios */}
        <h3
          id="26-somos-precisos"
          className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          2.6 Somos precisos, mas nunca frios. O cliente se sente decisivo
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Nossa voz é concreta e fácil de entender, pois tornamos aquilo que é complexo algo acessível a todos.
        </p>
        <p className="mb-3 text-foreground font-semibold" style={{ fontSize: 'var(--text-base)' }}>
          Para ser preciso na escrita devemos:
        </p>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Utilizar frases curtas e não abstratas, em layouts limpos e bem estruturados
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Evitar excesso de palavras, sem deixar informações ou histórias incompletas
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Escrever com objetividade, mas prezando pela cordialidade e simpatia
          </li>
        </ul>

        {/* 2.7 Somos genuínos, mas nunca casuais */}
        <h3
          id="27-somos-genuinos"
          className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          2.7 Somos genuínos, mas nunca casuais. O cliente se sente reconhecido
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Reconhecemos os desafios dos nossos clientes e os apoiamos em suas jornadas. Nos comunicamos de maneira cordial e acessível.
        </p>
        <p className="mb-3 text-foreground font-semibold" style={{ fontSize: 'var(--text-base)' }}>
          Para ser genuínos na escrita devemos:
        </p>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Utilizar o "nós" para nos referirmos à marca e tratarmos o cliente com a proximidade do "você"
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Ser francos, sem uma postura negativista ou de superioridade
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Fazer uma correspondência da nossa comunicação digital ao mundo real
          </li>
        </ul>

        {/* 2.8 Somos apaixonados, mas nunca impetuosos */}
        <h3
          id="28-somos-apaixonados"
          className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          2.8 Somos apaixonados, mas nunca impetuosos. O cliente se sente inspirado
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Nos expressamos com alegria, dinamismo e determinação. Transmitimos confiança quanto ao presente e inspiramos otimismo para o futuro.
        </p>
        <p className="mb-3 text-foreground font-semibold" style={{ fontSize: 'var(--text-base)' }}>
          Para ser apaixonado na escrita devemos:
        </p>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Comunicar e desenvolver interfaces centradas no usuário e na resolução do seu problema presente
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Capacitar o usuário para que ele possa se resolver sem necessidade do nosso apoio
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Evitar promessas grandiosas e inatingíveis, mas incentivar a tomada de decisões
          </li>
        </ul>
      </section>

      <hr className="my-12 border-t border-border opacity-50" />

      {/* ========================================
          SEÇÃO 3: ACESSIBILIDADE
      ======================================== */}
      <section id="3-acessibilidade">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <h2
            className="font-semibold scroll-mt-24"
            style={{
              fontSize: 'var(--text-h3)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--primary)',
              letterSpacing: '0.5px'
            }}
          >
            3. ACESSIBILIDADE - LINGUAGEM INCLUSIVA E REGRAS GERAIS
          </h2>
          <Badge variant="outline" className="bg-teal-100 text-teal-700 border-teal-200">
            Acessibilidade
          </Badge>
        </div>
        <div className="h-px bg-border mb-6" />
        <UpdateDate date="março de 2024" />

        <h3
          id="31-todas-pessoas"
          className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          3.1 Considere que todas as pessoas podem usar a aplicação
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          A adoção de boas práticas de acessibilidade diz respeito a incluir e proporcionar uma melhor experiência para todas as pessoas que possam usar a aplicação.
        </p>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Na escrita, figuras de linguagem, estrangeirismos e expressões capacitistas devem ser evitadas. Prefira sempre palavras e estruturas simples, em uma linguagem neutra.
        </p>

        <h3
          id="32-boas-praticas-linguagem"
          className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          3.2 Boas práticas de linguagem
        </h3>
        <TabelaComparativa
          items={[
            { evitar: 'Seja bem-vindo (a)!', prefira: 'Que bom ter você aqui!' },
            { evitar: 'Atenção!', prefira: 'Importante:' },
            { evitar: 'Workflow', prefira: 'Fluxo de tarefas' },
            { evitar: 'Ver mais informações', prefira: 'Confira mais informações' },
            { evitar: 'Fique tranquilo.', prefira: 'Não se preocupe.' },
            { evitar: 'Fale com o responsável pelo atendimento da sua conta', prefira: 'Entre em contato com o time de atendimento da sua conta' },
          ]}
        />

        {/* 3.3 Boas práticas de design */}
        <h3
          id="33-boas-práticas-de-design" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          3.3 Boas práticas de design
        </h3>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Tenha um layout linear e lógico
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Use textos simples e listas. Evite colunas de texto
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Mantenha o alinhamento de texto à esquerda
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Não utilize itálico e use o recurso de sublinhar apenas em links
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Não espalhe conteúdo pela tela, nem use estruturas desordenadas
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Evite ter muita informação em um só lugar, mas ajude o usuário a lembrar de conteúdos de outras páginas
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Não apresse o usuário sem necessidade: dê tempo suficiente para que ele cumpra uma ação
          </li>
        </ul>
      </section>

      <hr className="my-12 border-t border-border opacity-50" />

      {/* ========================================
          SEÇÃO 4: PADRONIZAÇÃO
      ======================================== */}
      <section id="4-padronizacao">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <h2
            className="font-semibold scroll-mt-24"
            style={{
              fontSize: 'var(--text-h3)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--primary)',
              letterSpacing: '0.5px'
            }}
          >
            4. PADRONIZAÇÃO - RÓTULOS MAIS SIMPLES E PADRONIZADOS
          </h2>
          <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
            Padronização
          </Badge>
        </div>
        <div className="h-px bg-border mb-6" />
        <UpdateDate date="março de 2024" />

        {/* 4.1 Utilize um padrão de linguagem em todos os módulos */}
        <h3
          id="41-utilize-um-padrão-de-linguagem-em-todos-os-módulos" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          4.1 Utilize um padrão de linguagem em todos os módulos
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Trabalhamos em um ecossistema complexo. São muitos módulos no nosso sistema web, aplicativos para três perfis de públicos diferentes e a necessidade de uma simplificação e padronização da linguagem.
        </p>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          É importante que, mesmo em diferentes ambientes, os usuários dos nossos sistemas consigam identificar funcionalidades semelhantes através de um mesmo rótulo. Por isso, vamos trazer aqui alguns conceitos para que você tenha em mente na hora de desenvolver sua interface.
        </p>

        {/* 4.2 Escritório, empresa e cliente */}
        <h3
          id="42-escritório-empresa-e-cliente" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          4.2 Escritório, empresa e cliente
        </h3>
        <p className="mb-3 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          <strong>Escritório:</strong> é o escritório de contabilidade. É quem contrata e utiliza nossos sistemas.
        </p>
        <p className="mb-3 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          <strong>Empresa:</strong> a empresa é aquela que contrata o escritório de contabilidade para que cuide de todas as suas rotinas contábeis.
        </p>
        <p className="mb-3 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          <strong>Cliente:</strong> no nosso dia a dia nos referimos a cliente como o cliente do escritório de contabilidade, isto é, a empresa.
        </p>
        <p className="mb-3 text-foreground font-semibold" style={{ fontSize: 'var(--text-base)' }}>
          Nas interfaces:
        </p>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Não utilize cliente
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Sempre que necessário se refira como <strong>escritório</strong> ou <strong>empresa</strong>, <strong>usuário do escritório</strong> ou <strong>usuário do cliente</strong>
          </li>
        </ul>

        {/* 4.3 Usuário interno, usuário externo, funcionário */}
        <h3
          id="43-usuário-interno-usuário-externo-funcionário" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          4.3 Usuário interno, usuário externo, funcionário
        </h3>
        <p className="mb-3 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          <strong>Usuário interno:</strong> é o funcionário do escritório de contabilidade que tem acesso aos nossos sistemas
        </p>
        <p className="mb-3 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          <strong>Usuário externo:</strong> funcionário da empresa que é cliente do escritório de contabilidade, e que tem acesso ao sistema
        </p>
        <p className="mb-3 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          <strong>Funcionário:</strong> qualquer funcionário da empresa que possa ser cadastrado no sistema para fins contábeis
        </p>
        <p className="mb-3 text-foreground font-semibold" style={{ fontSize: 'var(--text-base)' }}>
          Nas interfaces:
        </p>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Utilize "<strong>Usuário do escritório</strong>" e "<strong>Usuário da empresa</strong>" para que seja mais claro de quem estamos falando
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Utilize sempre "<strong>Funcionário</strong>" para se referir a quem trabalha na empresa (não use "empregado" ou "colaboradores")
          </li>
        </ul>

        {/* 4.4 Utilize palavras e expressões mais simples */}
        <h3
          id="44-utilize-palavras-e-expressões-mais-simples" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          4.4 Utilize palavras e expressões mais simples
        </h3>
        <TabelaComparativa
          items={[
            { evitar: 'Adicionar', prefira: 'Nova pasta / Nova solicitação / Novo documento' },
            { evitar: 'Classificar de A-Z', prefira: 'Ordenar de A-Z' },
            { evitar: 'Retificar vigência', prefira: 'Alterar vigência / Corrigir vigência' },
            { evitar: 'Registrar nova conta', prefira: 'Criar nova conta' },
            { evitar: 'Mostrar mais informações', prefira: 'Exibir mais informações' },
            { evitar: 'Inserir dados', prefira: 'Informar dados' },
          ]}
        />

        {/* 4.5 Rótulos comuns no sistema */}
        <h3
          id="45-rótulos-comuns-no-sistema" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          4.5 Rótulos comuns no sistema
        </h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-muted p-3 text-left border border-border font-semibold" style={{ fontSize: 'var(--text-base)' }}>
                  Rótulos de botões comuns
                </th>
                <th className="bg-muted p-3 text-left border border-border font-semibold" style={{ fontSize: 'var(--text-base)' }}>
                  Rótulos comuns para ações específicas
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-border align-top">
                  <ul className="space-y-1">
                    <li style={{ fontSize: 'var(--text-label)' }}>Adicionar</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Adicionar novo</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Adicionar outro</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Avançar</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Atualizar</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Cadastrar</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Cancelar (ou) Não, cancelar</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Carregar</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Continuar / Sim, continuar</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Concluir</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Criar</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Editar</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Excluir (ou) Sim, excluir</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Emitir</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Enviar</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Fechar</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Filtrar</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Importar</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Remover</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Salvar</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Salvar e adicionar novo</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Salvar e fechar</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Salvar e continuar</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Salvar e concluir</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Desfazer</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Visualizar</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Voltar</li>
                  </ul>
                </td>
                <td className="p-3 border border-border align-top">
                  <ul className="space-y-1">
                    <li style={{ fontSize: 'var(--text-label)' }}>Apurar</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Cadastrar contas</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Calcular folha</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Calcular férias</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Calcular rescisão</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Concluir importação</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Concluir cadastro</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Concluir alteração</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Gerar aviso</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Iniciar estrutura</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Iniciar parametrização</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Parametrizar</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Procure um arquivo</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Remover todos os arquivos</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Salvar retificação</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Salvar nova vigência</li>
                    <li style={{ fontSize: 'var(--text-label)' }}>Usar modelo padrão</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <hr className="my-12 border-t border-border opacity-50" />

      {/* ========================================
          SEÇÃO 5: MAIÚSCULAS E MINÚSCULAS
      ======================================== */}
      <section id="5-maiusculas-minusculas">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <h2
            className="font-semibold scroll-mt-24"
            style={{
              fontSize: 'var(--text-h3)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--primary)',
              letterSpacing: '0.5px'
            }}
          >
            5. COMO UTILIZAR - MAIÚSCULAS E MINÚSCULAS
          </h2>
          <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">
            Formatação
          </Badge>
        </div>
        <div className="h-px bg-border mb-6" />
        <UpdateDate date="março de 2024" />

        {/* 5.1 Saiba quando utilizar letras maiúsculas e minúsculas */}
        <h3
          id="51-saiba-quando-utilizar-letras-maiúsculas-e-minúscul" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          5.1 Saiba quando utilizar letras maiúsculas e minúsculas
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Para além do uso correto de maiúsculas e minúsculas na nossa língua, a escolha do uso de cada uma dessas opções também passa por uma questão de tom de voz e padronização de layout.
        </p>

        {/* 5.2 Caixa alta: Maiúsculas */}
        <h3
          id="52-caixa-alta-maiúsculas" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          5.2 Caixa alta: Maiúsculas
        </h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-muted p-3 text-left border border-border font-semibold" style={{ fontSize: 'var(--text-base)' }}>
                  Quando usar maiúsculas
                </th>
                <th className="bg-muted p-3 text-left border border-border font-semibold" style={{ fontSize: 'var(--text-base)' }}>
                  Exemplo
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-border" style={{ fontSize: 'var(--text-label)' }}>
                  Inícios de parágrafos, botões, headers
                </td>
                <td className="p-3 border border-border" style={{ fontSize: 'var(--text-label)' }}>
                  Buscar por nome de usuário
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-border" style={{ fontSize: 'var(--text-label)' }}>
                  Siglas contabilidade
                </td>
                <td className="p-3 border border-border" style={{ fontSize: 'var(--text-label)' }}>
                  CNAE, CNPJ, IRPF, DANFE
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-border" style={{ fontSize: 'var(--text-label)' }}>
                  Nomes de produtos e módulos
                </td>
                <td className="p-3 border border-border" style={{ fontSize: 'var(--text-label)' }}>
                  Onvio Folha, Onvio Escrita Contábil
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-border" style={{ fontSize: 'var(--text-label)' }}>
                  Na exemplificação de extensões de arquivos
                </td>
                <td className="p-3 border border-border" style={{ fontSize: 'var(--text-label)' }}>
                  Arquivos permitidos: DOC, PDF, PNG ...
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-border" style={{ fontSize: 'var(--text-label)' }}>
                  Na primeira letra de localizações ou nomes de eventos
                </td>
                <td className="p-3 border border-border" style={{ fontSize: 'var(--text-label)' }}>
                  São Paulo, Brasil, Synergy
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-border" style={{ fontSize: 'var(--text-label)' }}>
                  Na primeira letra de nomes e título de trabalho
                </td>
                <td className="p-3 border border-border" style={{ fontSize: 'var(--text-label)' }}>
                  Doutor Francisco
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout>
          <p className="mb-2"><strong>⚠️ Observação Importante</strong></p>
          <p><strong>Importante:</strong> Visualmente, palavras com todas as letras maiúsculas passam a sensação de grito. Por isso, <strong>nunca escreva frases ou palavras inteiras com caixa alta</strong> (exceto siglas consolidadas).</p>
        </Callout>

        {/* 5.3 Caixa baixa: Minúsculas */}
        <h3
          id="53-caixa-baixa-minúsculas" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          5.3 Caixa baixa: Minúsculas
        </h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-muted p-3 text-left border border-border font-semibold" style={{ fontSize: 'var(--text-base)' }}>
                  Quando usar minúsculas
                </th>
                <th className="bg-muted p-3 text-left border border-border font-semibold" style={{ fontSize: 'var(--text-base)' }}>
                  Exemplo
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-border" style={{ fontSize: 'var(--text-label)' }}>
                  Depois de dois pontos [:]
                </td>
                <td className="p-3 border border-border" style={{ fontSize: 'var(--text-label)' }}>
                  Importante: o arquivo será excluído definitivamente após 90 dias.
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-border" style={{ fontSize: 'var(--text-label)' }}>
                  Tamanhos de documentos
                </td>
                <td className="p-3 border border-border" style={{ fontSize: 'var(--text-label)' }}>
                  200 mb / 100 kb
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-border" style={{ fontSize: 'var(--text-label)' }}>
                  Endereços de e-mail e URLs
                </td>
                <td className="p-3 border border-border" style={{ fontSize: 'var(--text-label)' }}>
                  suporte@tr.com.br | www.thomsonreuters.com
                </td>
              </tr>
              <tr>
                <td className="p-3 border border-border" style={{ fontSize: 'var(--text-label)' }}>
                  Extensões de arquivos após o nome do arquivo
                </td>
                <td className="p-3 border border-border" style={{ fontSize: 'var(--text-label)' }}>
                  Você receber um novo documento: Relatório.doc
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <hr className="my-12 border-t border-border opacity-50" />

      {/* ========================================
          SEÇÃO 6: BOTÕES
      ======================================== */}
      <section id="6-botoes">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <h2
            className="font-semibold scroll-mt-24"
            style={{
              fontSize: 'var(--text-h3)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--primary)',
              letterSpacing: '0.5px'
            }}
          >
            6. COMO UTILIZAR - BOTÕES
          </h2>
          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
            Componentes
          </Badge>
        </div>
        <div className="h-px bg-border mb-6" />
        <UpdateDate date="março de 2024" />

        {/* 6.1 Convide para uma ação específica */}
        <h3
          id="61-convide-para-uma-ação-específica" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          6.1 Convide para uma ação específica
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Os botões são componentes de grande importância nas interfaces, pois dão direcionamento ao usuário e, do ponto de vista de negócios, são relevantes para métricas de conversão e adoção de funcionalidades.
        </p>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Os textos devem ser curtos, porém precisam passar informações completas.
        </p>

        {/* 6.2 Primeira letra maiúscula */}
        <h3
          id="62-primeira-letra-maiúscula" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          6.2 Primeira letra maiúscula
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Ao escrever a chamada de um botão, utilize a primeira letra sempre em maiúscula e as demais em minúscula.
        </p>
        <CardsExemplo
          correto="Texto botão"
          incorreto={
            <>
              TEXTO BOTÃO<br />
              texto botão
            </>
          }
        />

        {/* 6.3 Atenção aos verbos */}
        <h3
          id="63-atenção-aos-verbos" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          6.3 Atenção aos verbos
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Para remeter a uma ação que o usuário ou o sistema deve tomar, o verbo deve vir sempre no <strong>infinitivo</strong>.
        </p>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Em se tratando de um botão de decisão, isso é, uma escolha que o usuário deve fazer, podemos usar o verbo em <strong>primeira pessoa</strong> ou no <strong>imperativo</strong>. No caso do verbo imperativo, é importante analisar todo o contexto em que o botão está inserido, para evitar soar rude com o usuário.
        </p>
        <TabelaComparativa
          items={[
            { evitar: 'Continuando para cadastro (Gerúndio)', prefira: 'Continuar para cadastro' },
            { evitar: 'Volte para a página inicial (Instrução longa/vaga)', prefira: 'Quero contratar' },
            { evitar: 'Vá para próxima página (Instrução genérica)', prefira: 'Baixe agora' },
          ]}
        />

        {/* 6.4 Utilize de 3 a 4 palavras apenas */}
        <h3
          id="64-utilize-de-3-a-4-palavras-apenas" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          6.4 Utilize de 3 a 4 palavras apenas
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Para uma leitura mais fluída e de fácil escaneamento, evite utilizar mais de 4 palavras no botão.
        </p>
        <CardsExemplo
          correto="Ir para página inicial"
          incorreto="Quero voltar para página inicial"
        />

        {/* 6.5 Exclua palavras acessórias */}
        <h3
          id="65-exclua-palavras-acessórias" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          6.5 Exclua palavras acessórias
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Sempre que possível, quando não ocasionar prejuízo no entendimento da ação, exclua pronomes e artigos.
        </p>
        <TabelaComparativa
          items={[
            { evitar: 'Concluir meu cadastro', prefira: 'Concluir cadastro' },
            { evitar: 'Cadastrar um novo usuário', prefira: 'Cadastrar novo usuário' },
          ]}
        />

        {/* 6.6 Não traga informações vagas */}
        <h3
          id="66-não-traga-informações-vagas" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          6.6 Não traga informações vagas
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          O usuário precisa entender claramente os próximos passos, por isso o botão deve trazer um direcionamento assertivo e completo.
        </p>
        <TabelaComparativa
          items={[
            { evitar: 'Ver mais', prefira: 'Exibir detalhes' },
            { evitar: 'Cadastrar', prefira: 'Cadastrar empresa' },
          ]}
        />

        {/* 6.7 Não faça perguntas */}
        <h3
          id="67-não-faça-perguntas" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          6.7 Não faça perguntas
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          O botão é utilizado para tomada de ação, portanto, ainda que utilizando uma linguagem mais informal, não utilize o botão para um questionamento. A pontuação também não se faz necessária na maioria dos casos.
        </p>
        <TabelaComparativa
          items={[
            { evitar: 'Vamos continuar? (Interrogação)', prefira: 'Vamos lá' },
            { evitar: 'Quero contratar! (Exclamação)', prefira: 'Sim, quero continuar' },
          ]}
        />

        {/* 6.8 Botões primário + Botão secundário */}
        <h3
          id="68-botões-primário-botão-secundário" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          6.8 Botões primário + Botão secundário
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Ao utilizar botões primários e secundários, a ação preferencial deve ser descrita no botão primário.
        </p>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Na apresentação visual, para melhor usabilidade e acessibilidade, o botão secundário deve ser apresentado antes do botão primário.
        </p>

        {/* 6.9 Cuidado com a acessibilidade */}
        <h3
          id="69-cuidado-com-a-acessibilidade" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          6.9 Cuidado com a acessibilidade
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Indicações de cores e espaços na tela nunca devem ser usados como referência para um texto, principalmente em um botão, pois prejudicam a acessibilidade, especialmente no uso de leitores de tela.
        </p>
        <CardsExemplo
          correto="Confirmar dados"
          incorreto="Confirmar dados acima"
        />
      </section>

      <hr className="my-12 border-t border-border opacity-50" />

      {/* ========================================
          SEÇÃO 7: TELAS DE FEEDBACK
      ======================================== */}
      <section id="7-telas-feedback">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <h2
            className="font-semibold scroll-mt-24"
            style={{
              fontSize: 'var(--text-h3)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--primary)',
              letterSpacing: '0.5px'
            }}
          >
            7. COMO UTILIZAR - TELAS DE SUCESSO, PROCESSAMENTO E ERRO
          </h2>
          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
            Componentes
          </Badge>
        </div>
        <div className="h-px bg-border mb-6" />
        <UpdateDate date="março de 2024" />

        {/* 7.1 Mantenha o cliente nas nossas aplicações */}
        <h3
          id="71-mantenha-o-cliente-nas-nossas-aplicações" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          7.1 Mantenha o cliente nas nossas aplicações
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          As telas de sucesso, processamento e erro são muito importantes para manter o engajamento do cliente na aplicação, pois são oportunidades de demonstrar para o usuário caminhos diferentes tanto para explorar novas funcionalidades, quanto para a resolução de problemas sem necessidade de mudança de canal.
        </p>

        {/* 7.2 Cuidado com a acessibilidade */}
        <h3
          id="72-cuidado-com-a-acessibilidade" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          7.2 Cuidado com a acessibilidade
        </h3>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Use sempre alinhamento à esquerda, especialmente para o texto de apoio
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Não utilize itálico, caso queira destacar alguma informação opte pelo negrito na mesma cor do texto
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Traga informações completas para que o usuário não tenha dúvidas quanto ao status e próximos passos e sinta-se seguro com as informações recebidas
          </li>
        </ul>

        {/* 7.3 Telas de sucesso */}
        <h3
          id="73-telas-de-sucesso" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          7.3 Telas de sucesso
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          As telas de sucesso são nossa melhor possibilidade de criar conexão com o usuário e demonstrar a personalidade da marca.
        </p>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Utilize o título para a mensagem principal e deixe claro o motivo do sucesso
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Utilize pontuação no fim da frase. A exclamação pode ser usada para celebrar o cliente
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Traga opções para que o cliente possa sair daquela tela e se manter na aplicação: Ir para página inicial, Abrir comprovante, Editar outra empresa etc.
          </li>
        </ul>

        {/* 7.4 Estrutura da tela de sucesso */}
        <h3
          id="74-estrutura-da-tela-de-sucesso" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          7.4 Estrutura da tela de sucesso
        </h3>
        <ol className="space-y-3 ml-6 list-decimal mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            <strong>Header:</strong> Botão fechar, que deve direcionar para tela inicial da jornada ou da aplicação
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            <strong>Big icon checkmark</strong> com título de até 2 linhas alinhamento ao centro
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            <strong>Texto de apoio</strong> curto, com alinhamento à esquerda. Para destacar alguma informação use negrito e, se necessário um texto maior, faça a quebra de linhas
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            <strong>Botão secundário</strong> opcional, pode direcionar usuário para uma jornada complementar
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            <strong>Botão primário</strong> deve direcionar usuário para jornada complementar ou tela inicial da jornada ou da aplicação
          </li>
        </ol>

        {/* 7.6 Telas de processamento */}
        <h3
          id="76-telas-de-processamento" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          7.6 Telas de processamento
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          A tela de processamento deve ser usada para ações que precisam de uma validação antes de ser indicado de fato o sucesso ou erro ao final da jornada.
        </p>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            No título, use uma frase neutra para que não haja o desapontamento do cliente caso o resultado final não seja positivo
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            O texto de apoio deve trazer uma expectativa de prazo e alternativas para a espera do cliente, além de deixar claro os próximos passos
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Sugira opções de funcionalidades para que o cliente conheça mais da nossa aplicação enquanto aguarda o retorno da sua solicitação
          </li>
        </ul>

        {/* 7.7 Estrutura da tela de processamento */}
        <h3
          id="77-estrutura-da-tela-de-processamento" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          7.7 Estrutura da tela de processamento
        </h3>
        <ol className="space-y-3 ml-6 list-decimal mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            <strong>Header:</strong> Botão fechar, que deve direcionar para tela inicial da jornada ou da aplicação
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            <strong>Big icon clock</strong> com título de até 2 linhas alinhamento ao centro
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            <strong>Texto de apoio</strong> curto, com alinhamento à esquerda. Para destacar alguma informação use negrito e, se necessário um texto maior, faça a quebra de linhas
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            <strong>Botão secundário</strong> opcional, pode direcionar usuário para uma jornada complementar
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            <strong>Botão primário</strong> deve direcionar usuário para jornada complementar ou tela inicial da jornada ou da aplicação
          </li>
        </ol>

        {/* 7.9 Telas de erro */}
        <h3
          id="79-telas-de-erro" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          7.9 Telas de erro
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          A tela de erro trata de um momento de frustração para o usuário, por isso, usamos uma linguagem leve e empática, para acolher e amenizar a situação.
        </p>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Use o título para explicar o motivo do erro de forma breve e objetiva
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Utilize "por favor" e "desculpe" quando o erro foi causado por nossa aplicação
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Explique o erro de forma mais detalhada no texto de apoio, ofereça formas de resolver o problema ou, se for o caso, informe que já estamos trabalhando para sua correção
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            O contato com o suporte só deve ser indicado quando não houver nenhuma possibilidade de ação dentro da aplicação e, quando preciso acioná-lo, deixe claro número de contato e horários de atendimento
          </li>
        </ul>

        {/* 7.10 Estrutura da tela de erro */}
        <h3
          id="710-estrutura-da-tela-de-erro" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          7.10 Estrutura da tela de erro
        </h3>
        <ol className="space-y-3 ml-6 list-decimal mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            <strong>Header:</strong> Botão fechar, que deve direcionar para tela inicial da jornada ou da aplicação
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            <strong>Big icon block</strong> com título de até 2 linhas alinhamento ao centro
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            <strong>Texto de apoio</strong> curto, com alinhamento à esquerda. Para destacar alguma informação use negrito e, se necessário um texto maior, faça a quebra de linhas
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            <strong>Código de erro</strong> para auxiliar em caso de suporte ao cliente
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            <strong>Botão secundário</strong> opcional, pode direcionar usuário para uma jornada complementar
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            <strong>Botão primário</strong> deve direcionar usuário para jornada complementar ou tela inicial da jornada ou da aplicação
          </li>
        </ol>
      </section>

      <hr className="my-12 border-t border-border opacity-50" />

      {/* ========================================
          SEÇÕES 8-13 (Resumidas para economia de espaço)
      ======================================== */}
      <section id="8-empty-spaces">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <h2
            className="font-semibold scroll-mt-24"
            style={{
              fontSize: 'var(--text-h3)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--primary)',
              letterSpacing: '0.5px'
            }}
          >
            8. COMO UTILIZAR - RETORNOS VAZIOS (EMPTY SPACES)
          </h2>
          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
            Componentes
          </Badge>
        </div>
        <div className="h-px bg-border mb-6" />
        <UpdateDate date="março de 2024" />

        {/* 8.1 Analise cada caso para escolher o melhor formato */}
        <h3
          id="81-analise-cada-caso-para-escolher-o-melhor-formato" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          8.1 Analise cada caso para escolher o melhor formato
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Por definição os "espaços vazios" são telas ou mensagens usadas quando ainda não há retorno para uma requisição do usuário. Essa falta de retorno pode acontecer por 4 momentos de uma jornada e cada uma delas deve ser trabalhada de uma forma:
        </p>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            <strong>Tela inicial de uma jornada:</strong> o empty space deve ser encarado como uma tela de boas-vindas
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            <strong>Filtro não aplicado dentro de uma jornada ou localizado em apenas parte da tela:</strong> empty space padrão
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            <strong>Informações não disponíveis após filtro ou busca:</strong> sem retorno com orientação para novas buscas
          </li>
        </ul>

        {/* 8.2 Empty space: boas-vindas */}
        <h3
          id="82-empty-space-boas-vindas" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          8.2 Empty space: boas-vindas
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Quando uma nova função é apresentada dentro de uma aplicação, pode ser necessária alguma interação do usuário até que as informações relativas à jornada sejam de fato apresentadas.
        </p>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Em situações como essas, é importante encararmos o empty space como uma tela de boas-vindas, isso é, uma apresentação da funcionalidade com alguma mensagem de apoio sobre como contratar e/ou fazer o primeiro uso.
        </p>

        {/* 8.3 Boas-vindas na prática */}
        <h3
          id="83-boas-vindas-na-prática" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          8.3 Boas-vindas na prática
        </h3>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Tem uma linguagem mais amigável
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Explica a funcionalidade antes de trazer a orientação para a tomada de ação
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Caso seja necessária uma contratação, orienta onde e como fazer, e traz respostas para dúvidas frequentes sobre funcionamento, contratação, modelos, vigência, cancelamento e o que mais for pertinente
          </li>
        </ul>

        {/* 8.4 Empty space: padrão */}
        <h3
          id="84-empty-space-padrão" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          8.4 Empty space: padrão
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Temos uma mensagem e componente padrão para indicar para nossos usuários a necessidade de incluir filtros para o retorno de uma requisição e, nestes casos, é ele que deve ser usado.
        </p>

        {/* 8.5 Empty space padrão na prática */}
        <h3
          id="85-empty-space-padrão-na-prática" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          8.5 Empty space padrão na prática
        </h3>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Tem um tom mais informativo
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            É uma mensagem curta e objetiva
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Orienta sobre a ação que deve ser tomada, indicando com clareza quais opções de filtro estão disponíveis, por exemplo e como deve ser usado
          </li>
        </ul>

        {/* 8.6 Empty space: resultado não encontrado */}
        <h3
          id="86-empty-space-resultado-não-encontrado" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          8.6 Empty space: resultado não encontrado
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Também para o caso de requisições sem retorno, temos um empty space padrão que indica que a busca foi concluída sem nenhum resultado correspondente. Essa mensagem pode ser incrementada de acordo com o cenário e possibilidades existentes para o usuário.
        </p>

        {/* 8.7 Resultado não encontrado na prática */}
        <h3
          id="87-resultado-não-encontrado-na-prática" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          8.7 Resultado não encontrado na prática
        </h3>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Tem um tom um pouco mais formal e deve oferecer saídas ao usuário (como, por exemplo, sugerir que seja buscado um período diferente como opção de filtragem)
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Caso o retorno seja vazio por algum problema nosso (informação ainda não foi inserida por nós no sistema ou a funcionalidade em questão ainda está em desenvolvimento, por exemplo), cabe um pedido de desculpas para o usuário e uma explicação um pouco mais aprofundada, conforme a situação
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Sempre que possível é válido convidar o usuário a uma tomada de ação complementar, como, por exemplo, inclusão de saldo quando este for insuficiente ou preenchimento de dados quando estiverem faltando
          </li>
        </ul>
      </section>

      <hr className="my-12 border-t border-border opacity-50" />

      <section id="9-loading">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <h2
            className="font-semibold scroll-mt-24"
            style={{
              fontSize: 'var(--text-h3)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--primary)',
              letterSpacing: '0.5px'
            }}
          >
            9. COMO UTILIZAR - CARREGAMENTO DE PÁGINA (LOADING)
          </h2>
          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
            Componentes
          </Badge>
        </div>
        <div className="h-px bg-border mb-6" />
        <UpdateDate date="março de 2024" />

        {/* 9.1 Melhore a experiência de espera do cliente */}
        <h3
          id="91-melhore-a-experiência-de-espera-do-cliente" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          9.1 Melhore a experiência de espera do cliente
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          A percepção de tempo pode ser muito relativa, por isso, investir em boas mensagens e experiências de loading de página é muito importante para evitar uma percepção de lentidão ou instabilidade na espera do cliente.
        </p>

        {/* 9.2 Quando e como usar o loading de página */}
        <h3
          id="92-quando-e-como-usar-o-loading-de-página" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          9.2 Quando e como usar o loading de página
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          A mensagem de loading deve ser usada quando haverá um tempo de espera para o carregamento das informações da página (seja uma tela inteira ou partes dela).
        </p>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Além de indicações visuais de espera, como o símbolo de carregamento e exibição do skeleton, frases que informam o que está acontecendo e o que está sendo validado no momento são bem-vindas.
        </p>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Botões podem mudar o status visualmente, acompanhados de uma label no gerúndio (carregando / aguardando informações).
        </p>
      </section>

      <hr className="my-12 border-t border-border opacity-50" />

      <section id="10-notificacoes">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <h2
            className="font-semibold scroll-mt-24"
            style={{
              fontSize: 'var(--text-h3)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--primary)',
              letterSpacing: '0.5px'
            }}
          >
            10. COMO UTILIZAR - NOTIFICAÇÕES DO SISTEMA
          </h2>
          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
            Componentes
          </Badge>
        </div>
        <div className="h-px bg-border mb-6" />
        <UpdateDate date="março de 2024" />

        {/* 10.1 Utilize o formato mais adequado para cada situação */}
        <h3
          id="101-utilize-o-formato-mais-adequado-para-cada-situação" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          10.1 Utilize o formato mais adequado para cada situação
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          As notificações do sistema devem ser aplicadas de maneira a ajudar o usuário a tomar conhecimento ou lembrar de alguma informação. A forma de contato escolhida, e-mail, push ou SMS de celular, WhatsApp ou notificação na própria plataforma, devem levar em conta o que será comunicado e o objetivo da mensagem, além do momento que será enviado e a preferência do usuário.
        </p>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Não devemos ser inconvenientes, enviando notificações em excesso, por isso, é importante analisar as mensagens já existentes para verificar se a nova informação pode ser incluída em uma notificação já existente.
        </p>

        {/* 10.2 Quando utilizar cada formato: E-mail */}
        <h3
          id="102-quando-utilizar-cada-formato-e-mail" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          10.2 Quando utilizar cada formato: E-mail
        </h3>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Use para informações mais longas, anexos de relatórios e outros documentos, compilado de informações
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            O assunto do e-mail deve ser curto e objetivo, deixando claro o tema principal que será tratado na mensagem
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Pode ter uma linguagem mais formal e incluir informações adicionais, tais como: instruções mais completas, lembretes de ações relacionadas ao assunto principal do e-mail, call to action para contratação de produtos adicionais que possam auxiliar no processo em questão etc.
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Como o e-mail pode não ser acessado com tanta frequência é importante que o usuário seja informado de que será comunicado por esse meio, além disso, pode ser interessante a redundância da informação (envio por e-mail e notificação de sistema, por exemplo)
          </li>
        </ul>

        {/* 10.3 Quando utilizar cada formato: Push / SMS */}
        <h3
          id="103-quando-utilizar-cada-formato-push-sms" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          10.3 Quando utilizar cada formato: Push / SMS
        </h3>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Use para ações mais promocionais, isto é incentivo a uma tomada de ação ou oportunidades em tempo real
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Use frases curtas, objetivas e que convidem o usuário para o acesso ao app, onde deverá haver mais informações
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Para que o envio do push ou SMS seja de fato relevante, é importante que as ofertas oferecidas sejam interessantes para o usuário, no entanto, não devemos fazer promessas vazias ou utilizar frases de grande impacto apenas como clickbait. Verifique cada caso para não ser intrusivo e incômodo para o usuário
          </li>
        </ul>

        {/* 10.4 Quando utilizar cada formato: WhatsApp e notificação na plataforma */}
        <h3
          id="104-quando-utilizar-cada-formato-whatsapp-e-notificaçã" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          10.4 Quando utilizar cada formato: WhatsApp e notificação na plataforma
        </h3>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Uma notificação na plataforma ou até mesmo uma notificação via WhatsApp tem caráter de urgência, isto é, devemos optar por esse tipo de mensagem apenas em casos que precisamos de uma ação imediata do usuário
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Notificações na plataforma, também podem ser mensagens rápidas formalizando/documentando uma informação, por exemplo, "Você recebeu um Pix no valor de R$ 10,00", "Nova solicitação enviada pelo cliente" etc.
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Use textos curtos e objetivos como título, as mensagens também devem ser simples e claras, mas devem trazer instruções mais completas para não deixar dúvidas no usuário
          </li>
        </ul>

        {/* 10.5 Importante */}
        <h3
          id="105-importante" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          10.5 Importante
        </h3>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Todo meio de comunicação com o usuário deve poder ser configurado por ele, ou seja, o usuário deve poder escolher se deseja ou não receber as mensagens não obrigatórias do sistema
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Sempre que possível, o cliente também deve poder escolher o formato preferencial de recebimento da notificação e a periodicidade de envio. Para todas as escolhas do cliente, é preciso que fique clara a regra que está sendo estabelecida para que não haja perda de informações importantes
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Sempre que alguma notificação envolver contratação e/ou ativação de produtos, serviços ou funcionalidades por meio de um determinado canal, o cancelamento desse produto, serviço ou função, deve estar disponível no mesmo canal de contratação
          </li>
        </ul>

        {/* 10.6 Arquivos anexos ou para download */}
        <h3
          id="106-arquivos-anexos-ou-para-download" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          10.6 Arquivos anexos ou para download
        </h3>
        <ul className="space-y-3 ml-6 list-disc mb-4">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Todo arquivo para download é necessário que seja baixado em PDF acessível para leitura de tela
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            A fim de facilitar a identificação do arquivo, sugerimos que ele seja nomeado de forma padrão: <strong>[tipo de material - se aplicável] + Nome + (data) + Marca</strong>
          </li>
        </ul>
        <p className="mb-2 text-foreground font-semibold" style={{ fontSize: 'var(--text-base)' }}>
          Exemplos:
        </p>
        <ul className="space-y-2 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            [Relatório] Visualização de documentos (setembro/2024) - Onvio Documentos
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Comprovante Pix (27/09/2024) - Domínio Conta Digital
          </li>
        </ul>
      </section>

      <hr className="my-12 border-t border-border opacity-50" />

      <section id="11-alerts-hover-tooltips">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <h2
            className="font-semibold scroll-mt-24"
            style={{
              fontSize: 'var(--text-h3)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--primary)',
              letterSpacing: '0.5px'
            }}
          >
            11. COMO UTILIZAR - ALERTS, HOVER E TOOLTIPS
          </h2>
          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
            Componentes
          </Badge>
        </div>
        <div className="h-px bg-border mb-6" />
        <UpdateDate date="março de 2024" />

        {/* 11.1 Escreva textos curtos que não prejudiquem o entendimento */}
        <h3
          id="111-escreva-textos-curtos-que-não-prejudiquem-o-entend" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          11.1 Escreva textos curtos que não prejudiquem o entendimento
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Os componentes de alert, hover e tooltips são muito importantes para trazer feedbacks mais objetivos ou mais esclarecimento sobre um assunto.
        </p>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Devido à característica destes componentes, é importante que eles tragam textos curtos, de no máximo 3 ou 4 linhas, porém o conteúdo deve ser compreensível e trazer dados completos para a tomada de decisão do usuário. Caso não seja possível fazer isso em poucas linhas, escolha utilizar uma tela inteira para sucesso ou erro ou, para caso de informações complementares, opte por modais/drawers.
        </p>

        {/* 11.2 Cuidado com a acessibilidade */}
        <h3
          id="112-cuidado-com-a-acessibilidade" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          11.2 Cuidado com a acessibilidade
        </h3>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Todos os alerts devem conter botão de fechar, para que esta ação seja tomada no tempo do usuário, ou seja, nenhum alert, seja de sucesso ou erro, deve desaparecer automaticamente
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Os tooltips devem ser utilizados para informações adicionais e, assim sendo, o usuário deve percebê-lo como algo que pode ser exibido ou não sem alteração do conteúdo principal da página
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Na criação de uma central de alertas ou definição de um novo alerta de sistema (que não alerta de erro e/ou conclusão de jornada), lembre de possibilitar ao usuário a configuração de sua preferência de recebimento
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Ao criar links complementares, mesmo em mensagens curtas, observe a estrutura do texto para que a mensagem faça sentido também para usuários não visuais
          </li>
        </ul>

        {/* 11.3 Alert */}
        <h3
          id="113-alert" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          11.3 Alert
        </h3>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Atente-se para a natureza do alerta: um alerta informativo é diferente de um alerta de erro e o tom de voz de cada um deles deve estar adequado à situação
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            O alerta de erro deve ser usado quando não é possível para o usuário prosseguir na jornada devido ao erro em questão, já o alerta informativo, apenas indica a necessidade de inclusão ou alteração de alguma informação para continuar a jornada
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            O tom de voz em cada tipo de alerta deve corresponder ao sentimento da mensagem, ou seja, um alerta de sucesso, pode ser mais leve, curto e objetivo; já os alertas informativos e de erro precisam de um tom um pouco mais formal e mais informações adicionais
          </li>
        </ul>

        {/* 11.4 Hover */}
        <h3
          id="114-hover" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          11.4 Hover
        </h3>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Utilizado para informações curtas e complementares, o hover serve como um apoio de conteúdo, mas deve ser usado com cautela dado às suas características de usabilidade e acessibilidade
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Utilize como rótulo de botões que visualmente são apresentados apenas como ícones e, neste caso, descreva a ação esperada do botão, nunca o ícone (um ícone de lixeira, por exemplo, terá um hover "excluir")
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Caso uma label ou conteúdo curto não possa ser apresentado por completo na interface, inclua o hover com a frase completa, de forma que a mensagem principal possa ser compreendida pelo usuário. Havendo informações complementares, inclua um link que indique onde é possível acessar a informação inteira
          </li>
        </ul>

        {/* 11.5 Tooltip */}
        <h3
          id="115-tooltip" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          11.5 Tooltip
        </h3>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            O tooltip deve trazer informações complementares para melhor entendimento de um rótulo ou funcionalidade, no entanto, deve ser compreendido como um texto de leitura opcional, ou seja, se a informação for de extrema importância, ela deve ser apresentada de maneira mais explícita na interface
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Por se tratar de um texto explicativo, o tooltip deve ter um tom formal, mas acolhedor, trazendo uma informação clara e objetiva de forma que não restem dúvidas para o usuário quanto àquele rótulo (lembre que se trata de um texto opcional, portanto, se o usuário está recorrendo a este recurso é porque ele tem mesmo dúvidas sobre o tópico em questão)
          </li>
        </ul>
      </section>

      <hr className="my-12 border-t border-border opacity-50" />

      <section id="12-datas-valores">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <h2
            className="font-semibold scroll-mt-24"
            style={{
              fontSize: 'var(--text-h3)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--primary)',
              letterSpacing: '0.5px'
            }}
          >
            12. COMO UTILIZAR - DATAS, HORÁRIOS, VALORES MONETÁRIOS E NÚMEROS
          </h2>
          <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">
            Formatação
          </Badge>
        </div>
        <div className="h-px bg-border mb-6" />
        <UpdateDate date="março de 2024" />

        {/* 12.1 Saiba como escrever dias da semana, mês e ano, horário, valores e outros */}
        <h3
          id="121-saiba-como-escrever-dias-da-semana-mês-e-ano-horár" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          12.1 Saiba como escrever dias da semana, mês e ano, horário, valores e outros
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Manter uma unidade de escrita dentro de plataformas digitais é muito importante para consistência de linguagem e, muitas vezes, nos questionamos a melhor maneira de escrever dias, meses, anos, horários; pontuação de telefones, espaço entre caracteres após o cifrão etc.
        </p>

        {/* 12.2 Regra geral */}
        <h3
          id="122-regra-geral" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          12.2 Regra geral
        </h3>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Privilegie o uso dos números de fato como numerais de 0 a 9
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Números ordinais, também deve ser apresentados como numerais: 1ª, 2ª, 3ª
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Não inicie frases diretamente com números, utilize um substantivo, verbo ou algum conector no início da frase para que ela tenha mais contexto
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Para instruções ou textos corridos, verifique o contexto para analisar a forma de apresentação do numeral que fará mais sentido
          </li>
        </ul>

        {/* 12.3 Regras gerais na prática */}
        <h3
          id="123-regras-gerais-na-prática" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          12.3 Regras gerais na prática
        </h3>
        <TabelaComparativa
          items={[
            { evitar: 'Escolha uma senha entre oito e doze caracteres', prefira: 'Escolha uma senha entre 8 e 12 caracteres' },
            { evitar: 'Emitir segunda via do boleto', prefira: 'Emitir 2ª via do boleto' },
            { evitar: '3 passos para o cadastro', prefira: 'São 3 passos para cadastrar' },
            { evitar: 'Clique na 2ª opção do menu Configurações e altere seu perfil', prefira: 'Clique na segunda opção do menu Configurações e altere seu perfil' },
          ]}
        />

        {/* 12.4 Datas e dias da semana */}
        <h3
          id="124-datas-e-dias-da-semana" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          12.4 Datas e dias da semana
        </h3>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Procure tornar a referência da data o mais claro possível, utilizando sempre que cabível, a data acompanhada de ontem, hoje, amanhã ou referência de quantidade de dias e data exata
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Utilize o "-feira" sempre ao indicar um dia da semana, exceto quando período de semana
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Indique dias e meses com dois dígitos ou, quando em texto, três caracteres
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Não abrevie os anos, use sempre os quatro dígitos
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Ao abreviar período de meses use um traço para a separação ou, ponto e vírgula com mês e ano indicados para meses específicos e não sequenciais
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Deixe claro quando se tratam de dias úteis ou dias corridos
          </li>
        </ul>

        {/* 12.5 Datas e dias da semana na prática */}
        <h3
          id="125-datas-e-dias-da-semana-na-prática" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          12.5 Datas e dias da semana na prática
        </h3>
        <TabelaComparativa
          items={[
            { evitar: 'Transferência agendada para 04/09/2024', prefira: 'Transferência agendada para amanhã, 04/09.' },
            { evitar: 'De segunda a sexta.', prefira: 'De segunda a sexta-feira' },
            { evitar: 'Toda segunda.', prefira: 'Às segundas-feiras' },
            { evitar: '4 de setembro', prefira: '04 de setembro' },
            { evitar: '4/9/24', prefira: '04/09/2024' },
            { evitar: '04 de setembro de 24', prefira: '04 de setembro de 2024' },
            { evitar: 'De janeiro a dezembro/24', prefira: 'Em até 2 dias úteis ou Nos próximos 2 dias.' },
            { evitar: 'Em até 2 dias', prefira: '04 de setembro' },
            { evitar: 'Em 15 dias', prefira: 'Em 15 dias, 20 de setembro.' },
          ]}
        />

        {/* 12.6 Horários */}
        <h3
          id="126-horários" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          12.6 Horários
        </h3>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Para indicar horários utilize dois pontos entre horas e minutos
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Escreva sempre horas, minutos e segundos com dois dígitos
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Indique sempre horas e minutos, os segundos são opcionais conforme necessidade da aplicação (auditoria de alteração de estados do sistema, por exemplo)
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Para indicar dia e hora, utilize a estrutura: dd/mm/aaaa às hh:mm
          </li>
        </ul>

        {/* 12.7 Horários na prática */}
        <h3
          id="127-horários-na-prática" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          12.7 Horários na prática
        </h3>
        <TabelaComparativa
          items={[
            { evitar: '10h30min', prefira: '10:30' },
            { evitar: '07h30', prefira: '7:30' },
            { evitar: '10h30min5s', prefira: '10:30:05' },
            { evitar: '10h', prefira: '10:00' },
            { evitar: 'Última atualização: 4/09 - 9h', prefira: 'Última atualização: 04/09/2024 às 9:00' },
          ]}
        />

        {/* 12.8 Valores monetários */}
        <h3
          id="128-valores-monetários" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          12.8 Valores monetários
        </h3>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Escreva valores financeiros da moeda brasileira com R$ ao invés de "reais"
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Utilize o espaço de um toque entre R$ e o valor em questão
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Acima de 999, utilize ponto para separar casas decimais (1.000, 1.000.000 etc)
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Não arredonde valores, apresente sempre os centavos
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Para abreviação de valores utilize [valor]M (mi), [valor]K (milhão), [valor]B (bilhão). Use esse recurso em último caso, apenas quando não houver nenhuma outra possibilidade no layout
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Para moedas estrangeiras, avalie cada cenário individualmente o que faz mais sentido para o seu público, mas, de modo geral, procure indicar num mesmo contexto - título de sessão e indicação monetária, por exemplo - sigla e nome da moeda por extenso (USD = dólares americanos, ARS = pesos argentinos etc.)
          </li>
        </ul>

        {/* 12.9 Valores monetários na prática */}
        <h3
          id="129-valores-monetários-na-prática" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          12.9 Valores monetários na prática
        </h3>
        <TabelaComparativa
          items={[
            { evitar: '12 reais', prefira: 'R$ 12,00' },
            { evitar: 'R$12,00 reais', prefira: 'R$ 12,00' },
            { evitar: 'R$ 05', prefira: 'R$ 5,00' },
            { evitar: 'Mil e 500 reais', prefira: 'R$ 1.500,00' },
            { evitar: 'R$ 1.352,98 = R$ 1.353', prefira: 'R$ 1.352,98' },
            { evitar: 'R$ 10Mi', prefira: 'R$ 10K / R$ 10 milhões' },
          ]}
        />

        {/* 12.10 Telefones */}
        <h3
          id="1210-telefones" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          12.10 Telefones
        </h3>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Sempre que indicar um número de contato para suporte, lembre-se de trazer informações completas sobre ele, isto é, dias e horários de atendimento, DDD e DDI, se o número é para atendimento geral ou apenas capitais, entre outras informações importantes
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Utilize espaço de um toque a cada 4 números para respiro na leitura
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Utilize 2 dígitos para DDD e escreva-os entre parênteses
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Para DDI utilize o símbolo "+" antecedendo o número
          </li>
        </ul>

        {/* 12.11 Telefones na prática */}
        <h3
          id="1211-telefones-na-prática" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          12.11 Telefones na prática
        </h3>
        <TabelaComparativa
          items={[
            { evitar: '1234-5678', prefira: '1234 5678' },
            { evitar: '11 1234 5678', prefira: '(11) 1234 5678' },
            { evitar: '0800.000.0000.0000', prefira: '0800 0000 0000' },
            { evitar: '55 (11) 1234-5678', prefira: '+55 (11) 1234 5678' },
          ]}
        />
      </section>

      <hr className="my-12 border-t border-border opacity-50" />

      <section id="13-pontuacao">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <h2
            className="font-semibold scroll-mt-24"
            style={{
              fontSize: 'var(--text-h3)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--primary)',
              letterSpacing: '0.5px'
            }}
          >
            13. COMO UTILIZAR - PONTUAÇÃO
          </h2>
          <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">
            Formatação
          </Badge>
        </div>
        <div className="h-px bg-border mb-6" />
        <UpdateDate date="março de 2024" />

        {/* 13.1 Utilize a pontuação a favor da interface */}
        <h3
          id="131-utilize-a-pontuação-a-favor-da-interface" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          13.1 Utilize a pontuação a favor da interface
        </h3>
        <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          No cenário digital, onde a comunicação precisa ser dinâmica e objetiva, o uso correto da pontuação se faz ainda mais necessária para o engajamento do usuário e também para maior clareza da informação.
        </p>

        {/* 13.2 Ponto final (.) */}
        <h3
          id="132-ponto-final-" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          13.2 Ponto final (.)
        </h3>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Utilize o ponto final no final de frases completas para organizar informações longas
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Prefira escrever várias frases curtas, com ponto final, ao invés de uma frase longa com várias vírgulas
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            <strong>Quando não utilizar:</strong> títulos e cabeçalhos de páginas, botões, dropdown, checkbox, listas ou descritivos em tópicos e rótulos de formulários
          </li>
        </ul>

        {/* 13.3 Exclamação (!) e interrogação (?) */}
        <h3
          id="133-exclamação-e-interrogação-" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          13.3 Exclamação (!) e interrogação (?)
        </h3>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Ambos os sinais são bem-vindos desde usados com moderação e num contexto pertinente
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Procure utilizar apenas um ponto de exclamação por tela inteira, frase ou alert
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Utilize o ponto de exclamação em telas de sucesso e feedbacks positivos
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            O ponto de interrogação deve ser usado apenas em formulários ou telas usadas para interação de usuário (NPS ou solicitação de feedback ou avaliação da interface)
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Não faça perguntas retóricas, isto é, perguntas para as quais não se espera uma resposta
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Nunca utilize exclamação e interrogação juntos
          </li>
        </ul>

        {/* 13.4 Dois pontos (:) */}
        <h3
          id="134-dois-pontos-" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          13.4 Dois pontos (:)
        </h3>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Os dois pontos devem ser usados no fim de uma frase para preceder listas em tópicos
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            O uso dos dois pontos após um rótulo, só deve ocorrer se o valor correspondente estiver na mesma linha
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Após o uso dos dois pontos, inicie o texto com letra minúscula
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Não utilize dois pontos mais de uma vez em um mesmo contexto
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Analise sempre a estrutura da frase para verificar se realmente é necessário o uso dos dois pontos
          </li>
        </ul>

        {/* 13.5 Reticências (...) */}
        <h3
          id="135-reticências-" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          13.5 Reticências (...)
        </h3>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            O uso de reticências (...) é bem-vindo em telas de loading e carregamento, mas deve ser usado com moderação e apenas uma vez, ao final da frase
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Também é possível usar as reticências (...) em situações da interface onde um valor não pode ser totalmente exibido na interface e, nesse caso, idealmente deve existir a funcionalidade de hover exibindo o texto completo
          </li>
        </ul>

        {/* 13.6 Vírgula (,) e ponto e vírgula (;) */}
        <h3
          id="136-vírgula-e-ponto-e-vírgula-" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          13.6 Vírgula (,) e ponto e vírgula (;)
        </h3>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            O uso correto da vírgula conforme as regras gramaticais da língua portuguesa é muito importante para evitar ambiguidades na leitura
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Só é necessária a utilização da vírgula antes do "e" quando utilizada após uma explicação complementar
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Lembre-se de utilizar a vírgula em saudações, separando com vírgula o nome do usuário
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Não use vírgula antes de etc. e prefira sempre utilizar "entre outros", por exemplo, no lugar de etc.
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            O ponto e vírgula é caracterizado por uma pausa mais longa e, por privilegiarmos frases mais curtas em interfaces, o ideal é o uso do ponto final
          </li>
        </ul>

        {/* 13.7 Sinais matemáticos (+, -, *, /, =), maior e menor (>, <) e porcentagem (%) */}
        <h3
          id="137-sinais-matemáticos---maior-e-menor-e-porcentagem-" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          13.7 Sinais matemáticos (+, -, *, /, =), maior e menor (&gt;, &lt;) e porcentagem (%)
        </h3>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Por questões de acessibilidade e mais fácil entendimento por parte de todos os usuários, não devemos usar sinais matemáticos em frases de qualquer natureza. Ao invés disso, devemos descrevê-los conforme cabível na frase (o resultado é igual a / calcule taxas mais impostos / multiplique o resultado por 2 etc.)
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Da mesma forma, os símbolos maior e menor nunca devem ser usados para substituir um texto de "maior que" ou "menor que", tampouco devemos usá-los para indicar etapas de uma jornada. Para isso, utilize o componente de breadcrumb ou descreva o passo a passo com conectores (primeiro, a seguir, depois etc.)
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Um valor percentual nunca deve ser escrito por extenso. Use sempre numeral seguido do símbolo (20%)
          </li>
        </ul>

        {/* 13.8 Parênteses ( ( ) ) e traço/hífen ( - ) */}
        <h3
          id="138-parênteses-e-traçohífen---" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          13.8 Parênteses ( ( ) ) e traço/hífen ( - )
        </h3>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            O parênteses deve ser usado para trazer uma informação adicional sobre um assunto ou clarificar uma sigla, por exemplo: ICMS (Imposto sobre Circulação de Mercadorias e Prestação de Serviços)
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Ao escrever um texto entre parênteses, não é necessário espaçamento entre o símbolo e a primeira letra da palavra, que só deve ser maiúscula caso seja um nome, mas nunca se for início de uma frase
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Nunca utilize parênteses dentro de parênteses, se necessário, escreva a segunda informação adicional entre traços (por exemplo: explique o que é IR - Imposto de Renda - desta forma)
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Utilize hífen sempre que pedido pela grafia correta da palavra
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Quando preciso complementar um rótulo, é possível usar espaçamento, traço e espaçamento para especificar este complemento. Por exemplo: Rescisão motivo 8 - morte.
          </li>
        </ul>

        {/* 13.9 Aspas ( " " ), E comercial (&), underline ( _ ) e hashtag ( # ) */}
        <h3
          id="139-aspas-e-comercial-underline-_-e-hashtag-" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          13.9 Aspas ( " " ), E comercial (&amp;), underline ( _ ) e hashtag ( # )
        </h3>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Aspas devem ser utilizadas apenas para citações, não sendo indicado seu uso para casos em que vamos referenciar algum item da interface
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Ao utilizar aspas, não é necessário espaço entre o símbolo e a primeira ou a última palavra da citação
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Apenas utilize E comercial (&amp;) em nomes próprios de marcas, como por exemplo, Procter &amp; Gamble, em qualquer outro caso utilize o "e" normalmente, pois é mais legível e de fácil compreensão
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Underline e hashtag não são símbolos que devem ser usados na nossa escrita de interface. As exceções se dão em caso de nomes de produtos, endereços web ou convites de eventos, desde que façam parte de suas comunicações oficiais
          </li>
        </ul>

        {/* 13.10 Asterisco ( * ), chaves ( { } ), colchetes ( [ ] ), barras (/) e barra vertical ( | ) */}
        <h3
          id="1310-asterisco-chaves-colchetes-barras-e-barra-vertical" className="font-semibold mb-4 mt-8 scroll-mt-24"
          style={{
            fontSize: '20px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)'
          }}
        >
          13.10 Asterisco ( * ), chaves ( &#123; &#125; ), colchetes ( [ ] ), barras (/) e barra vertical ( | )
        </h3>
        <ul className="space-y-3 ml-6 list-disc mb-6">
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Embora seja muito comum o uso do asterisco para indicação de campo obrigatório, por acessibilidade, o mais indicado é incluir a informação "campo obrigatório", entre parênteses, após o rótulo do campo
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Em textos maiores, o asterisco pode ser usado para indicar notas de rodapé, porém esse recurso deve ser usado com moderação, principalmente para criação de telas para aparelhos móveis
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Chaves e colchetes não devem ser utilizados na nossa escrita de interface, ao invés desses elementos, opte pelo uso do parênteses. Da mesma forma, a barra vertical, usada mais para fins decorativos, deve ser evitada e substituída pelo traço ( - ) quando estritamente necessária
          </li>
          <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            As barras são usadas para separar opções de sentenças e/ou datas. Após a barra devemos sempre usar letra minúscula
          </li>
        </ul>
      </section>

      {/* Mensagem final */}
      <div
        className="p-6 rounded-[var(--radius-card)] text-center mt-12"
        style={{
          background: 'linear-gradient(135deg, rgba(214, 64, 0, 0.05) 0%, rgba(214, 64, 0, 0.1) 100%)'
        }}
      >
        <p className="text-foreground font-semibold mb-2" style={{ fontSize: 'var(--text-lg)' }}>
          Guia de UX Writing Domínio
        </p>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Mantenha estes padrões para criar experiências consistentes e acessíveis.
        </p>
      </div>
    </div>
  );
}
