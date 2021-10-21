import { Button } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import Icone from "components/icone";

const BlankSlate = ({ icone, texto, iconeBotao, textoBotao, acaoDoBotao }) => {
  return (
    <Container>
      <Icone nome={icone} />
      <Texto>{texto}</Texto>
      {acaoDoBotao && textoBotao && (
        <Button
          onClick={acaoDoBotao}
          variant="contained"
          color="primary"
          type="button"
          startIcon={<Icone nome={iconeBotao} />}
        >
          {textoBotao}
        </Button>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 32px;
  color: rgba(266, 266, 266, 0.5);
  .material-icons-round {
    font-size: 100px;
  }
`;

const Texto = styled.h2`
  color: var(--branca);
  font-size: 18px;
  font-weight: 600;
`;

export default BlankSlate;
