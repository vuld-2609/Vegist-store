import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { getCartData } from '../../redux/actions';
import { useLocation } from 'react-router-dom';
import './styles.scss';

const InfoCart = ({ getCartData, cartData }) => {
  const location = useLocation();
  const { t } = useTranslation();
  useEffect(() => {
    getCartData();
  }, []);

  const renderCartData = (cartData) => {
    return cartData?.cartDetails?.map((item, index) => {
      const { productId } = item;
      return (
        <tr className="infoCart__cart--item" key={index}>
          <td className="infoCart__cart--img">
            <img src={productId.imgs[0]} alt="anh"></img>
            <span className="infoCart__cart--amount">{item.quantity}</span>
          </td>
          <td className="infoCart__cart--name">
            <h5>{productId.name}</h5>
            {productId.unit && <p>{productId.unit}</p>}
          </td>
          <td className="infoCart__cart--price">
            ${(item.quantity * productId.price).toLocaleString()} VND
          </td>
        </tr>
      );
    });
  };

  const handleCalculateToTal = () => {
    let total = 0;
    cartData?.cartDetails?.forEach((element) => {
      total += parseInt(element.productId.price * element.quantity);
    });
    total += total * 0.1;
    return total;
  };

  return (
    <section className="infoCart">
      <div className=" infoCart__container">
        <table className="infoCart__cart">{renderCartData(cartData)}</table>
        <div className="infoCart__discount">
          <form>
            <Input className="input" type="text" placeholder={t('infoCart.Discount code')}></Input>
            <button className="button" type="button">
              {t('infoCart.Apply')}
            </button>
          </form>
        </div>
        <div className="infoCart__price">
          <div className="infoCart__price--item">
            <h4>{t('infoCart.Subtotal')}</h4>
            <p>{handleCalculateToTal().toLocaleString()}</p>
          </div>
          <div className="infoCart__price--item">
            <h4>{t('infoCart.Shipping cost')}</h4>
            <p>
              {location.pathname === '/shipping' || location.pathname === '/payment'
                ? parseInt(20000).toLocaleString()
                : t('infoCart.Calculated at next step')}
            </p>
          </div>
          <div className="infoCart__price--total">
            <h4>{t('infoCart.Total')}</h4>
            <p>
              VND{' '}
              <span>
                $
                {(
                  handleCalculateToTal(cartData?.cartData) +
                  (location.pathname === '/shipping' || location.pathname === '/payment'
                    ? 20000
                    : 0)
                ).toLocaleString()}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  const { cartData } = state.cartReducer;

  return {
    cartData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCartData: (params) => dispatch(getCartData(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(InfoCart);
