import React, {
  useState,
  useEffect,
} from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { getLanguages, getLabelsSet } from './lib/languages';
import { getNextEvent } from './lib/events';
import { AppProvider } from './LanguageContext';

function switchAlignament(languages, currentCode) {
  const selectedLanguage = languages.filter(a => a.code === currentCode.toUpperCase()).pop();
  if (selectedLanguage && selectedLanguage.rtl) {
    return document.body.dataset.direction = "right";
  }
  return document.body.dataset.direction = null;
}

function AppProviderContext({ children, storeId }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.User.token);
  const nextEvent = useSelector((state) => state.User.nextEvent);
  const userLanguage = useSelector((state) => state.User?.userData?.language);
  const [languages, setLanguages] = useState([]);
  const [languageDataset, setLanguageDataset] = useState({ labels: {}, content: {} });
  const [languageCode, setLanguageCode] = useState('EN');

  function t(key) {
    if (key in languageDataset.labels) return languageDataset.labels[key];
    return String(key);
  }

  function c(key) {
    if (key in languageDataset.content) return languageDataset.content[key];
    return String(key);
  }

  async function fetchLanguages() {
    try {
      const languages = await getLanguages(token, nextEvent?._id);
      setLanguages(languages);
    } catch (err) {
      console.info('Error fetch languages list: ', err);
    }
  }

  async function fetchLanguageSet() {
    try {
      const dataset = await getLabelsSet(languageCode, nextEvent?._id);
      setLanguageDataset({ ...dataset });
    } catch (err) {
      console.info('Error getting language dataset');
    }
  }

  function setEnvLanguageCode(code = 'EN') {
    setLanguageCode(String(code).toUpperCase());
  }

  async function fetchNextEvent() {
    const response = await getNextEvent(token);
    dispatch({
      type: 'USER_SET_EVENT_DATA',
      payload: {
        ...response,
      }
    });
  }

  useEffect(() => {
    fetchLanguages();
  }, [nextEvent?._id]);

  useEffect(() => {
    if (languageCode) fetchLanguageSet();
    switchAlignament(languages, String(languageCode).toUpperCase())
  }, [languageCode, nextEvent, userLanguage]);

  useEffect(() => {
    setLanguageCode(String(userLanguage).toUpperCase());
  }, [userLanguage]);

  useEffect(() => {
    if (token) fetchNextEvent();
  }, [token])

  return (
    <AppProvider
      value={{
        languageDataset,
        languages,
        setEnvLanguageCode,
        languageCode,
        t,
        c,
        nextEvent,
      }}
    >
      {children}
    </AppProvider>
  );
}

export default AppProviderContext;
