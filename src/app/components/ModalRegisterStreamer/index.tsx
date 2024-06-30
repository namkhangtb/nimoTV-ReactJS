import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import './ModalRegisterStreamer.scss';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { useHeaderSlice } from '../Header/slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectorIdUser, selectorIsLogged } from '../Header/slice/selectors';
import { toast } from 'react-toastify';
import axios from 'axios';
import { environment } from 'app/environments/environment';

export default function ModalRegisterStreamer({}) {
  const { t, i18n } = useTranslation();

  const configToken = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };

  // Use the slice we created
  const { actions } = useHeaderSlice();

  // Used to dispatch slice actions
  const dispatch = useDispatch();
  const isLogged = useSelector(selectorIsLogged);
  const idUser = useSelector(selectorIdUser);

  const [valueUrlStream, setvalueUrlStream] = useState('');
  const changeValueUrlStream = event => {
    console.log('url stream', event.target.value);
    setvalueUrlStream(event.target.value);
  };

  const handleRegisStreamer = () => {
    const bodyRegis = {
      streamUrl: valueUrlStream,
    };
    if (!isLogged) {
      toast.error(
        'Bạn cần đăng nhập trước mới có thể đăng ký làm streamer được!!!',
      );
    } else {
      if (valueUrlStream == '') {
        toast.error('Không được để trống Url stream');
      } else {
        axios
          .post(
            `${environment.BASEURL_BACKEND}/streamers?userId=${idUser}`,
            bodyRegis,
            configToken,
          )
          .then(res => {
            console.log('res regis streamer', res);
            dispatch(actions.toggleModalRegisStreamer(false));
            dispatch(
              actions.setIdStreamer(res.data.data.liveStreamerInfo.streamerId),
            );
            dispatch(
              actions.setIdLiveStream(
                res.data.data.liveStreamerInfo.liveStreamId,
              ),
            );
            dispatch(actions.toggleSetIsStreamer(true));
            toast.success('Đăng ký làm streamer thành công');
          })
          .catch(err => {
            console.log('errr login', err);
            toast.error(err);
          });
      }
    }
  };

  return (
    <>
      <Wrapper>
        <div className="modal-regis-streamer-container">
          <div className="modal-regis-streamer__header">
            <div className="modal-regis-streamer__header-left">
              <div className="modal-regis-streamer__logo-nimo">
                {t(translations['modalRegisStreamer.label.regisStreamer'])}
              </div>
            </div>
            <span
              className="modal-regis-streamer__btn-close"
              onClick={() => dispatch(actions.toggleModalRegisStreamer(false))}
            >
              X
            </span>
          </div>
          <div className="modal-regis-streamer__line"></div>
          <div className="modal-regis-streamer__body">
            <div className="modal-regis-streamer__body-item">
              {t(
                translations['modalRegisStreamer.label.doYouWantToBeAStreamer'],
              )}
            </div>
            <div className="modal-regis-streamer__body-item">
              <div className="modal-regis-streamer__body-item__title">
                {t(translations['modalRegisStreamer.label.urlStream'])}:
              </div>

              <div className="modal-regis-streamer__input-container modal-regis-streamer__describe-channel-input">
                <input
                  type="text"
                  className="modal-regis-streamer__input "
                  placeholder={t(
                    translations['modalRegisStreamer.label.urlStreamEnter'],
                  )}
                  onChange={changeValueUrlStream}
                />
              </div>
            </div>

            <div className="modal-regis-streamer__nimo-btn-container">
              <button
                className="modal-regis-streamer__nimo-btn modal-regis-streamer__btn-cancel"
                onClick={() =>
                  dispatch(actions.toggleModalRegisStreamer(false))
                }
              >
                {t(translations['btn.cancel'])}
              </button>
              <button
                className="modal-regis-streamer__nimo-btn modal-regis-streamer__btn-ok"
                onClick={handleRegisStreamer}
              >
                {t(translations['btn.ok'])}
              </button>
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
