import {
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Button,
} from "@material-ui/core";
import { Autocomplete } from '@material-ui/lab'
import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { obterCidades } from "api/cidades";
import { salvarDadosDoFormulario } from "utils/storage";
import Icone from "components/icone";

const DadosPessoais = ({ avancarEtapa }) => {
  const [combinarValor, setCombinarValor] = useState(false)
  const { register, getValues, formState: { errors }, handleSubmit } = useForm();
  const [cidades, setCidades] = useState([]);

  const normalizarTelefone = (valor) => {
    let novoValor = valor.replace(/\D/g, '')
    novoValor = novoValor.replace(/^(\d{2})(\d{5})(\d)/, "($1) $2-$3").substr(0, 15) || ""
    return novoValor;
  }

  const normalizarIdade = (valor) => {
    let novoValor = valor.substr(0, 2) || "";
    return novoValor;
  }

  const validarForm = () => {
    salvarDadosDoFormulario(getValues())
    avancarEtapa()
  }

  const combinarValorDoPrograma = () => {
    const campoDeValor = document.getElementById("valor-do-programa");
    if (!combinarValor) campoDeValor.value = undefined;
    setCombinarValor(!combinarValor)
  }

  useEffect(() => {
    obterCidades().then(resposta => setCidades(resposta))
  }, [])

  const Termos = () => {
    return (
      <>
        Declaro que li e aceito os termos de uso.
        <a target="_blank" style={{ color: "var(--primaria)", textDecoration: "underline" }} rel="noreferrer" href="/termos-de-uso.pdf"> Ler termo</a>.
      </>
    )
  }

  return (
    <Formulario noValidate autoComplete="off" onSubmit={handleSubmit(validarForm)}>
      <Titulo>Dados do anunciante</Titulo>

      <TextField
        autoComplete="off"
        label="O Nome que vai aparecer no anúncio"
        variant="outlined"
        fullWidth
        id="nome"
        type="text"
        helperText={errors.tituloAnuncio?.message}
        error={errors?.tituloAnuncio}
        {...register("tituloAnuncio", { required: "O nome é obrigatório" })}
      />

      <FormControl fullWidth variant="filled">
        <InputLabel id="sexo-label">Como você se identifica</InputLabel>

        <Select
          error={errors?.sexo}
          {...register("sexo", { required: true })}
          labelId="sexo-label"
          id="sexo"
        >
          <MenuItem value="mulher">Mulher</MenuItem>
          <MenuItem value="homem">Homem</MenuItem>
          <MenuItem value="travesti">Travesti</MenuItem>
        </Select>
      </FormControl>

      <TextField
        autoComplete="off"
        {...register("idade", {
          required: "A idade é obrigatória", min:
            { value: 18, message: "Você não pode ser menor de idade!" }, max: 99
        })}
        label="Idade"
        variant="outlined"
        fullWidth
        id="idade"
        type="text"
        helperText={errors.idade?.message}
        error={errors.idade}
        onChange={(event) => {
          const { value } = event.target
          event.target.value = normalizarIdade(value)
        }}
      />

      <Row>
        <TextField
          className="u-margem"
          autoComplete="off"
          label="Telefone"
          variant="outlined"
          fullWidth
          type="phone"
          error={errors?.telefone}
          {...register("telefone", { required: "O telefone é obrigatório." })}
          helperText={errors.telefone?.message}
          onChange={(event) => {
            const { value } = event.target
            event.target.value = normalizarTelefone(value)
          }}
        />
        <FormControl fullWidth component="fieldset">
          <FormGroup row style={{ color: "white" }}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  {...register("esseNumeroEhWhatsapp")}
                />
              }
              label="Este número é Whatsapp"
            />
          </FormGroup>
        </FormControl>
      </Row>

      <FormControl fullWidth component="fieldset">
        <FormLabel component="legend">Quem você atende</FormLabel>
        <FormGroup row style={{ color: "white" }}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                {...register("atendeHomem")}
              />
            }
            label="Homem"
          />
          <FormControlLabel
            control={
              <Checkbox
                {...register("atendeMulher")}
                color="primary"
              />
            }
            label="Mulher"
          />

          <FormControlLabel
            control={
              <Checkbox
                {...register("atendeCasal")}
                color="primary"
              />
            }
            label="Casal"
          />
        </FormGroup>
      </FormControl>

      <Row>
        <FormControl fullWidth component="fieldset">
          <FormLabel component="legend">Valor do programa:</FormLabel>

          <FormGroup row style={{ color: "white" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={combinarValor}
                  color="primary"
                  {...register("valorACombinar")}
                  onChange={(e) => combinarValorDoPrograma(e)}
                />
              }
              label="A combinar com o cliente"
            />
          </FormGroup>
        </FormControl>

        {!combinarValor && <TextField
          className="u-margem"
          autoComplete="off"
          label="Insira o valor"
          variant="outlined"
          fullWidth
          type="number"
          id="valor-do-programa"
          disabled={combinarValor}
          error={errors?.valorDoPrograma}
          {...register("valorDoPrograma", { required: "Insira um valor" })}
          helperText={errors.valorDoPrograma?.message}
        />}
      </Row>

      <Autocomplete
        id="combo-box-demo"
        options={cidades}
        getOptionLabel={(option) => option.nome}
        fullWidth
        renderInput={(params) => <TextField error={errors?.cidade}
          {...register("cidade", { required: true })} {...params} label="Selecione sua cidade" variant="outlined" />}
      />

      <FormControl fullWidth component="fieldset">
        <FormLabel component="legend">Local que atende</FormLabel>
        <FormGroup row style={{ color: "white" }}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                {...register("atendeEmLocalProprio")}
              />
            }
            label="Local Próprio"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                {...register("atendeEmHotel")}
              />
            }
            label="Hotel"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                {...register("atendeEmMotel")}
              />
            }
            label="Motel"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                {...register("casaDoCliente")}
              />
            }
            label="Casa do cliente"
          />
        </FormGroup>
      </FormControl>

      <Row>
        <TextField
          className="u-margem"
          autoComplete="off"
          label="Começa a atender que horas?"
          variant="outlined"
          fullWidth
          type="time"
          helperText={errors.comecaAtender?.message}
          error={errors?.comecaAtender}
          {...register("comecaAtender", { required: "Obrigatório" })}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 1800,
          }}
        />

        <TextField
          autoComplete="off"
          label="Atende até que horas?"
          variant="outlined"
          fullWidth
          type="time"
          helperText={errors.atendeAte?.message}
          error={errors?.atendeAte}
          {...register("atendeAte", { required: "Obrigatório" })}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 1800,
          }}
        />
      </Row>

      <FormControl
        error={errors?.aceitaCartao}
        style={{ color: "white" }} component="fieldset">
        <FormLabel component="legend">Aceita cartão?</FormLabel>
        <RadioGroup
          row
          aria-label="aceitaCartao"
        >
          <FormControlLabel
            value="nao"
            control={<Radio color="primary" />}
            label="Não"
            {...register("aceitaCartao", { required: true })}
          />
          <FormControlLabel
            value="sim"
            control={<Radio color="primary" />}
            label="Sim"
            {...register("aceitaCartao", { required: true })}
          />
        </RadioGroup>
      </FormControl>

      <FormControl fullWidth component="fieldset" error={errors?.termo}>
        <FormLabel component="legend">Declaração de termo</FormLabel>

        <FormGroup row style={{ color: "white" }}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                {...register("termo", { required: true })}
              />
            }
            label={<Termos />}
          />
        </FormGroup>
      </FormControl>

      <div>
        <Button variant="contained"
          color="primary"
          type="submit"
          fullWidth
          endIcon={<Icone nome="navigate_next" />}
        >Avançar</Button>
      </div>
    </Formulario >
  );
};

export default DadosPessoais

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

const Row = styled.div`
  display: flex;
  align-items: center;
  min-height: 56px;
  margin-bottom: 16px;
  @media screen and (min-width: 1000px) {
    .MuiFormControl-root {
      margin-bottom: 0;
    }
    .u-margem {
      margin-right: 16px;
    }
  }
  @media screen and (max-width: 1000px) {
    flex-direction: column;
    .margem {
      margin-right: 0;
      margin-bottom: 16px;
    }
  }
`;

const Label = styled.label`
  color: var(--branca);
  margin-right: 8px;
  white-space: nowrap;
`