import { PersonaMasterDetail } from "../components/PersonaMasterDetail";
import { personasPME } from "../data/personas";

export function PersonasPME() {
  return (
    <PersonaMasterDetail
      personas={personasPME}
      title="Personas PME"
      description="Veja os perfis das empresas e empreendedores que são clientes do escritório. Cada perfil tem necessidades e formas de interação bem diferentes."
      showDigitalLevel
    />
  );
}
