import { Button, Link } from "@material-ui/core"
import Icone from "components/icone"
import React from "react"
import styled from "styled-components"

const telefone = "(67) 99999-8383"
const descricaoDoAnuncio = "Descrição completa do anúncio aqui nessa.  completa do anúncio aqui nessa. página. Descrição completa do anúncio aqui nessa página. Descrição completa do anúncio aqui nessa página.Descrição completa do anúncio aqui nessa página."

const Descricao = ({ dados }) => {

  if (!dados) return null;
  return (
    <ContainerDescricao>
      <Texto>
        {dados.descricao}
      </Texto>

      <Contato>
        {
          dados.esseNumeroEhWhatsapp === "true" &&
          <Link style={{ width: '100%' }} target="_blank" href={`https://api.whatsapp.com/send?phone=+55${dados.telefone}`}>
            <LinkWhats variant="contained" color="primary" size="large">
              <img src="/whatsappp-logo.svg" />
              {dados.telefone}
            </LinkWhats>
          </Link>
        }
        {
          dados.telefone &&
          <Link style={{ width: '100%' }} href={`tel:${dados.telefone}`}>
            <LinkTelefone variant="outlined" color="primary" size="large" startIcon={<Icone nome="call" />}>
              {dados.telefone}
            </LinkTelefone>
          </Link>
        }
        {dados.atendeEmLocalProprio === "true" && <Detalhes>Com local</Detalhes>}
        <Detalhes>{dados.cidade}/MS</Detalhes>
      </Contato>
    </ContainerDescricao>
  )
}

export default Descricao

const ContainerDescricao = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  padding: 24px;
  border: 2px solid var(--primaria);
  border-radius: 24px;
  @media screen and (min-width: 1080px) {
    flex-direction: row;
  }
`

const Texto = styled.p`
  display: inline-flex;
  color: var(--branca);
  opacity: 0.8;
  margin: 0;
  font-size: 18px;
  line-height: 24px;
  margin-right: 16px;
  margin-bottom: 16px;
  width: 100%;
`

const Contato = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-width: 320px;
  @media screen and (max-width: 520px) {
    min-width: auto;
  }
`

const Detalhes = styled.p`
  margin: 0;
  color: var(--branca);
  font-size: 20px;
`

const LinkWhats = styled(Button)`
  color: var(--preta) !important;
  font-size: 24px !important;
  font-weight: 800 !important;
  margin-bottom: 16px !important;
  width: 100% !important;
  img {
    height: 32px;
    margin-right: 8px;
  }
  @media screen and (max-width: 520px) {
    font-size: 18px !important;
    img {
      height: 24px;
      margin-right: 8px;
    }
  }
`

const LinkTelefone = styled(Button)`
  color: var(--preta) !important;
  font-size: 24px !important;
  font-weight: 800 !important;
  margin-bottom: 16px !important;
  color: var(--primaria) !important;
  width: 100% !important;
  @media screen and (max-width: 520px) {
    font-size: 18px !important;
  }
`
