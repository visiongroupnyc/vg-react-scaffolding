import axios from 'axios';

import config, { localPorts, __LOCAL__ } from './../config';

const BASE_URL = config.ENDPOINT_URL;

const headers = (token) => {
  // if (token) axios.defaults.headers.common['x-access-token'] = token;
  axios.defaults.headers.common.Accept = 'application/json';
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  // axios.defaults.headers.common.apikey = config.API_KEY;
};

export default async function api(params) {
  headers(params.token || '');
  const localHeaders = {
    apikey: config.API_KEY,
  };
  // console.info('params token: ', params.token);
  if (params.token) localHeaders['x-access-token'] = params.token;
  if (params.headers) {
    Object.keys(params.headers).forEach((k) => {
      localHeaders[k] = params.headers[k];
      // (axios.defaults.headers.common[k] = params.headers[k]);
      return true;
    });
  }

  const connectWithLocalhost = (__LOCAL__ && localPorts[params.microservice.split('/')[0]]) || params.connectWithLocalhost;
  const localParams = { ...params.query };
  const options = {
    method: params.method.toLowerCase(),
    url: [params.microservice, params.module].join('/'),
    params: localParams,
    baseURL: params.host || (connectWithLocalhost ? `http://127.0.0.1:${localPorts[params.microservice.split('/')[0]]}/` : BASE_URL),
    headers: { ...localHeaders },
  };

  if (params.data && Object.keys(params.data).length > 0) options.data = params.data;

  // console.info('params: ', params);

  try {
    // console.info('options: ', options);
    const response = await axios.request(options);

    return Promise.resolve(response);
  } catch (err) {
    console.info('Error lib API: network error: ', err.response?.status, err.response?.data);
    throw new Error(err.response?.data?.message);
  }
}


export const uploadFile = (form, file, folder) => new Promise((resolve, reject) => {
  // const oData = new FormData(form);
  const oData = new FormData();

  oData.append('folder', folder);
  oData.append('upfile', file);

  const oReq = new XMLHttpRequest();

  oReq.open('POST', config.UPLOAD_URL, true);
  oReq.onload = () => {
    if (oReq.status === 200) {
      return resolve(JSON.parse(oReq.response));
    }
    return reject(new Error(`Error ${oReq.status}`));
  };
  oReq.setRequestHeader('apikey', config.API_KEY);
  oReq.send(oData);
});
