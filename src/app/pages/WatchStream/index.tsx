import { Hearder } from 'app/components/Header';
import { Sidebar } from 'app/components/Sidebar';

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
import './WatchStream.scss';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import bannerWatchStream from './assets/images/banner-watch-stream.jpg';
import bgWatchStream from './assets/images/background-watch-stream.jpg';
import audience from './assets/svg/user-group.svg';
import avatar1 from './assets/images/duck.jpg';

import diamond from './assets/images/diamond.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { environment } from 'app/environments/environment';
import { useDispatch, useSelector } from 'react-redux';
import { useStreamerManageSlice } from '../StreamManager/slice';
import { useParams } from 'react-router-dom';
import {
  selectorDescribeChannel,
  selectorIsStreaming,
  selectorNameChannel,
} from '../StreamManager/slice/selectors';
import { avatar } from './assets/base64/avatar';
import { useStartPeerSession } from 'hooks';
import { RemoteVideo } from 'app/components/StreamVideo';
import * as io from 'socket.io-client';
import {
  selectorDiamond,
  selectorIdUser,
} from 'app/components/Header/slice/selectors';
import { toast } from 'react-toastify';
import { useHeaderSlice } from 'app/components/Header/slice';
// import { io, SocketIOClient } from 'socket.io-client';

