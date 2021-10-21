import { Button, TextField } from "@material-ui/core";
import Icone from "components/icone";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

const Moderacao = () => {
  const router = useRouter();

  const [senhaInserida, setSenhaInserida] = useState("");
  const [senhaIncorreta, setSenhaIncorreta] = useState(false);

  const entrarNaPágina = (e) => {
    e.preventDefault();
    if (senhaInserida === process.env.NEXT_PUBLIC_CHAVE_MODERACAO) {
      localStorage.setItem("podeModerar", true);
      router.push("/portal/moderacao-de-anuncios/");
    } else {
      setSenhaIncorreta(true);
    }
  };

  const handleChange = (e) => {
    setSenhaIncorreta(false);
    setSenhaInserida(e.target.value);
  };

  return (
    <Formulario onSubmit={(e) => entrarNaPágina(e)}>
      <TextField
        type="text"
        autoComplete="off"
        label="Senha para acesso"
        variant="outlined"
        fullWidth
        id="senha"
        helperText={senhaIncorreta && "Insira a senha correta para acesso"}
        error={senhaIncorreta}
        onChange={(e) => handleChange(e)}
      />

      <Button
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        startIcon={<Icone nome="login" />}
      >
        Entrar na moderação
      </Button>
    </Formulario>
  );
};

export default Moderacao;

const Formulario = styled.form`
  max-width: 480px;
  margin: 0 auto;
  padding: 24px 16px;
  .MuiTextField-root {
    margin-bottom: 24px;
  }
`;
