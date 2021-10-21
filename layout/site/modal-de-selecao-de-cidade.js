import { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import React from "react"
import styled from "styled-components"
import { eventoGA } from 'utils/analytics';
import { getCidades } from 'api/controllers/cidades';
import { initializeStore } from 'store/configureStore';
import { getState } from 'utils/useLocalStorage';

const ModalDeSelecaoDeCidade = ({ setCidadeSelecionada }) => {
  const [open, setOpen] = useState(false);
  const [cidades, setCidades] = useState([]);

  const abrirModal = () => {
    setOpen(true);
  };

  const reduxStore = initializeStore()
  const { dispatch } = reduxStore

  const fecharModal = () => {
    const elementoRaiz = document.getElementById("__next")
    setOpen(false)
    elementoRaiz.style.filter = "blur(0px)"
  }

  const escolherCidade = (cidade) => {
    setCidadeSelecionada(cidade)
    eventoGA({
      action: "Selecionar cidade",
      params: {
        search_term: `Cidade selecionada: ${cidade}`
      }
    })

    dispatch({
      type: 'regiao',
      regiao: cidade
    })

    fecharModal();
  };

  const body = (
    <CorpoModal>
      <Logo src="/logo.svg" />
      <Label>Escolha a cidade:</Label>
      {
        cidades.length > 0 ?
          cidades.map((cidade) => (
            <Button color="primary" variant="contained" fullWidth size="large" onClick={() => escolherCidade(cidade)}>{cidade}</Button>
          )) : <Button color="primary" variant="contained" fullWidth size="large" onClick={() => escolherCidade("Campo Grande")}>Campo Grande</Button>
      }
    </CorpoModal>
  );

  useEffect(() => {
    const elementoRaiz = document.getElementById("__next");
    const state = getState();
    const regiao = state?.regiao ? state.regiao : '';
    if (!regiao) {
      abrirModal();
      elementoRaiz.style.filter = "blur(16px)"
    }
  }, []);

  useEffect(() => {
    (async () => {
      const result = await getCidades();
      setCidades(result);
    })()
  }, [])

  return (
    <Modal
      open={open}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div>
        {body}
      </div>
    </Modal>
  );
}

export default ModalDeSelecaoDeCidade

const Logo = styled.img`
  width: 240px;
  margin-bottom: 24px;
`

const CorpoModal = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 420px;
  background-color: var(--preta);
  padding: 24px;
  border-radius: 8px;
  outline: 0;
  .MuiButton-root {
    margin-bottom: 16px;
  }
`

const Label = styled.label`
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 600;
  color: var(--branca);
`
