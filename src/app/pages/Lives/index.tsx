import { Hearder } from 'app/components/Header';
import { Sidebar } from 'app/components/Sidebar';
import { Footer } from 'app/components/Footer';
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
import { LivePreview } from 'app/components/LivePreview';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { environment } from 'app/environments/environment';
import { toast } from 'react-toastify';

export function Lives() {
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
  // {
  //   backgroundImage: null,
  //   isStreaming: false,
  //   liveStreamId: 10,
  //   streamDescription: null,
  //   streamName: null,
  //   streamUrl: 'mixi',
  //   streamerId: 11,
  //   title: '',
  //   view: '',
  // },

  const request = {
    pageSize: 0,
    pageIndex: 0,
  };
  useEffect(() => {
    axios
      .get(`${environment.BASEURL_BACKEND}/live-stream?size=${request.pageSize}&index=${request.pageIndex}`)
      .then(res => {
        console.log(res);
        setdataLive(res.data.data);
        console.log('???', dataLive);
      })
      .catch(err => {
        toast.error('Lỗi: ' + err);
      });
  }, []);
  return (
    <>
      <Wrapper>
        <Helmet>
          <title>Live</title>
        </Helmet>
        <Hearder></Hearder>
        <Body>
          <Sidebar></Sidebar>
          <div className="container-lives-screen">
            <div className="live-title">{t(translations['liveScreen.label.liveNow'])}</div>
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

            <div className="all-live-preview">
              {/* {!dataLive ? <div className="live-screen__no-live">{t(translations['liveScreen.label.noLive'])}</div> : <></>} */}
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
        </Body>
      </Wrapper>
    </>
  );
}

const Body = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  background-color: #0f0f0f;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;
