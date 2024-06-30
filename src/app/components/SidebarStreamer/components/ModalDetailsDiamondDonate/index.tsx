import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import './ModalDetailsDiamondDonate.scss';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { useSelector, useDispatch } from 'react-redux';
import { useStreamerManageSlice } from 'app/pages/StreamManager/slice';
import {
  selectorDescribeChannel,
  selectorLiveStreamId,
  selectorNameChannel,
  selectorStreamUrl,
  selectorTitleStream,
} from 'app/pages/StreamManager/slice/selectors';
import { toast } from 'react-toastify';
import axios from 'axios';
import { environment } from 'app/environments/environment';
import { useNavigate, useParams } from 'react-router-dom';
import {
  selectorIdLiveStream,
  selectorIdStreamer,
} from 'app/components/Header/slice/selectors';

export default function ModalDetailsDiamondDonate() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  // Use the slice we created
  const { actions } = useStreamerManageSlice();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  const idStreamer = useSelector(selectorIdStreamer);

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
  const datafake = [
    {
      createdAt: '2024-01-08T09:54:31.313Z',
      diamondId: 1,
      numberDiamond: 12,
      paymentMethod: 'paypal',
      receiveDiamond: '',
      streamerId: 0,
      userId: 15,
    },
  ];

  useEffect(() => {
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
  }, []);

  return (
    <>
      <Wrapper>
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
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
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
