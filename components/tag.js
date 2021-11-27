import React from "react";
import styled from "styled-components";

const Tag = ({ children, sucesso, alerta, editar, excluir }) => {
  return (
    <TagLabel className={`${sucesso && "sucesso"} ${alerta && "alerta"} ${editar && "editar"} ${excluir && "excluir"}`}>{children}</TagLabel>
  );
};

export default Tag

const TagLabel = styled.label`
  padding: 4px 16px;
  display: inline-flex;
  justify-content: center;
  opacity: 1;
  border-radius: 16px;
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 600;
  &.sucesso {
    background-color: var(--sucesso);
  }
  &.alerta {
    background-color: var(--alerta);
  }
  &.editar {
    background-color: var(--primaria);
    cursor: pointer;
    color: var(--preta);
  }
  &.excluir {
    background-color: var(--alerta);
    cursor: pointer;
    color: var(--preta);
  }
`;
