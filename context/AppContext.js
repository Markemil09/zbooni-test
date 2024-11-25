import React, { createContext, useState, useMemo } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    token: null,
    language: true
  });

  const setToken = (token) => {
    setState({ ...state, token: token});
  }

  const logoutUser = () => {
    setState({ ...state, token: null });
  };

  const setLang = () => {
    setState({ ...state, language: !state.language });
  }

  const value = useMemo(() => ({ state, setToken, logoutUser, setLang }), [state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
