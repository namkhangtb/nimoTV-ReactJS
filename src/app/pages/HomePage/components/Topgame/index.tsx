import * as React from 'react';
import { useState, useEffect } from 'react';
import './Topgame.css';
export default function Topgame() {
  const imgs = [
    {
      id: 0,
      imggame:
        'https://img.nimo.tv/o/game/39541608D049735D83313E80462FEE4C_Mobile_Legends_136.png/l0/img.webp',
      namegame: 'Mobile Legends',
      view: '34',
    },
    {
      id: 1,
      imggame:
        'https://img.nimo.tv/o/banner/6D79A64F3CCBE3B24CAE9D15ECCD0B42_f0a84966713fd9c91cc3c6038dd9301c.jpg/l0/img.webp',
      namegame: 'NimoShow',
      view: '202',
    },
    {
      id: 2,
      imggame:
        'https://img.nimo.tv/o/banner/A22CECFCACF1E9F1D92E7645E91F0CD_0da9d6f69546e1bd7187cd1dbc27c80a.png/l0/img.webp',
      namegame: 'Liên Quân',
      view: '22',
    },
    {
      id: 3,
      imggame:
        'https://img.nimo.tv/o/banner/60D116A9C572B97442499F025124F9B2_883dda98c51547293a97d24836d79293.png/l0/img.webp',
      namegame: 'Pubg',
      view: '23',
    },
    {
      id: 4,
      imggame:
        'https://img.nimo.tv/o/banner/B9BA527CA327BF437F0958FD15437BEA_FF_136x136.jpg/l0/img.webp',
      namegame: 'Free Fire',
      view: '30',
    },
    {
      id: 5,
      imggame:
        'https://img.nimo.tv/o/game/E880B9BDAA28D8B39D7238540916C87_MC.png/l0/img.webp',
      namegame: 'Minecraft',
      view: '7',
    },
    {
      id: 6,
      imggame:
        'https://img.nimo.tv/o/game/8C8765647C857A09327FB8D9F4B33AE6_lol_136.png/l0/img.webp',
      namegame: 'LMHT',
      view: '55',
    },
  ];

  const [sliderData, setSliderData] = useState(imgs[0]);
  const handleClick = index => {
    const slider = imgs[index];
    setSliderData(slider);
  };

  return (
    <>
      <div className="nimo-hot-live">
        <div className="title">
          <h2 className="n-as-fs30 ">Trò chơi hàng đầu</h2>
          <div>
            <span>Xem tất cả</span>
            <i
              className="fa-solid fa-angle-right"
              style={{ fontSize: 14, marginLeft: 5 }}
            ></i>
          </div>
        </div>
        <div className="menu-top-game">
          {imgs.map((data, i) => (
            <div className="item-top-game">
              <span className="img-game ">
                <img src={data.imggame} alt="" />
              </span>
              <div className="name-top-game">{data.namegame}</div>
              <div className="number-lives">{data.view} lives</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
