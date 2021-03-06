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
import { obterCidades } from "interface/cidades";
import { salvarDadosDoFormulario } from "utils/storage";
import { useRouter } from "next/router";
import Icone from "components/icone";

const DadosPessoais = ({ avancarEtapa }) => {
  const [combinarValor, setCombinarValor] = useState(false);
  const router = useRouter();
  const {editar} = router.query

  if(editar) {
    const {    
      tituloAnuncio,
      sexo,
      idade,
      telefone,
      esseNumeroEhWhatsapp,
      atendeHomem,
      atendeMulher,
      atendeCasal,
      cidade,
      atendeEmLocalProprio,
      atendeEmHotel,
      atendeEmMotel,
      casaDoCliente,
      comecaAtender,
      atendeAte,
      valorDoPrograma,
      aceitaCartao    
    } = editar && JSON.parse(localStorage.getItem(editar));
    
    var { register, getValues, formState: { errors }, handleSubmit } = useForm({
      defaultValues: {
      tituloAnuncio, 
      sexo, 
      idade, 
      telefone, 
      esseNumeroEhWhatsapp: JSON.parse(esseNumeroEhWhatsapp),
      atendeHomem: JSON.parse(atendeHomem),
      atendeMulher: JSON.parse(atendeMulher),
      atendeCasal: JSON.parse(atendeCasal), 
      cidade, 
      atendeEmLocalProprio: JSON.parse(atendeEmLocalProprio),
      atendeEmHotel: JSON.parse(atendeEmHotel),
      atendeEmMotel: JSON.parse(atendeEmMotel),
      casaDoCliente: JSON.parse(casaDoCliente),
      comecaAtender, 
      atendeAte,
      valorDoPrograma,
      aceitaCartao
      }
      });
  } else {
    var { register, getValues, formState: { errors }, handleSubmit } = useForm();
  }

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
      <Titulo>Dados do an??ncio</Titulo>

      <TextField
        autoComplete="off"
        label="O Nome que vai aparecer no an??ncio"
        variant="outlined"
        fullWidth
        id="nome"
        type="text"
        helperText={errors.tituloAnuncio?.message}
        error={errors?.tituloAnuncio}
        {...register("tituloAnuncio", { required: "O nome ?? obrigat??rio" })}
      />

      <FormControl fullWidth variant="filled">
        <InputLabel id="sexo-label">Como voc?? se identifica</InputLabel>

        <Select
          error={errors?.sexo}
          {...register("sexo", { required: true })}
          labelId="sexo-label"
          id="sexo"
          defaultValue={getValues("sexo")}
        >
          <MenuItem value="mulher">Mulher</MenuItem>
          <MenuItem value="homem">Homem</MenuItem>
          <MenuItem value="travesti">Travesti</MenuItem>
        </Select>
      </FormControl>

      <TextField
        autoComplete="off"
        {...register("idade", {
          required: "A idade ?? obrigat??ria", min:
            { value: 18, message: "Voc?? n??o pode ser menor de idade!" }, max: 99
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
          {...register("telefone", { required: "O telefone ?? obrigat??rio." })}
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
                  defaultChecked={getValues("esseNumeroEhWhatsapp")}
                />
              }
              label="Este n??mero ?? Whatsapp"
            />
          </FormGroup>
        </FormControl>
      </Row>

      <FormControl fullWidth component="fieldset">
        <FormLabel component="legend">Quem voc?? atende</FormLabel>
        <FormGroup row style={{ color: "white" }}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                {...register("atendeHomem")}
                defaultChecked={getValues("atendeHomem")}
              />
            }
            label="Homem"
          />
          <FormControlLabel
            control={
              <Checkbox
                {...register("atendeMulher")}
                color="primary"
                defaultChecked={getValues("atendeMulher")}
              />
            }
            label="Mulher"
          />

          <FormControlLabel
            control={
              <Checkbox
                {...register("atendeCasal")}
                color="primary"
                defaultChecked={getValues("atendeCasal")}
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
        getOptionLabel={(option) => option}
        defaultValue={getValues("cidade")}
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
                defaultChecked={getValues("atendeEmLocalProprio")}
              />
            }
            label="Local Pr??prio"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                {...register("atendeEmHotel")}
                defaultChecked={getValues("atendeEmHotel")}
              />
            }
            label="Hotel"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                {...register("atendeEmMotel")}
                defaultChecked={getValues("atendeEmMotel")}
              />
            }
            label="Motel"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                {...register("casaDoCliente")}
                defaultChecked={getValues("casaDoCliente")}
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
          label="Come??a a atender que horas?"
          variant="outlined"
          fullWidth
          type="time"
          helperText={errors.comecaAtender?.message}
          error={errors?.comecaAtender}
          {...register("comecaAtender", { required: "Obrigat??rio" })}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 1800,
          }}
        />

        <TextField
          autoComplete="off"
          label="Atende at?? que horas?"
          variant="outlined"
          fullWidth
          type="time"
          helperText={errors.atendeAte?.message}
          error={errors?.atendeAte}
          {...register("atendeAte", { required: "Obrigat??rio" })}
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
        <FormLabel component="legend">Aceita cart??o?</FormLabel>
        <RadioGroup
          row
          aria-label="aceitaCartao"
          defaultValue={getValues("aceitaCartao")}
        >
          <FormControlLabel
            value="nao"
            control={<Radio color="primary" />}
            label="N??o"
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
        <FormLabel component="legend">Declara????o de termo</FormLabel>

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
        >Avan??ar</Button>
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