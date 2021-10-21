import React from "react"
import styled from "styled-components"
import Modal from '@material-ui/core/Modal';

const ModalMenu = ({ setMenuAberto, menuAberto, conteudo }) => {
  return (
    <Modal
      onClose={() => setMenuAberto(false)}
      open={menuAberto}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div>
        {conteudo}
      </div>
    </Modal>
  )
}

export default ModalMenu
