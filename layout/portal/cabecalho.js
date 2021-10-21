import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Icone from "components/icone";
import { useRouter } from "next/router";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getState } from "utils/useLocalStorage";

const rotasDoPortal = ["/portal/inicio", "/portal/planos", "/portal/formulario"];

const Cabecalho = () => {
  const router = useRouter();
  const [usuarioLogado, setUsuarioLogado] = useState('');
  const token = useSelector(state => state.token);
  const estaNasRotasDoPortal = rotasDoPortal.some(rota => router.pathname === rota);
  const { nomeUsuario } = useSelector((state) => state);
  const [tokenLogado, setTokenLogado] = useState("")

  const deslogar = () => {
    router.push("/portal/login");
  };

  useEffect(() => {
    (async () => {
      try {
        const tokenLS = await getState().token;
        estaNasRotasDoPortal && !token && setTokenLogado(tokenLS)
        estaNasRotasDoPortal && !nomeUsuario ? setUsuarioLogado(getState().nomeUsuario) : setUsuarioLogado(nomeUsuario);
      } catch (error) {
        if (estaNasRotasDoPortal) {
          alert("Faça o login novamente")
          router.push("/portal/login")
        }
      }
    })()

  }, [nomeUsuario]);

  return (
    <CabecalhoDoPortal>
      <Logo onClick={() => estaNasRotasDoPortal && router.push("/portal/inicio")} src="/logo.svg" />
      {estaNasRotasDoPortal && (
        <ContainerUsuario>
          <Usuario>
            <Icone nome="account_circle" />
            {usuarioLogado}
          </Usuario>
          <Button onClick={deslogar} type="button">
            <Icone nome="logout" />
          </Button>
        </ContainerUsuario>
      )}
    </CabecalhoDoPortal>
  );
};

export default Cabecalho;

const CabecalhoDoPortal = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  padding: 16px;
  background-color: var(--preta);
  .MuiButton-root {
    margin-left: 16px;
  }
`;

const Logo = styled.img`
  width: 160px;
  max-height: 100%;
  cursor: pointer;
  &:hover, &:focus {
    opacity: 0.7;
  }
`;

const ContainerUsuario = styled.div`
  display: flex;
  justify-content: center;
  color: var(--branca);
`;

const Usuario = styled.p`
  color: var(--branca);
  font-size: 16px;
  display: flex;
  margin: 0;
  height: 100%;
  align-items: center;
  .material-icons-round {
    margin-right: 8px;
  }
`;
