import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";

import Menu from './components/Menu';

import Header from './components/Header';
import Footer from './components/Footer';
// import Routers from './routers';

import AppProviderContext from './providers/AuthProvider';

const Home = React.lazy(() => import("./screens/Home"));
const About = React.lazy(() => import("./screens/About"));


function NoMatch() {
  return (
    <h1>404</h1>
  )
}

function Fallback() {
  return (
    <h1>Error loading screen</h1>
  );
}

function ScreenElement({ children }) {
  return (
    <React.Suspense fallback={<Fallback />}>
      {children}
    </React.Suspense>
  )
}

function QueryToken({ children }) {
  let [searchParams, setSearchParams] = useSearchParams();
  console.info('useSearchParams(): ', searchParams.get('token'));
  return (
    <>
      <AppProviderContext token={searchParams.get('token')}>
        {children}
      </AppProviderContext>
    </>
  )
}
function Routers() {


  return (
    <>
      <Header />
      <BrowserRouter>
      <Menu />
      <QueryToken>
      <Routes>
        <Route path="/" element={<ScreenElement><Home /></ScreenElement>}>
          <Route index element={<ScreenElement><Home /></ScreenElement>} />
        </Route>
        <Route path="about" element={<ScreenElement><About /></ScreenElement>} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
       </QueryToken>
       </BrowserRouter>
      <Footer />
    </>

  );
}

export default Routers;
