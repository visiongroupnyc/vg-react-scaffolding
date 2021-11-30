import React from 'react';

const StoreContext = React.createContext();

export const AppProvider = StoreContext.Provider;
export const AppConsumer = StoreContext.Consumer;
export default StoreContext;
