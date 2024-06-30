import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import './ModalEditStreamerInfo.scss';
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
import { useParams } from 'react-router-dom';
import { backgroundImage } from '../../assets/base64/backgroundImage';
import { avatar } from '../../assets/base64/avatar';

export default function ModalEditStreamerInfo({}) {
  const { t, i18n } = useTranslation();
  // Use the slice we created
  const { actions } = useStreamerManageSlice();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  const streamUrl = useSelector(selectorStreamUrl);
  const liveStreamId = useSelector(selectorLiveStreamId);
  const nameChannel = useSelector(selectorNameChannel);
  const describeChannel = useSelector(selectorDescribeChannel);
  const titleChannel = useSelector(selectorTitleStream);

  const [valueTitle, setvalueTitle] = useState('');
  const changeValueTitle = event => {
    console.log('new value title', event.target.value);
    setvalueTitle(event.target.value);
  };

  const [valueNameChannel, setvalueNameChannel] = useState('');
  const changeValueNameChannel = event => {
    console.log('new value name channel', event.target.value);
    setvalueNameChannel(event.target.value);
  };

  const [valueDescribeChannel, setvalueDescribeChannel] = useState('');
  const changeValueDescribeChannel = event => {
    console.log('new value describe channel', event.target.value);
    setvalueDescribeChannel(event.target.value);
  };

  const urlParams = useParams();

  const handleEditStreamInfo = () => {
    console.log(urlParams);

    const bodyStreamInfo = {
      title: valueTitle,
      backgroundImage: backgroundImage,
      streamUrl: streamUrl,
      streamName: valueNameChannel,
      streamDescription: valueDescribeChannel,
      // avatar: avatar,
    };

    if (valueDescribeChannel && valueNameChannel && valueTitle) {
      axios
        .put(
          `${environment.BASEURL_BACKEND}/live-stream/${liveStreamId}`,
          bodyStreamInfo,
        )
        .then(res => {
          console.log('res modal edit stream ìnfo', res, bodyStreamInfo);
          // Mở comment ra
          dispatch(actions.setNameChannel(res.data.data.streamName));
          dispatch(actions.setDescribeChannel(res.data.data.streamDescription));
          dispatch(actions.setTitleStream(res.data.data.title));
          dispatch(actions.toggleModalEditStreamerInfo(false));
          toast.success('Chỉnh sửa thông tin thành công!!!');
        })
        .catch(err => {
          toast.error('Lỗi: ' + err);
        });
    } else {
      toast.error('Không được để trống dữ liệu');
    }
  };
  return (
    <>
      <Wrapper>
        <div className="modal-edit-streamer-info-container">
          <div className="modal-edit-streamer-info__header">
            <div className="modal-edit-streamer-info__header-left">
              <div className="modal-edit-streamer-info__logo-nimo">
                {t(translations['modalEditStreamerInfo.label.editInfo'])}
              </div>
            </div>
            <span
              className="modal-edit-streamer-info__btn-close"
              onClick={() =>
                dispatch(actions.toggleModalEditStreamerInfo(false))
              }
            >
              X
            </span>
          </div>
          <div className="modal-edit-streamer-info__line"></div>
          <div className="modal-edit-streamer-info__body">
            <div className="modal-edit-streamer-info__body-item">
              <div className="modal-edit-streamer-info__body-item__title">
                {t(translations['modalEditStreamerInfo.label.title'])}:
              </div>

              <div className="modal-edit-streamer-info__input-container modal-edit-streamer-info__name-channel-input">
                <input
                  type="text"
                  className="modal-edit-streamer-info__input"
                  onChange={changeValueTitle}
                  placeholder={titleChannel}
                />
              </div>
            </div>
            <div className="modal-edit-streamer-info__body-item">
              <div className="modal-edit-streamer-info__body-item__title">
                {t(translations['modalEditStreamerInfo.label.nameChannel'])}:
              </div>

              <div className="modal-edit-streamer-info__input-container modal-edit-streamer-info__name-channel-input">
                <input
                  type="text"
                  className="modal-edit-streamer-info__input"
                  onChange={changeValueNameChannel}
                  placeholder={nameChannel}
                />
              </div>
            </div>

            <div className="modal-edit-streamer-info__body-item">
              <div className="modal-edit-streamer-info__body-item__title">
                {t(translations['modalEditStreamerInfo.label.describeChannel'])}
                :
              </div>

              <div className="modal-edit-streamer-info__input-container modal-edit-streamer-info__describe-channel-input">
                <input
                  type="text"
                  className="modal-edit-streamer-info__input "
                  onChange={changeValueDescribeChannel}
                  placeholder={describeChannel}
                />
              </div>
            </div>

            <div className="modal-edit-streamer-info__nimo-btn-container">
              <button
                className="modal-edit-streamer-info__nimo-btn modal-edit-streamer-info__btn-edit"
                onClick={handleEditStreamInfo}
              >
                {t(translations['btn.edit'])}
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
