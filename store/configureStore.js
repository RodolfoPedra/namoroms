import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

let store

const initialState = {
  regiao: '',
  acompanhante: '',
  token: '',
  anuncio: {},
  nomeUsuario: '',
  usuarioId: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'regiao':
      return {
        ...state,
        regiao: action.regiao,
      }
    case 'acompanhante':
      return {
        ...state,
        acompanhante: action.acompanhante
      }
    case 'token':
      return {
        ...state,
        token: action.token,
      }
    case 'anuncio':
      return {
        ...state,
        anuncio: action.anuncio,
      }
    case 'nomeUsuario':
      return {
        ...state,
        nomeUsuario: action.nomeUsuario,
      }
    case 'usuarioId':
      return {
        ...state,
        usuarioId: action.usuarioId,
      }
    default:
      return state
  }
}

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    // Ignore write errors;
  }
};

const persistedState = loadState();

function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware()),
    persistedState,
  )
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })

    store = undefined
  }

  if (typeof window === 'undefined') return _store

  if (!store) store = _store

  store.subscribe(() => {
    saveState(store.getState());
  });

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}