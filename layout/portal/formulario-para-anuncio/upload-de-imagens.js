import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Icone from "components/icone";
import lerURI from "utils/lerURI";
import Button from "@material-ui/core/Button";
import Loading from "components/loading";
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { initializeStore } from 'store/configureStore';

const UploadDeImagens = ({
  imagensGaleria,
  imagemPrincipal,
  setImagensGaleria,
  setImagemPrincipal,
  avancarEtapa }) => {
  const router = useRouter();
  const {editar} = router.query

  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;
  
  const [loadingAtivo, setLoadingAtivo] = useState(false);
  const [checkedEditar, setCheckedEditar] = useState(false)

  const editarImagem = (checked) => {
    setCheckedEditar(checked);
    dispatch({
      type: 'editarFotos',
      editarFotos: checked
    })
  }

  const handleImages = (e) => {
    setLoadingAtivo(true);
    lerURI(e).then((images) => {
      setLoadingAtivo(false);
      setImagensGaleria(images);
    });
  };

  const handleImagemPrincipal = (e) => {
    lerURI(e).then((imagem) => {
      setImagemPrincipal(imagem);
    });
  };

  const deletarImagemDaGaleria = (index) => {
    setImagensGaleria(
      imagensGaleria.filter((item) => imagensGaleria.indexOf(item) !== index)
    );
  };

  const validarForm = (e) => {
    e.preventDefault();
    if (imagensGaleria.length && imagemPrincipal.length) {
      avancarEtapa()
    } else if(!checkedEditar) {
      avancarEtapa()
    }
    else alert("Insira as imagens para continuar")
  }

  return (
    <Formulario noValidate autoComplete="off" onSubmit={(e) => validarForm(e)}>
      <Loading ativo={loadingAtivo} />
      <Titulo>Imagens do anúncio</Titulo>

      {
        editar &&
          <FormControl fullWidth component="fieldset" >
            <FormGroup row style={{ color: "white" }}>
              <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  onChange={({target}) => editarImagem(target.checked)}
                />
              }
              label={"Em caso de edição das imagens do anúncio, marque a caixa ao lado"}
              />
            </FormGroup>
          </FormControl>
      }

      {
        checkedEditar &&
        <> 
        <input
        accept="image/png, image/jpeg"
        style={{ display: "none" }}
        type="file"
        id="imagens-galeria"
        multiple
        onChange={(e) => handleImages(e)}
        />
        <BotaoDeUpload htmlFor="imagens-galeria">
        Selecione as imagens da galeria
        </BotaoDeUpload>
        {
          imagensGaleria?.length && imagensGaleria ? (
            <ImagensParaGaleria>
              {imagensGaleria?.map((imagem, index) => {
                return (
                  <ContainerImagem key={index}>
                    <Imagem src={imagem.result} />
                    <BotaoExcluirImagem
                      type="button"
                      onClick={() => deletarImagemDaGaleria(index)}
                    >
                      <Icone nome="clear" />
                    </BotaoExcluirImagem>
                  </ContainerImagem>
                );
              })}
            </ImagensParaGaleria>
          ) : (
            ""
          )
        }
        </>
      }

      {
        checkedEditar && 
        <>
          <input
            accept="image/png, image/jpeg"
            style={{ display: "none" }}
            type="file"
            id="imagem-principal"
            onChange={(e) => handleImagemPrincipal(e)}
          />
          <BotaoDeUpload htmlFor="imagem-principal">
            Selecione uma imagem para destaque
          </BotaoDeUpload>
          {imagemPrincipal?.length ? (
            <ContainerImagem>
              <Imagem src={imagemPrincipal[0].result} />
            </ContainerImagem>
          ) : (
            ""
          )}
        </>
      }


      {/* Deste bloco até o proximo comentário, acontece em caso de ser inserção de novo anúncio */}

      {
        !editar &&
        <> 
        <input
        accept="image/png, image/jpeg"
        style={{ display: "none" }}
        type="file"
        id="imagens-galeria"
        multiple
        onChange={(e) => handleImages(e)}
        />
        <BotaoDeUpload htmlFor="imagens-galeria">
        Selecione as imagens da galeria
        </BotaoDeUpload>
        {
          imagensGaleria?.length && imagensGaleria ? (
            <ImagensParaGaleria>
              {imagensGaleria?.map((imagem, index) => {
                return (
                  <ContainerImagem key={index}>
                    <Imagem src={imagem.result} />
                    <BotaoExcluirImagem
                      type="button"
                      onClick={() => deletarImagemDaGaleria(index)}
                    >
                      <Icone nome="clear" />
                    </BotaoExcluirImagem>
                  </ContainerImagem>
                );
              })}
            </ImagensParaGaleria>
          ) : (
            ""
          )
        }
        </>
      }

{
        !editar && 
        <>
          <input
            accept="image/png, image/jpeg"
            style={{ display: "none" }}
            type="file"
            id="imagem-principal"
            onChange={(e) => handleImagemPrincipal(e)}
          />
          <BotaoDeUpload htmlFor="imagem-principal">
            Selecione uma imagem para destaque
          </BotaoDeUpload>
          {imagemPrincipal?.length ? (
            <ContainerImagem>
              <Imagem src={imagemPrincipal[0].result} />
            </ContainerImagem>
          ) : (
            ""
          )}
        </>
      }

      {/* Fim de bloco para inserção de novo anúncio */}

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

export default UploadDeImagens

const Formulario = styled.form`
  background: #000;
  width: 100%;
`;

const Titulo = styled.h2`
  font-size: 24px;
  color: var(--branca);
`;
const ImagensParaGaleria = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: min-content;
  width: 100%;
  flex-wrap: wrap;
  margin: 24px 0;
`;

const Imagem = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
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

const BotaoExcluirImagem = styled.button`
  position: absolute;
  right: -8px;
  top: -8px;
  color: var(--preta);
  background-color: var(--primaria);
  border-radius: 100px;
  padding: 8px;
  font-size: 10px;
  border: 0;
  cursor: pointer;
  &:hover,
  &:focus {
    opacity: 0.8;
  }
  &:active {
    transform: translate(0, -1px);
  }
`;
