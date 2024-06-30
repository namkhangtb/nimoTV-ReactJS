import * as React from 'react';
import './index.scss';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import bg1 from './assets/images/earth.jpg';
import bg2 from './assets/images/discord.jpg';
import { avatarLivePrivew } from './assets/base64/avatarLivePreview';
import userGroup from './assets/svg/user-group-1.svg';
import './index.scss';
import { backgroundImageLivePreview } from './assets/base64/backgroundImageLivePreview';
export function LivePreview({
  backgroundImage,
  avatar,
  title,
  nameStreamer,
  view,
  streamUrl,
}) {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const handleNavigateToWatchStream = () => {
    navigate(`/${streamUrl}`);
  };
  return (
    // avatar và background đang để ảnh import bên ngoài sửa lại thành base64
    <div className="live-preview-container">
      <div className="live-preview-full" onClick={handleNavigateToWatchStream}>
        {backgroundImage ? (
          <img src={backgroundImage} alt="" />
        ) : (
          <img src={backgroundImageLivePreview} alt="" />
        )}
        <div className="live-preview-bottom">
          <div className="live-preview-avatar">
            {avatar ? (
              <img src={avatar} alt="" />
            ) : (
              <img src={avatarLivePrivew} alt="" />
            )}
          </div>
          <div className="meta-info">
            <span className="live-preview-title">{title}</span>
            <span className="live-preview-name-streamer">{nameStreamer}</span>
            <div className="count-viewer">
              <div className="count-viewer-left">
                <span>PK</span>
              </div>
              <div className="count-viewer-right">
                <img src={userGroup} alt="" />
                {view ? <span>{view} k</span> : <span>0 k</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
