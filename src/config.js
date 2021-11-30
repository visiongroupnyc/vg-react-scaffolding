


const configDev = {
  ENDPOINT_URL: 'https://qa-apireely.theappmaster.com',
  UPLOAD_URL: 'https://qa-apireely.theappmaster.com/core/upload',
  API_KEY: 'asdn1389dn8uncx9128cnbalkscn289322m,,0-2j2231,231d9d9d3j1i0jakisdajdd03mFFJn3uik',
};


const configProd = {
  ENDPOINT_URL: 'https://solutions.visiongroup.nyc/',
  UPLOAD_URL: 'https://solutions.visiongroup.nyc/core/upload',
  API_KEY: '-----',
};

export const localPorts = {
  core: 3500,
};

export const __LOCAL__ = false;

const __DEV__ = true;
export default __DEV__ ? configDev : configProd;
