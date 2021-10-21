import { Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Icone from 'components/icone';
import styled from 'styled-components';

const ModalDeDadosDoAnuncio = ({ dados, aberto, setAberto }) => {
  const body = (
    <Conteudo>
      <div>{dados.tituloAnuncio}</div>
      <div>{dados.idade} anos</div>

      <h2>Atendo:</h2>
      {dados.atendeHomem === "true" && <p>Homem</p>}
      {dados.atendeMulher === "true" && <p>Mulher</p>}
      {dados.atendeCasal === "true" && <p>Casal</p>}

      <h2>Horário:</h2>
      <p>{dados.comecaAtender} às {dados.atendeAte}</p>

      <h2>Valor:</h2>
      {!dados.valorACombinar && <p>{dados.valorDoPrograma}</p>}
      {dados.valorACombinar === "true" && <p>A combinar</p>}
      {dados.aceitaCartao === "sim" && <p>Aceito cartão</p>}

      <h2>Locais que atendo:</h2>
      {dados.atendeEmLocalProprio === "true" && <p>Próprio</p>}
      {dados.atendeEmHotel === "true" && <p>Hotel</p>}
      {dados.atendeEmHotel === "true" && <p>Motel</p>}
      {dados.casaDoCliente === "true" && <p>Casa do cliente</p>}
      <h2>Descrição:</h2>
      <p>{dados.descricao}</p>
      <p>{dados.telefone}</p>

      <BotaoParaFechar size="large" color="primary" onClick={() => setAberto(false)}>
        <Icone nome="clear" />
      </BotaoParaFechar>
    </Conteudo >
  );

  return (
    <Modal
      onClose={() => setAberto(false)}
      open={aberto}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div>
        {body}
      </div>
    </Modal>
  );
}

export default ModalDeDadosDoAnuncio

const Conteudo = styled.div`
  background-color: var(--cinza-200);
  max-width:480px;
  position: relative;
  padding: 24px;
  margin: 40px auto;
  max-height: calc(100vh - 32px);
  overflow-y: auto;
  border-radius: 16px;
  * {
    color: var(--preta);
    padding: 0;
    margin: 0;
  }
  h2 {
    font-size: 16px;
    margin-top: 16px;
  }
`

const BotaoParaFechar = styled(Button)`
  position: absolute !important;
  top: 16px !important;
  right: 16px !important;
  z-index: 2000;
  `
