import * as React from 'react';
import './index.scss';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { Link } from 'react-router-dom';

import heart from './assets/svg/heart.svg';
import ranking from './assets/svg/ranking.svg';
import fame from './assets/svg/fame.svg';
import download from './assets/svg/download.svg';
import live from './assets/svg/live.svg';
import qrNimo from './assets/images/qrcodeNimotv.png';

// function detectCase(urlPath) {
//   if (urlPath.includes('/i/')) {
//     console.log('Trường hợp có chữ i ở giữa path URL');
//     return 1;
//   }
//   if (urlPath.includes('/s/')) {
//     console.log('Trường hợp có chữ s ở giữa path URL');
//     return 2;
//   }
//   console.log('Trường hợp không có chữ ở giữa path URL');
//   return 0;
// }

export function Sidebar() {
  const { t, i18n } = useTranslation();
  // const currentURL = window.location.href;
  // console.log(currentURL);
  // const caseRenderSidebar = detectCase(currentURL);
  // console.log(caseRenderSidebar);

  return (
    <Wrapper>
      <Link to={'/'}>
        <div className="item-sidebar m-t-17px">
          <span className="icon-item-sidebar">
            <img src={heart} alt="" />
          </span>
          <span className="label-item-sidebar">
            {t(translations['sidebar.label.myfollow'])}
          </span>
        </div>
      </Link>
      <Link to={'/'}>
        <div className="item-sidebar">
          <span className="icon-item-sidebar">
            <img src={ranking} alt="" />
          </span>
          <span className="label-item-sidebar">
            {t(translations['sidebar.label.leaderBoard'])}
          </span>
        </div>
      </Link>
      <Link to={'/'}>
        <div className="item-sidebar">
          <span className="icon-item-sidebar">
            <img src={fame} alt="" />
          </span>
          <span className="label-item-sidebar">
            {t(translations['sidebar.label.hallOfFame'])}
          </span>
        </div>
      </Link>
      <div className="sidebar-bottom-container">
        <div className="sidebar-bottom-download">
          <div className="title-top">
            <span>
              <img src={download} alt="" />
            </span>
            {t(translations['sidebar.label.downloadApp'])}
          </div>
          <div className="box">
            <img src={qrNimo} alt="QR-NimoTV" />
            <div className="boxItem"></div>
          </div>
          <div className="title-bottom">Nimo TV - Live Stream & Fun</div>
        </div>
        <div className="btn-live">
          <span>
            <img src={live} alt="" />
          </span>
          <span>{t(translations['sidebar.label.goLive'])}</span>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  width: 220px;
  display: flex;
  flex-direction: column;
  color: rgba(255, 255, 255, 0.6);
  background: rgb(26, 26, 26);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  position: relative;
`;
