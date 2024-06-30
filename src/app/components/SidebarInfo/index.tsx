import * as React from 'react';
import './index.scss';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectorIdUser } from '../Header/slice/selectors';

export function SidebarInfo() {
  const { t, i18n } = useTranslation();
  const [selectedItem, setSelectedItem] = useState(null);
  const handleItemClick = item => {
    setSelectedItem(prevSelectedItem =>
      item === prevSelectedItem ? prevSelectedItem : item,
    );
  };

  const userId = useSelector(selectorIdUser);
  const navigate = useNavigate();
  const goToDetailsDiamond = () => {
    navigate(`/details-diamond/${userId}`);
  };

  const goToInfo = () => {
    navigate(`/i/my-info`);
  };
  return (
    <Wrapper>
      <div className="container-sidebar-info">
        <div className="title-sidebar-info">
          {t(translations['sidebar.label.personalCenter'])}
        </div>
        <ul>
          <li
            className={
              selectedItem === 'my-info' ? 'selected-item-sidebar-info' : ''
            }
            onClick={() => {
              handleItemClick('my-info');
              goToInfo();
            }}
          >
            <span className="icon-sidebar-item">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
              </svg>
            </span>
            <span>{t(translations['sidebar.label.myInformation'])} </span>
          </li>

          {/* <Link to="">
            <li
              className={
                selectedItem === 'my-follow' ? 'selected-item-sidebar-info' : ''
              }
              onClick={() => handleItemClick('my-follow')}
            >
              <span className="icon-sidebar-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                </svg>
              </span>
              <span>{t(translations['sidebar.label.myfollow'])} </span>
            </li>
          </Link> */}

          <li
            className={
              selectedItem === 'diamond-acc-record'
                ? 'selected-item-sidebar-info'
                : ''
            }
            onClick={() => {
              handleItemClick('diamond-acc-record');
              goToDetailsDiamond();
            }}
          >
            <span className="icon-sidebar-item">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M116.7 33.8c4.5-6.1 11.7-9.8 19.3-9.8H376c7.6 0 14.8 3.6 19.3 9.8l112 152c6.8 9.2 6.1 21.9-1.5 30.4l-232 256c-4.5 5-11 7.9-17.8 7.9s-13.2-2.9-17.8-7.9l-232-256c-7.7-8.5-8.3-21.2-1.5-30.4l112-152zm38.5 39.8c-3.3 2.5-4.2 7-2.1 10.5l57.4 95.6L63.3 192c-4.1 .3-7.3 3.8-7.3 8s3.2 7.6 7.3 8l192 16c.4 0 .9 0 1.3 0l192-16c4.1-.3 7.3-3.8 7.3-8s-3.2-7.6-7.3-8L301.5 179.8l57.4-95.6c2.1-3.5 1.2-8.1-2.1-10.5s-7.9-2-10.7 1L256 172.2 165.9 74.6c-2.8-3-7.4-3.4-10.7-1z" />
              </svg>
            </span>
            <span>
              {t(translations['sidebar.label.diamondAccountRecords'])}{' '}
            </span>
          </li>

          {/* <Link to="">
            <li
              className={
                selectedItem === 'bet-record'
                  ? 'selected-item-sidebar-info'
                  : ''
              }
              onClick={() => handleItemClick('bet-record')}
            >
              <span className="icon-sidebar-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112 192H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                </svg>
              </span>
              <span>{t(translations['sidebar.label.bettingRecord'])} </span>
            </li>
          </Link> */}
          <div></div>
        </ul>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  width: 280px;
  display: flex;
  flex-direction: column;
  color: rgba(255, 255, 255, 0.6);
  background: rgb(35, 35, 35);
  position: relative;
  padding: 40px 20px;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #464646;
    border-radius: 8px;
  }
`;
