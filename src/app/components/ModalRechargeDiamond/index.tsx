import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import './ModalRechargeDiamond.scss';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { useSelector, useDispatch } from 'react-redux';
import { useHeaderSlice } from '../Header/slice';

export default function ModalRechargeDiamond() {
  const { t, i18n } = useTranslation();

  // Use the slice we created
  const { actions } = useHeaderSlice();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  return (
    <>
      <Wrapper>
        <div className="modal-recharge-container">
          <div className="modal-recharge__header">
            <div className="modal-recharge__header-left">
              <div className="modal-recharge__logo-nimo">
                {t(translations['modalRecharge.label.rechargeDiamond'])}
              </div>
            </div>
            <span
              className="modal-recharge__btn-close"
              onClick={() =>
                dispatch(actions.toggleModalRechargeDiamond(false))
              }
            >
              X
            </span>
          </div>
          <div className="modal-recharge__line"></div>
          <div className="modal-recharge__body">
            <div className="modal-recharge__body-item">
              <div className="modal-recharge__body-item__title">
                {t(translations['modalRecharge.label.accBalance'])}:
              </div>
              <div className="modal-recharge__acc-balance">0</div>
              <div className="modal-recharge__acc-balance__icon"></div>
            </div>

            <div className="modal-recharge__body-item">
              <div className="modal-recharge__body-item__title">
                {t(translations['modalRecharge.label.nickName'])}:
              </div>

              <div className="modal-recharge__nickname">Namkhang</div>
            </div>

            <div className="modal-recharge__body-item">
              <div className="modal-recharge__body-item__title">
                {t(translations['modalRecharge.label.paymentMethod'])}:
              </div>
            </div>

            <div className="modal-recharge__list-payment">
              <div className="modal-recharge__item-payment">
                <div className="modal-recharge__item-payment__type-logo">
                  <img
                    src="https://article.nimo.tv/img/channel_logo/40.png"
                    alt=""
                  />
                </div>
                <div className="modal-recharge__item-payment__title">
                  {t(translations['modalRecharge.label.paypal'])}
                </div>
              </div>

              <div className="modal-recharge__item-payment">
                <div className="modal-recharge__item-payment__type-logo">
                  <img
                    src="https://article.nimo.tv/img/channel_logo/91.png"
                    alt=""
                  />
                </div>
                <div className="modal-recharge__item-payment__title">
                  {t(translations['modalRecharge.label.vtc'])}
                </div>
              </div>

              <div className="modal-recharge__item-payment">
                <div className="modal-recharge__item-payment__type-logo">
                  <img
                    src="https://article.nimo.tv/img/channel_logo/10034.png"
                    alt=""
                  />
                </div>
                <div className="modal-recharge__item-payment__title">
                  {t(translations['modalRecharge.label.nganLuongEBanking'])}
                </div>
              </div>

              <div className="modal-recharge__item-payment">
                <div className="modal-recharge__item-payment__type-logo">
                  <img
                    src="https://article.nimo.tv/img/channel_logo/10061.png"
                    alt=""
                  />
                </div>
                <div className="modal-recharge__item-payment__title">
                  {t(translations['modalRecharge.label.TheCao'])}
                </div>
              </div>
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
