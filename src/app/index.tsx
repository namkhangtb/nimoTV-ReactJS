/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';

import { Personal_information } from './pages/Personal_information';

import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { Lives } from './pages/Lives/Loadable';
import { Profile } from './pages/Profile/Loadable';
import { NimoShow } from './pages/NimoShow/Loadable';
import { WatchStream } from './pages/WatchStream/Loadable';
import { StreamManager } from './pages/StreamManager/Loadable';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DetailsDiamond } from './pages/DetailsDiamond';
export function App() {
  const { i18n } = useTranslation();
  return (
    <>
      <BrowserRouter>
        <Helmet
          titleTemplate="%s - NimoTV"
          defaultTitle="NimoTV"
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="NimoTV" />
        </Helmet>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lives" element={<Lives />} />
          {/* <Route path="/nimoshow" element={<NimoShow />} /> */}
          <Route path="/i/my-info" element={<Profile />} />
          <Route path="/details-diamond/:id" element={<DetailsDiamond />} />
          <Route path="/s/stream-manager/:id" element={<StreamManager />} />
          <Route path="/:urlStream" element={<WatchStream />} />
          <Route path="*" element={<NotFoundPage />} />

          {/* <Route path="/pro" element={<Personal_information />} /> */}
        </Routes>
        <ToastContainer position="top-right" />
        <GlobalStyle />
      </BrowserRouter>
    </>
  );
}
