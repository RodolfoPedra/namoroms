import React, { useEffect } from "react"
import Cabecalho from "layout/site/cabecalho"
import CabecalhoPortal from "layout/portal/cabecalho"
import Rodape from "layout/site/rodape"
import { useRouter } from "next/dist/client/router"

const Layout = ({ children }) => {
  const router = useRouter();

  const estaEmAlgumaPaginaDoPortal = () => {
    const palavrasDoLink = router.pathname.split("/");
    return palavrasDoLink.some((palavra) => palavra === "portal");
  };

  return (
    <>
      {estaEmAlgumaPaginaDoPortal() ? <CabecalhoPortal /> : <Cabecalho />}
      {children}
      {estaEmAlgumaPaginaDoPortal() ? "" : <Rodape />}
    </>
  )
}

export default Layout