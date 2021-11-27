import React from "react"
import styled from "styled-components"
import { useState } from 'react';
import ModalFoto from './modal-foto';

const Galeria = ({ dados }) => {
  let listaDeImagens = dados?.fotos.reduce((acc, item) => {
    return [
      ...acc,
      item.src
    ]
  }, []);

  // if (dados?.deposito) {
  //   listaDeImagens.shift()
  // }

  const quantidadeDeFotos = listaDeImagens?.length

  const quebraDaLista = () => {
    const fotosPorColuna = quantidadeDeFotos / 3;
    const quantidadeNasColunasArredondado = Math.ceil(fotosPorColuna)

    if (quantidadeNasColunasArredondado === (fotosPorColuna)) {
      return Math.ceil(fotosPorColuna);
    } else return Math.round(fotosPorColuna);
  }

  const [imagemNoModal, setImagemNoModal] = useState()
  const [modalAberto, setModalAberto] = useState(false)

  const mudarImagemDoModal = (imagem) => {
    setImagemNoModal(imagem);
    setModalAberto(true)
  }

  if (!dados?.fotos?.length) return null;
  return (
    <GaleriaScroll>
      <ContainerGaleria>
        <Coluna>
          {listaDeImagens.slice(0, quebraDaLista())?.map((imagem, index) => (
            <img onClick={() => mudarImagemDoModal(imagem)} key={`coluna1${index}`} src={imagem} />
          ))}
        </Coluna>
        <Coluna>
          {listaDeImagens.slice(quebraDaLista(), quebraDaLista() * 2)?.map((imagem, index) => (
            <img onClick={() => mudarImagemDoModal(imagem)} key={`coluna2${index}`} src={imagem} />
          ))}
        </Coluna>
        <Coluna>
          {listaDeImagens.slice(quebraDaLista() * 2, quantidadeDeFotos)?.map((imagem, index) => (
            <img onClick={() => mudarImagemDoModal(imagem)} key={`coluna3${index}`} src={imagem} />
          ))}
        </Coluna>

      </ContainerGaleria>
      <ModalFoto galeria={listaDeImagens} setImagem={setImagemNoModal} imagem={imagemNoModal} aberto={modalAberto} setAberto={setModalAberto} />
    </GaleriaScroll>
  );
}

export default Galeria

const ContainerGaleria = styled.div`
  width: 100%;
  box-shadow: inset 16px 0 48px rgba(0,0,0,.9),
  inset -16px 0 48px rgba(0,0,0,.9);
  display: flex;
  justify-content: center;
`

const GaleriaScroll = styled.div`
  max-height: 480px;
  overflow-y: auto;
`

const Coluna = styled.div`
  overflow: hidden;
  flex-grow: 1;
  min-width: calc(33.33% - 16px);
  display: flex;
  flex-direction: column;
  margin-right: 8px;
  &:last-child {
    margin-right: 0;
  }
  img {
    height: auto;
    width: 100%;
    cursor: pointer;
    margin-bottom: 8px;
    &:hover,&:focus {
      opacity: 0.8;
    }
  }
`
