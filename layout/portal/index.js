import React from "react";
import styled from "styled-components";
import Inicio from "./inicio";

const Portal = () => {
  return (
    <>
      <Page>
        <Inicio />
      </Page>
    </>
  );
};

export default Portal

const Page = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
