import React from "react";
import { initializeStore } from '../store/configureStore';

export default function SSR() {
  return (
    <Site />
  );
}

export function getServerSideProps() {
  const reduxStore = initializeStore()

  return { props: { initialReduxState: reduxStore.getState() } }
}