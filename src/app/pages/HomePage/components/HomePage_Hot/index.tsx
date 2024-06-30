import * as React from 'react';
import { useState, useEffect } from 'react';
import './HomePage_Hot.css';
export default function HomePage_Hot() {
  const imgs = [
    {
      id: 0,
      value:
        'https://img.nimo.tv/o/banner/793639E77CDC80F87AE9FF6DE041BFB9_0e0856c0c6140a9d330114b8b5708da5.jpg/w640_st1/img.jpg',
      titlelive: 'Restream hôm qua',
      nickname: 'Độ Mixi',
      typelive: 'LMHT',
      numberviewer: '1.5k',
      imgavatar:
        'https://img.nimo.tv/t/1599514158915/202105041620141250244_1599514158915_avatar.png/w240_l0/img.webp',
    },
    {
      id: 1,
      value:
        'https://img.nimo.tv/o/banner/60E5772B3C5D3CAA3EAF2341EE1044E6_d1e6b53e9fe1cc81d373977e2db84d00.jpg/w640_st1/img.jpg',
      titlelive: 'Restream',
      nickname: 'Độ Mixi',
      typelive: 'LMHT',
      numberviewer: '1.5k',
    },
    {
      id: 2,
      value:
        'https://img.nimo.tv/o/banner/14128764FFC4320DDFF3F2CA3D09A3F9_376d109debd1b77799793d57527defcc.jpg/w640_st1/img.jpg',
      titlelive: 'Restream',
      nickname: 'Độ Mixi',
      typelive: 'LMHT',
      numberviewer: '1.5k',
    },
    {
      id: 3,
      value:
        'https://web-ops.nimostatic.tv/banner/434B199E141B657FF57B4E7516C39730_06c5f92e60380bdae7e580756e769433.jpg?t=1697546040000',
      titlelive: 'Restream',
      nickname: 'Độ Mixi',
      typelive: 'LMHT',
      numberviewer: '1.5k',
    },
    {
      id: 4,
      value:
        'https://img.nimo.tv/o/banner/88534C04F16E75AFCA40CFC7F3D9C1EA_0175742ea8b3cbba4b008795f779a597.jpg/w640_st1/img.jpg',
      titlelive: 'Restream',
      nickname: 'Độ Mixi',
      typelive: 'LMHT',
      numberviewer: '1.5k',
    },
    {
      id: 5,
      value:
        'https://img.nimo.tv/o/banner/CA3F5631977DF6E53B242FCC3A566B0A_bc5720b5553d25c164385f6d4d68992c.jpg/w640_st1/img.jpg',
      titlelive: 'Restream',
      nickname: 'Độ Mixi',
      typelive: 'LMHT',
      numberviewer: '1.5k',
    },
    {
      id: 6,
      value:
        'https://img.nimo.tv/o/banner/14128764FFC4320DDFF3F2CA3D09A3F9_376d109debd1b77799793d57527defcc.jpg/w640_st1/img.jpg',
      titlelive: 'Restream',
      nickname: 'Độ Mixi',
      typelive: 'LMHT',
      numberviewer: '1.5k',
    },
    {
      id: 7,
      value:
        'https://web-ops.nimostatic.tv/banner/434B199E141B657FF57B4E7516C39730_06c5f92e60380bdae7e580756e769433.jpg?t=1697546040000',
      titlelive: 'Restream',
      nickname: 'Độ Mixi',
      typelive: 'LMHT',
      numberviewer: '1.5k',
    },
  ];

  const [sliderData, setSliderData] = useState(imgs[0]);
  const handleClick = index => {
    const slider = imgs[index];
    setSliderData(slider);
  };
  // const YourComponent = () => {
  //   useEffect(() => {
  //     const handleResize = () => {
  //       const width = window.innerWidth;
  //       const divElements = document.querySelectorAll('.wrapper div');
  //       if (width > 1440) {
  //         divElements[8].style.display = 'none';
  //         divElements[9].style.display = 'none';
  //         divElements[7].style.display = 'block';
  //         divElements[6].style.display = 'block';
  //       } else if (width > 768 && width < 1440) {
  //         divElements[6].style.display = 'none';
  //         divElements[7].style.display = 'none';
  //         divElements[8].style.display = 'none';
  //         divElements[9].style.display = 'none';
  //       }
  //     };

  //     window.addEventListener('resize', handleResize);

  //     // Cleanup the event listener when the component unmounts
  //     return () => {
  //       window.removeEventListener('resize', handleResize);
  //     };
  //   }, []);
  return (
    <>
      <div className="nimo-hot-live">
        <div className="title">
          <h2 className="n-as-fs30 ">Hot</h2>
          <div>
            <span>Thêm</span>
            <i
              className="fa-solid fa-angle-right"
              style={{ fontSize: 14, marginLeft: 5 }}
            ></i>
          </div>
        </div>
        <div className="nimo-live-many">
          {imgs.map((data, i) => (
            <span className="nimo-live-mini">
              <div className="nimo-card">
                <div className="nimo-card-cover n-as-16x9">
                  <span className="nimo-card-image ">
                    <img src={data.value} alt="" />
                  </span>
                  <span className="nimo-card-rc-tag">{data.typelive}</span>
                  <div className="nimo-rc_mask"></div>
                  <div className="nimo-icon-circle">
                    <i className="fa-solid fa-play"></i>
                  </div>
                </div>
                <div className="nimo-card-body">
                  <span className="nimo-avatar">
                    <img src={data.imgavatar} alt="" />
                  </span>
                  <div className="nimo-rc-info">
                    <span className="nimo-rc-info-title">{data.titlelive}</span>
                    <span className="nimo-rc-info-nickname">
                      {data.nickname}
                    </span>
                    <div className="n-fx-bc">
                      <div className="nimo-rc-meta-lables">
                        <span></span>
                      </div>
                      <div className="nimo-rc-numberviewrs">
                        <span className="nimo-iconviewer">
                          <i className="fa-solid fa-user-group"></i>
                        </span>
                        <span className="text">{data.numberviewer}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
