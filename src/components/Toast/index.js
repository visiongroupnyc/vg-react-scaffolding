import React, { useEffect } from 'react';

import './toast.css';

export default function Toast(props) {
  const {
    message,
    setMessage = () => {},
  } = props;

  useEffect(() => {
    if (message) {
      setTimeout(function(){
        setMessage(null);
      }, 5000);
    }
  }, [message, setMessage]);

  if (message) {
    return (
      <div className={`toast ${message ? "toast_active" : ''}`}>
        <img
          className="toast_icon"
          src="/isologo.png"
          alt="herbalife logo"
          width={80}
          height={80}
        />
        <div className="toast_message">
          {message}
        </div>
      </div>
    )
  }

  return (<div />);

}
