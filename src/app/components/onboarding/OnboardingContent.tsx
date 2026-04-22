import { ExternalLink, GraduationCap, FileText, Building2, Calendar, Users, Wrench, Globe, HelpCircle, MapPin, ChevronRight } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { MediaPlaceholder } from '../MediaPlaceholder';

export function OnboardingContent() {
  return (
    <div className="space-y-16">
      {/* ========================================
          SEÇÃO 1: BOAS VINDAS
      ======================================== */}
      <section id="1-boas-vindas">
        <h2
          className="font-semibold mb-6 mt-12 scroll-mt-24 pb-4"
          style={{
            fontSize: 'var(--text-h3)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--primary)',
            borderBottom: '2px solid var(--border)',
            letterSpacing: '0.5px'
          }}
        >
          1. BOAS VINDAS
        </h2>

        {/* 1.1 Que bom ter você com a gente! */}
        <div className="mb-10">
          <h3
            id="11-que-bom-ter-você-com-a-gente"
            className="font-semibold mb-4 mt-8 scroll-mt-24"
            style={{
              fontSize: '20px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            1.1 Que bom ter você com a gente!
          </h3>
          <ul className="space-y-3 ml-6 list-disc">
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              Nossos designers estão divididos nas diferentes squads de produtos
            </li>
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              Alguns designers têm atuação cross e auxiliam em temas que são comuns a diferentes times. Eventualmente, eles também são responsáveis por alguma squad
            </li>
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              Estamos espalhados pelo Brasil: Criciúma, São Paulo, Rio de Janeiro e Espírito Santo
            </li>
          </ul>
        </div>

        {/* 1.2 Sobre esse material */}
        <div className="mb-10">
          <h3
            id="12-sobre-esse-material"
            className="font-semibold mb-4 mt-8 scroll-mt-24"
            style={{
              fontSize: '20px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            1.2 Sobre esse material
          </h3>
          <ul className="space-y-3 ml-6 list-disc">
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              Separamos nessa apresentação algumas informações que acreditamos ser úteis para o seu dia a dia na empresa
            </li>
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              Além de te apresentar algumas das ferramentas mais utilizadas na nossa rotina, queremos que você saiba mais dos nossos processos de trabalho e confira alguns bate-papos interessantes que já tivemos no time
            </li>
          </ul>
        </div>

        {/* 1.3 Conheça mais nossos produtos */}
        <div className="mb-10">
          <h3
            id="13-conheca-mais-nossos-produtos"
            className="font-semibold mb-4 mt-8 scroll-mt-24"
            style={{
              fontSize: '20px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            1.3 Conheça mais nossos produtos
          </h3>

          {/* 1.3.1 História Domínio */}
          <h4
            id="131-historia-dominio"
            className="font-semibold mb-3 mt-6 scroll-mt-24"
            style={{
              fontSize: '18px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            1.3.1 História Domínio - Como começamos e para onde vamos
          </h4>
          <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Em abril de 2025, nosso diretor de produtos, Fernando Coan, contou um pouco para o time de UX sobre o início da Domínio, explicou sobre nosso portfólio de produtos e algumas estratégias que estão sendo consideradas para o futuro.
          </p>

          {/* Cards de vídeos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="my-6">
              <MediaPlaceholder
                type="video"
                title="Bate-papo sobre negócios e clientes Domínio"
                url="https://trten-my.sharepoint.com/personal/daniel_coscarelli_thomsonreuters_com/_layouts/15/stream.aspx?id=%2Fpersonal%2Fdaniel%5Fcoscarelli%5Fthomsonreuters%5Fcom%2FDocuments%2FRecordings%2FBate%20papo%20sobre%20o%20neg%C3%B3cio%20e%20clientes%20Dom%C3%ADnio%2D20250506%5F083244%2DGrava%C3%A7%C3%A3o%20de%20Reuni%C3%A3o%2Emp4"
              />
            </div>
            <div className="my-6">
              <MediaPlaceholder
                type="video"
                title="Como funciona um escritório contábil na prática"
                url="https://www.youtube.com/watch?v=WZH8F2EJ1QE&t=127s"
              />
            </div>
          </div>

          {/* 1.3.2 Overview de funcionalidades */}
          <h4
            id="132-overview-funcionalidades"
            className="font-semibold mb-3 mt-6 scroll-mt-24"
            style={{
              fontSize: '18px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            1.3.2 Overview de funcionalidades Domínio Contábil
          </h4>
          <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            As agendas de overview de funcionalidades foram apresentadas pelos times de produto para que o time de design pudesse conhecer melhor como os módulos instalados e serviram como tira dúvidas sobre objetivos de algumas funcionalidades e entendimento de fluxos atuais.
          </p>

          <div className="my-6">
            <MediaPlaceholder
              type="video"
              title="Playlist completa de overview de funcionalidades"
              url="https://trten.sharepoint.com/:f:/s/TRTABRAOnvioPlataforma/Eudtm8Nq8QdNqj6PoBH-2-8BkB4SAWCpk8DTMQTxgrLZxA?e=fGJVHU"
            />
          </div>

          <ol className="space-y-2 ml-6 list-decimal mb-6" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            <li>Atendimento (Portal do cliente, Documents, CND, OnBalance)</li>
            <li>Módulos Auditoria e Administrar</li>
            <li>Conteúdo Contábil Tributário (CCT), Atualizar, Lalur, Patrimônios, Protocolo e Registro</li>
            <li>Central de Soluções e Academy</li>
            <li>Domínio Plataforma (Agente de comunicação, Gerenciador de Tokens e Certificados, Backup etc.)</li>
            <li>Escrita Fiscal (Envia BOX-e, Manifestação de Notas, Importador SEFAZ)</li>
            <li>Suporte e Financeiro</li>
            <li>Módulo Honorários</li>
            <li>Módulo Kolossus Auditor</li>
            <li>TR Banking (Domínio Inova)</li>
          </ol>

          {/* 1.3.3 Produtos Domínio Inova */}
          <h4
            id="133-produtos-dominio-inova"
            className="font-semibold mb-3 mt-6 scroll-mt-24"
            style={{
              fontSize: '18px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            1.3.3 Produtos Domínio Inova
          </h4>
          <ul className="space-y-3 ml-6 list-disc mb-6">
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              Os produtos Domínio Inova são soluções de Conta Digital, Benefícios e Contabilidade Digital por meio de Open Finance
            </li>
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              Os produtos visam atender todo o ecossistema de contabilidade: Escritórios de Contabilidade (Domínio Escritório), Pequenas e médias empresas que são clientes desses escritórios (Domínio Empresa) e Funcionários das empresas ou escritórios (Domínio Para Você)
            </li>
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              Temos soluções web (chamados internamente como IBK - internet banking) e aplicativos mobile
            </li>
          </ul>

          <a
            href="https://www.figma.com/design/V2PBMkHMJKCZ8aGjzgmXly/OnboardingDesign?node-id=4087-2580&t=vL5La1LVhW8CN2nt-0"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-4 py-3 mb-6 bg-card border border-border rounded-[var(--radius-card)] hover:border-primary/30 hover:shadow-[var(--elevation-sm)] transition-all duration-200"
          >
            <FileText className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <p className="font-semibold text-foreground" style={{ fontSize: 'var(--text-label)' }}>
                Conheça nossa matriz de produtos
              </p>
              <p className="text-muted-foreground" style={{ fontSize: 'var(--text-caption)' }}>
                Funcionalidades existentes e planejadas (jan/2025)
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>

          {/* 1.3.4 Implantações e Demonstrações */}
          <h4
            id="134-implantacoes-demonstracoes"
            className="font-semibold mb-3 mt-6 scroll-mt-24"
            style={{
              fontSize: '18px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            1.3.4 Implantações e Demonstrações de sistemas
          </h4>
          <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Os vídeos a seguir mostram um pouco do funcionamento e da implantação dos nossos módulos. Eles podem te ajudar a entender melhor sobre as funcionalidades disponíveis no nosso sistema.
          </p>

          <div
            className="p-4 mb-6 rounded-[var(--radius-card)] border-l-4"
            style={{
              borderLeftColor: 'var(--primary)',
              backgroundColor: 'rgba(214, 64, 0, 0.05)'
            }}
          >
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-label)' }}>
              <strong>Vídeos pendentes de URL:</strong>
            </p>
            <ul className="mt-2 space-y-1 ml-4 list-disc">
              <li className="text-muted-foreground" style={{ fontSize: 'var(--text-label)' }}>Demonstração de sistema Messenger</li>
              <li className="text-muted-foreground" style={{ fontSize: 'var(--text-label)' }}>Demonstração Onvio Escrita Fiscal</li>
              <li className="text-muted-foreground" style={{ fontSize: 'var(--text-label)' }}>Implantações de sistema - Domínio Escrita Fiscal</li>
              <li className="text-muted-foreground" style={{ fontSize: 'var(--text-label)' }}>Implantações de sistema - Domínio Contabilidade</li>
              <li className="text-muted-foreground" style={{ fontSize: 'var(--text-label)' }}>Implantações de sistema - Domínio Processos</li>
            </ul>
          </div>

          {/* Links externos */}
          <div className="space-y-3 mb-6">
            <a
              href="https://dominiosistemas.learning.rocks/spaces"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-[var(--radius-card)] hover:border-primary/30 hover:shadow-[var(--elevation-sm)] transition-all duration-200"
            >
              <GraduationCap className="w-5 h-5 text-teal-600" />
              <span className="flex-1 font-semibold text-foreground" style={{ fontSize: 'var(--text-label)' }}>
                Domínio Learning - Treinamentos de sistema e mercado
              </span>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>

            <a
              href="https://www.figma.com/files/997940968679115932/project/85057117?fuid=1384983564289911978"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-[var(--radius-card)] hover:border-primary/30 hover:shadow-[var(--elevation-sm)] transition-all duration-200"
            >
              <FileText className="w-5 h-5 text-blue-600" />
              <span className="flex-1 font-semibold text-foreground" style={{ fontSize: 'var(--text-label)' }}>
                Service blueprints desenhados pelo time
              </span>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </section>

      <hr className="my-12 border-t border-border opacity-50" />

      {/* ========================================
          SEÇÃO 2: DADOS DA EMPRESA
      ======================================== */}
      <section id="2-dados-da-empresa">
        <h2
          className="font-semibold mb-6 mt-12 scroll-mt-24 pb-4"
          style={{
            fontSize: 'var(--text-h3)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--primary)',
            borderBottom: '2px solid var(--border)',
            letterSpacing: '0.5px'
          }}
        >
          2. DADOS DA EMPRESA
        </h2>

        {/* 2.1 Manual de marca TR */}
        <div className="mb-10">
          <h3
            id="21-manual-marca-tr"
            className="font-semibold mb-4 mt-8 scroll-mt-24"
            style={{
              fontSize: '20px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            2.1 Sobre a TR: Manual de marca
          </h3>
          <ul className="space-y-3 ml-6 list-disc mb-6">
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              A Thomson Reuters é uma empresa global e, por isso, seguimos algumas diretrizes de tom de voz e uso de imagem. Dentro do nosso manual da marca você vai encontrar uma série de recursos importantes para manter nossos padrões visuais
            </li>
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              Confira nossas paletas de cores, acesse nosso banco de imagens, baixe nosso logotipo e a fonte da marca, backgrounds para o Teams, headers para LinkedIn
            </li>
          </ul>

          <p className="mb-3 font-semibold text-foreground" style={{ fontSize: 'var(--text-label)' }}>
            Recursos úteis:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {[
              { label: 'Logos TR', url: 'https://brand.thomsonreuters.com/document/499' },
              { label: 'Fonte Clario', url: 'https://brand.thomsonreuters.com/document/460#/typography/our-font-clario' },
              { label: 'Fotografias', url: 'https://brand.thomsonreuters.com/document/494' },
              { label: 'Ilustrações', url: 'https://brand.thomsonreuters.com/document/564' },
              { label: 'Grafismos', url: 'https://brand.thomsonreuters.com/document/497' },
            ].map((recurso) => (
              <a
                key={recurso.label}
                href={recurso.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-4 py-2.5 bg-card border border-border rounded-[var(--radius-card)] hover:border-primary/30 hover:shadow-[var(--elevation-sm)] transition-all duration-200"
              >
                <FileText className="w-4 h-4 text-primary" />
                <span className="flex-1 text-foreground" style={{ fontSize: 'var(--text-label)' }}>
                  {recurso.label}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>

          <a
            href="https://brand.thomsonreuters.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-[var(--radius-button)] hover:bg-primary/90 transition-colors font-semibold"
            style={{ fontSize: 'var(--text-label)' }}
          >
            Acesse o conteúdo completo
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* 2.2 Atrium */}
        <div className="mb-10">
          <h3
            id="22-atrium"
            className="font-semibold mb-4 mt-8 scroll-mt-24"
            style={{
              fontSize: '20px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            2.2 Informações da empresa: Atrium
          </h3>
          <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            O Atrium é o SharePoint oficial da Thomson Reuters, plataforma onde encontramos uma série de documentos e informações referentes a padrões a serem seguidos dentro da empresa.
          </p>

          <a
            href="https://trten.sharepoint.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-5 mb-6 bg-card border border-border rounded-[var(--radius-card)] hover:border-primary/30 hover:shadow-[var(--elevation-sm)] transition-all duration-200"
          >
            <div className="w-12 h-12 rounded-[var(--radius-card)] bg-blue-100 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground mb-1" style={{ fontSize: 'var(--text-base)' }}>
                Atrium - Home
              </p>
              <p className="text-muted-foreground" style={{ fontSize: 'var(--text-label)' }}>
                SharePoint oficial da Thomson Reuters
              </p>
            </div>
            <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>

          <p className="mb-3 font-semibold text-foreground" style={{ fontSize: 'var(--text-label)' }}>
            Conteúdos sugeridos:
          </p>
          <div className="space-y-2 mb-6">
            {[
              { label: 'Open Arena - Nossa IA oficial', url: 'https://aiplatform.thomsonreuters.com/ai-platform/ai-chains' },
              { label: 'Templates de documentos', url: 'https://trten.sharepoint.com/sites/intr-reuters/SitePages/Reuters-Branded-Templates.aspx' },
              { label: 'Central de acessibilidade', url: 'https://trten.sharepoint.com/sites/intr-digital-accessibility-coe' },
              { label: 'Design Operations - Ferramentas de Design', url: 'https://trten.sharepoint.com/sites/DesignOperations' },
              { label: 'Conteúdos educacionais', url: 'https://trten.sharepoint.com/sites/intr-grow-my-way' },
              { label: 'LinkedIn Learning', url: 'https://www.linkedin.com/learning/?accountId=102064650&u=102064650&success=true&authUUID=2R7pw0yFRjG98eOXAS2jvA%3D%3D' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-[var(--radius)] transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-primary" />
                <span className="flex-1 text-foreground" style={{ fontSize: 'var(--text-label)' }}>
                  {item.label}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* 2.3 SGD */}
        <div className="mb-10">
          <h3
            id="23-sgd"
            className="font-semibold mb-4 mt-8 scroll-mt-24"
            style={{
              fontSize: '20px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            2.3 SGD
          </h3>
          <ul className="space-y-3 ml-6 list-disc mb-6">
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              O SGD é uma ferramenta interna muito utilizada pelos times comercial, implantação, suporte e marketing
            </li>
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              Para nós, como designers de produto, o SGD é um grande aliado para consultar solicitações dos clientes em relação às melhorias de produtos. Isso é feito através da análise dos chamados que são registrados pelo time de suporte
            </li>
          </ul>

          <div className="space-y-3 mb-6">
            <a
              href="https://sgd.dominiosistemas.com.br/login.html"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-[var(--radius-card)] hover:border-primary/30 hover:shadow-[var(--elevation-sm)] transition-all duration-200"
            >
              <Globe className="w-5 h-5 text-teal-600" />
              <span className="flex-1 font-semibold text-foreground" style={{ fontSize: 'var(--text-label)' }}>
                Site - SGD
              </span>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>

          <div
            className="p-4 mb-6 rounded-[var(--radius-card)] border-l-4"
            style={{
              borderLeftColor: 'var(--primary)',
              backgroundColor: 'rgba(214, 64, 0, 0.05)'
            }}
          >
            <p className="text-muted-foreground mb-2" style={{ fontSize: 'var(--text-label)' }}>
              <strong>Treinamento SGD:</strong> Vídeo pendente de URL
            </p>
          </div>

          <Accordion type="single" collapsible className="border border-border rounded-[var(--radius-card)]">
            <AccordionItem value="glossario">
              <AccordionTrigger className="px-4">
                <span className="font-semibold" style={{ fontSize: 'var(--text-base)' }}>
                  Glossário do SGD
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <tbody className="divide-y divide-border">
                      {[
                        { sigla: 'GPD', desc: 'Gestão de projetos e diretrizes' },
                        { sigla: 'SGSAI', desc: 'Sistema de gestão das solicitações de alterações internas (produtos)' },
                        { sigla: 'SGSUN', desc: 'Sistema de gestão de suporte as unidades (N2)' },
                        { sigla: 'SGSC', desc: 'Sistema de gestão de suporte ao cliente (N1)' },
                        { sigla: 'SGOP', desc: 'Sistema de gestão operacional (conteúdo e treinamento)' },
                        { sigla: 'SGSSI', desc: 'Sistema de gestão de suporte dos sistemas internas (TI interno)' },
                        { sigla: 'SAM', desc: 'Solicitação de alteração de melhoria' },
                        { sigla: 'SAIL', desc: 'Solicitação de alteração de implementação legal' },
                        { sigla: 'SAL', desc: 'Solicitação alteração legal' },
                        { sigla: 'SSC', desc: 'Solicitação de suporte ao cliente' },
                        { sigla: 'SS', desc: 'Solicitação de suporte (interno N1 e N2)' },
                      ].map((item) => (
                        <tr key={item.sigla}>
                          <td className="py-3 pr-4">
                            <Badge variant="outline">{item.sigla}</Badge>
                          </td>
                          <td className="py-3 text-foreground" style={{ fontSize: 'var(--text-label)' }}>
                            {item.desc}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* 2.4 Azure - Seção expandida completa */}
        <div className="mb-10">
          <h3
            id="24-azure"
            className="font-semibold mb-4 mt-8 scroll-mt-24"
            style={{
              fontSize: '20px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            2.4 Azure
          </h3>

          {/* 2.4.1 Sobre o Azure/ADO */}
          <h4
            className="font-semibold mb-3 mt-6"
            style={{
              fontSize: '18px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            2.4.1 Sobre o Azure/ADO
          </h4>
          <ul className="space-y-3 ml-6 list-disc mb-6">
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              O Azure é a plataforma utilizada pelos nossos BAs (responsáveis pelos produtos) e desenvolvedores para controle de roadmap
            </li>
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              É no Azure que o BA / PO disponibiliza as user stories (US), isso é, a descrições informal e simplificada das funcionalidades que serão criadas para nossos sistemas. Ele escreve sob a ótica do usuário, informando o objetivo a ser alcançado nesse desenvolvimento e regras de aceitação
            </li>
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              Em alguns times, as demandas são passadas para os designers também através de uma US do Azure. Se for esse o caso da sua squad, o BA responsável irá informar a forma de trabalho esperada e o(s) board(s) que deverão ser acessados
            </li>
          </ul>

          {/* 2.4.2 Como nosso time usa o Azure */}
          <h4
            className="font-semibold mb-3 mt-6"
            style={{
              fontSize: '18px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            2.4.2 Como nosso time usa o Azure
          </h4>
          <ul className="space-y-3 ml-6 list-disc mb-4">
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              Nosso time também usa o Azure/ADO e temos 3 boards específicos por times
            </li>
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              Nossos boards não estão vinculados aos boards dos times de produtos, utilizamos apenas para acompanhamento de demandas da equipe
            </li>
          </ul>

          <div className="space-y-3 mb-6">
            <a
              href="https://dev.azure.com/tr-ggo/ONVIO%20BR/_boards/board/t/UX%20Dominio%20Contabil/Stories"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-[var(--radius-card)] hover:border-primary/30 hover:shadow-[var(--elevation-sm)] transition-all duration-200"
            >
              <span className="flex-1 font-semibold text-foreground" style={{ fontSize: 'var(--text-label)' }}>
                Board Contábil
              </span>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>

            <a
              href="https://dev.azure.com/tr-ggo/TR%20Fintech/_boards/board/t/UX%20Dominio%20Inova/Stories"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-[var(--radius-card)] hover:border-primary/30 hover:shadow-[var(--elevation-sm)] transition-all duration-200"
            >
              <span className="flex-1 font-semibold text-foreground" style={{ fontSize: 'var(--text-label)' }}>
                Board Inova
              </span>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>

            <a
              href="https://dev.azure.com/tr-ggo/TR%20Fintech/_boards/board/t/Design%20Ops/Stories"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-[var(--radius-card)] hover:border-primary/30 hover:shadow-[var(--elevation-sm)] transition-all duration-200"
            >
              <span className="flex-1 font-semibold text-foreground" style={{ fontSize: 'var(--text-label)' }}>
                Board Design System
              </span>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>

          <div
            className="p-4 mb-6 rounded-[var(--radius-card)] border-l-4"
            style={{
              borderLeftColor: 'var(--primary)',
              backgroundColor: 'rgba(214, 64, 0, 0.05)'
            }}
          >
            <p className="text-foreground font-semibold mb-2" style={{ fontSize: 'var(--text-label)' }}>
              Importante:
            </p>
            <p className="text-foreground" style={{ fontSize: 'var(--text-label)', lineHeight: '1.6' }}>
              Mantenha seu board atualizado!
            </p>
          </div>

          {/* 2.4.3 Como criar demandas no ADO */}
          <h4
            className="font-semibold mb-3 mt-6"
            style={{
              fontSize: '18px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            2.4.3 Como criar demandas no ADO
          </h4>
          <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            O ADO é organizado de forma a seguir a metodologia ágil que consiste em quebrar em pequenas partes cada grande projeto.
          </p>
          <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            No nosso time seguimos a seguinte hierarquia:
          </p>
          <ol className="space-y-2 ml-6 list-decimal mb-6">
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              <strong>Épico:</strong> O objetivo estratégico do Quarter
            </li>
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              <strong>Feature:</strong> Grande funcionalidade (entrega de valor)
            </li>
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              <strong>User Story:</strong> Necessidade do usuário (fatia da feature)
            </li>
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              <strong>Task:</strong> Trabalho técnico (fatia da story)
            </li>
          </ol>

          {/* Accordion com os 4 tipos de items */}
          <Accordion type="single" collapsible className="w-full mb-6">
            {/* Epic */}
            <AccordionItem value="epic">
              <AccordionTrigger className="text-foreground font-semibold hover:no-underline" style={{ fontSize: 'var(--text-base)' }}>
                2.4.3.1 Como preencher uma Epic
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div>
                    <p className="font-semibold mb-2" style={{ fontSize: 'var(--text-label)' }}>Descrição:</p>
                    <p className="text-foreground" style={{ fontSize: 'var(--text-label)', lineHeight: '1.6' }}>
                      Objetivo maior para ser alcançado no Quarter, precisa estar atrelado a algo que pode ser mensurável, como um OKR, por exemplo.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold mb-2" style={{ fontSize: 'var(--text-label)' }}>Colunas (Status):</p>
                    <ul className="ml-6 list-disc space-y-1">
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>New</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Active</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Validate</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Closed (resolution type obrigatório)</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-2" style={{ fontSize: 'var(--text-label)' }}>Boas práticas:</p>
                    <p className="text-foreground" style={{ fontSize: 'var(--text-label)', lineHeight: '1.6' }}>
                      Não abrir Épico deliberadamente; os épicos devem existir sempre em menor quantidade do que as Features, US (User Stories) e Tasks.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold mb-2" style={{ fontSize: 'var(--text-label)' }}>Título (Padrão de Nomenclatura):</p>
                    <p className="text-foreground mb-2" style={{ fontSize: 'var(--text-label)', lineHeight: '1.6' }}>
                      Sempre com prefixo do quarter. Exemplos: 2025\Q1, 2025\Q2, 2025\Q3, 2025\Q4
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold mb-2" style={{ fontSize: 'var(--text-label)' }}>Campos Obrigatórios:</p>
                    <ul className="ml-6 list-disc space-y-1">
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Título</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Responsável</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Área</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Iteration</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>State</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Priority</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Start date (opcional)</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-2" style={{ fontSize: 'var(--text-label)' }}>Vínculo:</p>
                    <p className="text-foreground" style={{ fontSize: 'var(--text-label)', lineHeight: '1.6' }}>
                      Não precisa vincular.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Feature */}
            <AccordionItem value="feature">
              <AccordionTrigger className="text-foreground font-semibold hover:no-underline" style={{ fontSize: 'var(--text-base)' }}>
                2.4.3.2 Como preencher uma Feature
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div>
                    <p className="font-semibold mb-2" style={{ fontSize: 'var(--text-label)' }}>Descrição:</p>
                    <p className="text-foreground" style={{ fontSize: 'var(--text-label)', lineHeight: '1.6' }}>
                      Funcionalidades que precisam ser construídas para que o Épico possa ser concluído.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold mb-2" style={{ fontSize: 'var(--text-label)' }}>Colunas (Status):</p>
                    <ul className="ml-6 list-disc space-y-1">
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>New</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Active</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Closed (Resolution Type obrigatório)</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-2" style={{ fontSize: 'var(--text-label)' }}>Boas práticas:</p>
                    <p className="text-foreground" style={{ fontSize: 'var(--text-label)', lineHeight: '1.6' }}>
                      Em uma atividade comum deve haver menos features do que US (User Stories).
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold mb-2" style={{ fontSize: 'var(--text-label)' }}>Título (Padrão de Nomenclatura):</p>
                    <p className="text-foreground mb-2" style={{ fontSize: 'var(--text-label)', lineHeight: '1.6' }}>
                      Sempre com prefixo do ano\quarter. Exemplos: 2025\Q1, 2025\Q2, 2025\Q3, 2025\Q4
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold mb-2" style={{ fontSize: 'var(--text-label)' }}>Obrigatório (Campos):</p>
                    <ul className="ml-6 list-disc space-y-1">
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Título</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Responsável</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Area</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Iteration (Sempre relacionada ao Q)</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Priority</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Start e dueta date (Se necessário)</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-2" style={{ fontSize: 'var(--text-label)' }}>Vínculo:</p>
                    <p className="text-foreground" style={{ fontSize: 'var(--text-label)', lineHeight: '1.6' }}>
                      Vincular como 'parent' ao Épico.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* User Story */}
            <AccordionItem value="user-story">
              <AccordionTrigger className="text-foreground font-semibold hover:no-underline" style={{ fontSize: 'var(--text-base)' }}>
                2.4.3.3 Como preencher uma User Story
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div>
                    <p className="font-semibold mb-2" style={{ fontSize: 'var(--text-label)' }}>Descrição:</p>
                    <p className="text-foreground" style={{ fontSize: 'var(--text-label)', lineHeight: '1.6' }}>
                      Unidade de trabalho que descreve uma funcionalidade sob a perspectiva do usuário final. Deve detalhar o "quem", o "quê" e o "porquê" (valor de negócio).
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold mb-2" style={{ fontSize: 'var(--text-label)' }}>Colunas (Status):</p>
                    <ul className="ml-6 list-disc space-y-1">
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>New</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Approved</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>In Progress</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Dev Done</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Testing / QA</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Closed</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-2" style={{ fontSize: 'var(--text-label)' }}>Boas práticas:</p>
                    <p className="text-foreground" style={{ fontSize: 'var(--text-label)', lineHeight: '1.6' }}>
                      Utilizar critérios de aceite claros. Uma US deve ser pequena o suficiente para ser completada em uma única Iteration (Sprint).
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold mb-2" style={{ fontSize: 'var(--text-label)' }}>Título (Padrão de Nomenclatura):</p>
                    <p className="text-foreground mb-2" style={{ fontSize: 'var(--text-label)', lineHeight: '1.6' }}>
                      [ID da Feature] - Descrição curta da ação do usuário. Exemplo: F123 - Eu como cliente quero visualizar meu extrato para controlar meus gastos.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold mb-2" style={{ fontSize: 'var(--text-label)' }}>Obrigatório (Campos):</p>
                    <ul className="ml-6 list-disc space-y-1">
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Título</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Descrição (Persona + Necessidade + Objetivo)</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Critérios de Aceite</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Story Points (Estimativa)</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Priority</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Iteration (Sprint específica)</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-2" style={{ fontSize: 'var(--text-label)' }}>Vínculo:</p>
                    <p className="text-foreground" style={{ fontSize: 'var(--text-label)', lineHeight: '1.6' }}>
                      Vincular como "child" da Feature.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold mb-2" style={{ fontSize: 'var(--text-label)' }}>Tags:</p>
                    <p className="text-foreground" style={{ fontSize: 'var(--text-label)', lineHeight: '1.6' }}>
                      As tags de design system (Bento, Novo Design System e Gestta) devem ser preenchidas SOMENTE nas USs. Features de produto e task não poderão conter essas tags.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Task */}
            <AccordionItem value="task">
              <AccordionTrigger className="text-foreground font-semibold hover:no-underline" style={{ fontSize: 'var(--text-base)' }}>
                2.4.3.4 Como preencher uma Task
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div>
                    <p className="font-semibold mb-2" style={{ fontSize: 'var(--text-label)' }}>Descrição:</p>
                    <p className="text-foreground" style={{ fontSize: 'var(--text-label)', lineHeight: '1.6' }}>
                      Decomposição técnica do trabalho necessário para implementar uma User Story. É o "como" o time vai desenvolver a solução.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold mb-2" style={{ fontSize: 'var(--text-label)' }}>Colunas (Status):</p>
                    <ul className="ml-6 list-disc space-y-1">
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>To Do</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>In Progress</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Done</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Removed</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-2" style={{ fontSize: 'var(--text-label)' }}>Obrigatório (Campos):</p>
                    <ul className="ml-6 list-disc space-y-1">
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Título</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Responsável (Atribuição individual)</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Remaining Work (Horas restantes)</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Activity (Desenvolvimento, Design, Teste, etc.)</li>
                      <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>State</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-2" style={{ fontSize: 'var(--text-label)' }}>Vínculo:</p>
                    <p className="text-foreground" style={{ fontSize: 'var(--text-label)', lineHeight: '1.6' }}>
                      Vincular como "child" da User Story.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold mb-2" style={{ fontSize: 'var(--text-label)' }}>Tags:</p>
                    <p className="text-foreground mb-2" style={{ fontSize: 'var(--text-label)', lineHeight: '1.6' }}>
                      As tasks deverão conter somente as tags de classificação do trabalho, utilizando as descritas abaixo:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">#Protótipo</Badge>
                      <Badge variant="outline">#Apresentação</Badge>
                      <Badge variant="outline">#Análise</Badge>
                      <Badge variant="outline">#Documentação</Badge>
                      <Badge variant="outline">#Benchmark</Badge>
                      <Badge variant="outline">#Pesquisa</Badge>
                      <Badge variant="outline">#Fluxo</Badge>
                      <Badge variant="outline">#Dinâmica</Badge>
                      <Badge variant="outline">#DesignOps</Badge>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* 2.5 Pendo */}
        <div className="mb-10">
          <h3
            id="25-pendo"
            className="font-semibold mb-4 mt-8 scroll-mt-24"
            style={{
              fontSize: '20px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            2.5 Pendo
          </h3>
          <ul className="space-y-3 ml-6 list-disc mb-6">
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              O Pendo é a ferramenta de dados do Onvio. Nele, sempre que uma página for tagueada, você vai encontrar dados de acesso ao sistema
            </li>
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              Outra informação interessante é o mapa de calor das telas. Essa informação é disponibilizada mesmo quando não há o tagueamento completo
            </li>
          </ul>

          <a
            href="https://app.pendo.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-4 py-3 mb-4 bg-card border border-border rounded-[var(--radius-card)] hover:border-primary/30 hover:shadow-[var(--elevation-sm)] transition-all duration-200"
          >
            <Globe className="w-5 h-5 text-purple-600" />
            <span className="flex-1 font-semibold text-foreground" style={{ fontSize: 'var(--text-label)' }}>
              Site - Pendo
            </span>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
        </div>

        {/* 2.6 Datadog */}
        <div className="mb-10">
          <h3
            id="26-datadog"
            className="font-semibold mb-4 mt-8 scroll-mt-24"
            style={{
              fontSize: '20px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            2.6 Datadog
          </h3>
          <ul className="space-y-3 ml-6 list-disc mb-6">
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              O Datadog é a ferramenta de dados do Domínio Escritório, Domínio Empresa e Domínio Para Você
            </li>
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              Para melhor análise de dados é necessário um tagueamento padronizado e, no nosso time, temos a governança desse tagueamento
            </li>
          </ul>

          <a
            href="https://www.datadoghq.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-4 py-3 mb-4 bg-card border border-border rounded-[var(--radius-card)] hover:border-primary/30 hover:shadow-[var(--elevation-sm)] transition-all duration-200"
          >
            <Globe className="w-5 h-5 text-purple-600" />
            <span className="flex-1 font-semibold text-foreground" style={{ fontSize: 'var(--text-label)' }}>
              Site - Datadog
            </span>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
        </div>

        {/* 2.7 Acessos */}
        <div className="mb-10">
          <h3
            id="27-acessos"
            className="font-semibold mb-4 mt-8 scroll-mt-24"
            style={{
              fontSize: '20px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            2.7 Acessos
          </h3>
          <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Confira aqui os sistemas que você precisa ter acesso e a quem solicitar:
          </p>

          <div className="space-y-6">
            {/* Acessos automáticos RH */}
            <div className="p-5 bg-card border border-border rounded-[var(--radius-card)]">
              <div className="flex items-start gap-3 mb-3">
                <Badge variant="default" className="bg-green-100 text-green-700 border-green-200">
                  Automático
                </Badge>
                <h4 className="font-semibold text-foreground" style={{ fontSize: 'var(--text-label)' }}>
                  Liberados automaticamente pelo RH com criação de senha própria
                </h4>
              </div>
              <ul className="ml-6 space-y-1 list-disc">
                <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Folha Flash</li>
              </ul>
            </div>

            {/* Acessos automáticos SSO */}
            <div className="p-5 bg-card border border-border rounded-[var(--radius-card)]">
              <div className="flex items-start gap-3 mb-3">
                <Badge variant="default" className="bg-blue-100 text-blue-700 border-blue-200">
                  SSO
                </Badge>
                <h4 className="font-semibold text-foreground" style={{ fontSize: 'var(--text-label)' }}>
                  Liberados automaticamente pelo RH com autenticação SSO e/ou Zscaler
                </h4>
              </div>
              <ul className="ml-6 space-y-1 list-disc">
                <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>MyTime</li>
                <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Workday</li>
                <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Atrium</li>
                <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Manuais de marca</li>
                <li className="text-foreground" style={{ fontSize: 'var(--text-label)' }}>Documentações de DS</li>
              </ul>
            </div>

            {/* Acessos a solicitar */}
            <div className="p-5 bg-card border border-border rounded-[var(--radius-card)]">
              <div className="flex items-start gap-3 mb-3">
                <Badge variant="outline">
                  Solicitar
                </Badge>
                <h4 className="font-semibold text-foreground" style={{ fontSize: 'var(--text-label)' }}>
                  Acessos a solicitar
                </h4>
              </div>
              <div className="space-y-3">
                {[
                  { sistema: 'SGD', contato: 'Daniel Coscarelli' },
                  { sistema: 'Azure', contato: 'BA ou gerente de produtos da sua squad e gerente de design' },
                  { sistema: 'Pendo', contato: 'Daniel Coscarelli' },
                  { sistema: 'Datadog', contato: 'Daniel Coscarelli' },
                  { sistema: 'Onvio', contato: 'Adelino Oliveira' },
                  { sistema: 'Legado - Sistema Domínio', contato: 'Adelino Oliveira' },
                  { sistema: 'Portal do cliente (visão empresa)', contato: 'Adelino Oliveira' },
                ].map((item) => (
                  <div key={item.sistema} className="flex items-start gap-3 py-2 border-b last:border-b-0 border-border">
                    <span className="font-semibold text-foreground min-w-[180px]" style={{ fontSize: 'var(--text-label)' }}>
                      {item.sistema}
                    </span>
                    <span className="text-muted-foreground" style={{ fontSize: 'var(--text-label)' }}>
                      {item.contato}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="my-12 border-t border-border opacity-50" />

      {/* ========================================
          SEÇÃO 3: DIA A DIA
      ======================================== */}
      <section id="3-dia-a-dia">
        <h2
          className="font-semibold mb-6 mt-12 scroll-mt-24 pb-4"
          style={{
            fontSize: 'var(--text-h3)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--primary)',
            borderBottom: '2px solid var(--border)',
            letterSpacing: '0.5px'
          }}
        >
          3. DIA A DIA
        </h2>

        {/* 3.1 Marcação de ponto: Folha Flash */}
        <div className="mb-10">
          <h3
            id="31-folha-flash"
            className="font-semibold mb-4 mt-8 scroll-mt-24"
            style={{
              fontSize: '20px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            3.1 Marcação de ponto: Folha Flash
          </h3>
          <ul className="space-y-3 ml-6 list-disc mb-6">
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              Utilizamos o portal e aplicativo Folha Flash para marcação de pontos
            </li>
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              Realizamos quatro marcações diárias: entrada, saída do almoço, retorno do almoço e saída. Em caso de instabilidade do sistema ou esquecimento, é possível corrigir a marcação dentro do próprio sistema
            </li>
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              Não é recomendada a marcação de ponto com horários exatos e arredondados, faça a marcação de ponto no momento em que começar sua jornada e na hora que sair, considerando as minutagens
            </li>
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              Ausências como banco de horas, atestado médico ou horas abonadas pela gestão, folga de aniversário e outras, devem ser incluídas acessando o menu "Espelho de ponto" e, no ícone de adição (+), clique em "Lançar evento"
            </li>
          </ul>

          <div className="space-y-3 mb-6">
            <a
              href="https://portal.folhacerta.com/login/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-[var(--radius-card)] hover:border-primary/30 hover:shadow-[var(--elevation-sm)] transition-all duration-200"
            >
              <Globe className="w-5 h-5 text-green-600" />
              <span className="flex-1 font-semibold text-foreground" style={{ fontSize: 'var(--text-label)' }}>
                Portal Folha Certa
              </span>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=com.muttuo.folhacerta&hl=pt_BR"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-[var(--radius-card)] hover:border-primary/30 hover:shadow-[var(--elevation-sm)] transition-all duration-200"
            >
              <span className="flex-1 font-semibold text-foreground" style={{ fontSize: 'var(--text-label)' }}>
                App Folha Flash - Google Play
              </span>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>

            <a
              href="https://apps.apple.com/br/app/folhaflash/id1147765593"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-[var(--radius-card)] hover:border-primary/30 hover:shadow-[var(--elevation-sm)] transition-all duration-200"
            >
              <span className="flex-1 font-semibold text-foreground" style={{ fontSize: 'var(--text-label)' }}>
                App Folha Flash - AppStore
              </span>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>
        </div>

        {/* 3.2 Alocação de horas: MyTime */}
        <div className="mb-10">
          <h3
            id="32-mytime"
            className="font-semibold mb-4 mt-8 scroll-mt-24"
            style={{
              fontSize: '20px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            3.2 Alocação de horas: My time
          </h3>
          <ul className="space-y-3 ml-6 list-disc mb-6">
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              Os funcionários TR precisam alocar horas em projetos e, para isso, usamos o MyTime
            </li>
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              O MyTime fecha para apontamento de horas sempre às manhãs das segundas-feiras da semana seguinte, por isso é importante fazer as marcações até o fim do expediente de sexta
            </li>
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              Precisamos alocar 40 horas semanais e, normalmente, todos os dias dividimos com 6.5h de projeto em "delivery" e 1.5h em "business strategy/operations"
            </li>
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              Férias e feriados também devem ser apontados no Mytime como "Non project time: out of office". Para evitar fechamento de período, aponte ANTES da sua saída
            </li>
          </ul>

          <div className="p-5 bg-card border border-border rounded-[var(--radius-card)] mb-6">
            <p className="font-semibold mb-3 text-foreground" style={{ fontSize: 'var(--text-label)' }}>
              Marcações out of office:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li className="text-foreground" style={{ fontSize: 'var(--text-label)', lineHeight: '1.6' }}>
                <strong>Company holiday:</strong> São somente os dias por deliberação da empresa, como o Mental Health, por exemplo
              </li>
              <li className="text-foreground" style={{ fontSize: 'var(--text-label)', lineHeight: '1.6' }}>
                <strong>Floating holiday:</strong> Tudo o que for de feriado/ponto facultativo do calendário comum
              </li>
              <li className="text-foreground" style={{ fontSize: 'var(--text-label)', lineHeight: '1.6' }}>
                <strong>Other Paid Absence:</strong> Banco de horas
              </li>
              <li className="text-foreground" style={{ fontSize: 'var(--text-label)', lineHeight: '1.6' }}>
                <strong>Sick Time:</strong> Atestado
              </li>
            </ul>
          </div>

          <a
            href="https://mytime.thomsonreuters.com/mytime/WeeklyView.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-4 py-3 mb-4 bg-card border border-border rounded-[var(--radius-card)] hover:border-primary/30 hover:shadow-[var(--elevation-sm)] transition-all duration-200"
          >
            <Globe className="w-5 h-5 text-blue-600" />
            <span className="flex-1 font-semibold text-foreground" style={{ fontSize: 'var(--text-label)' }}>
              Site - MyTime
            </span>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
        </div>

        {/* 3.3 Suas informações na TR: Workday */}
        <div className="mb-10">
          <h3
            id="33-workday"
            className="font-semibold mb-4 mt-8 scroll-mt-24"
            style={{
              fontSize: '20px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            3.3 Suas informações na TR: Workday
          </h3>
          <ul className="space-y-3 ml-6 list-disc mb-6">
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              O Workday é o portal onde você vai encontrar tudo sobre o seu contrato na empresa
            </li>
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              Periodicamente alguns cursos obrigatórios ou tarefas obrigatórias (preenchimento e progresso de metas atuais, por exemplo) são solicitados para você no Workday
            </li>
          </ul>

          <div
            className="p-4 mb-6 rounded-[var(--radius-card)] border-l-4"
            style={{
              borderLeftColor: 'var(--primary)',
              backgroundColor: 'rgba(214, 64, 0, 0.05)'
            }}
          >
            <p className="text-foreground font-semibold mb-2" style={{ fontSize: 'var(--text-label)' }}>
              Fique atento:
            </p>
            <p className="text-foreground" style={{ fontSize: 'var(--text-label)', lineHeight: '1.6' }}>
              lembre-se de acessar com frequência para verificar pendências.
            </p>
          </div>

          <p className="mb-6 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            No seu perfil, no menu "Pagamentos", você tem acesso aos seus holerites mensais e informes de rendimento anuais. Também é no perfil, na área de "Desempenho", que você vai preencher as metas anuais alinhadas com seu gestor. Quando quiser saber como está se saindo no seu trabalho, você pode acessar a opção "Feedback" e, ali, enviar a solicitação de feedback para os colegas que desejar.
          </p>

          <div className="space-y-3 mb-6">
            <a
              href="https://wd5.myworkday.com/thomsonreuters/login-saml.flex"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-[var(--radius-card)] hover:border-primary/30 hover:shadow-[var(--elevation-sm)] transition-all duration-200"
            >
              <Globe className="w-5 h-5 text-purple-600" />
              <span className="flex-1 font-semibold text-foreground" style={{ fontSize: 'var(--text-label)' }}>
                Site - Workday
              </span>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>

            <a
              href="https://wd5.myworkday.com/thomsonreuters/learning/mylearning"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-[var(--radius-card)] hover:border-primary/30 hover:shadow-[var(--elevation-sm)] transition-all duration-200"
            >
              <GraduationCap className="w-5 h-5 text-teal-600" />
              <span className="flex-1 font-semibold text-foreground" style={{ fontSize: 'var(--text-label)' }}>
                Conteúdo Educativo - Workday
              </span>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>
        </div>

        {/* 3.4 Férias e feriados */}
        <div className="mb-10">
          <h3
            id="34-ferias-feriados"
            className="font-semibold mb-4 mt-8 scroll-mt-24"
            style={{
              fontSize: '20px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            3.4 Férias e feriados
          </h3>
          <ul className="space-y-3 ml-6 list-disc mb-6">
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              Você pode agendar suas férias direto no Folha Certa, assim que completar 1 ano de empresa (para benefício TR de 15 dias de férias após 6 meses de contrato, consulte o gestor da área para saber como proceder)
            </li>
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              <strong>Day-off de aniversário:</strong> o benefício pode ser usufruído em qualquer dia do mês do aniversário, devendo apenas ser alinhado/comunicado com o gestor e o time de trabalho (squad)
            </li>
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              <strong>Feriados oficiais:</strong> confira aqui os feriados seguidos por toda a empresa no Brasil: <a href="https://trten.sharepoint.com/sites/intr-company-holidays/SitePages/brazil.aspx" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://trten.sharepoint.com/sites/intr-company-holidays/SitePages/brazil.aspx</a>
            </li>
          </ul>

          <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Não emendamos feriados, exceto em caso de banco de horas e alinhamento prévio com gestor ou em casos específicos que são comunicados por e-mail pela área de RH.
          </p>

          <ul className="space-y-3 ml-6 list-disc mb-6">
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              <strong>Mental health day:</strong> na lista de feriados nacionais você poderá consultar as duas datas de mental healthy day do ano, mas fique atento, pois este feriado não possui datas fixas. Sempre serão duas datas, sendo uma sexta-feira e uma segunda-feira, respectivamente no primeiro e segundo semestre do ano
            </li>
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              <strong>Feriados regionais:</strong> cada designer segue calendário de feriados conforme escritório de contratação. Verifique no seu perfil do Workday por qual cidade você foi contratado para saber quais feriados seguir
            </li>
          </ul>
        </div>

        {/* 3.5 Nossos escritórios */}
        <div className="mb-10">
          <h3
            id="35-nossos-escritorios"
            className="font-semibold mb-4 mt-8 scroll-mt-24"
            style={{
              fontSize: '20px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            3.5 Nossos escritórios
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* São Paulo */}
            <div className="p-5 bg-card border border-border rounded-[var(--radius-card)]">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-[var(--radius)] bg-blue-100 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1" style={{ fontSize: 'var(--text-base)' }}>
                    São Paulo
                  </h4>
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-caption)' }}>
                    Av. Dra. Ruth Cardoso, 7815 - 6º e 7º andares
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-caption)' }}>
                    Pinheiros - São Paulo - SP 05425-905
                  </p>
                </div>
              </div>
              <p className="text-foreground mb-3" style={{ fontSize: 'var(--text-label)', lineHeight: '1.6' }}>
                O time de design se reúne à direita do 7º andar. Não é necessário agendamento de mesa.
              </p>
              <a
                href="https://trten.sharepoint.com/sites/intr-conecta-latam/SitePages/Recursos-e-Parcerias-do-Novo-Escrit%C3%B3rio.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
                style={{ fontSize: 'var(--text-label)' }}
              >
                Recursos e parcerias
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Criciúma */}
            <div className="p-5 bg-card border border-border rounded-[var(--radius-card)]">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-[var(--radius)] bg-teal-100 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1" style={{ fontSize: 'var(--text-base)' }}>
                    Criciúma
                  </h4>
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-caption)' }}>
                    Av. Centenário, 7405
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-caption)' }}>
                    Nossa Sra. da Salete, Criciúma - SC - CEP: 88813-325
                  </p>
                </div>
              </div>
              <p className="text-foreground mb-3" style={{ fontSize: 'var(--text-label)', lineHeight: '1.6' }}>
                O time de design se reúne no 5º andar do prédio da frente. Não é necessário agendamento de mesa.
              </p>
              <a
                href="https://trten.sharepoint.com/:p:/r/sites/intr-conecta-latam/_layouts/15/Doc.aspx?sourcedoc=%7BB9C56F85-A231-45E3-BFF6-21E85F6C8688%7D&file=2024%20TR%20BRZ%20CRICIUMA%20Guia%20de%20convivencia%20e%20uso%20das%20instala%25u00e7%25u00f5es%20_VJN%20AGO%2025.pptx&action=edit&mobileredirect=true"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
                style={{ fontSize: 'var(--text-label)' }}
              >
                Guia de convivência
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <hr className="my-12 border-t border-border opacity-50" />

      {/* ========================================
          SEÇÃO 4: TIME DE UX
      ======================================== */}
      <section id="4-time-de-ux">
        <h2
          className="font-semibold mb-6 mt-12 scroll-mt-24 pb-4"
          style={{
            fontSize: 'var(--text-h3)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--primary)',
            borderBottom: '2px solid var(--border)',
            letterSpacing: '0.5px'
          }}
        >
          4. TIME DE UX
        </h2>

        {/* 4.1 Quem somos */}
        <div className="mb-10">
          <h3
            id="41-quem-somos"
            className="font-semibold mb-4 mt-8 scroll-mt-24"
            style={{
              fontSize: '20px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            4.1 Quem somos
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {[
              { nome: 'Daniel Coscarelli', cargo: 'Gerência de Design' },
              { nome: 'Adelino Oliveira', cargo: 'Team Lead' },
              { nome: 'Daniel Andrade', cargo: 'Produtos Contador' },
              { nome: 'Filipe Santos', cargo: 'Plataforma' },
              { nome: 'Gabriel Demski', cargo: 'Domínio Inova' },
              { nome: 'Karla Ikeda', cargo: 'Produtos Contador' },
              { nome: 'Kassiane Santos', cargo: 'Contabilidade' },
              { nome: 'Lucas Lima', cargo: 'Inova Strategy/Metrics' },
              { nome: 'Luis Domingues', cargo: 'Domínio Inova' },
              { nome: 'Natalia De Marco', cargo: 'Domínio Inova' },
              { nome: 'Raffaella Pelajo', cargo: 'Design System' },
              { nome: 'Paulo Araújo', cargo: 'Strategy/Design System' },
              { nome: 'Sabrina Cardoso', cargo: 'Folha' },
              { nome: 'Tassiana Mafioletti', cargo: 'Folha' },
            ].map((membro) => (
              <div key={membro.nome} className="flex flex-col items-center p-4 bg-card border border-border rounded-[var(--radius-card)]">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <p className="text-sm font-semibold text-center text-foreground" style={{ fontSize: 'var(--text-label)' }}>
                  {membro.nome}
                </p>
                <p className="text-xs text-muted-foreground text-center" style={{ fontSize: 'var(--text-caption)' }}>
                  {membro.cargo}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4.2 Design System - Produtos em produção */}
        <div className="mb-10">
          <h3
            id="42-design-systems"
            className="font-semibold mb-4 mt-8 scroll-mt-24"
            style={{
              fontSize: '20px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            4.2 Design System - Produtos em produção
          </h3>

          <div className="space-y-6">
            {/* Gestta */}
            <div className="p-5 bg-card border border-border rounded-[var(--radius-card)]">
              <h4 className="font-semibold mb-3 text-foreground" style={{ fontSize: 'var(--text-base)' }}>
                Gestta (Processos e Messenger):
              </h4>
              <a
                href="https://www.figma.com/design/jEgN1GZWg5dTSeZHLNIqJF/Design-System---Onvio?node-id=3077-141&p=f&t=vlAKjASZ9sshMtfr-0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
                style={{ fontSize: 'var(--text-label)' }}
              >
                Gestta Design System
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Bento */}
            <div className="p-5 bg-card border border-border rounded-[var(--radius-card)]">
              <h4 className="font-semibold mb-3 text-foreground" style={{ fontSize: 'var(--text-base)' }}>
                Bento (Produtos Onvio):
              </h4>
              <div className="space-y-2">
                <div>
                  <a
                    href="https://www.figma.com/design/jEgN1GZWg5dTSeZHLNIqJF/Design-System---Onvio?node-id=3077-141&p=f&t=vlAKjASZ9sshMtfr-0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                    style={{ fontSize: 'var(--text-label)' }}
                  >
                    Bento Design System
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div>
                  <a
                    href="https://www.figma.com/design/uwvINQRWIQzUtpdVd4qQdx/Bento-Icons-2019--Master---8c28b2f-?node-id=0-2&p=f&t=7M0JbkwwJpguWlej-0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                    style={{ fontSize: 'var(--text-label)' }}
                  >
                    Bento Icons
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div>
                  <a
                    href="https://www.figma.com/design/UnrbQ7dgJCaTiQjVCLXIRR/Layouts-padr%C3%B5es?node-id=2282-12998&p=f&t=IYoKwWqGaS4Yk2PP-0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                    style={{ fontSize: 'var(--text-label)' }}
                  >
                    Layouts padrão
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div>
                  <a
                    href="https://ng.bento.ui.int.thomsonreuters.com/home#/home"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                    style={{ fontSize: 'var(--text-label)' }}
                  >
                    Documentação (necessita Zscaler)
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Saffron */}
            <div className="p-5 bg-card border border-border rounded-[var(--radius-card)]">
              <h4 className="font-semibold mb-3 text-foreground" style={{ fontSize: 'var(--text-base)' }}>
                Saffron (DS Global - não utilizado nas nossas aplicações):
              </h4>
              <div className="space-y-2">
                <div>
                  <a
                    href="https://www.figma.com/design/9VuW5ptbYS7jfyHiuPpybR/Saffron-component-library?node-id=356-34527&p=f&t=PLiBpmUQEmXsDrb4-0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                    style={{ fontSize: 'var(--text-label)' }}
                  >
                    Saffron Design System - Biblioteca de componentes
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div>
                  <a
                    href="https://www.figma.com/design/K79KnYrmEBddTS6k5wsrHp/Saffron-token-library?node-id=2760-737&p=f&t=lj43Ib87T35z8Xzj-0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                    style={{ fontSize: 'var(--text-label)' }}
                  >
                    Saffron Design System - Biblioteca de tokens
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div>
                  <a
                    href="https://thomsonreuters.chromatic.com/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                    style={{ fontSize: 'var(--text-label)' }}
                  >
                    Documentação / Storybook
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div>
                  <a
                    href="https://teams.microsoft.com/l/channel/19%3A9c7c023970c54ae2be95a8c8fa7db6ef%40thread.tacv2/Releases?groupId=bf66feb4-185e-409d-a28d-22b76f7764ca&tenantId=62ccb864-6a1a-4b5d-8e1c-397dec1a8258"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                    style={{ fontSize: 'var(--text-label)' }}
                  >
                    Canal de discussão Teams
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div>
                  <a
                    href="https://trten.sharepoint.com/sites/intr-thomson-reuters-saffron-design-system"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                    style={{ fontSize: 'var(--text-label)' }}
                  >
                    Página Oficial: Atrium
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4.3 DOM Design System */}
        <div className="mb-10">
          <h3
            id="43-dom-design-system"
            className="font-semibold mb-4 mt-8 scroll-mt-24"
            style={{
              fontSize: '20px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            4.3 DOM Design System
          </h3>
          <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Estamos desenhando um novo design system e que, por enquanto, sua identidade visual é usada apenas para Internet Banking e alguns produtos novos.
          </p>
          <a
            href="https://www.figma.com/design/jEgN1GZWg5dTSeZHLNIqJF/Design-System---Onvio?node-id=3077-141&p=f&t=vlAKjASZ9sshMtfr-0"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-4 py-3 mb-4 bg-card border border-border rounded-[var(--radius-card)] hover:border-primary/30 hover:shadow-[var(--elevation-sm)] transition-all duration-200"
          >
            <span className="flex-1 font-semibold text-foreground" style={{ fontSize: 'var(--text-label)' }}>
              Conheça a biblioteca de apoio visual: Novo Design System
            </span>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
        </div>

        {/* 4.4 Agendas de UX */}
        <div className="mb-10">
          <h3
            id="44-agendas-ux"
            className="font-semibold mb-4 mt-8 scroll-mt-24"
            style={{
              fontSize: '20px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            4.4 Agendas de UX
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-card border border-border rounded-[var(--radius-card)]">
              <p className="font-semibold mb-2 text-foreground" style={{ fontSize: 'var(--text-label)' }}>
                Alinhamento Quinzenal de UX:
              </p>
              <p className="text-muted-foreground" style={{ fontSize: 'var(--text-label)', lineHeight: '1.6' }}>
                Todo o time faz uma breve apresentação dos projetos em que está atuando
              </p>
            </div>

            <div className="p-4 bg-card border border-border rounded-[var(--radius-card)]">
              <p className="font-semibold mb-2 text-foreground" style={{ fontSize: 'var(--text-label)' }}>
                1:1 Daniel:
              </p>
              <p className="text-muted-foreground" style={{ fontSize: 'var(--text-label)', lineHeight: '1.6' }}>
                Papo individual com o gerente de design (quinzenal)
              </p>
            </div>

            <div className="p-4 bg-card border border-border rounded-[var(--radius-card)]">
              <p className="font-semibold mb-2 text-foreground" style={{ fontSize: 'var(--text-label)' }}>
                Design Critique - Agenda de co-criação:
              </p>
              <p className="text-muted-foreground" style={{ fontSize: 'var(--text-label)', lineHeight: '1.6' }}>
                Se você está trabalhando em uma jornada e precisa da opinião do time em relação aos componentes a serem utilizados ou fluxo a ser seguido, leve o projeto para discutir com a gente (quinzenal, mas podem ser marcadas reuniões específicas)
              </p>
            </div>

            <div className="p-4 bg-card border border-border rounded-[var(--radius-card)]">
              <p className="font-semibold mb-2 text-foreground" style={{ fontSize: 'var(--text-label)' }}>
                ROI de Design e OKRs:
              </p>
              <p className="text-muted-foreground" style={{ fontSize: 'var(--text-label)', lineHeight: '1.6' }}>
                Alinhamentos individuais com o gerente de design sobre a evolução das nossas metas anuais e desenvolvimento de habilidades profissionais (trimestrais)
              </p>
            </div>

            <div className="p-4 bg-card border border-border rounded-[var(--radius-card)]">
              <p className="font-semibold mb-2 text-foreground" style={{ fontSize: 'var(--text-label)' }}>
                Design Talks:
              </p>
              <p className="text-muted-foreground" style={{ fontSize: 'var(--text-label)', lineHeight: '1.6' }}>
                Palestras sobre temas diversos e apresentadas por convidados ou por pessoas do time
              </p>
            </div>
          </div>
        </div>

        {/* 4.5 Design Talks */}
        <div className="mb-10">
          <h3
            id="45-design-talks"
            className="font-semibold mb-4 mt-8 scroll-mt-24"
            style={{
              fontSize: '20px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            4.5 Design Talks
          </h3>
          <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Confira alguns dos Design Talks já realizados para o nosso time:
          </p>
          <div
            className="p-4 mb-6 rounded-[var(--radius-card)] border-l-4"
            style={{
              borderLeftColor: 'var(--primary)',
              backgroundColor: 'rgba(214, 64, 0, 0.05)'
            }}
          >
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-label)' }}>
              <strong>Vídeos pendentes de URL:</strong>
            </p>
            <ul className="mt-2 space-y-1 ml-4 list-disc">
              <li className="text-muted-foreground" style={{ fontSize: 'var(--text-label)' }}>UX/UI + IA: Além do Buzzword (com Nanda Dias)</li>
              <li className="text-muted-foreground" style={{ fontSize: 'var(--text-label)' }}>MetricsOps (com Adriana Akamine)</li>
              <li className="text-muted-foreground" style={{ fontSize: 'var(--text-label)' }}>Métricas que contam histórias, mais dados menos achismo (com David Braia)</li>
            </ul>
          </div>
        </div>

        {/* 4.6 Triple Diamond */}
        <div className="mb-10">
          <h3
            id="46-triple-diamond"
            className="font-semibold mb-4 mt-8 scroll-mt-24"
            style={{
              fontSize: '20px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            4.6 Triple Diamond
          </h3>
          <p className="mb-5 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Buscamos utilizar o conceito de Triplo Diamante para processos de design.
          </p>
          <div
            className="p-4 mb-6 rounded-[var(--radius-card)] border-l-4"
            style={{
              borderLeftColor: 'var(--primary)',
              backgroundColor: 'rgba(214, 64, 0, 0.05)'
            }}
          >
            <p className="text-muted-foreground mb-2" style={{ fontSize: 'var(--text-label)' }}>
              <strong>Apresentação UX Process:</strong> [Clique para assistir vídeo]
            </p>
            <a
              href="https://trten-my.sharepoint.com/:b:/r/personal/adelino_oliveira_thomsonreuters_com/Documents/Arquivos%20de%20Chat%20do%20Microsoft%20Teams/QA%20de%20design.pdf?csf=1&web=1&e=Ffm0WA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
              style={{ fontSize: 'var(--text-label)' }}
            >
              Material de apoio: QA de design
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 4.7 Processos de design */}
        <div className="mb-10">
          <h3
            id="47-processos-design"
            className="font-semibold mb-4 mt-8 scroll-mt-24"
            style={{
              fontSize: '20px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            4.7 Processos de design
          </h3>

          {/* 4.7.1 Descobrir */}
          <h4
            className="font-semibold mb-3 mt-6"
            style={{
              fontSize: '18px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            4.7.1 Descobrir
          </h4>
          <p className="mb-4 text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Estamos criando padrões e documentações para facilitar a rotina do time. Aqui listamos alguns templates e apresentações úteis para seu dia a dia. Alguns materiais devem passar por atualização posteriormente.
          </p>
          <div
            className="p-4 mb-6 rounded-[var(--radius-card)] border-l-4"
            style={{
              borderLeftColor: 'var(--primary)',
              backgroundColor: 'rgba(214, 64, 0, 0.05)'
            }}
          >
            <ul className="space-y-1 ml-4 list-disc">
              <li className="text-muted-foreground" style={{ fontSize: 'var(--text-label)' }}>Modelo de Briefing: [link]</li>
              <li className="text-muted-foreground" style={{ fontSize: 'var(--text-label)' }}>Apresentação: Processos de Pesquisa Exploratória: [vídeo]</li>
              <li className="text-muted-foreground" style={{ fontSize: 'var(--text-label)' }}>Template de planejamento e documentação de pesquisa: [link]</li>
            </ul>
          </div>

          {/* 4.7.2 Cocriar */}
          <h4
            className="font-semibold mb-3 mt-6"
            style={{
              fontSize: '18px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            4.7.2 Cocriar
          </h4>
          <ul className="space-y-2 ml-6 list-disc mb-6">
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              Manual de Interfaces: [link]
            </li>
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              <a
                href="https://www.figma.com/design/SEU6A4INt61fl28RqCkQlg/01.-Guide--UX-Writing?node-id=0-1&p=f&t=m8WldONPTxjj7k4k-0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Manual de UX Writing: Figma
              </a>
            </li>
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              Alertas e mensagens padrão - Onvio: [Excel]
            </li>
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              Guia para criação de pesquisas e testes de usabilidade: [link]
            </li>
            <li className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              Templates de teste de usabilidade: [Excel]
            </li>
          </ul>

          {/* 4.7.3 Entregar */}
          <h4
            className="font-semibold mb-3 mt-6"
            style={{
              fontSize: '18px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)'
            }}
          >
            4.7.3 Entregar
          </h4>
          <div
            className="p-4 mb-6 rounded-[var(--radius-card)] border-l-4"
            style={{
              borderLeftColor: 'var(--primary)',
              backgroundColor: 'rgba(214, 64, 0, 0.05)'
            }}
          >
            <ul className="space-y-1 ml-4 list-disc">
              <li className="text-muted-foreground" style={{ fontSize: 'var(--text-label)' }}>Apresentação: Modelo de Handoff: [vídeo]</li>
              <li className="text-muted-foreground" style={{ fontSize: 'var(--text-label)' }}>Apresentação: Modelo de Arquivo no Figma: [vídeo]</li>
              <li className="text-muted-foreground" style={{ fontSize: 'var(--text-label)' }}>Apresentação: UX Metrics Playbook: [vídeo]</li>
            </ul>
          </div>
        </div>

        {/* Mensagem final */}
        <div
          className="p-6 rounded-[var(--radius-card)] text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(214, 64, 0, 0.05) 0%, rgba(214, 64, 0, 0.1) 100%)'
          }}
        >
          <p className="text-foreground font-semibold mb-2" style={{ fontSize: 'var(--text-lg)' }}>
            Bem-vindo ao time! 🎉
          </p>
          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
            Estamos felizes em ter você conosco. Qualquer dúvida, conte com o time!
          </p>
        </div>
      </section>
    </div>
  );
}
