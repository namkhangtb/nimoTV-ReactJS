import * as React from 'react';
import './index.scss';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import diamond from './assets/images/icon-diamond.png';
import golive from './assets/images/go-live.png';
import avatar from './assets/images/duck.jpg';
import vi from './assets/svg/flag-vietnam.svg';
import en from './assets/svg/flag-us.svg';
import i_logout from './assets/svg/right-from-bracket-solid.svg';
import ModalLoginSignUp from '../ModalLoginSignUp';
import { useSelector, useDispatch } from 'react-redux';
import { useHeaderSlice } from './slice';
import {
  selectorIdLiveStream,
  selectorIdStreamer,
  selectorImgAvatar,
  selectorIsLogged,
  selectorIsStreamer,
  selectorShowModalLoginSignup,
  selectorShowModalRechargeDiamond,
  selectorShowModalRegisStreamer,
} from './slice/selectors';
import ModalRechargeDiamond from '../ModalRechargeDiamond';
import ModalRegisterStreamer from '../ModalRegisterStreamer';

export function Hearder() {
  const { t, i18n } = useTranslation();
  const changLanguageButtonClicked = lang => {
    const language = lang;
    i18n.changeLanguage(language);
  };
  const flagIcon = localStorage.getItem('i18nextLng');

  const navigate = useNavigate();
  // Use the slice we created
  const { actions } = useHeaderSlice();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  const showModalLoginSignup = useSelector(selectorShowModalLoginSignup);
  const showModalRechargeDiamond = useSelector(
    selectorShowModalRechargeDiamond,
  );
  const showModalRegisStreamer = useSelector(selectorShowModalRegisStreamer);
  const isLogged = useSelector(selectorIsLogged);
  const isStreamer = useSelector(selectorIsStreamer);
  const idLiveStream = useSelector(selectorIdLiveStream);
  const idStreamer = useSelector(selectorIdStreamer);

  const imgAvatar = useSelector(selectorImgAvatar);
  //state trạng thái màu search box
  const [isActiveSearchBox, setIsActiveSearchBox] = useState(false);
  const activeSearchBox = () => {
    setIsActiveSearchBox(!isActiveSearchBox);
  };

  //state trạng thái navlink đang chọn(chua fix)
  const [selectedItem, setSelectedItem] = useState(null);
  const handleItemClick = item => {
    setSelectedItem(prevSelectedItem =>
      item === prevSelectedItem ? prevSelectedItem : item,
    );
  };

  // //state trạng thái chọn tab login hay singup của modal login signup khi đang mở
  const [tabSelected, settabSelected] = useState(0);
  const handleClickSelectTab = index => {
    console.log('select tab', index);
    settabSelected(index);
  };

  const openModalLogin = event => {
    console.log(event.target);
    console.log('openModalLogin');
    dispatch(actions.toggleModalLoginSignup(true));
    handleClickSelectTab(0);
  };
  const openModalSignup = event => {
    console.log(event.target);
    console.log('openModalSignup');
    dispatch(actions.toggleModalLoginSignup(true));
    handleClickSelectTab(1);
  };

  const [isOpenPopoverLanguage, setisOpenPopoverLanguage] = useState(false);
  const togglePopoverLanguage = () => {
    setisOpenPopoverLanguage(!isOpenPopoverLanguage);
  };

  const logout = () => {
    console.log('logout');
    dispatch(actions.toggleSetLogged());
    localStorage.removeItem('token');
    dispatch(actions.RESET_STATE());
    navigate('/');
  };

  const navigateToProfile = () => {
    navigate('/i/my-info');
  };

  const navigateToStreamManage = () => {
    navigate(`/s/stream-manager/${idStreamer}`);
  };

  return (
    <Wrapper>
      <div
        style={
          showModalLoginSignup ? { display: 'block' } : { display: 'none' }
        }
      >
        <ModalLoginSignUp
          handleClickSelectTab={handleClickSelectTab}
          tabSelected={tabSelected}
        ></ModalLoginSignUp>
      </div>

      <div
        style={
          showModalRechargeDiamond ? { display: 'block' } : { display: 'none' }
        }
      >
        <ModalRechargeDiamond></ModalRechargeDiamond>
      </div>
      {isStreamer ? (
        <></>
      ) : (
        <div
          style={
            showModalRegisStreamer ? { display: 'block' } : { display: 'none' }
          }
        >
          <ModalRegisterStreamer></ModalRegisterStreamer>
        </div>
      )}
      <div className="header-left">
        <a className="logo" href="/"></a>

        <div className="nav-horizontal">
          <Link to="/">
            <div
              className={
                selectedItem === 'nav-home' ? 'selected-item-nav-header' : ''
              }
              onClick={() => handleItemClick('nav-home')}
            >
              <button className="button-nav">
                {t(translations['nav.hone'])}
                <span
                  className={selectedItem === 'nav-home' ? 'bline' : ''}
                ></span>
              </button>
            </div>
          </Link>
          <Link to="/lives">
            <div
              className={
                selectedItem === 'nav-lives' ? 'selected-item-nav-header' : ''
              }
              onClick={() => handleItemClick('nav-lives')}
            >
              <button className="button-nav">
                {t(translations['nav.live'])}
                <span
                  className={selectedItem === 'nav-lives' ? 'bline' : ''}
                ></span>
              </button>
            </div>
          </Link>
          {/* <Link to="/nimoshow" className={selectedItem === 'nav-nimoShow' ? 'selected-item-nav-header' : ''} onClick={() => handleItemClick('nav-nimoShow')}>
            <button className="button-nav">
              {t(translations['nav.nimoShow'])}
              <span className={selectedItem === 'nav-nimoShow' ? 'bline' : ''}></span>
            </button>
          </Link> */}
        </div>
      </div>

      <div className="header-right">
        <div
          className={`search ${isActiveSearchBox ? 'active-search-box' : ''}`}
          onClick={activeSearchBox}
        >
          <span className="icon-search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="12"
              height="24"
              viewBox="0 0 128 128"
            >
              <path d="M 56.599609 21.599609 C 34.099609 21.599609 15.800781 40.100781 15.800781 62.800781 C 15.800781 85.600781 34.099609 104 56.599609 104 C 66.899609 104 76.3 100.09922 83.5 93.699219 L 85.800781 96 L 83.699219 98.199219 C 82.499219 99.399219 82.499219 101.3 83.699219 102.5 L 101.69922 120.69922 C 102.29922 121.29922 103.00078 121.59961 103.80078 121.59961 C 104.60078 121.59961 105.40039 121.29922 105.90039 120.69922 L 113.90039 112.59961 C 115.00039 111.39961 115.00078 109.50039 113.80078 108.40039 L 95.800781 90.199219 C 95.200781 89.599219 94.499219 89.300781 93.699219 89.300781 C 92.899219 89.300781 92.099609 89.599219 91.599609 90.199219 L 89.5 92.400391 L 87.199219 90 C 93.499219 82.7 97.400391 73.200781 97.400391 62.800781 C 97.400391 40.100781 79.099609 21.599609 56.599609 21.599609 z M 56.599609 27.699219 C 75.799609 27.699219 91.400391 43.500391 91.400391 62.900391 C 91.400391 82.300391 75.799609 98 56.599609 98 C 37.399609 98 21.800781 82.300391 21.800781 62.900391 C 21.800781 43.500391 37.399609 27.699219 56.599609 27.699219 z M 56.699219 40.199219 C 47.199219 40.199219 38.7 46.300781 35.5 55.300781 C 35 56.600781 35.699609 58.199609 37.099609 58.599609 C 37.399609 58.699609 37.7 58.800781 38 58.800781 C 39.1 58.800781 40.1 58.1 40.5 57 C 42.9 50.1 49.499219 45.400391 56.699219 45.400391 C 58.099219 45.400391 59.300781 44.200781 59.300781 42.800781 C 59.300781 41.400781 58.099219 40.199219 56.699219 40.199219 z M 37.699219 64.900391 C 36.299219 64.900391 35.099609 66 35.099609 67.5 L 35.099609 67.900391 C 35.199609 69.300391 36.300781 70.5 37.800781 70.5 C 39.200781 70.5 40.400391 69.300391 40.400391 67.900391 L 40.400391 67.599609 C 40.400391 66.099609 39.300781 64.900391 37.800781 64.900391 L 37.699219 64.900391 z M 93.800781 96.599609 L 107.59961 110.59961 L 103.80078 114.40039 L 90 100.40039 L 93.800781 96.599609 z"></path>
            </svg>
          </span>
          <input type="text" className="input-search" />
        </div>
        {/* {isLogged ? (
          <div
            className="recharge"
            onClick={() => dispatch(actions.toggleModalRechargeDiamond(true))}
          >
            <img src={diamond} alt="diamond" width="16px" height="16px" />
            {t(translations['btn.recharge'])}
          </div>
        ) : (
          <></>
        )} */}

        {isStreamer ? (
          <div className="golive" onClick={navigateToStreamManage}>
            <img src={golive} alt="go-live" width="24px" />
            {t(translations['btn.golive'])}
          </div>
        ) : (
          <div
            className="golive"
            onClick={() => dispatch(actions.toggleModalRegisStreamer(true))}
          >
            <img src={golive} alt="go-live" width="24px" />
            {t(translations['btn.golive'])}
          </div>
        )}

        <div className="button-icon nimo-header-chat">
          <span className="span-button-icon">
            <svg
              width="22px"
              height="22px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.0867 21.3877L13.7321 21.7697L13.0867 21.3877ZM13.6288 20.4718L12.9833 20.0898L13.6288 20.4718ZM10.3712 20.4718L9.72579 20.8539H9.72579L10.3712 20.4718ZM10.9133 21.3877L11.5587 21.0057L10.9133 21.3877ZM1.25 10.5C1.25 10.9142 1.58579 11.25 2 11.25C2.41421 11.25 2.75 10.9142 2.75 10.5H1.25ZM3.07351 15.6264C2.915 15.2437 2.47627 15.062 2.09359 15.2205C1.71091 15.379 1.52918 15.8177 1.68769 16.2004L3.07351 15.6264ZM7.78958 18.9915L7.77666 19.7413L7.78958 18.9915ZM5.08658 18.6194L4.79957 19.3123H4.79957L5.08658 18.6194ZM21.6194 15.9134L22.3123 16.2004V16.2004L21.6194 15.9134ZM16.2104 18.9915L16.1975 18.2416L16.2104 18.9915ZM18.9134 18.6194L19.2004 19.3123H19.2004L18.9134 18.6194ZM19.6125 2.7368L19.2206 3.37628L19.6125 2.7368ZM21.2632 4.38751L21.9027 3.99563V3.99563L21.2632 4.38751ZM4.38751 2.7368L3.99563 2.09732V2.09732L4.38751 2.7368ZM2.7368 4.38751L2.09732 3.99563H2.09732L2.7368 4.38751ZM9.40279 19.2098L9.77986 18.5615L9.77986 18.5615L9.40279 19.2098ZM13.7321 21.7697L14.2742 20.8539L12.9833 20.0898L12.4412 21.0057L13.7321 21.7697ZM9.72579 20.8539L10.2679 21.7697L11.5587 21.0057L11.0166 20.0898L9.72579 20.8539ZM12.4412 21.0057C12.2485 21.3313 11.7515 21.3313 11.5587 21.0057L10.2679 21.7697C11.0415 23.0767 12.9585 23.0767 13.7321 21.7697L12.4412 21.0057ZM10.5 2.75H13.5V1.25H10.5V2.75ZM21.25 10.5V11.5H22.75V10.5H21.25ZM7.8025 18.2416C6.54706 18.2199 5.88923 18.1401 5.37359 17.9265L4.79957 19.3123C5.60454 19.6457 6.52138 19.7197 7.77666 19.7413L7.8025 18.2416ZM1.68769 16.2004C2.27128 17.6093 3.39066 18.7287 4.79957 19.3123L5.3736 17.9265C4.33223 17.4951 3.50486 16.6678 3.07351 15.6264L1.68769 16.2004ZM21.25 11.5C21.25 12.6751 21.2496 13.5189 21.2042 14.1847C21.1592 14.8438 21.0726 15.2736 20.9265 15.6264L22.3123 16.2004C22.5468 15.6344 22.6505 15.0223 22.7007 14.2868C22.7504 13.5581 22.75 12.6546 22.75 11.5H21.25ZM16.2233 19.7413C17.4786 19.7197 18.3955 19.6457 19.2004 19.3123L18.6264 17.9265C18.1108 18.1401 17.4529 18.2199 16.1975 18.2416L16.2233 19.7413ZM20.9265 15.6264C20.4951 16.6678 19.6678 17.4951 18.6264 17.9265L19.2004 19.3123C20.6093 18.7287 21.7287 17.6093 22.3123 16.2004L20.9265 15.6264ZM13.5 2.75C15.1512 2.75 16.337 2.75079 17.2619 2.83873C18.1757 2.92561 18.7571 3.09223 19.2206 3.37628L20.0044 2.09732C19.2655 1.64457 18.4274 1.44279 17.4039 1.34547C16.3915 1.24921 15.1222 1.25 13.5 1.25V2.75ZM22.75 10.5C22.75 8.87781 22.7508 7.6085 22.6545 6.59611C22.5572 5.57256 22.3554 4.73445 21.9027 3.99563L20.6237 4.77938C20.9078 5.24291 21.0744 5.82434 21.1613 6.73809C21.2492 7.663 21.25 8.84876 21.25 10.5H22.75ZM19.2206 3.37628C19.7925 3.72672 20.2733 4.20752 20.6237 4.77938L21.9027 3.99563C21.4286 3.22194 20.7781 2.57144 20.0044 2.09732L19.2206 3.37628ZM10.5 1.25C8.87781 1.25 7.6085 1.24921 6.59611 1.34547C5.57256 1.44279 4.73445 1.64457 3.99563 2.09732L4.77938 3.37628C5.24291 3.09223 5.82434 2.92561 6.73809 2.83873C7.663 2.75079 8.84876 2.75 10.5 2.75V1.25ZM2.75 10.5C2.75 8.84876 2.75079 7.663 2.83873 6.73809C2.92561 5.82434 3.09223 5.24291 3.37628 4.77938L2.09732 3.99563C1.64457 4.73445 1.44279 5.57256 1.34547 6.59611C1.24921 7.6085 1.25 8.87781 1.25 10.5H2.75ZM3.99563 2.09732C3.22194 2.57144 2.57144 3.22194 2.09732 3.99563L3.37628 4.77938C3.72672 4.20752 4.20752 3.72672 4.77938 3.37628L3.99563 2.09732ZM11.0166 20.0898C10.8136 19.7468 10.6354 19.4441 10.4621 19.2063C10.2795 18.9559 10.0702 18.7304 9.77986 18.5615L9.02572 19.8582C9.07313 19.8857 9.13772 19.936 9.24985 20.0898C9.37122 20.2564 9.50835 20.4865 9.72579 20.8539L11.0166 20.0898ZM7.77666 19.7413C8.21575 19.7489 8.49387 19.7545 8.70588 19.7779C8.90399 19.7999 8.98078 19.832 9.02572 19.8582L9.77986 18.5615C9.4871 18.3912 9.18246 18.3215 8.87097 18.287C8.57339 18.2541 8.21375 18.2487 7.8025 18.2416L7.77666 19.7413ZM14.2742 20.8539C14.4916 20.4865 14.6287 20.2564 14.7501 20.0898C14.8622 19.936 14.9268 19.8857 14.9742 19.8582L14.2201 18.5615C13.9298 18.7304 13.7204 18.9559 13.5379 19.2063C13.3646 19.4441 13.1864 19.7468 12.9833 20.0898L14.2742 20.8539ZM16.1975 18.2416C15.7862 18.2487 15.4266 18.2541 15.129 18.287C14.8175 18.3215 14.5129 18.3912 14.2201 18.5615L14.9742 19.8582C15.0192 19.832 15.096 19.7999 15.2941 19.7779C15.5061 19.7545 15.7842 19.7489 16.2233 19.7413L16.1975 18.2416Z"
                fill="#767676"
              />
              <path
                d="M8 11H8.009M11.991 11H12M15.991 11H16"
                stroke="#767676"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div className="dot-red"></div>
          </span>
        </div>

        <div className="button-icon nimo-header-download">
          <span className="span-button-icon">
            <svg
              fill="#767676"
              width="22px"
              height="22px"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M256,409.7,152.05,305.75,173.5,284.3l67.33,67.32V34h30.34V351.62L338.5,284.3,360,305.75ZM445.92,351v93.22a3.61,3.61,0,0,1-3.47,3.48H69.15a3.3,3.3,0,0,1-3.07-3.48V351H35.74v93.22A33.66,33.66,0,0,0,69.15,478h373.3a33.85,33.85,0,0,0,33.81-33.82V351Z" />
            </svg>
          </span>
          <div className="header-screen__popover__download">
            <div className="header-screen__popover__content">
              <div className="header-screen__popover-arrow"></div>
              <div className="header-screen__popover-title">
                {t(translations['header.label.downloadApp'])}
              </div>
              <div className="header-screen__popover__download-app-list">
                <span className="download-app-list__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="25px"
                    width="25px"
                    viewBox="0 0 384 512"
                    fill="hsla(0, 0%, 100%, 0.4)"
                  >
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                  </svg>
                </span>
                <span className="download-app-list__label-icon">
                  {t(translations['header.label.appleStore'])}
                </span>
              </div>
              <div className="header-screen__popover__download-app-list">
                <span className="download-app-list__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="25px"
                    width="25px"
                    viewBox="0 0 512 512"
                    fill="hsla(0, 0%, 100%, 0.4)"
                  >
                    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                  </svg>
                </span>
                <span className="download-app-list__label-icon">
                  {t(translations['header.label.googlePlay'])}
                </span>
              </div>

              <div className="header-screen__popover__qrcode">
                <div className="header-screen__popover__qrcode-wrap">
                  <div className="header-screen__popover__qrcode-img"></div>
                </div>
                <div className="header-screen__popover__qrcode-tip">
                  {t(translations['header.label.scanQR'])}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="button-icon nimo-header-like">
          <span className="span-button-icon">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 32 32">
              <path
                d="M25.318,2.3c-3.54-0.926-7.107,0.351-9.275,2.994c-0.023,0.028-0.063,0.028-0.085,0
	c-2.169-2.643-5.735-3.92-9.275-2.994c-4.279,1.12-6.947,5.346-6.646,9.758C0.804,23.333,13.654,30,16,30
	s15.196-6.667,15.964-17.941C32.265,7.646,29.597,3.42,25.318,2.3z M16,28c-1.777-0.006-13.574-6.455-13.989-16.458
	c-0.128-3.083,1.63-6.048,4.53-7.103c3.358-1.221,6.877,0.205,8.53,3.08c0.421,0.732,1.437,0.732,1.857,0
	c1.653-2.875,5.172-4.302,8.53-3.08c2.9,1.055,4.658,4.02,4.53,7.103C29.574,21.545,17.777,27.994,16,28z M7.433,5.9
	c-0.76,0-1.66,0.399-2.397,1.136C3.864,8.208,3.548,9.79,4.329,10.572C4.619,10.861,5.019,11,5.467,11
	c0.76,0,1.66-0.399,2.397-1.136C9.036,8.693,9.353,7.11,8.572,6.329C8.282,6.039,7.882,5.9,7.433,5.9z M7.97,7.754
	C7.876,8.224,7.58,8.735,7.157,9.157C6.536,9.779,5.877,10,5.467,10c-0.135,0-0.319-0.024-0.431-0.136
	c-0.13-0.13-0.169-0.398-0.105-0.718c0.094-0.469,0.39-0.981,0.812-1.403C6.364,7.122,7.024,6.9,7.433,6.9
	c0.135,0,0.319,0.023,0.431,0.136C7.994,7.166,8.034,7.434,7.97,7.754z"
              />
            </svg>
          </span>
        </div> */}

        {/* <div className="button-icon nimo-header-history">
          <span className="span-button-icon">
            <svg fill="#767676" width="22px" height="22px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9,24H1a1,1,0,0,1,0-2H9a1,1,0,0,1,0,2Z
M7,20H1a1,1,0,0,1,0-2H7a1,1,0,0,1,0,2Z
M5,16H1a1,1,0,0,1,0-2H5a1,1,0,0,1,0,2Z
M13,23.955a1,1,0,0,1-.089-2A10,10,0,1,0,2.041,11.09a1,1,0,0,1-1.992-.18A12,12,0,0,1,24,12,11.934,11.934,0,0,1,13.09,23.951C13.06,23.954,13.029,23.955,13,23.955Z
M12,6a1,1,0,0,0-1,1v5a1,1,0,0,0,.293.707l3,3a1,1,0,0,0,1.414-1.414L13,11.586V7A1,1,0,0,0,12,6Z"
              />
            </svg>
          </span>
        </div> */}

        <div className="nimo-header-language" onClick={togglePopoverLanguage}>
          <span>
            {flagIcon == 'vi' ? (
              <img src={vi} alt="" width="100%" height="100%" />
            ) : (
              <img src={en} alt="" width="100%" height="100%" />
            )}
          </span>
          <div
            className="header-popover__language"
            style={
              isOpenPopoverLanguage ? { display: 'block' } : { display: 'none' }
            }
          >
            <div className="header-screen__popover__content">
              <div className="header-screen__popover-arrow"></div>
              <div
                className="header-popover__language-item"
                onClick={() => changLanguageButtonClicked('vi')}
              >
                <div className="header-popover__language-item__icon">
                  <div className="languge-item__icon-span">
                    <img src={vi} alt="" width="100%" height="100%" />
                  </div>
                </div>
                <div className="header-popover__language-item__label-icon">
                  {t(translations['header.label.vietnamese'])}
                </div>
              </div>
              <div
                className="header-popover__language-item"
                onClick={() => changLanguageButtonClicked('en')}
              >
                <div className="header-popover__language-item__icon">
                  <div className="languge-item__icon-span">
                    <img src={en} alt="" width="100%" height="100%" />
                  </div>
                </div>
                <div className="header-popover__language-item__label-icon">
                  {t(translations['header.label.english'])}
                </div>
              </div>
            </div>
          </div>
        </div>

        {isLogged ? (
          <div className="button-icon nimo-header-more-dot">
            <span>
              <svg
                fill="#767676"
                width="22px"
                height="22px"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S17.654,13,16,13z"
                  id="XMLID_287_"
                />
                <path
                  d="M6,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S7.654,13,6,13z"
                  id="XMLID_289_"
                />
                <path
                  d="M26,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S27.654,13,26,13z"
                  id="XMLID_291_"
                />
              </svg>
            </span>
            <div className="header-popover__profile">
              <div className="header-screen__popover__content">
                <div className="header-screen__popover-arrow"></div>
                <div className="header-popover__profile-item" onClick={logout}>
                  <div className="header-popover__profile-item__icon">
                    <img src={i_logout} alt="" width="100%" height="100%" />
                  </div>
                  <div className="header-popover__profile-item__label-icon">
                    {t(translations['header.label.logout'])}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        {isLogged ? (
          // <Link to="/i/my-info">
          <div className="icon-profile" onClick={navigateToProfile}>
            <img src={imgAvatar} alt="" />
          </div>
        ) : (
          // </Link>
          <div className="nimo-header__btn-login-signup-container">
            <button
              className="nimo-header__nimo-btn nimo-header__btn-login-signup"
              onClick={openModalLogin}
            >
              {t(translations['btn.login'])}
            </button>
            <button
              className="nimo-header__nimo-btn nimo-header__btn-login-signup"
              onClick={openModalSignup}
            >
              {t(translations['btn.signup'])}
            </button>
          </div>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  min-height: 60px;
  padding: 0px 20px;
  color: rgba(255, 255, 255, 0.6);
  background: #1a1a1a;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
`;
