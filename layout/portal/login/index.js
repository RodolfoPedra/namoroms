import React from "react";
import styled from "styled-components";
import { useState } from "react";
import FormularioDeLogin from "./formulario-de-login";
import FormularioDeCriacaoDeConta from "./formulario-de-criacao-de-conta";

const Login = () => {
  const [loginAtivado, setloginAtivado] = useState(true);
  const alternarEntreLoginECriacaoDeConta = () => {
    setloginAtivado(!loginAtivado);
  };

  return (
    <ContainerLogin>
      <img src="/logo.svg" style={{ width: 240, marginBottom: 16 }} />

      {loginAtivado ?
        <FormularioDeLogin
          irParaCriacaoDeConta={alternarEntreLoginECriacaoDeConta}
        />
        :
        <FormularioDeCriacaoDeConta
          irParaLogin={alternarEntreLoginECriacaoDeConta}
        />
      }
    </ContainerLogin>
  );
};

export default Login

const ContainerLogin = styled.section`
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: #000;
  border-radius: 8px;
  margin: 48px auto;
  width: 100%;
  max-width: 480px;
`;
