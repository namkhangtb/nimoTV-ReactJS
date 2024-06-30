import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Personal.css';
export function Personal_information() {
  const menu = [
    {
      id: 0,
      icon: 'nimo-icon fa-solid fa-user',
      name: 'Thông tin của tôi',
    },
    {
      id: 1,
      icon: 'nimo-icon fa-solid fa-heart',
      name: 'Theo dõi của tô',
    },
    {
      id: 2,
      icon: 'nimo-icon fa-regular fa-gem',
      name: 'Chi tiết tài khoản kim cương',
    },
  ];

  const [menuData, setmenuData] = useState(menu[0]);
  const handleClick = index => {
    const menus = menu[index];
    setmenuData(menus);
  };

  return (
    <>
      <div className="nimo-theme-dark">
        <div className="H_Container">
          <nav className="H-side-nav">
            <div>
              <h2 className="nav_title c1">Trung tâm cá nhân</h2>
              <ul>
                {menu.map((data, i) => (
                  <li
                    className={menuData.id == i ? 'selected' : ''}
                    onClick={() => handleClick(i)}
                  >
                    <a className="n-fx-sc">
                      <i className={data.icon}></i>
                      <span>{data.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* <div>
              <h2 className="nav_title c1">Tôi là streamer</h2>
              <ul>
                <li className=" ">
                  <a
                    href="//dashboard.nimo.tv/i/home?_from=profile"
                    className="n-fx-sc"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="nimo-icon nimo-icon-ic-dashboard c2"></i>
                    <span>Bảng thống kê</span>
                    <span className="nimo-icon-label nimo-icon-new c9 n-as-rnd-sm n-as-fs12 n-as-fw n-as-mrgh-xs">
                      NEW
                    </span>
                  </a>
                </li>
                <li className=" ">
                  <a
                    href="//www.nimo.tv/download/streamer-app"
                    className="n-fx-sc"
                  >
                    <i className="nimo-icon nimo-icon-ic-download c2"></i>
                    <span>Tải về các công cụ phát trực tuyến</span>
                  </a>
                </li>
              </ul>
            </div> */}
          </nav>
          <div className="H_Content"></div>
        </div>
      </div>
    </>
  );
}
