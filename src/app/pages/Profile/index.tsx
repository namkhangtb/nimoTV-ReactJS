import { Hearder } from 'app/components/Header';
import { SidebarInfo } from 'app/components/SidebarInfo';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
import './index.scss';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { useEffect, useState } from 'react';
import { useHeaderSlice } from 'app/components/Header/slice';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectorDiamond,
  selectorIdUser,
} from 'app/components/Header/slice/selectors';
import axios from 'axios';
import { environment } from 'app/environments/environment';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { PaypalComponent } from 'app/components/PaypalComponent';
import { PayPalButton } from 'react-paypal-button-v2';

export function Profile() {
  // const [sdkReady, setSdkReady] = useState(false);
  // const addPaypalScript = async () => {
  //   const script = document.createElement('script');
  //   script.type = 'text/javascript';
  //   script.src = `https://www.paypal.com/sdk/js?currency=USD&client-id=${environment.CLIENT_ID}`;
  //   script.async = true;
  //   script.onload = () => {
  //     setSdkReady(true);
  //   };
  //   document.body.appendChild(script);
  // };

  // useEffect(() => {
  //   if (!window.paypal) {
  //     console.log('window', window);
  //     addPaypalScript();
  //   } else {
  //     console.log('window ???', window);
  //     setSdkReady(true);
  //   }
  // }, []);

  // const [hiddenPaypalButtonReady, sethiddenPaypalButtonReady] = useState(false);
  // const hiddenPaypalButtonSecond = async () => {
  //   const doc = document.getElementsByClassName('.paypal-buttons');
  //   // const doc = document.getElementById(
  //   //   'zoid-paypal-buttons-uid_d66424f09f_mtm6ntq6mdk',
  //   // );
  //   console.log(doc);
  //   // if (doc) {
  //   //   const paypalButtons = doc as HTMLElement;
  //   //   paypalButtons.style.display = 'none';
  //   if (doc.length > 0) {
  //     const paypalButtons = doc[1] as HTMLElement;
  //     paypalButtons.style.display = 'none';
  //   } else {
  //     console.error("Không tìm thấy phần tử có class là 'paypal-buttons'");
  //   }
  // };

  // useEffect(() => {
  //   if (!hiddenPaypalButtonReady) {
  //     hiddenPaypalButtonSecond();
  //     sethiddenPaypalButtonReady(true);
  //   } else {
  //     console.log('chưa hidden');
  //   }
  // }, [hiddenPaypalButtonReady]);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = React.useState(false);
  const [price, setPrice] = React.useState(65);
  const [moneyUsd, setmoneyUsd] = React.useState(0.99);
  const [paymentModal, setPaymentModal] = React.useState(false);

  const { actions } = useHeaderSlice();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  const userId = useSelector(selectorIdUser);
  const diamond = useSelector(selectorDiamond);

  const prices = [
    { money: 0.99, diamond: 65 },
    { money: 1.99, diamond: 162 },
    { money: 9.99, diamond: 935 },
    { money: 49.99, diamond: 4799 },
    { money: 99.99, diamond: 9629 },
    { money: 199.99, diamond: 19289 },
    { money: 299.99, diamond: 28949 },
  ];
  // const prices = [
  //   { money: 20000, diamond: 65 },
  //   { money: 40000, diamond: 162 },
  //   { money: 200000, diamond: 935 },
  //   { money: 1000000, diamond: 4799 },
  //   { money: 2000000, diamond: 9629 },
  //   { money: 4000000, diamond: 19289 },
  //   { money: 6000000, diamond: 28949 },
  // ];

  interface InfoUserItem {
    avatar: string;
    dateOfBirth: string | Date;
    diamond: number;
    email: string;
    isActive: number;
    phoneNumber: string;
    role: string;
    userId: number;
    userName: string;
    gender: string;
  }
  const [dataUser, setdataUser] = useState<InfoUserItem>();

  const base64Avatar =
    'data:image/png;base64,UklGRrIEAABXRUJQVlA4IKYEAAAwGgCdASp4AHgAPm0ylEckIyIhLJKZOIANiUAaa8d4E/3vlKelJJz5nil9O7zAfrx60nog/zfqAf4DqAPQA8tr2ZPKwexHbAXGy5NIu0AW6Cz7Bbivf53/uFKewXYgnJL9uCBNv67YWSofLCNHd75SnNoTYRYZ7a45VMJNuxcBaddRQDKnvx7fCBEMruBYaGj5DwGqkgYZGVEE5JHn4opJxvzEdhYXw+EVhmY9pCyLd28JAAgJNBR1nXNuYEKwZb+yJEBono1pc6cct/ix6wnaf9pxdm7rsAvKQAD++rk+5VDClFEB/NJUMg6DP2zVtc9DFBA8GNUBRXx3Nf80x3XdKTLouyt2/fsu0CU2xT99at1d2Y296PyqD9zZgbhVmiBvXxhDqM9jdUa91Me+HvzRqgyad36fSZGEg7u5cBY56U5vQtkF+9Ht+fzT9qSBJcSWQLSZ0fPEY1xRhDltUddHn1HXXF19wX3nNMzzoOP+cSMNqtX3DlL0Rf7wjBLk6/megAh3fWYq5hKeuEumr4Rl0ddnUfpTHumB2vsvLAmMZnvi43iiiLcKR0DMIlTlB5HmRNu95y+H6gyQz8/8bvV650agJQJmKp3iu+esb8vBla4BWoFPHQJV8e8hgrl2mhP5a7YnLarNIOsZZfHmrP9g25tP24d3d65S6Fdhr7pWT3B4rxYFHVB5DIbwwzv774+09SswPPOzAol3OmIRaDgKh0EuwqYUKZpELPoi2VvpsajPB4DYYJGV9vWva3diSTrllrc2AUrQsM65OfaCcsqsqz/LqnzgYipRDHRWnt6E+MbRI/cBSW7cYG/C+NUb5d3Z9fM8d9+IhO2SWkXYYdypxCgxNutKC2TaFkarOjAAsP/tYdB3/SeykpLEkDfTXeCVknnXJkyuYNCfd9gZjG1RRHePNoG3STaxumxXUKJ74CzESNl4AJC/uj7mpDX6/6NlCMb8B/2gP8ncwHwcvh8StJ78xvIak2v3HPbT9nkYiae/xH6Ym3d62ES0taoJvU4heLbHch6H2rdzjq5q/B8of8IyqrNuLmKXyQHlEbeppuCoY9RbTCxIQPCXEm/NxQDe+sbZ+noR9I3C57MGTgiw2Dc2NBreLqqTOXcwLFLU+vUC0bwf3zwJ2QmJXbSsjmKisdRebzSPe7P2n4y+947RcwuHVZVqYyVVQVeqTfj9oTGJ1BfB4ak/ZFCBnKLIwxfClaOfjnMD1KkKIkOGWr4YDIKLdzc7gU6RjWDXXnzck8PGk68AkvR75sBjCmmR9YoKZG6BeHF0pn9xIW4AArkqoX/neV4KKGW5kI/hanfO3rjIDwB9C1tPAuygxYk+8Wkf9EOevmE4sdGO8V/InPVmAtzr2a3gaumzkT56yPm6L5Jemkjg9ta5LS6YbUeGvbN0JeJ/LFV+ih1O6UY+oaw9NyZ+AIZB9LQy/pyweTDszs3GhI5Qk0CSEh9OiyS/9Ga/kP2ZNIX7LJAdenfSWtltSTs1ABmFlW2NnNnkChdhaI45FzI0YpUDWBvZP60wv1uZe7lYssVG3grNSP7yJWPppT1kn2AhZjfDhNm4u6P4AH3ysAAAAA==';

  const [isEditAvatar, setisEditAvatar] = useState(false);
  const toggleEditAvatar = () => {
    setisEditAvatar(!isEditAvatar);
  };
  const [isNickName, setisNickName] = useState(false);
  const toggleNickName = () => {
    setisNickName(!isNickName);
  };
  const [isGender, setisGender] = useState(false);
  const toggleGender = () => {
    setisGender(!isGender);
  };
  const [isBirthDay, setisBirthDay] = useState(false);
  const toggleBirthDay = () => {
    setisBirthDay(!isBirthDay);
  };

  const [isPaypalPayment, setisPaypalPayment] = useState(false);
  const togglePaypalPayment = () => {
    setisPaypalPayment(!isPaypalPayment);
  };

  const [isVnpayPayment, setisVnpayPayment] = useState(false);
  const toggleVnpayPayment = () => {
    setisVnpayPayment(!isVnpayPayment);
  };

  const [imageBase64, setImageBase64] = useState<string | undefined>(undefined);
  const fileAvatarSelectedHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Kiểm tra reader.result có phải là string không
        if (typeof reader.result === 'string') {
          // Nếu là string, cập nhật state imageBase64
          setImageBase64(reader.result);
        }
      };

      // Đọc nội dung của file hình ảnh dưới dạng base64
      reader.readAsDataURL(file);
      console.log('fdfadfaf', file);
      console.log('báe64', imageBase64);
    }
  };

  const [valueNickName, setvalueNickName] = useState('');
  const changeValueNickName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setvalueNickName(event.target.value);
    console.log('gender', event.target.value);
  };

  const [selectedOptionGender, setselectedOptionGender] = useState('');
  const handleOptionChangeGender = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setselectedOptionGender(event.target.value);
    console.log('gender', event.target.value);
  };

  const [valueBirthDay, setvalueBirthDay] = useState('');
  const changeValueBirthDay = (event: React.ChangeEvent<HTMLInputElement>) => {
    setvalueBirthDay(event.target.value);
    console.log('birth day', event, event.target.value);
  };

  const [valueDiamond, setvalueDiamond] = useState(0);

  const formatDateString = input => {
    const date = new Date(input);
    // Lấy ngày, tháng và năm
    const day = date.getDate() + 1;
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    // Định dạng lại chuỗi ngày tháng
    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${
      day < 10 ? '0' : ''
    }${day}`;

    return formattedDate;
  };

  const unformatDateString = formattedString => {
    // Tách ngày, tháng và năm từ chuỗi định dạng
    const [yearPart, monthPart, dayPart] = formattedString.split('-');

    // Chuyển đổi các phần thành số nguyên
    const year = parseInt(yearPart, 10);
    const month = parseInt(monthPart, 10) - 1; // Trừ 1 vì tháng bắt đầu từ 0 trong đối tượng Date
    const day = parseInt(dayPart, 10);

    // Tạo đối tượng Date từ thông tin trích xuất
    const unformattedDate = new Date(year, month, day);

    return unformattedDate;
  };
  const [valueDateFormatted, setvalueDateFormatted] = useState('');

  useEffect(() => {
    const idUser = userId;
    console.log('id', idUser);

    if (idUser) {
      axios
        .get(`${environment.BASEURL_BACKEND}/users/${idUser}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then(res => {
          console.log(res);
          setdataUser(res.data.data);
          setvalueDateFormatted(formatDateString(res.data.data?.dateOfBirth));

          setvalueNickName(res.data.data?.userName);
          setvalueBirthDay(res.data.data?.dateOfBirth);
          setselectedOptionGender(res.data.data?.gender);
          setImageBase64(res.data.data?.avatar);

          // setvalueDiamond(res.data.data?.diamond);
          dispatch(actions.setDiamond(res.data.data?.diamond));

          console.log(valueDateFormatted);

          console.log('???', dataUser);
        })
        .catch(err => {
          toast.error('Lỗi: ' + err);
        });
    } else {
      navigate('/');
    }
  }, []);
  let body = {
    email: dataUser?.email,
    userName: dataUser?.userName,
    avatar: dataUser?.avatar,
    diamond: dataUser?.diamond,
    dateOfBirth: dataUser?.dateOfBirth,
    gender: dataUser?.gender,
  };
  const handleEditInfoUser = () => {
    const idUser = userId;
    if (valueNickName !== dataUser?.userName) {
      body.userName = valueNickName;
    }
    if (imageBase64 !== dataUser?.avatar) {
      body.avatar = imageBase64;
    }
    if (valueBirthDay !== dataUser?.dateOfBirth) {
      body.dateOfBirth = unformatDateString(valueBirthDay);
    }
    if (selectedOptionGender !== dataUser?.gender) {
      body.gender = selectedOptionGender;
    }

    console.log(body);

    console.log('token ?????', localStorage.getItem('token'));

    axios
      .put(`${environment.BASEURL_BACKEND}/users/${idUser}`, body, {
        headers: {
          // Authorization: 'Bearer ' + localStorage.getItem('token'),
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then(res => {
        console.log('res update', res);
        setdataUser(res.data.data);
        setvalueDateFormatted(formatDateString(res.data.data?.dateOfBirth));

        setisEditAvatar(false);
        setisNickName(false);
        setisGender(false);
        setisBirthDay(false);

        toast.success('Cập nhật thông tin mới của người dùng thành công');
        console.log('new ???', dataUser);
      })
      .catch(err => {
        toast.error('Lỗi: ' + err);
      });
  };

  const handleEditInfoUserCancel = () => {
    body = {
      email: dataUser?.email,
      userName: dataUser?.userName,
      avatar: dataUser?.avatar,
      diamond: dataUser?.diamond,
      dateOfBirth: dataUser?.dateOfBirth,
      gender: dataUser?.gender,
    };
    console.log('body cancel', body);
  };

  const onSuccesPaypal = (details, data) => {
    console.log('onsucces pâypl', details, data);
    const newDiamond = Number(diamond) + price;
    const bodyRecharge = {
      userId: userId,
      diamond: price,
      // numberDiamond: price,
      paymentMethod: 'paypal',
    };
    console.log('recharge body', bodyRecharge);

    // OPTIONAL: Call your server to save the transaction
    return axios
      .post(
        `${environment.BASEURL_BACKEND}/detail-diamond/recharge-diamond`,
        bodyRecharge,
      )
      .then(res => {
        console.log('res recharge', res);
        dispatch(actions.setDiamond(newDiamond));
        toast.success(
          'Bạn đã thanh toán nạp kim cương thành công từ tài khoản Paypal của ' +
            details.payer.name.given_name,
        );
        toast.success(
          `Nạp thêm ${price} kim cương vào tài khoản thành công!!!`,
        );
      })
      .catch(error => {
        console.log('Lỗi recharge', error);
        toast.error('Lỗi: ' + error);
      });
    // return fetch(`${environment.BASEURL_BACKEND}/detail-diamond/recharge-`, {
    //   method: 'post',
    //   body: JSON.stringify(body),
    // })
    //   .then(res => {
    //     console.log('res recharge', res);
    //     dispatch(actions.setDiamond(newDiamond));
    //     toast.success(
    //       `Nạp thêm ${price} kim cương vào tài khoản thành công!!!`,
    //     );
    //   })
    //   .catch(error => {
    //     console.log('Lỗi recharge', error);
    //     toast.error('Lỗi: ' + error);
    //   });
  };

  return (
    <>
      <Helmet>
        <title>Info User</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Hearder></Hearder>
      <Body>
        <SidebarInfo></SidebarInfo>
        <div className="profile-screen-container">
          <InfoContent className="align-items-center">
            {/* <Avatar></Avatar> */}
            <div className="profile-screen__avatar-container">
              <img src={dataUser?.avatar} alt="" />
            </div>
            {isEditAvatar ? (
              <>
                <input
                  type="file"
                  className="edit-info-user__nimo-btn edit-info-user__input-upload-avatar"
                  onChange={fileAvatarSelectedHandler}
                />
                <button
                  className="edit-info-user__nimo-btn edit-info-user__btn-save"
                  onClick={handleEditInfoUser}
                >
                  {t(translations['btn.save'])}
                </button>
                <button
                  className="edit-info-user__nimo-btn edit-info-user__btn-cancel"
                  onClick={() => {
                    toggleEditAvatar();
                    handleEditInfoUserCancel();
                  }}
                >
                  {t(translations['btn.cancel'])}
                </button>
              </>
            ) : (
              <EditIcon
                style={{ marginLeft: '20px' }}
                onClick={toggleEditAvatar}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  width="20"
                  viewBox="0 0 512 512"
                  style={{ color: 'hsla(0, 0%, 100%, 0.6)' }}
                >
                  <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                </svg>
              </EditIcon>
            )}
          </InfoContent>

          <InfoContent>
            <InfoLabel>{t(translations['profile.label.id'])}:</InfoLabel>
            <InfoData>{dataUser?.userId}</InfoData>
            {/* <EditIcon>
              <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512" style={{ color: 'hsla(0, 0%, 100%, 0.6)' }}>
                <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
              </svg>
            </EditIcon> */}
          </InfoContent>
          <InfoContent>
            <InfoLabel>{t(translations['profile.label.nickName'])}:</InfoLabel>
            {isNickName ? (
              <>
                <div className="edit-info-user__input-container">
                  <input
                    type="text"
                    className="edit-info-user__input"
                    onChange={changeValueNickName}
                  />
                </div>
                <button
                  className="edit-info-user__nimo-btn edit-info-user__btn-save"
                  onClick={handleEditInfoUser}
                >
                  {t(translations['btn.save'])}
                </button>
                <button
                  className="edit-info-user__nimo-btn edit-info-user__btn-cancel"
                  onClick={() => {
                    toggleNickName();
                    handleEditInfoUserCancel();
                  }}
                >
                  {t(translations['btn.cancel'])}
                </button>
              </>
            ) : (
              <>
                <InfoData>{dataUser?.userName}</InfoData>
                <EditIcon onClick={toggleNickName}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    width="20"
                    viewBox="0 0 512 512"
                    style={{ color: 'hsla(0, 0%, 100%, 0.6)' }}
                  >
                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                  </svg>
                </EditIcon>
              </>
            )}
          </InfoContent>
          <InfoContent>
            {isGender ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <InfoLabel style={{ lineHeight: '40px' }}>
                  {t(translations['profile.label.gender'])}:
                </InfoLabel>
                {/* <div className="edit-info-user__input-container">
                  <input type="radio" className="edit-info-user__input" />
                </div> */}
                <label style={{ margin: '0 10px', color: '#fff' }}>
                  <input
                    style={{ margin: '0 5px' }}
                    name="gender"
                    type="radio"
                    value="Nam"
                    onChange={handleOptionChangeGender}
                  />
                  {t(translations['profile.label.male'])}
                </label>

                <label style={{ margin: '0 10px', color: '#fff' }}>
                  <input
                    style={{ margin: '0 5px' }}
                    name="gender"
                    type="radio"
                    value="Nữ"
                    onChange={handleOptionChangeGender}
                  />
                  {t(translations['profile.label.female'])}
                </label>
                <button
                  className="edit-info-user__nimo-btn edit-info-user__btn-save"
                  onClick={handleEditInfoUser}
                >
                  {t(translations['btn.save'])}
                </button>
                <button
                  className="edit-info-user__nimo-btn edit-info-user__btn-cancel"
                  onClick={() => {
                    toggleGender();
                    handleEditInfoUserCancel();
                  }}
                >
                  {t(translations['btn.cancel'])}
                </button>
              </div>
            ) : (
              <>
                <InfoLabel>
                  {t(translations['profile.label.gender'])}:
                </InfoLabel>
                <InfoData>{dataUser?.gender}</InfoData>
                <EditIcon onClick={toggleGender}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    width="20"
                    viewBox="0 0 512 512"
                    style={{ color: 'hsla(0, 0%, 100%, 0.6)' }}
                  >
                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                  </svg>
                </EditIcon>
              </>
            )}
          </InfoContent>
          <InfoContent>
            <InfoLabel></InfoLabel>

            {isBirthDay ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <InfoLabel style={{ lineHeight: '40px' }}>
                  {t(translations['profile.label.birthday'])}:
                </InfoLabel>

                <input
                  style={{ margin: '0 5px', lineHeight: '34px' }}
                  type="date"
                  onChange={changeValueBirthDay}
                />

                <button
                  className="edit-info-user__nimo-btn edit-info-user__btn-save"
                  onClick={handleEditInfoUser}
                >
                  {t(translations['btn.save'])}
                </button>
                <button
                  className="edit-info-user__nimo-btn edit-info-user__btn-cancel"
                  onClick={() => {
                    toggleBirthDay();
                    handleEditInfoUserCancel();
                  }}
                >
                  {t(translations['btn.cancel'])}
                </button>
              </div>
            ) : (
              <>
                <InfoLabel>
                  {t(translations['profile.label.birthday'])}:
                </InfoLabel>
                <InfoData>{valueDateFormatted}</InfoData>
                <EditIcon onClick={toggleBirthDay}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    width="20"
                    viewBox="0 0 512 512"
                    style={{ color: 'hsla(0, 0%, 100%, 0.6)' }}
                  >
                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                  </svg>
                </EditIcon>
              </>
            )}
          </InfoContent>
          <InfoContent>
            <InfoLabel>{t(translations['profile.label.cellPhone'])}:</InfoLabel>
            <InfoData>{dataUser?.phoneNumber}</InfoData>
          </InfoContent>
          <InfoContent className="align-items-center">
            <DiamondIcon />{' '}
            <span style={{ color: '#0af', fontSize: '20px' }}>{diamond}</span>
            <DiamondBtn
              className="diamond-btn"
              onClick={() => {
                setPaymentModal(true);
              }}
            >
              Diamond Top-Up
            </DiamondBtn>
          </InfoContent>
        </div>
        {paymentModal && (
          <PaymentModal>
            <PaymentContent style={{ margin: '15px 0' }}>
              <PaymentLabel>
                {t(translations['profile.label.accountBalance'])}:
              </PaymentLabel>
              <InfoData style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                  <span style={{ color: '#55aeff', fontSize: 20 }}>
                    {dataUser?.diamond}
                  </span>
                </div>
                <DiamondIcon style={{ width: 20, height: 20, margin: 5 }} />
              </InfoData>
            </PaymentContent>
            <PaymentContent style={{ marginBottom: 15 }}>
              <PaymentLabel>
                {t(translations['profile.label.nickName'])}:
              </PaymentLabel>
              <InfoData>{dataUser?.userName}</InfoData>
            </PaymentContent>
            <PaymentContent style={{ marginBottom: 15 }}>
              <PaymentLabel>
                {t(translations['profile.label.paymentMethod'])}:
              </PaymentLabel>
            </PaymentContent>
            <ListPaymentMethod>
              <PaymentMethod
                className={
                  paymentMethod
                    ? 'payment-method selected-method'
                    : 'payment-method'
                }
                onClick={() => {
                  setPaymentMethod(true);
                  setisPaypalPayment(true);
                  // hiddenPaypalButtonSecond();
                }}
              >
                <LogoMethod />
                <LabelMethod className={paymentMethod ? 'selected-method' : ''}>
                  PayPal
                </LabelMethod>
              </PaymentMethod>
              {/* <PaymentMethod
                className={paymentMethod ? 'payment-method selected-method' : 'payment-method'}
                onClick={() => {
                  setPaymentMethod(true);
                  setisPaypalPayment(true);
                }}
              >
                <LogoMethodVNPAY />
                <LabelMethod className={paymentMethod ? 'selected-method' : ''}>VNPAY</LabelMethod>
              </PaymentMethod> */}
            </ListPaymentMethod>
            <div
              style={{
                width: '100%',
                margin: '30px 0px',
                border: '1px solid hsla(0,0%,100%,.1)',
              }}
            ></div>
            {paymentMethod && (
              <SelectPrice>
                <LabelSelect>
                  {t(translations['profile.label.amountMoney'])}:
                </LabelSelect>
                <ListPrice>
                  {prices.map((_price: any) => {
                    return (
                      <Price
                        className={
                          price === Number(_price.diamond)
                            ? 'payment-method selected-method'
                            : 'payment-method'
                        }
                        onClick={() => {
                          setPrice(_price.diamond);
                          setmoneyUsd(_price.money);
                          // hiddenPaypalButtonSecond();
                        }}
                      >
                        {_price.money} USD
                      </Price>
                    );
                  })}
                </ListPrice>
                <PriceContent>
                  {t(translations['profile.content_1'])}
                </PriceContent>
                <div style={{ marginBottom: 30, marginTop: 30 }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                      style={{
                        color: 'hsla(0,0%,100%,.6)',
                        marginBottom: 5,
                        marginRight: 10,
                      }}
                    >
                      {t(translations['profile.label.amountMoney'])}:
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ color: '#55aeff', fontSize: 20 }}>
                        {price}
                      </div>
                      <div
                        style={{
                          backgroundImage:
                            'url(https://www.nimo.tv/nms/images/diamond.8dbdd01106a393263de8acff21020d07.png)',
                          width: 16,
                          height: 16,
                          backgroundSize: 'contain',
                          margin: '0px 5px',
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </SelectPrice>
            )}

            {isPaypalPayment ? (
              // <PaypalComponent></PaypalComponent>
              <PayPalButton
                amount={moneyUsd}
                currency="USD"
                // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                onSuccess={onSuccesPaypal}
              />
            ) : (
              <ConfirmButton>
                {t(translations['profile.btn.confirm'])}
              </ConfirmButton>
            )}
            {/* <ConfirmButton>{t(translations['profile.btn.confirm'])}</ConfirmButton> */}
            <CloseBtn
              className="close-btn"
              onClick={() => {
                setPaymentModal(false);
                setPaymentMethod(false);
                setPrice(65);
                setisPaypalPayment(false);
              }}
            >
              X
            </CloseBtn>
            {/* {paymentMethod && <Paypal />} */}
          </PaymentModal>
        )}
      </Body>
    </>
  );
}

const Body = styled.div`
  height: calc(100vh - 60px);
  display: flex;
  position: relative;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  background-image: url(https://img.nimo.tv/t/default_avatar_st1.png/w120_l0/img.webp);
  border-radius: 50%;
`;

const InfoContent = styled.div`
  display: flex;
  margin-top: 18px;
`;

const InfoLabel = styled.div`
  color: hsla(0, 0%, 100%, 0.4);
  font-size: 14px;
  line-height: 30px;
`;
const InfoData = styled.div`
  color: hsla(0, 0%, 100%, 0.6);
  font-size: 14px;
  line-height: 30px;
  margin: 0 10px;
`;
const EditIcon = styled.div`
  cursor: pointer;
`;

const DiamondIcon = styled.div`
  width: 30px;
  height: 30px;
  margin: 0px 10px;
  background-size: contain;
  background-image: url(https://www.nimo.tv/nms/images/diamond.8dbdd01106a393263de8acff21020d07.png);
`;

const DiamondBtn = styled.div`
  width: 200px;
  background-color: #ffc000;
  cursor: pointer;
  text-align: center;
  line-height: 45px;
  margin-left: 10px;
  border-radius: 4px;
`;

const PaymentModal = styled.div`
  width: 750px;
  height: fit-content;
  max-height: 500px;
  overflow-y: scroll;
  margin: auto;
  top: 50px;
  left: 0;
  right: 0;
  position: absolute;
  background-color: rgb(35, 35, 35);
  border-radius: 12px;
  padding: 30px 40px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #464646;
    border-radius: 8px;
  }
`;

const PaymentContent = styled.div`
  display: flex;
`;

const PaymentLabel = styled.div`
  font-size: 14px;
  line-height: 30px;
  color: #fff;
`;

const ListPaymentMethod = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PaymentMethod = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 80px;
  border-radius: 4px;
  border: 1px solid #505050;
  cursor: pointer;
  margin: 0 5px;
`;

const LogoMethod = styled.div`
  width: 100px;
  height: 30px;
  background-size: contain;
  background-image: url(https://article.nimo.tv/img/channel_logo/40.png);
  margin-bottom: 10px;
`;

const LogoMethodVNPAY = styled.div`
  width: 100px;
  height: 30px;
  background-size: contain;
  background-image: url(https://vnpay.vn/assets/images/logo-icon/logo-primary.svg);
  margin-bottom: 10px;
`;

const LabelMethod = styled.div`
  font-size: 13px;
  color: hsla(0, 0%, 100%, 0.6);
`;

const SelectPrice = styled.div`
  padding-top: 30px;
`;

const LabelSelect = styled.div`
  font-size: 14px;
  line-height: 30px;
  color: #fff;
`;

const ListPrice = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
`;

const Price = styled.div`
  width: 200px;
  padding: 9px 10px;
  text-align: center;
  font-size: 16px;
  line-height: 30px;
  color: hsla(0, 0%, 100%, 0.6);
  border-radius: 4px;
  border: 1px solid hsla(0, 0%, 100%, 0.6);
  margin: 0px 10px 20px 0px;
  cursor: pointer;
`;

const PriceContent = styled.div`
  font-size: 14px;
  color: hsla(0, 0%, 100%, 0.4);
`;

const ConfirmButton = styled.div`
  width: 180px;
  line-height: 50px;
  background-color: #6c47ff;
  font-size: 14px;
  height: 48px;
  text-align: center;
  color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
`;

const CloseBtn = styled.div`
  width: 30px;
  line-height: 30px;
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 50%;
  background-color: #1a1a1a;
  color: hsla(0, 0%, 100%, 0.2);
  text-align: center;
  cursor: pointer;
`;
