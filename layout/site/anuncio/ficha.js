import React from "react"
import styled from "styled-components"
import Icone from 'components/icone';

const Ficha = ({dados}) => {

  if(!dados) return null;
  return (
    <ContainerFicha>
      <Foto>
        <img src={dados.fotos[0].src} />
      </Foto>
      <Nome>{dados.tituloAnuncio}</Nome>
      <ItemFicha>{dados.idade} anos</ItemFicha>

      <TituloItem>Atendo:</TituloItem>
      {dados.atendeHomem === "true" && <ItemFicha><Icone nome="male" />Homem</ItemFicha>}
      {dados.atendeMulher === "true" && <ItemFicha><Icone nome="female" />Mulher</ItemFicha>}
      {dados.atendeCasal === "true" && <ItemFicha><Icone nome="wc" />Casal</ItemFicha>}

      <TituloItem>Horário:</TituloItem>
      <ItemFicha><Icone nome="timer" />{dados.comecaAtender} às {dados.atendeAte}</ItemFicha>

      <TituloItem>Valor:</TituloItem>
      {dados.valorACombinar === "false" && <ItemFicha><Icone nome="attach_money" />{dados.valorDoPrograma}</ItemFicha>}
      {dados.valorACombinar === "true" && <ItemFicha><Icone nome="attach_money" />A combinar</ItemFicha>}
      {dados.aceitaCartao === "sim" && <ItemFicha><Icone nome="credit_card" />Aceito cartão</ItemFicha>}

      <TituloItem>Locais que atendo:</TituloItem>
      {dados.atendeEmLocalProprio === "true" && <ItemFicha>Próprio</ItemFicha>}
      {dados.atendeEmHotel === "true" && <ItemFicha>Hotel</ItemFicha>}
      {dados.atendeEmHotel === "true" && <ItemFicha>Motel</ItemFicha>}
      {dados.casaDoCliente === "true" && <ItemFicha>Casa do cliente</ItemFicha>}
    </ContainerFicha >
  );
}

export default Ficha

const ContainerFicha = styled.div`
  background-color: #333;
  width: 224px;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 8px;
  height: 100%;
  @media screen and (max-width: 640px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const Nome = styled.h2`
  color: var(--branca);
  margin: 0;
  margin-bottom: 4px;
  font-size: 20px;
  font-weight: 800;
`

const Foto = styled.div`
  display: flex;
  width: 180px;
  height: 180px;
  overflow: hidden;
  border-radius: 8px;
  justify-content: center;
  margin-bottom: 16px;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`

const TituloItem = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin-top: 16px;
  margin-bottom: 0;
  color: var(--branca);
`

const ItemFicha = styled.p`
  margin: 0;
  margin-bottom: 4px;
  color: var(--branca);
  font-size: 16px;
  font-weight: 500;
  opacity: 0.7;
  display: flex;
  align-items: center;
  .material-icons-round {
    margin-right: 4px;
  }
`
