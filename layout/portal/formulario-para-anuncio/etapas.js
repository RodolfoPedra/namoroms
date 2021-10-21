import React from "react";
import styled from "styled-components";
import Icone from "components/icone";

const Etapas = ({ etapas, setarEtapa, etapaSelecionada }) => {
  const handleChange = (indexDaEtapa) => {
    setarEtapa(() => indexDaEtapa);
  };

  return (
    <ListaDeEtapas>
      {etapas?.map((etapa, index) => (
        <li key={index}>
          <Etapa
            onClick={() => handleChange(index)}
            tabIndex="0"
            disabled={index > etapaSelecionada}
            className={
              etapaSelecionada === index
                ? "etapaAtiva"
                : index < etapaSelecionada
                  ? "etapaPreenchida"
                  : ""
            }
          >
            <Icone nome={etapa.icone} />
          </Etapa>
        </li>
      ))}
    </ListaDeEtapas>
  );
};

export default Etapas

const ListaDeEtapas = styled.ul`
  padding: 0;
  list-style: none;
  display: flex;
`;

const Etapa = styled.button`
  background: #616161;
  border: 2px solid transparent;
  width: 48px;
  height: 48px;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--branca);
  font-size: 16px;
  margin: 8px;
  &.etapaAtiva {
    border-color: #eee400;
    pointer-events: none;
  }
  &.etapaPreenchida {
    background: #eee400;
    color: var(--preta);
  }
  &:disabled {
    cursor: initial;
  }
`;
