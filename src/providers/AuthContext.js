import React from 'react';

const AuthContext = React.createContext();

export const AppProvider = AuthContext.Provider;
export const AppConsumer = AuthContext.Consumer;
export default AuthContext;
