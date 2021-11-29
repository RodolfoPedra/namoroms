import React, {useState, useEffect} from "react"; import styled from "styled-components";
import Tag from "components/tag";
import { useRouter } from "next/router";
import {deleteAnuncio} from 'interface/controllers/deletar-anuncio';
import { useSelector } from "react-redux";
import { getState } from "utils/useLocalStorage";

const Anuncios = ({ anuncios }) => {
  const [tokenLS, setTokenST] = useState("")
  const {token} = useSelector(state => state);

  const router = useRouter();

  useEffect(() => {
    getState().token && setTokenST(getState().token)
  }, [])

  const editarAnuncio = (slug) => {
    localStorage.setItem(slug.id, JSON.stringify(slug));
    router.push({
      pathname: "/portal/formulario/",
      query: {
        editar: slug.id
      }
    });
  }

  const excluirAnuncio = async (slug) => {
    if (confirm("Tem certeza que deseja excluir o anúncio")) {
      await deleteAnuncio(slug.id, token ? token : tokenLS)
      router.reload();
    } 
  }

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
            <Texto onClick={() => editarAnuncio(anuncio)}>
                <Tag editar>Editar</Tag>            
            </Texto>
            <Texto onClick={() => excluirAnuncio(anuncio)}>
                <Tag excluir>Excluir</Tag>            
            </Texto>
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

