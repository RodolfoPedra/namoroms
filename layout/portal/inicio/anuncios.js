import React from "react"; import styled from "styled-components";
import Tag from "components/tag";

const Anuncios = ({ anuncios }) => {
  return (
    <ListaDeAnuncios>
      {anuncios?.map((anuncio, index) => (
        <Item className="lista" key={index}>
          <div>
            <Label>TÍTULO DO ANÚNCIO:</Label>
            <Texto>{anuncio.tituloAnuncio}</Texto>
          </div>
          <div>
            <Label>STATUS:</Label>
            <Texto>
              {anuncio.pendente === "false" ?
                <Tag sucesso>Publicado</Tag>
                : <Tag alerta>Pendente</Tag>
              }
            </Texto>
          </div>
          <div>
            <Label>PLANO:</Label>
            <Texto>{anuncio.planoEscolhido}</Texto>
          </div>
        </Item>
      ))}
    </ListaDeAnuncios>
  );
};

export default Anuncios

const ListaDeAnuncios = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  flex-wrap: wrap;
  justify-content: center;
`;

const Item = styled.li`
  background-color: #202020;
  color: var(--branca);
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 8px;
  max-width: 240px;
  width: 100%;
  margin: 16px;
`;

const Texto = styled.p`
  margin-top: 4px;
  margin-bottom: 16px;
  font-size: 18px;
`;

const Label = styled.label`
  opacity: 0.6;
  margin-bottom: 0;
  font-size: 12px;
`;
