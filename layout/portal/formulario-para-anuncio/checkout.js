import { Button, Checkbox, FormControl, FormControlLabel, FormGroup } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { obterDadosDoFormulario } from "utils/storage";
import Icone from "components/icone";
import lerURI from "utils/lerURI";
import { useRouter } from "next/router";
import obterDadosMP from "interface/mercado-pago";
import { postAnuncio } from "interface/controllers/criar-anuncio";
import { useSelector } from "react-redux";
import Loading from "components/loading";
import { getState } from "utils/useLocalStorage";

const Checkout = ({ imagensGaleria, imagemPrincipal }) => {
  const router = useRouter()
  const { register, getValues, formState: { errors }, handleSubmit } = useForm()
  const [deposito, setDeposito] = useState(false)
  const [comprovante, setComprovante] = useState([])
  const [loadingAtivo, setLoadingAtivo] = useState(false)
  const [tokenLS, setTokenST] = useState("")
  const token = useSelector(state => state.token);

  useEffect(() => {
    !token && setTokenST(getState().token)
  }, [loadingAtivo])

  const finalizarCadastro = async () => {
    setLoadingAtivo(true)
    const dados = obterDadosDoFormulario("dadosDoFormulario")
    const todosOsdados = {
      ...dados,
      ...{ deposito },
      ...{ imagemPrincipal },
      ...{ imagensGaleria },
      ...{ comprovante }
    }

    const form = new FormData();
    form.append('aceitaCartao', todosOsdados.aceitaCartao);
    form.append('atendeAte', todosOsdados.atendeAte);
    form.append('atendeCasal', todosOsdados.atendeCasal);
    form.append('atendeEmHotel', todosOsdados.atendeEmHotel);
    form.append('atendeEmLocalProprio', todosOsdados.atendeEmLocalProprio);
    form.append('atendeEmMotel', todosOsdados.atendeEmMotel);
    form.append('atendeHomem', todosOsdados.atendeHomem);
    form.append('atendeMulher', todosOsdados.atendeMulher);
    form.append('casaDoCliente', todosOsdados.casaDoCliente);
    form.append('cidade', todosOsdados.cidade);
    form.append('comecaAtender', todosOsdados.comecaAtender);
    form.append('descricao', todosOsdados.descricao);
    form.append('esseNumeroEhWhatsapp', todosOsdados.esseNumeroEhWhatsapp);
    form.append('idade', todosOsdados.idade);
    form.append('planoEscolhido', todosOsdados.plano);
    form.append('sexo', todosOsdados.sexo);
    form.append('telefone', todosOsdados.telefone);
    form.append('tituloAnuncio', todosOsdados.tituloAnuncio);
    form.append('valorACombinar', todosOsdados.valorACombinar);
    form.append('valorDoPrograma', todosOsdados.valorDoPrograma);
    form.append('imagemPrincipal', todosOsdados.imagemPrincipal[0].files);
    form.append('deposito', todosOsdados.deposito ? todosOsdados.deposito : "false");
    todosOsdados.imagensGaleria.map((item, index) => {
      form.append(`imageGaleria${index}`, item.files);
    });
    form.append('comprovante', todosOsdados.comprovante.length ? todosOsdados.comprovante[0].files : "");
    if (!deposito) {
      publicarAnuncio(form).then(res => {
        setLoadingAtivo(false)
        irParaCheckoutDoMP(dados)
      })
    }

    if (deposito && !comprovante.length) {
      alert("Insira o seu comprovante de depósito!")
    } else if (deposito) {
      publicarAnuncio(form).then(res => {
        router.push("/portal/inicio");
        setLoadingAtivo(false)
      })
    }
  }

  const publicarAnuncio = async (form) => {
    const anuncioCriado = await postAnuncio(form, token ? token : tokenLS);
    localStorage.setItem('idDoAnuncioCriado', JSON.stringify(anuncioCriado.data.id))
    return anuncioCriado
  }

  const handleComprovante = (e) => {
    lerURI(e).then((imagem) => {
      setComprovante(imagem);
    });
  };

  const handleChangeDeposito = () => {
    setDeposito(!deposito)
    setComprovante([])
  }

  const pagarComCartao = () => {
    setLoadingAtivo(true)
    finalizarCadastro();
  }

  const irParaCheckoutDoMP = (dados) => {
    obterDadosMP(`Plano de ${dados.plano}`, 1).then(res => {
      router.push(res.init_point)
    })
  }

  return (<>
    <Loading ativo={loadingAtivo} />
    <Formulario noValidate autoComplete="off" onSubmit={handleSubmit(finalizarCadastro)}>

      <Titulo>Pagamento</Titulo>
      <FormControl fullWidth component="fieldset">
        <FormGroup row style={{ color: "white" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={deposito}
                color="primary"
                {...register("deposito")}
                onChange={handleChangeDeposito}
              />
            }
            label="Desejo fazer o pagamento por depósito"
          />
        </FormGroup>
      </FormControl>

      {!deposito &&
        <div>
          <Button
            color="primary"
            fullWidth
            variant="contained"
            size="large"
            type="button"
            startIcon={<Icone nome="payment" />}
            onClick={pagarComCartao}>
            Pagar com cartão
          </Button>
        </div>
      }

      {deposito && <>
        <DadosParaDeposito>
          <h2>Dados para depósito:</h2>
          <p><strong>Banco do Brasil: 001</strong></p>
          <p>Agência: 2916-5</p>
          <p>Conta: 40140-4</p>

          <hr />

          <h2>PIX:</h2>
          <p>namoroms67@gmail.com</p>
        </DadosParaDeposito>

        <input
          accept="image/png, image/jpeg"
          style={{ display: "none" }}
          type="file"
          id="imagem-comprovante"
          onChange={(e) => handleComprovante(e)}
        />
        <BotaoDeUpload htmlFor="imagem-comprovante">
          Faça o upload do comprovante de depósito
        </BotaoDeUpload>
        {comprovante?.length ?
          <ContainerImagem>
            <Imagem src={comprovante[0]?.result} />
          </ContainerImagem> : ""}
        <p style={{ color: "var(--branca)" }}>Deste modo de pagamento, teremos que aprovar seu anúncio para ele entrar no ar.</p>
      </>
      }

      <p style={{ color: "var(--branca)" }}>
        <Icone nome="info_outline" /> O anúncio demora até 2 dias para entrar no ar.
      </p>
      <BotaoFinalizacao variant="contained"
        color="primary"
        type="submit"
        disabled={!comprovante.length}
        fullWidth
        startIcon={<Icone nome="check" />}
      >
        Finalizar compra
      </BotaoFinalizacao>
    </Formulario >
  </>
  );
};

export default Checkout

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

const DadosParaDeposito = styled.div`
  display: inline-flex;
  flex-direction: column;
  color: var(--branca);
  padding: 24px 24px;
  border: 1px solid var(--branca);
  border-radius: 16px;
  margin-bottom: 24px;
  & p, h2 {
    margin: 0;
  }
`;

const BotaoDeUpload = styled.label`
  border: 2px solid var(--primaria);
  width: 100%;
  height: 80px;
  font-family: "proxima-nova" sans-serif;
  color: var(--primaria);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 18px;
  border-radius: 8px;
  margin-bottom: 24px;
  padding: 0 16px;
  text-align: center;
  &:hover,
  &:focus {
    opacity: 0.8;
  }
  &:active {
    transform: translate(0, -1px);
  }
`;

const ContainerImagem = styled.div`
  position: relative;
  max-width: 320px;
  margin: 16px;
`;

const Imagem = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const BotaoFinalizacao = styled(Button)`
  margin-top: 24px !important;
`