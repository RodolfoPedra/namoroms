import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { getAnuncios } from "interface/controllers/pegar-anuncios";
import { useSelector } from "react-redux";
import BlankSlate from "components/blank-slate";
import { initializeStore } from 'store/configureStore';
import Loading from "components/loading";

const ListaDeAnuncios = () => {
  const filtros = useSelector((state) => state);
  const reduxStore = initializeStore();
  const [anuncios, setAnuncios] = useState([]);
  const router = useRouter();
  const [loadingAtivo, setLoadingAtivo] = useState(true)

  const irParaOAnuncio = (slug) => {
    router.push({
      pathname: "/anuncio/",
      query: {
        slug
      }
    });
  };

  useEffect(() => {
    (async () => {
      setLoadingAtivo(true)
      const _filtros = filtros ? filtros : JSON.parse(localStorage.getItem("state"));
      const resultAnuncios = await getAnuncios(_filtros);
      setAnuncios(resultAnuncios.data);
      setLoadingAtivo(false)
    })();
  }, [filtros.regiao, filtros.acompanhante]);

  return (<>
    <Lista>
      <Loading ativo={loadingAtivo} />
      {anuncios.length > 0 && filtros.regiao && anuncios.map((item, index) => {
        return (
          <li key={index}>
            <Item onClick={() => irParaOAnuncio(item.id)}>
              <Foto>
                <img src={item.fotos[0].src} />
              </Foto>
              <span className="infos">
                <p className="nome">{item.tituloAnuncio}</p>
                <p className="telefone">
                  <img src="whatsappp-logo.svg" />
                  {item.telefone}
                </p>
                {item.atendeEmLocalProprio && <p className="descricao">Com local</p>}
                <p className="descricao">{item.cidade}/MS</p>
              </span>
            </Item>
          </li>
        )
      })}

      {anuncios.length === 0 && (
        <BlankSlate
          icone="feedback"
          texto="Ops... Não encontramos anúncios aqui por enquanto."
        />
      )}
    </Lista></>
  );
};

export default ListaDeAnuncios;

const Lista = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  min-height: 60vh;
  padding: 24px 16px;
  margin: 0 auto;
  width: 100%;
  max-width: 1240px;
  flex-wrap: wrap;
`;

const Item = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: flex-end;
  background-size: cover;
  background-position: center center;
  width: 240px;
  height: 320px;
  border-radius: 8px;
  transition: ease 0.2s;
  cursor: pointer;
  overflow: hidden;
  margin: 12px;
  &:hover,
  &:focus {
    transform: translate(0, -3px);
  }
  .infos {
    position: relative;
    display: flex;
    background-color: rgba(250, 192, 69, 0.9);
    flex-direction: column;
    text-align: center;
    margin: 8px;
    border-radius: 8px;
    padding: 8px 0;
    &::after {
      content: "";
      position: absolute;
      top: 4px;
      right: 4px;
      height: 12px;
      width: 12px;
      border-radius: 12px;
      background-color: var(--branca);
    }
  }
  .nome {
    margin: -2px 0;
    font-weight: 600;
    font-size: 16px;
  }
  .descricao {
    margin: 0;
    font-weight: 600;
    font-size: 14px;
  }
  .telefone {
    font-size: 18px;
    font-weight: 800;
    display: flex;
    align-items: center;
    margin: -2px auto;
    img {
      margin-right: 8px;
      height: 20px;
    }
  }
`;

const Foto = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

