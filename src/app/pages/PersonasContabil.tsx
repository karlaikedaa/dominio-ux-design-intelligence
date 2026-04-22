import { PersonaMasterDetail } from "../components/PersonaMasterDetail";
import { personasContabil } from "../data/personas";

export function PersonasContabil() {
  return (
    <PersonaMasterDetail
      personas={personasContabil}
      title="Personas Contábil"
      description="Conheça os quatro perfis de contadores que usam o Domínio. Selecione um perfil para ver todos os detalhes."
    />
  );
}
