import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import './TabLogin.scss';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import axios from 'axios';
import { environment } from 'app/environments/environment';

import iconShowPass from '../../assets/svg/eye-regular.svg';
import iconHidePass from '../../assets/svg/eye-slash-regular.svg';

import { useSelector, useDispatch } from 'react-redux';
import { useHeaderSlice } from 'app/components/Header/slice';
import {
  selectorIdUser,
  selectorIsLogged,
} from 'app/components/Header/slice/selectors';
import { toast } from 'react-toastify';

export default function TabLogin() {
  const { t, i18n } = useTranslation();
  const configToken = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };
  // Use the slice we created
  const { actions } = useHeaderSlice();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  const isLogged = useSelector(selectorIsLogged);
  const userId = useSelector(selectorIdUser);

  // Giá trị input số điện thoại
  // const regexNumberPhone = /^0\d{9}$/;
  const [valueNumberPhoneLogin, setvalueNumberPhoneLogin] = useState('');
  const changeValueNumberPhoneLogin = event => {
    console.log('new value sdt login', event.target.value);
    setvalueNumberPhoneLogin(event.target.value);
    // const isValidNumberPhone = regexNumberPhone.test(valueNumberPhoneLogin);
  };
  // Giá trị input mật khẩu
  const [valuePasswordLogin, setvaluePasswordLogin] = useState('');
  const changeValuePasswordLogin = event => {
    console.log('new value pass login', event.target.value);
    setvaluePasswordLogin(event.target.value);
  };

  // state trạng thái nút show mật khẩu
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  //Hàm đăng nhập
  const handleLogin = async () => {
    const bodyLogin = {
      phoneNumber: valueNumberPhoneLogin,
      password: valuePasswordLogin,
    };

    const loginResponse = await axios
      .post(`${environment.BASEURL_BACKEND}/auth/sign-in`, bodyLogin)
      .then(res => {
        console.log('res login', res);
        localStorage.setItem('token', res.data.access_token);
        dispatch(actions.toggleSetLogged());
        dispatch(actions.toggleModalLoginSignup(false));
        dispatch(actions.setIdUser(res.data.userInfo.userId));
        dispatch(actions.setIdStreamer(res.data.userInfo.streamerId));
        if (res.data.userInfo.streamerId !== null) {
          dispatch(actions.toggleSetIsStreamer(true));
        }
        axios
          .get(
            `${environment.BASEURL_BACKEND}/users/${res.data.userInfo.userId}`,
            {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
              },
            },
          )
          .then(res => {
            dispatch(actions.setImgAvatar(res.data.data.avatar));
            dispatch(actions.setDiamond(res.data.data.diamond));
          })
          .catch(err => toast.error('Lỗi: ' + err));
        dispatch(actions.setIdLiveStream(res.data.userInfo.liveStreamId));
        toast.success('Đăng nhập thành công');
      })
      .catch(err => {
        console.log('errr login', err);
        if (err.response.data.statusCode == 404) {
          toast.error('Số điện thoại hoặc mật khẩu sai');
        }
        if (err.response.status == 500) {
          toast.error('Lỗi server!!! Vui lòng thử lại sau.');
        }
      });
  };
  return (
    <>
      <Wrapper>
        <div className="login-tab__title">
          {t(translations['modalLoginSingup.label.loginViaMobile'])}
        </div>
        <div className="login-tab__input-container login-tab__input-phone-number-container">
          <input
            type="text"
            className="login-tab__input login-tab__input-phone-number"
            placeholder={t(
              translations['modalLoginSingup.label.enterMobieNumber'],
            )}
            onChange={changeValueNumberPhoneLogin}
          />
        </div>

        <div className="login-tab__input-container login-tab__input-password-container">
          <input
            type={passwordVisible ? 'text' : 'password'}
            className="login-tab__input login-tab__input-password"
            placeholder={t(
              translations['modalLoginSingup.label.enterPassword'],
            )}
            onChange={changeValuePasswordLogin}
          />

          <span
            className="login-tab__btn-show-pass"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? (
              <img src={iconShowPass} alt="" />
            ) : (
              <img src={iconHidePass} alt="" />
            )}
          </span>
        </div>

        <div className="login-tab__forgot-pass">
          {t(translations['modalLoginSingup.label.forgotPassword'])}
        </div>

        <button
          className="login-tab__nimo-btn login-tab__btn-login"
          onClick={handleLogin}
        >
          {t(translations['modalLoginSingup.btn.label.login'])}
        </button>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;