export function WatchStream() {
  const { t, i18n } = useTranslation();

  const urlParams = useParams();

  // Use the slice we created
  const { actions } = useStreamerManageSlice();

  // const { actionsHeader } = useHeaderSlice();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  const nameChannel = useSelector(selectorNameChannel);
  const describeChannel = useSelector(selectorDescribeChannel);
  const isStreaming = useSelector(selectorIsStreaming);

  const [valueTitle, setvalueTitle] = useState('');
  const [valueAvatar, setvalueAvatar] = useState('');
  const [valueBackgroundImage, setvalueBackgroundImage] = useState('');

  const idUser = useSelector(selectorIdUser);
  const [nameUser, setnameUser] = useState('');

  const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null);

  const [streamerIdWatch, setstreamerIdWatch] = useState();

  const diamondOfUser = useSelector(selectorDiamond);
  const [diamondUser, setdiamondUser] = useState<number>();

  const gifts = [
    {
      priceDiamond: 5,
      title: '',
      srcImg:
        'https://img.nimo.tv/o/gift/6522E85BD72E92D2266FFE8A733152CA_154c87fa7fc21470014c0fec49d6e287.png/w88_l0/img.webp',
    },
    {
      priceDiamond: 10,
      title: '',
      srcImg:
        'https://img.nimo.tv/o/gift/698D6AC50F2E12D1F7C17E1864938617_ddbfe762bb0c5ebed7bcc637311e6fbf.png/w88_l0/img.webp',
    },
    {
      priceDiamond: 15,
      title: '',
      srcImg:
        'https://img.nimo.tv/o/gift/4A875084EE8C7CDED518B49840128595_5901f03c7f05da19a4fabeb471079905.png/w88_l0/img.webp',
    },
    {
      priceDiamond: 20,
      title: '',
      srcImg:
        'https://img.nimo.tv/o/gift/F2C962920D3C5F81C1055A9DDB9C80FF_26c320338901e6205124d298956df0f1.png/w88_l0/img.webp',
    },
    {
      priceDiamond: 25,
      title: '',
      srcImg:
        'https://img.nimo.tv/o/gift/F3C2C13D67D7645114C6429D7C7D28A6_f2017791484403ec51058ffb06fa2541.png/w88_l0/img.webp',
    },
    {
      priceDiamond: 30,
      title: '',
      srcImg:
        'https://img.nimo.tv/o/gift/B612DEDF8AC9F221F689EF9C5F78483E_a3db1f94337d4a172e6d9dde73bf4079.png/w88_l0/img.webp',
    },
    {
      priceDiamond: 35,
      title: '',
      srcImg:
        'https://img.nimo.tv/o/gift/89C1CC59DEE146973030DAD68615F885_8ed1ace2adeb6a4e17b2eb67986ad8a3.png/w88_l0/img.webp',
    },
    {
      priceDiamond: 40,
      title: '',
      srcImg:
        'https://img.nimo.tv/o/gift/4712988136753AE708751C0E1A51AD9_e3461d1de515d79fc72ff43dbbeab96a.png/w88_l0/img.webp',
    },
    {
      priceDiamond: 45,
      srcImg:
        'https://img.nimo.tv/o/gift/C79CDFA42A12FEE588FA9437068FD3F7_6080ceebdd2b57385aab61d50ece3a07.png/w88_l0/img.webp',
    },
    {
      priceDiamond: 9999,
      title: '',
      srcImg:
        'https://img.nimo.tv/o/gift/B4CEDBC1007EDAFCAE6B62C04009FDA6_8a3c25c2a3c7a77a1e0f1c5aa90a13f0.png/w88_l0/img.webp',
    },
  ];

  useEffect(() => {
    setdiamondUser(diamondOfUser);
    const fetchDataLiveStream = async () => {
      try {
        const streamUrl = urlParams.urlStream;

        var resLiveStream = await axios
          .get(
            `${environment.BASEURL_BACKEND}/live-stream/get-by-url/${streamUrl}`,
          )
          .then(res => {
            console.log('res stream manage', resLiveStream);
            dispatch(actions.setNameChannel(res.data.data.streamName));
            dispatch(
              actions.setDescribeChannel(res.data.data.streamDescription),
            );
            dispatch(actions.setStreamUrl(res.data.data.streamUrl));
            setvalueTitle(res.data.data.title);
            setvalueAvatar(res.data.data.avatar);
            setvalueBackgroundImage(res.data.data.backgroundImage);
            setstreamerIdWatch(res.data.data.streamerId);
          })
          .catch(err => {
            toast.error('Lỗi: ', err);
          });
      } catch (error) {
        console.error('Error fetching data live stream:', error);
      }
    };

    const fetchDataUser = async () => {
      try {
        if (idUser) {
          const resUser = await axios
            .get(`${environment.BASEURL_BACKEND}/users/${idUser}`, {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
              },
            })
            .then(res => {
              console.log('res user', resUser);
              setnameUser(res.data.data.userName);
            })
            .catch(error => {
              toast.error('Lỗi: ' + error);
            });
        } else {
          console.error('Không có idUser:', idUser);
        }
      } catch (error) {
        console.error('Error fetching data user:', error);
      }
    };

    fetchDataLiveStream();
    fetchDataUser();
  }, []);

  useEffect(() => {
    const fetchDataUserOfStreamer = async () => {
      try {
        if (streamerIdWatch) {
          const resUserOfStremer = await axios
            .get(
              `${environment.BASEURL_BACKEND}/streamers/${streamerIdWatch}`,
              {
                headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
              },
            )
            .then(res => {
              console.log('res get user id of streamer ', res);
              setuserIdOfStreamer(res.data.data.userId);
              console.log('user id of streamer', userIdOfStreamer);
            })
            .catch(error => {
              toast.error('Lỗi: ' + error);
            });
        }
      } catch (error) {
        console.error('Error fetching data user of streamer:', error);
      }
    };
    fetchDataUserOfStreamer();
  }, [streamerIdWatch]);

  const imageUrlBanner = bannerWatchStream;
  const imageUrlBgContent = bgWatchStream;

  const styleImgBanner = {
    backgroundImage: `url(${imageUrlBanner})`,
  };
  const styleImgBgContent = {
    backgroundImage: `url(${imageUrlBgContent})`,
  };

  // const styleImgBanner = {
  //   backgroundImage: `none`,
  // };
  // const styleImgBgContent = {
  //   backgroundImage: `none`,
  // };

  const { urlStream } = useParams();
  const stream = new MediaStream();
  const { connectedUsers } = useStartPeerSession(urlStream, stream);

  const streamer: any = connectedUsers.find(
    (streamer: any) => streamer.streamUrl === urlStream,
  );
  const [mess, setMess] = useState('');
  const [chats, setChats] = useState<any>([]);

  const socketRef = React.useRef<io.SocketIOClient.Socket | null>(null);
  const connectSocket = () => {
    socketRef.current = io(`${environment.BASEURL_BACKEND}/chat`, {
      transports: ['websocket'],
    });

    socketRef.current.on(`on-message-${urlStream}`, (data: any) => {
      setChats(prevChats => [...prevChats, data]);
      console.log('Watch stream nhan chat tu server', data);
      console.log('Chats', data);
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
  }, []);

  const sendMessage = (data: TypeChat) => {
    if (socketRef.current && mess) {
      socketRef.current.emit('new-message', data);
    } else {
      toast.error('Nhập tin nhắn để gửi!!!');
    }
  };
  const sendDonate = (data: TypeChat) => {
    if (socketRef.current) {
      socketRef.current.emit('new-message', data);
    } else {
      toast.error('Lỗi gửi donate!!!');
    }
  };

  //State dùng cho donate
  const [userIdOfStreamer, setuserIdOfStreamer] = useState();

  const handleDonateStreamer = async priceGift => {
    if (Number(diamondUser) > priceGift) {
      // const newDiamond = Number(diamond) - priceGift;
      // fetchDataUserOfStreamer();
      setdiamondUser(Number(diamondUser) - priceGift);
      const bodyDonate = {
        userId: idUser,
        streamerId: streamerIdWatch,
        receiveDiamond: 'donate',
        numberDiamond: priceGift,
        userIdOfStreamer: userIdOfStreamer,
      };
      sendDonate({
        username: `${nameUser}`,
        message: '',
        urlStream: String(urlStream),
        donate: true,
        priceDiamond: priceGift,
      });
      console.log('bodyDonate', bodyDonate, diamondUser);
      axios
        .post(
          `${environment.BASEURL_BACKEND}/detail-diamond/donate`,
          bodyDonate,
        )
        .then(res => {
          console.log('res donate', res);
          // dispatch(actionsHeader.setDiamond(newDiamond));
          toast.success(
            `Bạn đã donate cho streamer ${nameChannel} thành công!!!`,
          );
        })
        .catch(error => {
          console.log('Lỗi recharge', error);
          toast.error('Lỗi: ' + error);
        });
    } else {
      toast.warning(`Bạn không đủ kim cương để donate cho streamer :((`);
    }
  };

  return (
    <>
      <Helmet>
        {nameChannel ? (
          <title>{nameChannel}</title>
        ) : (
          <title>Watch Stream</title>
        )}
      </Helmet>
      <Hearder></Hearder>
      <Body>
        <Sidebar></Sidebar>
        <div className="container-watchstream-screen">
          <div className="bg-nimo-room-watchstream" style={styleImgBgContent}>
            <div
              className="container-banner-watchstream"
              style={styleImgBanner}
            ></div>
            <div className="container-nimo-room">
              <div className="nimo-room__main__container">
                <div className="m-bt-30px">
                  <div className="nimo-room__header-player">
                    <span className="nimo-room_avatar">
                      {valueAvatar ? (
                        <img src={valueAvatar} alt="" />
                      ) : (
                        <img src={avatar} alt="" />
                      )}
                    </span>
                    <div className="nimo-room_info">
                      <div className="nimo-room_title-text">
                        {valueTitle ? (
                          <h3 className="nimo-room_title-name">{valueTitle}</h3>
                        ) : (
                          <h3 className="nimo-room_title-name">Title</h3>
                        )}
                        <div className="nimo-room_toolbar"></div>
                      </div>
                      <div className="nimo-room_sub-title">
                        {nameChannel ? (
                          <span>{nameChannel}</span>
                        ) : (
                          <span>Name Channel</span>
                        )}
                        {/* <div className="nimo-room_last-stream">
                          một giờ trước đã live stream
                        </div> */}
                        <div className="nimo-room_audience">
                          <img src={audience} alt="" />
                          <span>20,547</span>
                        </div>
                        <div className="nimo-room_followers">
                          <span>followers: 2,331,454</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="nimo-room__player">
                    {streamer && <RemoteVideo id={streamer.id} />}
                    <div className="controls"></div>
                  </div>
                  <div className="nimo-room__gift">
                    <div className="nimo-room__gift-left"></div>
                    <div className="nimo-room__gift-right">
                      <div className="nimo-room__shop-gift">
                        {/* <div className="nimo-room__gift-item">
                          <img
                            className="nimo-room__gift-item_icon"
                            src={donate2}
                            alt=""
                          />
                          <div className="watchstream-popover__gift">
                            <div className="watchstream-screen__popover__content">
                              <div className="watchstream-screen__popover-arrow"></div>
                              <div className="watchstream-popover__gift-item">
                                <div className="watchstream-popover__gift-item__label-icon">
                                  90
                                </div>
                                <DiamondIcon></DiamondIcon>
                              </div>
                            </div>
                          </div>
                        </div> */}
                        {gifts.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="nimo-room__gift-item"
                              onMouseEnter={() => setHoveredItemIndex(index)}
                              onMouseLeave={() => setHoveredItemIndex(null)}
                              onClick={() => {
                                handleDonateStreamer(item.priceDiamond);
                              }}
                            >
                              <img
                                className="nimo-room__gift-item_icon"
                                src={item.srcImg}
                                alt=""
                              />

                              <div
                                className="watchstream-popover__gift"
                                style={{
                                  display:
                                    hoveredItemIndex === index
                                      ? 'block'
                                      : 'none',
                                }}
                              >
                                <div className="watchstream-screen__popover__content">
                                  <div className="watchstream-screen__popover-arrow"></div>
                                  <div className="watchstream-popover__gift-item">
                                    <div className="watchstream-popover__gift-item__label-icon">
                                      {item.priceDiamond}
                                    </div>
                                    <DiamondIcon></DiamondIcon>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="nimo-room-anchor-info">
                  <div className="nimo-room-anchor-info__info">
                    <div className="nimo-room-anchor-info__main-info">
                      <span className="nimo-room-anchor-info__main-info-avatar">
                        {valueAvatar ? (
                          <img src={valueAvatar} alt="" />
                        ) : (
                          <img src={avatar} alt="" />
                        )}
                      </span>
                      <div className="nimo-room-anchor-info__main-info-name">
                        {nameChannel ? (
                          <span>{nameChannel}</span>
                        ) : (
                          <span>Name Channel</span>
                        )}
                        <div className="count-fan">
                          <span>fan: </span>
                          <span className="m-lr-5px">2.3m</span>
                        </div>
                      </div>
                    </div>

                    {describeChannel ? (
                      <div className="nimo-room-anchor-info__announcement">
                        {describeChannel}
                      </div>
                    ) : (
                      <div className="nimo-room-anchor-info__announcement">
                        Hello các bạn nhỏ, mình livestream rồi nè.
                      </div>
                    )}
                  </div>
                  <div className="nimo-room-anchor-info__schedule"></div>
                </div>
              </div>
              <div className="nimo-room__main__sider">
                <div className="nimo-room__main__sider-container">
                  <div className="nimo-room__sider-ranking">
                    <div className="rank-tabs-nav">
                      <div className="sider-tabs-nav-item">
                        <span>
                          {t(
                            translations[
                              'watchStreamScreen.label.contributorList'
                            ],
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="rank-item-top3">
                      <div className="rank-item">
                        <div className="rank-item-info">
                          <div className="rank-item-medal medal-top1">1</div>
                          <div className="rank-item-avatar bg-avatar-top1">
                            <span>
                              <img src={avatar1} alt="" />
                            </span>
                          </div>
                          <div className="rank-item-nickname">Top 1</div>
                        </div>
                        <div className="currency-diamond">
                          <span>5213</span>
                          <img
                            src={diamond}
                            width="14px"
                            height="14px"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="rank-item">
                        <div className="rank-item-info">
                          <div className="rank-item-medal medal-top2">2</div>
                          <div className="rank-item-avatar bg-avatar-top2">
                            <span>
                              <img src={avatar1} alt="" />
                            </span>
                          </div>
                          <div className="rank-item-nickname">Top 2</div>
                        </div>
                        <div className="currency-diamond">
                          <span>313</span>
                          <img
                            src={diamond}
                            width="14px"
                            height="14px"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="rank-item">
                        <div className="rank-item-info">
                          <div className="rank-item-medal medal-top3">3</div>
                          <div className="rank-item-avatar bg-avatar-top3">
                            <span>
                              <img src={avatar1} alt="" />
                            </span>
                          </div>
                          <div className="rank-item-nickname">Top 3</div>
                        </div>
                        <div className="currency-diamond">
                          <span>213</span>
                          <img
                            src={diamond}
                            width="14px"
                            height="14px"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="nimo-room__sider-chatroom">
                    <div className="sider-chatroom__message-list">
                      {chats.map((chat: any) => {
                        return (
                          <div className="sider-chatroom__message-item">
                            <span className="message-item__nameuser">
                              {chat.username !== 'null'
                                ? `${chat.username}`
                                : 'Unknown'}
                            </span>
                            <span
                              style={{
                                marginRight: '4px',
                                verticalAlign: 'middle',
                              }}
                            >
                              :
                            </span>
                            {chat.donate ? (
                              <span
                                className="message-item-content"
                                style={{ color: '#66cef1' }}
                              >
                                Đã gửi {chat.priceDiamond} kim cương!!!
                              </span>
                            ) : (
                              <span className="message-item-content">
                                {chat.message}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="sider-chatroom__box-send-message">
                      <div className="chat-input-wrapper">
                        <textarea
                          maxLength={100}
                          rows={1}
                          placeholder={t(
                            translations['watchStreamScreen.label.talkToMe'],
                          )}
                          value={mess}
                          onChange={event => {
                            setMess(event.target.value);
                          }}
                          onKeyDown={event => {
                            if (event.key == 'Enter') {
                              sendMessage({
                                username: `${nameUser}`,
                                message: mess,
                                urlStream: String(urlStream),
                                donate: false,
                                priceDiamond: null,
                              });
                              // socket.emit('new-message', mess);

                              // setChats([
                              //   ...chats,
                              //   { name: 'Khách', mess: mess },
                              // ]);
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
                              username: `${nameUser}`,
                              message: mess,
                              urlStream: String(urlStream),
                              donate: false,
                              priceDiamond: null,
                            });
                            // socket.emit('new-message', mess);
                            // setChats([...chats, { name: 'Khách', mess: mess }]);
                            setMess('');
                          }}
                        >
                          {t(
                            translations['watchStreamScreen.button.label.send'],
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Body>
    </>
  );
}

const Body = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  background-color: #0f0f0f;
`;
const DiamondIcon = styled.div`
  width: 16px;
  height: 16px;
  margin: 0px 0px 0px 10px;
  background-size: contain;
  background-image: url(https://www.nimo.tv/nms/images/diamond.8dbdd01106a393263de8acff21020d07.png);
`;

interface TypeChat {
  username: string;
  message: string;
  urlStream: string;
  donate: boolean;
  priceDiamond: number | null;
}
// interface TypeDonateStreamer
