import React, { useEffect } from "react";
import styled from "styled-components";
import Etapas from "./etapas";
import { useState } from "react";
import DadosPessoais from "./dados-pessoais";
import { Button } from "@material-ui/core";
import Icone from "components/icone";
import InformacoesDoAnuncio from "./informacoes-do-anuncio";
import UploadDeImagens from "./upload-de-imagens";
import { useRouter } from "next/router";
import Checkout from "./checkout";
import { obterDadosDoFormulario } from "utils/storage";

const etapas = [
  {
    icone: "person",
    nome: "Dados Pessoais",
  },
  {
    icone: "subject",
    nome: "Descrição",
  },
  {
    icone: "collections",
    nome: "Fotos",
  },
  {
    icone: "credit_score",
    nome: "Checkout",
  },
];

const FormularioParaAnuncio = () => {
  const [imagensGaleria, setImagensGaleria] = useState([]);
  const [imagemPrincipal, setImagemPrincipal] = useState([]);
  const [etapaSelecionada, setEtapaSelecionada] = useState(0);
  const [dadosPessoais, setDadosPessoais] = useState({})
  const [dadosDoFormulario, setDadosDoFormulario] = useState({})

  const router = useRouter()

  const avancarEtapa = () => {
    setEtapaSelecionada(etapaSelecionada + 1);
  };

  const finalizarCadastro = () => {
    alert("Cadastro Finalizado com sucesso");
    router.push("/portal/inicio");
  };

  return (
    <ContainerFormulario>

      <Etapas
        etapas={etapas}
        etapaSelecionada={etapaSelecionada}
        setarEtapa={setEtapaSelecionada}
      />

      {etapaSelecionada === 0 &&
        <DadosPessoais
          dadosDoFormulario={dadosDoFormulario}
          setDadosDoFormulario={setDadosDoFormulario}
          dadosPessoais={dadosPessoais}
          setDadosPessoais={setDadosPessoais}
          avancarEtapa={avancarEtapa}
        />
      }

      {etapaSelecionada === 1 &&
        <InformacoesDoAnuncio avancarEtapa={avancarEtapa} />
      }

      {etapaSelecionada === 2 &&
        <UploadDeImagens imagensGaleria={imagensGaleria}
          setImagemPrincipal={setImagemPrincipal}
          setImagensGaleria={setImagensGaleria}
          imagemPrincipal={imagemPrincipal}
          avancarEtapa={avancarEtapa}
        />
      }

      {etapaSelecionada === 3 &&
        <Checkout imagensGaleria={imagensGaleria}
          imagemPrincipal={imagemPrincipal} />
      }
    </ContainerFormulario>
  );
};

const ContainerFormulario = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 720px;
  width: 100%;
  margin: 40px auto;
  background-color: var(--preta);
  padding: 24px;
  border-radius: 16px;
`;

export default FormularioParaAnuncio
