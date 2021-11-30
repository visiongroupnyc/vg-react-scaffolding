import React from 'react';
import { Helmet } from 'react-helmet';

function Header() {
  return (
    <Helmet>
      <title>Vision Group React.js Scaffolding</title>
      <meta name="description" content="Scaffolding writed by Cesar Casas, CTO at Vision Group" />
    </Helmet>
  );
}

export default Header;
