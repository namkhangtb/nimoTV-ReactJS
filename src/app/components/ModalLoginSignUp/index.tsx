import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import './ModalLoginSignUp.scss';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import TabLogin from './components/TabLogin';
import TabSignUp from './components/TabSignUp';
import { useSelector, useDispatch } from 'react-redux';
import { useHeaderSlice } from '../Header/slice';

export default function ModalLoginSignUp({
  // toggleModalLoginSignup,
  handleClickSelectTab,
  tabSelected,
}) {
  const { t, i18n } = useTranslation();

  // Use the slice we created
  const { actions } = useHeaderSlice();

  // Used to dispatch slice actions
  const dispatch = useDispatch();
  //  const showModalLoginSignup = useSelector(state => state.);

  return (
    <>
      <Wrapper>
        <div className="modal-login-signup-container">
          <div className="modal-login-signup__header">
            <div className="modal-login-signup__header-left">
              <div className="modal-login-signup__logo-nimo"></div>
              <div
                className={
                  tabSelected === 0
                    ? 'modal-login-signup__btn-tab modal-login-signup__btn-tab-actived'
                    : 'modal-login-signup__btn-tab'
                }
                onClick={() => handleClickSelectTab(0)}
              >
                {t(translations['btn.login'])}
              </div>
              <div
                className={
                  tabSelected === 1
                    ? 'modal-login-signup__btn-tab modal-login-signup__btn-tab-actived'
                    : 'modal-login-signup__btn-tab'
                }
                onClick={() => handleClickSelectTab(1)}
              >
                {t(translations['btn.signup'])}
              </div>
            </div>
            <span
              className="modal-login-signup__btn-close"
              // onClick={() => toggleModalLoginSignup(false)}
              onClick={() => dispatch(actions.toggleModalLoginSignup(false))}
            >
              X
            </span>
          </div>
          <div className="modal-login-signup__line"></div>
          <div className="modal-login-signup__body">
            <div className="modal-login-signup__body-first">
              {tabSelected === 0 ? (
                <TabLogin></TabLogin>
              ) : (
                <TabSignUp></TabSignUp>
              )}
            </div>
            <div className="modal-login-signup__line-vertical"></div>
            <div className="modal-login-signup__body-second">
              <div className="modal-login-signup__third-login-title">
                {t(translations['modalLoginSingup.label.loginThirdParty'])}
              </div>
              <div className="modal-login-signup__third-login-item">
                <div className="modal-login-signup__third-login-item__icon icon-bg-fb"></div>
                Facebook
              </div>
              <div className="modal-login-signup__third-login-item">
                <div className="modal-login-signup__third-login-item__icon icon-bg-google"></div>
                Google
              </div>
              <div className="modal-login-signup__third-login-item">
                <div className="modal-login-signup__third-login-item__icon icon-bg-twitter"></div>
                Twitter
              </div>
              <div className="modal-login-signup__third-login-item">
                <div className="modal-login-signup__third-login-item__icon icon-bg-line"></div>
                Line
              </div>
              {tabSelected === 0 ? (
                <div className="modal-login-signup__body-second__foot">
                  {t(translations['modalLoginSingup.label.loginIsAgree'])}&nbsp;
                  <a href="">
                    {t(translations['modalLoginSingup.label.terms'])}
                  </a>
                  &nbsp;
                  {t(translations['modalLoginSingup.label.and'])}&nbsp;
                  <a href="">
                    {t(translations['modalLoginSingup.label.privacyPolicy'])}
                  </a>
                </div>
              ) : (
                <div className="modal-login-signup__body-second__foot">
                  {t(translations['modalLoginSingup.label.signupIsAgree'])}
                  &nbsp;
                  <a href="">
                    {t(translations['modalLoginSingup.label.terms'])}
                  </a>
                  &nbsp;
                  {t(translations['modalLoginSingup.label.and'])}&nbsp;
                  <a href="">
                    {t(translations['modalLoginSingup.label.privacyPolicy'])}
                  </a>
                </div>
              )}
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
