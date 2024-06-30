import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import './HomePage.css';
import W_live from './components/w-live';
import Nimo_live_mini from 'app/components/Nimo-live-mini';
import { Hearder } from 'app/components/Header';
import HomePage_Hot from './components/HomePage_Hot';
import Pubg from './components/Pubg';
import Topgame from './components/Topgame';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>NimoTV - Live stream giải trí</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Hearder></Hearder>
      <div className="n-fx-sn n-as-w100">
        <div className="n-fx1">
          <div className="nimo-new-index-page">
            <div className="nimo-banner">
              <div
                className="nimo-banner-box"
                style={{
                  backgroundImage:
                    'url("https://business.nimo.tv/ssp/material/7HjyblvRgSWk2W2Agq2.jpg")',
                }}
              >
                {/* video and player */}
                <W_live />
              </div>
            </div>
            {/* Hot */}
            <HomePage_Hot />
            {/* Top-game */}
            <Topgame />
            {/* pubg */}
            <Pubg />
          </div>
        </div>
      </div>
    </>
  );
}

// const Body = styled.div`
//   display: flex;
// `;
