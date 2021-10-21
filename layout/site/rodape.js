import React from "react"
import styled from "styled-components"

const termosDeUso = <>
  <strong>Politica NamoroMS</strong>
  <br />
  Este é um site de classificados de acompanhantes, e não há nenhuma relação nem participação nos contatos e negócios entre os interessados e anunciantes.
  <br />
  Os contatos são feitos diretamente com as anunciantes sem intermediação do site.
  <br />
  Todas as acompanhantes presentes no site autorizaram a publicação de seu anúncio, com informações  de nomes artísticos, telefones, dados pessoais, fotos e texto descritivo, de sua livre autoria e inteira responsabilidade.
  O site www.namoroms.com.br não propaga a prática sexual infantil, respeitando o estatuto do menor e do adolescente, portanto não publicamos anúncios de menores de 18 anos.
  <br />
  Todos os anunciantes, confirmaram ser maior idade.
</>

const Rodape = () => {
  return (
    <RodapeContainer>
      <img className="logo" src="/logo.svg" />
      <p className="texto">{termosDeUso}</p>
    </RodapeContainer>
  )
}

export default Rodape

const RodapeContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 24px;
  text-align: center;
  background-color: #222;
  .logo {
    margin-bottom: 16px;
    max-width: 240px;
  }
  .texto {
    color: var(--branca);
    font-size: 16px;
    line-height: 24px;
    max-width: 1200px;
    text-align: center;
    opacity: 0.7;
  }
`
