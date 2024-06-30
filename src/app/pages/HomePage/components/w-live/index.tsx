import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import './W_live.css';
export default function W_live() {
  const imgs = [
    {
      id: 0,
      value:
        'https://img.nimo.tv/o/banner/793639E77CDC80F87AE9FF6DE041BFB9_0e0856c0c6140a9d330114b8b5708da5.jpg/w640_st1/img.jpg',
    },
    {
      id: 1,
      value:
        'https://img.nimo.tv/o/banner/60E5772B3C5D3CAA3EAF2341EE1044E6_d1e6b53e9fe1cc81d373977e2db84d00.jpg/w640_st1/img.jpg',
    },
    {
      id: 2,
      value:
        'https://img.nimo.tv/o/banner/14128764FFC4320DDFF3F2CA3D09A3F9_376d109debd1b77799793d57527defcc.jpg/w640_st1/img.jpg',
    },
    {
      id: 3,
      value:
        'https://web-ops.nimostatic.tv/banner/434B199E141B657FF57B4E7516C39730_06c5f92e60380bdae7e580756e769433.jpg?t=1697546040000',
    },
    {
      id: 4,
      value:
        'https://img.nimo.tv/o/banner/88534C04F16E75AFCA40CFC7F3D9C1EA_0175742ea8b3cbba4b008795f779a597.jpg/w640_st1/img.jpg',
    },
    {
      id: 5,
      value:
        'https://img.nimo.tv/o/banner/CA3F5631977DF6E53B242FCC3A566B0A_bc5720b5553d25c164385f6d4d68992c.jpg/w640_st1/img.jpg',
    },
  ];

  const [sliderData, setSliderData] = useState(imgs[0]);
  const handleClick = index => {
    const slider = imgs[index];
    setSliderData(slider);
  };

  return (
    <>
      <div className="w n-fx-b">
        <div className="w-play n-fx0">
          <div className="video">
            <img src={sliderData.value} width="1000" height="1000" />
          </div>
          <div className="button-video"></div>
        </div>
        <div className="players">
          {imgs.map((data, i) => (
            <div className="player n-fx0" key={i}>
              <img
                className={sliderData.id == i ? 'clicked' : ''}
                src={data.value}
                onClick={() => handleClick(i)}
              />
              {/* <div className="item-mask" onClick={() => handleClick(i)}></div> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
