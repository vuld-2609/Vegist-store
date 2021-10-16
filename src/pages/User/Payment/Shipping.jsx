import React, { useEffect, useState } from 'react';
import PaymentBreadcrumb from './component/PaymentBreadcrumb';
import { Radio } from 'antd';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getBill, updateBill } from '../../../redux/actions';
import './styles.scss';
import history from '../../../until/history';
const Shipping = ({ getBill, billData, updateBill }) => {
  const { t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  useEffect(() => {
    document.title = 'Vegist | Trang ship';
    getBill({ user: user.email, isPayment: false });
  }, []);

  const handelUpdateBill = () => {
    updateBill({
      id: billData.id,
      method: 'Standard',
      shippingCost: 20000,
    });
    history.push('/payment');
  };

  return (
    <div className="payment-page fadeIn">
      <div className="container payment__container">
        <section className="shipping">
          <h1 className="information__title">vegina-store</h1>
          <PaymentBreadcrumb />
          <div className="shipping__container">
            <div className="shipping__info shipping__content">
              <div className=" shipping__content--item">
                <div className="shipping__info--inner">
                  <h4>{t('payments.shipping.Contact')}</h4>
                  <p>{billData.email}</p>
                </div>
                <button className="button" onClick={() => history.push('/infoPayment')}>
                  {t('payments.shipping.Change')}
                </button>
              </div>
              <div className=" shipping__content--item">
                <div className="shipping__info--inner">
                  <h4>{t('payments.shipping.Ship to')}</h4>
                  <p>{billData.address}</p>
                </div>
                <button className="button" onClick={() => history.push('/infoPayment')}>
                  {t('payments.shipping.Change')}
                </button>
              </div>
            </div>

            <div className="shipping__title">
              <h3>{t('payments.shipping.Shipping method')}</h3>
            </div>
            <div className="shipping__method shipping__content  ">
              <div className="shipping__content--item">
                <Radio checked>{t('payments.shipping.Standard')}</Radio>
                <p>20.000 VND</p>
              </div>
            </div>
            <div className="shipping__btn">
              <button
                className="button  button-animation--1 button-round--lg "
                onClick={() => handelUpdateBill()}
              >
                <span> {t('payments.shipping.Continue to payment')}</span>
              </button>
              <button
                className="button button-round button-transparent"
                onClick={() => history.push('/infoPayment')}
              >
                <span> {t('payments.shipping.Return to information')}</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { billData } = state.paymentReducer;

  return { billData };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBill: (params) => dispatch(getBill(params)),
    updateBill: (params) => dispatch(updateBill(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Shipping);
