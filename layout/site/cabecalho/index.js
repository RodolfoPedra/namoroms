import { Button, FormControl, IconButton, InputLabel, MenuItem, Select } from "@material-ui/core"
import React, { createRef } from "react"
import styled from "styled-components"
import Link from "next/link"
import ModalDeSelecaoDeCidade from "../modal-de-selecao-de-cidade"
import { useState, useEffect } from "react"
import ModalMenu from "./modal-menu"
import Icone from "components/icone"
import { useRouter } from "next/router"
import { getCidades } from 'interface/controllers/cidades';
import { initializeStore } from 'store/configureStore';
import { useSelector } from "react-redux"
import { getState } from "utils/useLocalStorage"

const Cabecalho = () => {
  const [cidades, setCidades] = useState([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState("")
  const [acompanhante, setAcompanhante] = useState("")
  const [menuAberto, setMenuAberto] = useState(false)
  const reduxStore = initializeStore()
  const { dispatch } = reduxStore
  const state = useSelector(state => state.filtros);

  const wraper = createRef()
  const router = useRouter()

  useEffect(() => {
    (async () => {
      const result = await getCidades();
      setCidades(result);
    })()
  }, [])

  useEffect(() => {
    const stateLocal = getState();
    const regiao = stateLocal?.regiao ? stateLocal.regiao : '';
    const acompanhante = stateLocal?.acompanhante ? stateLocal.acompanhante : state?.acompanhante ? state.acompanhante : '';
    stateLocal?.regiao && mudarCidade(regiao);
    stateLocal?.acompanhante ? mudarAcompanhante(acompanhante) : mudarAcompanhante("mulher");
  }, []);

  const mudarCidade = (value) => {
    setCidadeSelecionada(value)
    dispatch({
      type: 'regiao',
      regiao: value
    })
  }

  const handleMudarCidade = ({ target }) => {
    mudarCidade(target.value);
  }

  const mudarAcompanhante = (value) => {
    setAcompanhante(value)
    dispatch({
      type: 'acompanhante',
      acompanhante: value
    })
  }

  const handleMudarAcompanhante = ({ target }) => {
    mudarAcompanhante(target.value)
  }

  const ConteudoMenu = () => (
    <AcoesMobile>
      <IconButton onClick={() => setMenuAberto(false)} aria-label="Fechar menu">
        <Icone nome="clear" />
      </IconButton>
      {acoesParaUsuario()}
    </AcoesMobile>
  )

  const acoesParaUsuario = () => (
    <>
      <FormControl style={{ width: 240 }} variant="filled">
        <InputLabel id="cidade-label">Selecione sua cidade</InputLabel>

        <Select
          labelId="cidade-label"
          id="sexo"
          value={cidadeSelecionada}
          onChange={handleMudarCidade}
        >
          {
            cidades.length > 0 &&
            cidades.map((cidade) => (
              <MenuItem value={cidade}>{cidade}</MenuItem>
            ))
          }
        </Select>
      </FormControl>

      <FormControl style={{ width: 240 }} variant="filled">
        <InputLabel id="acompanhante">Acompanhante</InputLabel>

        <Select
          labelId="acompanhante"
          id="sexo"
          value={acompanhante}
          onChange={handleMudarAcompanhante}
        >
          <MenuItem selected value="mulher">Mulher</MenuItem>
          <MenuItem value="homem">Homem</MenuItem>
          <MenuItem value="travesti">Travesti</MenuItem>
        </Select>
      </FormControl>

      <Link href="/portal/login/">
        <Button color="primary" variant="outlined">Quero anunciar</Button>
      </Link>
    </>
  )

  return (
    <>
      <Header>
        <ModalDeSelecaoDeCidade setCidadeSelecionada={setCidadeSelecionada} />

        <Container>
          <Logo onClick={() => router.push("/")} src="/logo.svg" tabIndex="0" />

          <Acoes>
            {acoesParaUsuario()}
          </Acoes>

          <IconButton onClick={() => setMenuAberto(true)} aria-label="Abrir menu">
            <Icone nome="menu" />
          </IconButton>
        </Container>
      </Header>

      <ModalMenu setMenuAberto={setMenuAberto} menuAberto={menuAberto} conteudo={ConteudoMenu()} />
    </>
  )
}

export default Cabecalho

const Logo = styled.img`
  width: 200px;
  cursor: pointer;
`

const Container = styled.div`
  width: 100%;
  max-width: 1366px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Acoes = styled.div`
  display: flex;
  align-items: center;
  .MuiFormControl-root {
    margin-right: 16px;
  }
  & ~ .MuiIconButton-root {
    display: none;
  }
  @media screen and (max-width: 968px) {
    display: none;
    & ~ .MuiIconButton-root {
      display: block;
    }
  }
`

const AcoesMobile = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background-color: var(--preta);
  border-radius: 8px;
  align-items: center;
  padding: 24px;
  .MuiFormControl-root {
    margin: 16px 0;
  }
  .MuiButton-root {
    margin-top: 48px;
  }
`

const Header = styled.header`
  background: black;
`
