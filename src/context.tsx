import React, { createContext, useReducer } from 'react';
import reducer, { initialState } from './reducer';
import { ContextType } from './types';

const AppContext = createContext<ContextType>({
  state: initialState,
  dispatch: () => null
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch } as ContextType}>
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext };