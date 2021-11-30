import apiClient from './api';

export async function getLanguages(token, eventid) {
  try {
    const languages = await apiClient({
      microservice: 'core',
      query: {
        q: '',
        page: 1,
        limit: 1000,
        sorting: 'priority:desc',
        eventid,
      },
      token,
      module: 'languages',
      method: 'get',
    });
    return languages.data.docs || [];
  } catch (err) {
    console.info(`Error lib languages.getLanguages: ${err.toString()}`);
    throw new Error(`Error lib languages.getLanguages: ${err.toString()}`);
  }
}

export async function googleTranslate(text, code) {
  try {
    const languages = await apiClient({
      microservice: 'core',
      data: {
        code,
        text,
      },
      module: 'translatelabels/google',
      method: 'post',
    });
    return languages.data;
  } catch (err) {
    console.info(`Error lib languages.googleTranslate: ${err.toString()}`);
    throw new Error(`Error lib languages.googleTranslate: ${err.toString()}`);
  }
}

export async function getLabelsSet(code, eventid) {
  try {
    const languages = await apiClient({
      microservice: 'core',
      query: {
        languagecode: code,
        eventid,
      },
      module: 'translatelabels/getme',
      method: 'get',
    });
    return languages.data || { labels: {}, content: {} };
  } catch (err) {
    console.info(`Error lib languages.getLabelsSet: ${err.toString()}`);
    throw new Error(`Error lib languages.getLabelsSet: ${err.toString()}`);
  }
}
