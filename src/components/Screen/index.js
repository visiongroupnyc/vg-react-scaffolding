import React, {
  useContext,
} from 'react';

import Toast from '../Toast';
import LanguageContext from '../../LanguageContext';
import './screen.css';

function Screen(props) {
  const context = useContext(LanguageContext);
  const {
    toast,
    children,
    footer
  } = props;

  const {
    t,
  } = context;
  return (
    <div className="screen" {...props}>
      {children}
      <Toast
        message={toast.toast}
        setMessage={toast.setToast}
      />
      {footer && (
        <footer
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            fontSize: '14px',
            paddingTop: '16px',
            paddingBottom: '16px',
            borderTop: '1px solid #00000020',
            ...props.footerStyles
          }}
        >
          <a href="https://www.herbalife.com/terms-of-use" target="_blank" rel="noreferrer">{`${t('termsOfUse')}`}</a>
          <a href="https://www.herbalife.com/privacy-policy" target="_blank" rel="noreferrer">{`${t('privacyPolicy')}`}</a>
        </footer>
      )}
    </div>
  );
}

export default Screen;
