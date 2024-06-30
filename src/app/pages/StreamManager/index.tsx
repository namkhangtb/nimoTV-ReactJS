import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
import './index.scss';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { SidebarStreamer } from 'app/components/SidebarStreamer';

import popularity from './assets/svg/popularity.svg';
import diamond from './assets/svg/diamond.svg';
import heart from './assets/svg/heart.svg';
import camera from './assets/svg/camera.svg';
import time from './assets/svg/time.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { environment } from 'app/environments/environment';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useStreamerManageSlice } from './slice';
import {
  selectorDescribeChannel,
  selectorIsStreaming,
  selectorLiveStreamId,
  selectorNameChannel,
  selectorShowModalCancelStream,
  selectorStreamUrl,
  selectorTitleStream,
} from './slice/selectors';
import { useCreateMediaStream, useStartPeerStreamerSession } from 'hooks';
import { LocalVideo } from 'app/components/StreamVideo';
import * as io from 'socket.io-client';
import { selectorIdUser } from 'app/components/Header/slice/selectors';
import { createPeerConnectionContext } from 'utils/PeerConnectionSession';

export function StreamManager() {
  const { t, i18n } = useTranslation();

  const urlParams = useParams();

  // Use the slice we created
  const { actions } = useStreamerManageSlice();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  const nameChannel = useSelector(selectorNameChannel);
  const describeChannel = useSelector(selectorDescribeChannel);
  const isStreaming = useSelector(selectorIsStreaming);
  const streamUrl = useSelector(selectorStreamUrl);
  const titleChannel = useSelector(selectorTitleStream);
  const liveStreamId = useSelector(selectorLiveStreamId);
  const showModalCancelStream = useSelector(selectorShowModalCancelStream);

  const [totalDiamond, settotalDiamond] = useState(0);
  useEffect(() => {
    const streamerId = urlParams.id;
    console.log('kjdfhkjdashgkjd', streamerId);

    axios
      .get(
        `${environment.BASEURL_BACKEND}/detail-diamond/by-streamer-id?size=0&index=0&streamer-id=${streamerId}`,
      )
      .then(res => {
        console.log('ress detaildeamond donate', res);
        // res.data.data.map(item => {
        //   settotalDiamond(prevTime => prevTime + item.numberDiamond);
        // });
        if (res.data.data) {
          const calculatedTotalDiamond = res.data.data.reduce(
            (total, diamond) => total + diamond.numberDiamond,
            0,
          );
          settotalDiamond(calculatedTotalDiamond);
        }

        console.log('total diamond', totalDiamond);
      })
      .catch(err => {
        toast.error('Lỗi: ' + err);
      });
  }, []);

  useEffect(() => {
    const streamerId = urlParams.id;

    axios
      .get(`${environment.BASEURL_BACKEND}/live-stream/${streamerId}`)
      .then(res => {
        console.log('res stream manage', res);
        dispatch(actions.setNameChannel(res.data.data.streamName));
        dispatch(actions.setDescribeChannel(res.data.data.streamDescription));
        dispatch(actions.setStreamUrl(res.data.data.streamUrl));
        dispatch(actions.setTitleStream(res.data.data.title));
        dispatch(actions.setLiveStreamId(res.data.data.liveStreamId));
      });
  }, []);

  const handleStartStream = () => {
    if (streamUrl && nameChannel && titleChannel && liveStreamId) {
      console.log('liveStreamId', liveStreamId);
      axios
        .post(
          `${environment.BASEURL_BACKEND}/live-stream/start-live-stream/${liveStreamId}`,
        )
        .then(res => {
          console.log('res start stream', res);
        })
        .catch(err => {
          console.log('LỖIIIIII Start');
        });
      setIsStartStream(true);
      dispatch(actions.toggleSetIsStreaming(true));
      startTimer();
      toast.success('Bắt đầu stream!!!');
    } else {
      toast.error('Vui lòng thêm dữ liệu còn thiếu trước khi live stream');
    }
  };
  const handleStopStream = () => {
    console.log('stop stream');
    axios
      .post(
        `${environment.BASEURL_BACKEND}/live-stream/stop-live-stream/${liveStreamId}`,
      )
      .then(res => {
        console.log('res stop stream', res);
      })
      .catch(err => {
        console.log('LỖIIIIII Stop');
      });
    setIsStartStream(false);
    dispatch(actions.toggleSetIsStreaming(false));
    stopTimer();
    toast.success('Kết thúc stream!!!');
  };

  // Code tính thời gian live stream -- START

  const [countTimer, setcountTimer] = useState(0);

  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerInterval;

    if (isRunning) {
      timerInterval = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
        console.log('time', elapsedTime, timerInterval);
      }, 1000);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isRunning]);

  const startTimer = () => {
    console.log('start timer');
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setcountTimer(getElapsedTimeInSeconds());
    console.log('count time', countTimer);

    setElapsedTime(0);
  };
  const getElapsedTimeInSeconds = () => {
    return elapsedTime;
  };

  const formatTime = seconds => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours =
      hours > 0 ? `${hours < 10 ? '0' : ''}${hours}:` : '00:';
    const formattedMinutes = `${minutes < 10 ? '0' : ''}${minutes}`;
    const formattedSeconds = `${
      remainingSeconds < 10 ? '0' : ''
    }${remainingSeconds}`;

    return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
  };

  // Code tính thời gian live stream --END

  const localVideoRef = React.useRef<HTMLVideoElement>(null);
  const stream = useCreateMediaStream(localVideoRef);
  const [isStartStream, setIsStartStream] = React.useState(false);
  useStartPeerStreamerSession(streamUrl, stream, isStartStream);

  const [mess, setMess] = useState('');
  const [chats, setChats] = useState<any>([]);

  const socket = React.useMemo(() => createPeerConnectionContext(), []);

  // socket.onGetMessage((data: any) => {
  //   console.log('stream mange nhan chat tu server', data);
  //   // setChats(prevChats => [...prevChats, data]);
  //   // setChats([...chats, data]);
  // });

  const socketRef = React.useRef<io.SocketIOClient.Socket | null>(null);
  const connectSocket = () => {
    socketRef.current = io(`${environment.BASEURL_BACKEND}/chat`, {
      transports: ['websocket'],
    });

    socketRef.current.on(`on-message-${streamUrl}`, (data: any) => {
      setChats(prevChats => [...prevChats, data]);
      console.log('stream mange nhan chat tu server', data);
      console.log('Chats stream mange', data);
    });
  };

  const disconnectSocket = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  };

  useEffect(() => {
    connectSocket();
    return () => {
      disconnectSocket();
    };
  }, [streamUrl]);

  const sendMessage = (data: TypeChat) => {
    if (socketRef.current && mess) {
      socketRef.current.emit('new-message', data);
    } else {
      toast.error('Nhập tin nhắn để gửi!!!');
    }
  };

  return (
    <>
      <div
        style={
          showModalCancelStream ? { display: 'block' } : { display: 'none' }
        }
      >
        <WrapperModelAceptCancelStream>
          <div className="modal-accept-cancel-stream-container">
            <div className="modal-accept-cancel-stream__header">
              <div className="modal-accept-cancel-stream__header-left">
                <div className="modal-accept-cancel-stream__logo-nimo">
                  {t(translations['label.accept'])}
                </div>
              </div>
              <span
                className="modal-accept-cancel-stream__btn-close"
                onClick={() => dispatch(actions.toggleModalCancelStream(false))}
              >
                X
              </span>
            </div>
            <div className="modal-accept-cancel-stream__line"></div>
            <div className="modal-accept-cancel-stream__body">
              <div className="modal-accept-cancel-stream__body-item">
                {t(translations['modalAccept.label.title'])}
              </div>

              <div className="modal-accept-cancel-stream__nimo-btn-container">
                <button
                  className="modal-accept-cancel-stream__nimo-btn modal-accept-cancel-stream__btn-cancel"
                  onClick={() =>
                    dispatch(actions.toggleModalCancelStream(false))
                  }
                >
                  {t(translations['btn.cancel'])}
                </button>
                <button
                  className="modal-accept-cancel-stream__nimo-btn modal-accept-cancel-stream__btn-ok"
                  onClick={() => {
                    handleStopStream();
                    dispatch(actions.toggleModalCancelStream(false));
                  }}
                >
                  {t(translations['btn.ok'])}
                </button>
              </div>
            </div>
          </div>
        </WrapperModelAceptCancelStream>
      </div>

      <Helmet>
        <title>Stream Manager</title>
      </Helmet>
      <Body>
        <div className="sidebar-streamer-container">
          <SidebarStreamer></SidebarStreamer>
        </div>
        <div className="player-streamer-container">
          <div className="player-streamer__info-stream-container">
            <div className="player-streamer__info-item">
              <div className="player-streamer__info-item__count">
                <span>0</span>
                <img src={popularity} alt="" />
              </div>
              <div className="player-streamer__info-item__title">
                {t(translations['streamManagerScreen.label.popularity'])}
              </div>
            </div>
            <div className="player-streamer__info-item">
              <div className="player-streamer__info-item__count">
                <span>{totalDiamond}</span>
                <img src={diamond} alt="" />
              </div>
              <div className="player-streamer__info-item__title">
                {t(translations['streamManagerScreen.label.gems'])}
              </div>
            </div>
            <div className="player-streamer__info-item">
              <div className="player-streamer__info-item__count">
                <span>0</span>
                <img src={heart} alt="" />
              </div>
              <div className="player-streamer__info-item__title">
                {t(translations['streamManagerScreen.label.newFollows'])}
              </div>
            </div>
            <div className="player-streamer__info-item">
              <div className="player-streamer__info-item__count">
                {/* <span>00:00:00</span> */}
                <span>{formatTime(elapsedTime)}</span>
                <img src={camera} alt="" />
              </div>
              <div className="player-streamer__info-item__title">
                {t(translations['streamManagerScreen.label.live'])}
              </div>
            </div>
            {/* <div className="player-streamer__info-item">
              <div className="player-streamer__info-item__count">
                <span>00:00:00</span>
                <img src={time} alt="" />
              </div>
              <div className="player-streamer__info-item__title">
                {t(translations['streamManagerScreen.label.rec'])}
              </div>
            </div> */}
          </div>
          <div className="player-streamer__stream-preview-container">
            <div className="player-streamer__stream-preview__title">
              <div className="stream-preview__name-channel">{nameChannel}</div>
              <div className="stream-preview__sub-title">
                <span>{describeChannel}</span>
                <div className="edit-sub-title"></div>
              </div>
            </div>
            <div className="player-streamer__stream-preview">
              {localVideoRef && <LocalVideo ref={localVideoRef} />}
            </div>
          </div>

          <div className="player-streamer__action">
            {/* <button className="btn-rec">
              <div className="dot-rec"></div>
              {t(translations['streamManagerScreen.label.rec'])}
            </button> */}
            {!isStreaming ? (
              <button
                className="btn-start-stream"
                onClick={() => {
                  handleStartStream();
                }}
              >
                {t(translations['streamManagerScreen.label.startStream'])}
              </button>
            ) : (
              <button
                className="btn-stop-stream"
                onClick={() => {
                  dispatch(actions.toggleModalCancelStream(true));
                }}
              >
                {t(translations['streamManagerScreen.label.stopStream'])}
              </button>
            )}
          </div>
        </div>
        <div className="message-streamer-container">
          <div className="message-streamer__title">
            {t(translations['streamManagerScreen.label.myChat'])}
          </div>
          <div className="message-streamer__message-list">
            {chats.map((chat: any) => {
              return (
                <div className="message-streamer__message-item">
                  <span className="message-streamer__message-item__nameuser">
                    {chat.username !== 'null' ? `${chat.username}` : 'Unknown'}
                  </span>
                  <span
                    style={{
                      marginRight: '4px',
                      verticalAlign: 'middle',
                      color: ' rgba(255, 255, 255, 0.6)',
                    }}
                  >
                    :
                  </span>
                  {chat.donate ? (
                    <span
                      className="message-streamer__message-item-content"
                      style={{ color: '#66cef1' }}
                    >
                      Đã gửi {chat.priceDiamond} kim cương!!!
                    </span>
                  ) : (
                    <span className="message-streamer__message-item-content">
                      {chat.message}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="message-streamer__send-message-container">
            <div className="chat-input-wrapper">
              <textarea
                maxLength={100}
                rows={1}
                placeholder={t(
                  translations['streamManagerScreen.label.sendAMessage'],
                )}
                value={mess}
                onChange={event => {
                  setMess(event.target.value);
                }}
                onKeyDown={event => {
                  if (event.key == 'Enter') {
                    sendMessage({
                      username: `${nameChannel}`,
                      message: `${mess}`,
                      urlStream: String(streamUrl),
                      donate: false,
                      priceDiamond: null,
                    });
                    // socket.sendMessage({username: });
                    // setChats([...chats, { name: 'Me: ', mess: mess }]);
                    setMess('');
                  }
                }}
              ></textarea>
            </div>
            <div className="chat-action">
              <button
                className="button-send"
                onClick={() => {
                  sendMessage({
                    username: `${nameChannel}`,
                    message: `${mess}`,
                    urlStream: String(streamUrl),
                    donate: false,
                    priceDiamond: null,
                  });
                  // setChats([...chats, { name: 'Me: ', mess: mess }]);
                  setMess('');
                }}
              >
                {t(translations['watchStreamScreen.button.label.send'])}
              </button>
            </div>
          </div>
        </div>
      </Body>
    </>
  );
}

const Body = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: #0f0f0f;
`;
const WrapperModelAceptCancelStream = styled.div`
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
interface TypeChat {
  username: string;
  message: string;
  urlStream: string;
  donate: boolean;
  priceDiamond: number | null;
}
