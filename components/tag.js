import React from "react";
import styled from "styled-components";

const Tag = ({ children, sucesso, alerta }) => {
  return (
    <TagLabel className={`${sucesso && "sucesso"} ${alerta && "alerta"}`}>{children}</TagLabel>
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
`;
