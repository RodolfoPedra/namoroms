import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Galeria from "./galeria"
import Ficha from "./ficha"
import Descricao from "./descricao"
import { getAnuncio } from 'interface/controllers/pegar-anuncio';
import { useRouter } from "next/router"
import Loading from "components/loading"

const Anuncio = () => {

  const [anuncio, setAnuncio] = useState(null);
  const [loadingAtivo, setLoadingAtivo] = useState(true)
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    (async () => {
      const result = await getAnuncio(router.query.slug);
      setAnuncio(result.data);
      setLoadingAtivo(false)
    })();
  }, [router.isReady]);

  return (
    <ContainerAnuncio>
      <Loading ativo={loadingAtivo} />
      <Ficha dados={anuncio} />
      <Conteudo>
        <Galeria dados={anuncio} />
        <Descricao dados={anuncio} />
      </Conteudo>
    </ContainerAnuncio>
  )
}

export default Anuncio

const ContainerAnuncio = styled.section`
  display: flex;
  width: 100%;
  max-width: 1366px;
  margin: 0 auto;
  padding: 24px;
  @media screen and (max-width: 640px) {
    flex-direction: column;
    max-width: auto;
  }
  `

const Conteudo = styled.div`
  width: 100%;
  margin-left: 16px;
  @media screen and (max-width: 640px) {
  margin-left: 0;
  margin-top: 16px; 
}
  `
