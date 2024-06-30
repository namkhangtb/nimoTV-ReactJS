import { Hearder } from 'app/components/Header';
import { Sidebar } from 'app/components/Sidebar';
import { LivePreview } from 'app/components/LivePreview';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
import './index.scss';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import bg1 from './assets/images/earth.jpg';
import bg2 from './assets/images/discord.jpg';
import ava1 from './assets/images/duck.jpg';
import userGroup from './assets/svg/user-group-1.svg';
import bannerNimoshow from './assets/images/nimoshow.jpg';
import playerPlay from './assets/svg/player-play.svg';
import { useState } from 'react';

export function NimoShow() {
  const { t, i18n } = useTranslation();
  interface LiveStreamItem {
    backgroundImage: string;
    avatar: string;
    isStreaming: boolean;
    liveStreamId: number;
    streamDescription: string;
    streamName: string;
    streamUrl: string;
    streamerId: number;
    title: string;
    view: string;
  }
  const [dataLive, setdataLive] = useState<LiveStreamItem[]>([]);

  return (
    <>
      {/* <Helmet>
        <title>NimoShow</title>
      </Helmet>
      <Hearder></Hearder>
      <Body>
        <Sidebar></Sidebar>
        <div className="container-nimoshow-screen">
          <div className="container-nimoshow-banner">
            <img src={bannerNimoshow} alt="" />
            <div className="mark-banner-nimoshow"></div>
            <div className="banner-nimoshow-title">
              <h1 className="">NimoShow</h1>
              <div className="count-event-nimoshow">
                <img src={playerPlay} alt="" />
                <span>54 {t(translations['nimoShowScreen.label.live'])}</span>
              </div>
            </div>
          </div>
          <div className="container-nimoshow-content">
            <div className="nimoshow-content-title">
              NimoShow {t(translations['liveScreen.label.liveNow'])}
            </div>
            <div className="select-country-container">
              <span>{t(translations['liveScreen.label.chooseCountry'])}</span>
              <select className="select-box-country">
                <option>{t(translations['country.global'])}</option>
                <option>{t(translations['country.vietnam'])}</option>
                <option>{t(translations['country.indonesia'])}</option>
                <option>{t(translations['country.thailand'])}</option>
                <option>{t(translations['country.turkey'])}</option>
              </select>
            </div>

            <div className="all-nimoshow-preview">
              {dataLive.map(item => (
                <div className="w-20">
                  <LivePreview
                    backgroundImage={item?.backgroundImage}
                    avatar={item.avatar}
                    nameStreamer={item?.streamName}
                    view={item?.view}
                    streamUrl={item?.streamUrl}
                    title={item?.title}
                  ></LivePreview>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Body> */}
    </>
  );
}

const Body = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  background-color: #0f0f0f;
`;
