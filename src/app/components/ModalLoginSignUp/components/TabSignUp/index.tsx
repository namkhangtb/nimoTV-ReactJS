import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import './TabSignUp.scss';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import iconShowPass from '../../assets/svg/eye-regular.svg';
import iconHidePass from '../../assets/svg/eye-slash-regular.svg';
import { environment } from 'app/environments/environment';
import axios from 'axios';
import { useHeaderSlice } from 'app/components/Header/slice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
export default function TabSignUp() {
  const { t, i18n } = useTranslation();

  // Use the slice we created
  const { actions } = useHeaderSlice();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  // Giá trị input số điện thoại
  const regexNumberPhone = /^0\d{9}$/;
  const [isValidNumberPhone, setisValidNumberPhone] = useState(false);
  const [valueNumberPhoneSignup, setvalueNumberPhoneSignup] = useState('');
  const changeValueNumberPhoneSignup = event => {
    console.log('new value sdt login', event.target.value);
    setvalueNumberPhoneSignup(event.target.value);
    setisValidNumberPhone(regexNumberPhone.test(event.target.value));
    console.log(
      'new value number phone signup',
      event.target.value,
      isValidNumberPhone,
    );
  };

  // Giá trị input mật khẩu
  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
  const [isValidPassword, setisValidPassword] = useState(false);
  const [valuePasswordSignup, setvaluePasswordSignup] = useState('');
  const changeValuePasswordSignup = event => {
    setvaluePasswordSignup(event.target.value);
    setisValidPassword(regexPassword.test(event.target.value));
    console.log('new value pass signup', event.target.value, isValidPassword);
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignup = () => {
    const bodyLogin = {
      phoneNumber: valueNumberPhoneSignup,
      password: valuePasswordSignup,
      email: null,
    };

    if (isValidPassword && isValidNumberPhone) {
      axios
        .post(`${environment.BASEURL_BACKEND}/auth/sign-up`, bodyLogin)
        .then(res => {
          console.log('res sign', res);
          localStorage.setItem('token', res.data.access_token);
          dispatch(actions.toggleSetLogged());
          dispatch(actions.toggleModalLoginSignup(false));
          dispatch(actions.setIdUser(res.data.userInfo.userId));
          const configToken = {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          };
          axios
            .get(
              `${environment.BASEURL_BACKEND}/users/${res.data.userInfo.userId}`,
              configToken,
            )
            .then(res => {
              dispatch(actions.setImgAvatar(res.data.data.avatar));
            })
            .catch(err => toast.error('Lỗi: ' + err));
          toast.success('Đăng ký thành công');
        })
        .catch(err => {
          console.log('errr sign', err);
          if (err.response.data.statusCode == 403) {
            toast.error('Tài khoản đã tồn tại');
          }
          if (err.response.status == 500) {
            toast.error('Lỗi server!!! Vui lòng thử lại sau.');
          }
        });
    } else {
      console.log('lối regex');
      toast.error(
        'Lỗi định dạng số điện thoại hoặc mật khẩu. Vui lòng nhập lại!!!',
      );
    }
  };
  return (
    <>
      <Wrapper>
        <div className="signup-tab__title">
          {t(translations['modalLoginSingup.label.registerViaMobile'])}
        </div>
        <div className="signup-tab__input-container signup-tab__input-phone-number-container">
          <input
            type="text"
            className="signup-tab__input signup-tab__input-phone-number"
            placeholder={t(
              translations['modalLoginSingup.label.enterMobieNumber'],
            )}
            onChange={changeValueNumberPhoneSignup}
          />
        </div>

        <div className="signup-tab__input-container signup-tab__input-password-container">
          <input
            type={passwordVisible ? 'text' : 'password'}
            className="signup-tab__input signup-tab__input-password"
            placeholder={t(
              translations['modalLoginSingup.label.enterPassword'],
            )}
            onChange={changeValuePasswordSignup}
          />

          <span
            className="signup-tab__btn-show-pass"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? (
              <img src={iconShowPass} alt="" />
            ) : (
              <img src={iconHidePass} alt="" />
            )}
          </span>
        </div>

        <div
          className="signup-tab__title-password-rules"
          style={
            !isValidPassword
              ? { color: 'red' }
              : { color: 'rgba(255, 255, 255, 0.4)' }
          }
        >
          {t(translations['modalLoginSingup.label.passwordRules'])}
        </div>

        <button
          className="signup-tab__nimo-btn signup-tab__btn-signup"
          onClick={handleSignup}
        >
          {t(translations['modalLoginSingup.btn.label.signup'])}
        </button>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;
