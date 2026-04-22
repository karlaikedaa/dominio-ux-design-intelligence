import { PersonaMasterDetail } from "../components/PersonaMasterDetail";
import { personaEmpregado } from "../data/personas";

export function PersonaEmpregado() {
  return (
    <PersonaMasterDetail
      personas={personaEmpregado}
      title="Persona Empregado"
      description="Conheça o perfil do trabalhador CLT que usa os serviços de holerite, benefícios e empréstimo consignado."
    />
  );
}
