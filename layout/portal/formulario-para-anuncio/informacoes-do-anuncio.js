import { Button, TextField } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { salvarDadosDoFormulario } from "utils/storage";
import { useRouter } from "next/router";
import Icone from "components/icone";

const InformacoesDoAnuncio = ({ avancarEtapa }) => {
  const router = useRouter();
  const {editar} = router.query

  if(editar) {
    const {descricao} = JSON.parse(localStorage.getItem(editar));
    
    var { register, getValues, formState: { errors }, handleSubmit } = useForm({
      defaultValues: {descricao}
      });
  } else {
    var { register, getValues, formState: { errors }, handleSubmit } = useForm();
  }

  const validarForm = () => {
    salvarDadosDoFormulario(getValues())
    avancarEtapa();
  }

  return (
    <Formulario noValidate autoComplete="off" onSubmit={handleSubmit(validarForm)} >
      <Titulo>Descrição do anúncio</Titulo>
      <TextField
        {...register("descricao", { required: "É obrigatório inserir a descrição" })}
        label="Descrição do anúncio"
        multiline
        error={errors?.descricao}
        helperText={errors?.message}
        rows={4}
        variant="outlined"
        fullWidth
        id="texto-descritivo"
      />

      <div>
        <Button variant="contained"
          color="primary"
          type="submit"
          fullWidth
          endIcon={<Icone nome="navigate_next" />}
        >Avançar</Button>
      </div>
    </Formulario>
  );
};

export default InformacoesDoAnuncio

const Formulario = styled.form`
  background: #000;
  width: 100%;
  .MuiTextField-root,
  .MuiFormControl-root {
    margin-bottom: 16px;
  }
`;

const Titulo = styled.h2`
  font-size: 24px;
  color: var(--branca);
`;
