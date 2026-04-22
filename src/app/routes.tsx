import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { PersonasContabil } from "./pages/PersonasContabil";
import { PersonasPME } from "./pages/PersonasPME";
import { PersonaEmpregado } from "./pages/PersonaEmpregado";
import { PersonasHub } from "./pages/PersonasHub";
import { MapasEmpatia } from "./pages/MapasEmpatia";
import { Brainstorm } from "./pages/Brainstorm";
import { OnboardingUX } from "./pages/OnboardingUX";
import { RepositorioPesquisa } from "./pages/RepositorioPesquisa";
import { ValidadorWriting } from "./pages/ValidadorWriting";
import { GuiaWriting } from "./pages/GuiaWriting";
import { EspecificacoesAcessibilidade } from "./pages/EspecificacoesAcessibilidade";
import { EspecificacoesMetricas } from "./pages/EspecificacoesMetricas";
import { EmBreve } from "./pages/EmBreve";
import { NossosProdutos } from "./pages/NossosProdutos";
import { AIFirst } from "./pages/AIFirst";
import { AgentesTime } from "./pages/AgentesTime";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "personas", Component: PersonasHub },
      { path: "personas/contabil", Component: PersonasContabil },
      { path: "personas/pme", Component: PersonasPME },
      { path: "personas/empregado", Component: PersonaEmpregado },
      { path: "mapas-empatia", Component: MapasEmpatia },
      { path: "brainstorm", Component: Brainstorm },
      { path: "onboarding", Component: OnboardingUX },
      { path: "repositorio-pesquisa", Component: RepositorioPesquisa },
      { path: "validador", Component: ValidadorWriting },
      { path: "guia-writing", Component: GuiaWriting },
      { path: "acessibilidade", Component: EspecificacoesAcessibilidade },
      { path: "metricas", Component: EspecificacoesMetricas },
      { path: "produtos", Component: NossosProdutos },
      { path: "ai-first", Component: AIFirst },
      { path: "agentes-time", Component: AgentesTime },
      { path: "benchmark", Component: () => <EmBreve titulo="Agente Benchmark" mensagem="O agente de benchmark automático estará disponível em breve." /> },
      { path: "defesa-tecnica", Component: () => <EmBreve titulo="Defesa Técnica" mensagem="A funcionalidade de defesa técnica estará disponível em breve." /> },
    ],
  },
]);
