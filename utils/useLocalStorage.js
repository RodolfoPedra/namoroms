import React from 'react';

export const useLocalStorage = (key, inicial) => {

  const [state, setState] = React.useState(() => {
    if (process.browser && !inicial) {
      const local = window.localStorage.getItem(key);
      return local ? local : inicial;
    }
  });

  React.useEffect(() => {
    if (key && inicial) {
      window.localStorage.setItem(key, state);
    }
  }, [key, state]);

  return [state, setState];
};

export const getState = () => {
  const data = localStorage.getItem("state")
  return JSON.parse(data)
}