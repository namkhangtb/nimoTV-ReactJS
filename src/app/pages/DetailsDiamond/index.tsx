import { Hearder } from 'app/components/Header';
import { SidebarInfo } from 'app/components/SidebarInfo';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
import './DetailsDiamond.scss';
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

export function DetailsDiamond() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const { actions } = useHeaderSlice();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  const userId = useSelector(selectorIdUser);
  const diamond = useSelector(selectorDiamond);
  interface DetailsDiamondUserItem {
    diamondId: number;
    createdAt: string | Date;
    userId: number;
    streamerId: number;
    numberDiamond: number;
    paymentMethod: String;
    receiveDiamond: String;
  }
  const [dataDetailsDiamond, setdataDetailsDiamond] = useState<
    DetailsDiamondUserItem[]
  >([]);

  useEffect(() => {
    const idUser = userId;
    console.log('id', idUser);

    if (idUser) {
      axios
        .get(
          `${environment.BASEURL_BACKEND}/detail-diamond/by-user-id?size=0&index=0&user-id=${idUser}`,
          {
            // headers: {
            //   Authorization: 'Bearer ' + localStorage.getItem('token'),
            // },
          },
        )
        .then(res => {
          console.log('ress detaildeamond', res);

          setdataDetailsDiamond(res.data.data);
          // dispatch(actions.setDiamond(res.data.data?.diamond));

          console.log(res);

          // toast.success('Lấy dữ liệu thành công!!!');
        })
        .catch(err => {
          toast.error('Lỗi: ' + err);
        });
    } else {
      navigate('/');
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Info User</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Hearder></Hearder>
      <Body>
        <SidebarInfo></SidebarInfo>
        <div className="details-diamond-screen-container">
          <div className="details-diamond-screen__title">
            {t(translations['detailsDiamond.label.title'])}
          </div>
          {/* <div className="details-diamond__list"></div> */}
          <div className="details-diamond-section">
            <div className="tbl-content">
              <table>
                <thead>
                  <tr className="details-diamond__table__tr">
                    <th>STT</th>
                    <th>Phương thức</th>
                    <th>Số kim cương</th>
                    <th>Streamer</th>
                    <th>Ngày tạo</th>
                  </tr>
                </thead>
                <tbody>
                  {dataDetailsDiamond.map((item, index) => {
                    return (
                      <tr className="details-diamond__table__tr" key={index}>
                        <td>{index + 1}</td>

                        {item.paymentMethod === 'paypal' && (
                          <td>Nạp thẻ bằng Paypal</td>
                        )}
                        {item.receiveDiamond === 'donate' && (
                          <td>Donate Streamer</td>
                        )}
                        <td>{item.numberDiamond}</td>
                        <td>{item.streamerId ? item.streamerId : ''}</td>
                        <td>
                          {typeof item.createdAt === 'string'
                            ? item.createdAt
                            : item.createdAt.toString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
