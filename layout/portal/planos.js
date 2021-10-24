import { Button } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { salvarDadosDoFormulario } from "utils/storage";
import { useRouter } from "next/router";

const Planos = () => {
  const router = useRouter();

  const escolherPlano = (plano, preco) => {
    salvarDadosDoFormulario({ plano, preco })
    router.push("/portal/formulario/")
  }

  return (
    <ContainerFormulario>
      <Titulo>Escolha seu plano</Titulo>
      <ListaDePlanos>
        {planos?.map((plano, index) => {
          return (
            <ItemPlano key={index}>
              <Cabecalho>Plano {plano.nome}</Cabecalho>
              <Conteudo>
                <Descricao>{plano.dias} dias de anúncio</Descricao>
                <Preco>R${plano.preco}</Preco>
                <Descricao>{plano.descricao}</Descricao>
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={() => escolherPlano(plano.nome, plano.preco)}
                >
                  Escolher
                </Button>
              </Conteudo>
            </ItemPlano>
          );
        })}
      </ListaDePlanos>

      <DadosParaDeposito>
        <h2>Dados para depósito:</h2>
        <p><small>Se você fizer por depósito, terá que anexar o comprovante para finalizar sua compra.
          <br /> Para adiantar o processo e não perder tempo, você pode depositar antes de contratar o plano.</small> </p>
        <br />
        <p><strong>Banco do Brasil: 001</strong></p>
        <p>Agência: 2916-5</p>
        <p>Conta: 40140-4</p>

        <hr />

        <h2>PIX:</h2>
        <p>namoroms67@gmail.com</p>
      </DadosParaDeposito>
    </ContainerFormulario>
  );
};

export default Planos

const ContainerFormulario = styled.div`
  background: #000;
  padding: 24px;
  margin: 40px auto;
  max-width: 1000px;
  width: calc(100% - 32px);
  border-radius: 8px;
  color: var(--branca);
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
`;
const Titulo = styled.h2`
  font-size: 24px;
  margin: 0 0 24px 0;
  color: var(--branca);
  width: 100%;
`;

const Descricao = styled.p`
  font-size: 16px;
  color: var(--branca);
  margin-top: 8px;
  opacity: 0.8;
`;

const Preco = styled.p`
  color: var(--branca);
  font-size: 40px;
  margin-top: 8px;
  margin-bottom: 0;
`;

const ItemPlano = styled.div`
  border-radius: 16px;
  width: 240px;
  background-color: #333;
  display: flex;
  flex-direction: column;
  margin: 16px;
`;

const Cabecalho = styled.div`
  font-size: 24px;
  background-color: #eeba00;
  color: var(--preta);
  text-align: center;
  font-weight: 700;
  width: 100%;
  padding: 24px;
  border-radius: 16px 16px 0 0;
`;

const Conteudo = styled.div`
  padding: 16px;
  text-align: center;
`;

const ListaDePlanos = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px 0;
  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
  }
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


const planos = [
  {
    nome: "30 dias",
    preco: 100,
    dias: 30,
    descricao: 'Ganhe o dobro de dias ao escolher este plano.'
  },
  {
    nome: "15 dias",
    preco: 55,
    dias: 15,
    descricao: 'Ganhe o dobro de dias ao escolher este plano.'
  },
  {
    nome: "7 dias",
    preco: 30,
    dias: 7,
    descricao: 'Ganhe o dobro de dias ao escolher este plano.'
  },
];