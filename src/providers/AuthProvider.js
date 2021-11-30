import React, {
  useState,
  useEffect,
} from 'react';


import { AppProvider } from './AuthContext';

import { getMyProfile } from '../libs/users';

function AppProviderContext({ children, token }) {
  const [data, setData] = useState({
    token: null,
    userData: null,
  });

  async function fetchUserData() {
    try {
      const storeData = await getMyProfile(token);
      setData({
        ...data,
        storeData,
      });
    } catch (err) {
      console.info('Error fetch store data: ', err);
    }
  }

  useEffect(() => {
    setData({
      ...data,
      token,
    });
  }, [token]);

  useEffect(() => {
    if (token) fetchUserData();
  }, [token]);


  return (
    <AppProvider
      value={{
        ...data,
      }}
    >
      {children}
    </AppProvider>
  );
}

export default AppProviderContext;