//Mock
const foto1 = "exemple1.jpg";
const foto2 = "exemple2.jpg";
const foto3 = "exemple3.jpg";
const foto4 = "exemple4.jpg";
const foto5 = "exemple5.jpg";
const itens = [
  {
    nome: "Bruninha",
    telefone: "(67) 99654-7312",
    comLocal: true,
    cidade: "Campo Grande",
    estado: "MS",
    imagem: foto1,
  },
  {
    nome: "Gisele",
    telefone: "(67) 99654-7312",
    comLocal: true,
    cidade: "Campo Grande",
    estado: "MS",
    imagem: foto2,
  },
  {
    nome: "Verônica",
    telefone: "(67) 99654-7312",
    comLocal: true,
    cidade: "Campo Grande",
    estado: "MS",
    imagem: foto3,
  },
  {
    nome: "Letícia",
    telefone: "(67) 99654-7312",
    comLocal: true,
    cidade: "Campo Grande",
    estado: "MS",
    imagem: foto4,
  },
  {
    nome: "Malu Maitê",
    telefone: "(67) 99654-7312",
    comLocal: true,
    cidade: "Campo Grande",
    estado: "MS",
    imagem: foto5,
  },
  {
    nome: "Bruninha",
    telefone: "(67) 99654-7312",
    comLocal: true,
    cidade: "Campo Grande",
    estado: "MS",
    imagem: foto1,
  },
  {
    nome: "Gisele",
    telefone: "(67) 99654-7312",
    comLocal: true,
    cidade: "Campo Grande",
    estado: "MS",
    imagem: foto2,
  },
  {
    nome: "Verônica",
    telefone: "(67) 99654-7312",
    comLocal: true,
    cidade: "Campo Grande",
    estado: "MS",
    imagem: foto3,
  },
  {
    nome: "Letícia",
    telefone: "(67) 99654-7312",
    comLocal: true,
    cidade: "Campo Grande",
    estado: "MS",
    imagem: foto4,
  },
  {
    nome: "Malu Maitê",
    telefone: "(67) 99654-7312",
    comLocal: true,
    cidade: "Campo Grande",
    estado: "MS",
    imagem: foto5,
  },
  {
    nome: "Bruninha",
    telefone: "(67) 99654-7312",
    comLocal: true,
    cidade: "Campo Grande",
    estado: "MS",
    imagem: foto1,
  },
  {
    nome: "Gisele",
    telefone: "(67) 99654-7312",
    comLocal: true,
    cidade: "Campo Grande",
    estado: "MS",
    imagem: foto2,
  },
  {
    nome: "Verônica",
    telefone: "(67) 99654-7312",
    comLocal: true,
    cidade: "Campo Grande",
    estado: "MS",
    imagem: foto3,
  },
  {
    nome: "Letícia",
    telefone: "(67) 99654-7312",
    comLocal: true,
    cidade: "Campo Grande",
    estado: "MS",
    imagem: foto4,
  },
  {
    nome: "Malu Maitê",
    telefone: "(67) 99654-7312",
    comLocal: true,
    cidade: "Campo Grande",
    estado: "MS",
    imagem: foto5,
  },
  {
    nome: "Bruninha",
    telefone: "(67) 99654-7312",
    comLocal: true,
    cidade: "Campo Grande",
    estado: "MS",
    imagem: foto1,
  },
  {
    nome: "Gisele",
    telefone: "(67) 99654-7312",
    comLocal: true,
    cidade: "Campo Grande",
    estado: "MS",
    imagem: foto2,
  },
  {
    nome: "Verônica",
    telefone: "(67) 99654-7312",
    comLocal: true,
    cidade: "Campo Grande",
    estado: "MS",
    imagem: foto3,
  },
  {
    nome: "Letícia",
    telefone: "(67) 99654-7312",
    comLocal: true,
    cidade: "Campo Grande",
    estado: "MS",
    imagem: foto4,
  },
  {
    nome: "Malu Maitê",
    telefone: "(67) 99654-7312",
    comLocal: true,
    cidade: "Campo Grande",
    estado: "MS",
    imagem: foto5,
  },
  {
    nome: "Bruninha",
    telefone: "(67) 99654-7312",
    comLocal: true,
    cidade: "Campo Grande",
    estado: "MS",
    imagem: foto1,
  },
  {
    nome: "Gisele",
    telefone: "(67) 99654-7312",
    comLocal: true,
    cidade: "Campo Grande",
    estado: "MS",
    imagem: foto2,
  },
  {
    nome: "Verônica",
    telefone: "(67) 99654-7312",
    comLocal: true,
    cidade: "Campo Grande",
    estado: "MS",
    imagem: foto3,
  },
  {
    nome: "Letícia",
    telefone: "(67) 99654-7312",
    comLocal: true,
    cidade: "Campo Grande",
    estado: "MS",
    imagem: foto4,
  },
  {
    nome: "Malu Maitê",
    telefone: "(67) 99654-7312",
    comLocal: true,
    cidade: "Campo Grande",
    estado: "MS",
    imagem: foto5,
  },
];
