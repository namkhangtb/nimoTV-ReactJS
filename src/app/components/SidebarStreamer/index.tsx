import * as React from 'react';
import './index.scss';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import edit from './assets/svg/edit.svg';
import gift from './assets/svg/gift.svg';
import bell from './assets/svg/bell.svg';
import dice from './assets/svg/dice.svg';
import vote from './assets/svg/vote.svg';
import face from './assets/svg/face.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectorShowModalDetailsDiamondDonate,
  selectorShowModalEditStreamerInfo,
} from 'app/pages/StreamManager/slice/selectors';
import { useStreamerManageSlice } from 'app/pages/StreamManager/slice';
import ModalEditStreamerInfo from './components/ModalEditStreamerInfo';
import ModalDetailsDiamondDonate from './components/ModalDetailsDiamondDonate';
import axios from 'axios';
import { environment } from 'app/environments/environment';
import { selectorIdStreamer } from '../Header/slice/selectors';
import { toast } from 'react-toastify';

export function SidebarStreamer() {
  const { t, i18n } = useTranslation();

  // Use the slice we created
  const { actions } = useStreamerManageSlice();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const showModalEditStreamerInfo = useSelector(
    selectorShowModalEditStreamerInfo,
  );
  const showModalDetailsDiamondDonate = useSelector(
    selectorShowModalDetailsDiamondDonate,
  );

  interface DetailsDiamondUserItem {
    diamondId: number;
    createdAt: string | Date;
    userId: number;
    streamerId: number;
    numberDiamond: number;
    paymentMethod: String;
    receiveDiamond: String;
  }
  const [dataDetailsDiamond, setdataDetailsDiamond] = useState<
    DetailsDiamondUserItem[]
  >([]);
  const idStreamer = useSelector(selectorIdStreamer);

  const getDataDetailsDiamondDonate = () => {
    const streamerId = idStreamer;
    console.log('id', streamerId);

    if (streamerId) {
      axios
        .get(
          `${environment.BASEURL_BACKEND}/detail-diamond/by-streamer-id?size=0&index=0&streamer-id=${streamerId}`,
          {
            // headers: {
            //   Authorization: 'Bearer ' + localStorage.getItem('token'),
            // },
          },
        )
        .then(res => {
          console.log('ress detaildeamond donate', res, dataDetailsDiamond);
          setdataDetailsDiamond(res.data.data);
        })
        .catch(err => {
          toast.error('Lỗi: ' + err);
        });
    } else {
      navigate('/');
    }
  };
  return (
    <Wrapper>
      <div
        style={
          showModalEditStreamerInfo ? { display: 'block' } : { display: 'none' }
        }
      >
        <ModalEditStreamerInfo></ModalEditStreamerInfo>
      </div>
      <div
        style={
          showModalDetailsDiamondDonate
            ? { display: 'block' }
            : { display: 'none' }
        }
      >
        <WrapperModalDetailsDiamondDonate>
          <div className="modal-detailsdiamond-donate-container">
            <div className="modal-detailsdiamond-donate__header">
              <div className="modal-detailsdiamond-donate__header-left">
                <div className="modal-detailsdiamond-donate__logo-nimo">
                  {t(translations['modalDetailsDiamondDonate.label.title'])}
                </div>
              </div>
              <span
                className="modal-detailsdiamond-donate__btn-close"
                onClick={() =>
                  dispatch(actions.toggleModalDetailsDiamondDonate(false))
                }
              >
                X
              </span>
            </div>
            <div className="modal-detailsdiamond-donate__line"></div>
            <div className="modal-detailsdiamond-donate__body">
              <div className="details-diamond-streamer-section">
                {dataDetailsDiamond.length !== 0 ? (
                  <div className="tbl-content">
                    <table>
                      <thead>
                        <tr className="details-diamond-streamer__table__tr">
                          <th>STT</th>
                          <th>Người tặng</th>
                          <th>Số kim cương</th>
                          <th>Ngày tặng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataDetailsDiamond.map((item, index) => {
                          return (
                            <tr
                              className="details-diamond-streamer__table__tr"
                              key={index}
                            >
                              <td>{index + 1}</td>
                              <td>{item.userId ? item.userId : ''}</td>
                              <td>{item.numberDiamond}</td>
                              <td>
                                {typeof item.createdAt === 'string'
                                  ? item.createdAt
                                  : item.createdAt.toString()}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="modal-detailsdiamond-donate__label__nodata">
                    {t(translations['modalDetailsDiamondDonate.label.noData'])}{' '}
                  </div>
                )}
              </div>
            </div>
          </div>
        </WrapperModalDetailsDiamondDonate>
      </div>
      <div className="sidebar-streamer__btn-quick-action">
        <span>{t(translations['streamManagerScreen.label.quickAction'])}</span>
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 20 20"
          onClick={() => {
            navigate('/');
            dispatch(actions.toggleSetIsStreaming(false));
          }}
        >
          <path d="M18 3a1 1 0 011 1v12a1 1 0 01-2 0V4a1 1 0 011-1zm-10.36.232a1 1 0 01.203 1.307l-.075.101L4.134 9H14a1 1 0 01.117 1.993L14 11H4.135l3.633 4.36a1 1 0 01-.036 1.322l-.092.086a1 1 0 01-1.322-.036l-.086-.092-5-6a1 1 0 01-.077-1.175l.077-.105 5-6a1 1 0 011.408-.128z"></path>
        </svg>
      </div>
      <div className="sidebar-streamer__menu-container">
        <div className="sidebar-streamer__menu">
          <div className="sidebar-streamer__menu__title">
            {t(translations['streamManagerScreen.label.manageYourStream'])}
          </div>
          <div className="sidebar-streamer__menu-item-container">
            <div
              className="sidebar-streamer__menu-item"
              onClick={() =>
                dispatch(actions.toggleModalEditStreamerInfo(true))
              }
            >
              <span>
                <img src={edit} alt="" />
              </span>
              <span>
                {t(translations['streamManagerScreen.label.informationEdit'])}
              </span>
            </div>
            <div
              className="sidebar-streamer__menu-item"
              onClick={() => {
                dispatch(actions.toggleModalDetailsDiamondDonate(true));
                getDataDetailsDiamondDonate();
              }}
            >
              <span>
                <img src={gift} alt="" />
              </span>
              <span>
                {t(translations['streamManagerScreen.label.giftRecord'])}
              </span>
            </div>
            {/* <div className="sidebar-streamer__menu-item">
              <span>
                <img src={bell} alt="" />
              </span>
              <span>
                {t(translations['streamManagerScreen.label.alertBox'])}
              </span>
            </div> */}
          </div>
        </div>

        <div className="sidebar-streamer__menu">
          <div className="sidebar-streamer__menu__title">
            {t(translations['streamManagerScreen.label.growYourCommunity'])}
          </div>
          <div className="sidebar-streamer__menu-item-container">
            <div className="sidebar-streamer__menu-item">
              <span>
                <img src={dice} alt="" />
              </span>
              <span>
                {t(translations['streamManagerScreen.label.startBet'])}
              </span>
            </div>
            <div className="sidebar-streamer__menu-item">
              <span>
                <img src={vote} alt="" />
              </span>
              <span>
                {t(translations['streamManagerScreen.label.openVote'])}
              </span>
            </div>
            <div className="sidebar-streamer__menu-item">
              <span>
                <img src={face} alt="" />
              </span>
              <span>{t(translations['streamManagerScreen.label.pickMe'])}</span>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  color: rgba(255, 255, 255, 0.6);
  background: rgb(30, 30, 30);
  position: relative;
  /* padding: 40px 20px; */
  overflow: auto;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #464646;
    border-radius: 8px;
  }
`;

const WrapperModalDetailsDiamondDonate = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.65);
  outline: 0;
  overflow: auto;
`;
