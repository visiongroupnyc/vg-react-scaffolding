import apiClient from './api';

export const Login = async (email, password) => {
  try {
    const response = await apiClient({
      microservice: 'core',
      module: 'users/login',
      method: 'post',
      query: {
        appname: 'appname',
        appversion: '1.0',
        version: '1',
      },
      data: { email, password },
    });
    return response.data;
  } catch (err) {
    console.info(`Error lib Users.Login: ${err.toString()}`);
    throw new Error(`Error lib Users.Login: ${err.toString()}`);
  }
};

export const userUpdateData = async (token, userId, data = {}) => {
  try {
    const response = await apiClient({
      microservice: 'core',
      module: 'users',
      method: 'patch',
      token,
      data: {
        ...data,
        _id: userId,
      },
    });
    return response.data;
  } catch (err) {
    console.info(`Error lib Users.update: ${err.toString()}`);
    throw new Error(`Error lib Users.update: ${err.toString()}`);
  }
};


export const existsEmail = async (email) => {
  try {
    const query = {
      q: `email:${email}`,
      page: 1,
      limit: 1,
    };

    const exists = await apiClient({
      microservice: 'core',
      module: 'users',
      query,
      method: 'get',
    });

    if (exists.data && exists.data.docs && exists.data.docs.length > 0) {
      return true;
    }
    return false;
  } catch (err) {
    console.info(`Error lib Users.existsEmail: ${err.toString()}`);
    throw new Error(`Error lib Users.existsEmail: ${err.toString()}`);
  }
};

export const ping = async (token) => {
  try {
    const pong = await apiClient({
      microservice: 'core',
      module: 'users/ping',
      method: 'post',
      token,
    });

    return pong.data;
  } catch (err) {
    console.info(`Error lib Users.ping: ${err.toString()}`);
    throw new Error(`Error lib Users.ping: ${err.toString()}`);
  }
};

export const registerUser = async (data) => {
  try {
    const userData = await apiClient({
      microservice: 'core',
      module: 'users',
      data,
      method: 'put',
    });
    if (userData) {
      return userData.data;
    }
    return null;
  } catch (err) {
    console.info('Error lib Users.registerUser: ', err);
    throw new Error(err);
  }
};

export const recoveryPassword = async (email, languageCode) => {
  try {
    const userData = await apiClient({
      microservice: 'core',
      module: 'users/recovery',
      data: {
        email,
        language: languageCode,
      },
      method: 'post',
    });
    if (userData) {
      return userData.data;
    }
    return null;
  } catch (err) {
    console.info(`Error lib Users.recoveryPassword: ${err.toString()}`);
    throw new Error(`Error lib Users.recoveryPassword: ${err.toString()}`);
  }
};

export const changePasswordRecovery = async ({ email, password, token }) => {
  try {
    const userData = await apiClient({
      microservice: 'core',
      module: 'users/password',
      data: {
        email,
        password,
        token,
      },
      method: 'post',
    });
    if (userData) {
      return userData.data;
    }
    return null;
  } catch (err) {
    console.info(`Error lib Users.changePasswordRecovery: ${err.toString()}`);
    throw new Error(`Error lib Users.changePasswordRecovery: ${err.toString()}`);
  }
};

export async function getMyProfile(token) {
  try {
    const response = await apiClient({
      microservice: 'core',
      module: 'users/profile',
      token,
      method: 'get',
    });

    return response.data.userData;
  } catch (err) {
    console.info(`Error lib Users.getMyProfile: ${err.toString()}`);
    throw new Error(`Error lib Users.getMyProfile: ${err.toString()}`);
  }
}

export const sendDeviceInfoToServerAPI = async (userId, device) => {
  try {
    const response = await apiClient({
      microservice: 'core',
      module: 'devices',
      data: {
        userId,
        device,
      },
      method: 'put',
    });
    return response.data;
  } catch (err) {
    console.info(`Error lib Users.sendDeviceInfoToServerAPI: ${err.toString()}`);
    throw new Error(`Error lib Users.sendDeviceInfoToServerAPI: ${err.toString()}`);
  }
};
