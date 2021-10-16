import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import history from '../../../until/history';
import Breadcrumb from '../../../components/Breadcrumb';
import { Col, Row, Select, Input, Modal } from 'antd';
import CartItem from './CartItem';
import { useTranslation } from 'react-i18next';
import VietNam from '../../../assets/images/vietnam.svg';
import English from '../../../assets/images/english.svg';
import './styles.scss';
import { addCart, getCartData } from '../../../redux/actions';

const Cart = ({ addCartData, cartData, addCart, getCartData }) => {
  const { t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const [infoUser, setInfoUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { Option } = Select;

  useEffect(() => {
    getCartData({ user: infoUser?.email });
  }, [addCartData]);

  const handleCalculateToTal = () => {
    let total = 0;
    cartData?.cartData?.forEach((element) => {
      total = total + parseInt(element.price * element.amount);
    });

    return total;
  };
  const handleDeleteCart = (id, type) => {
    let arrProduct = JSON.parse(localStorage.getItem('CartData'));
    if (type === 'single') {
      let indexId = arrProduct.findIndex((item) => item.id === id);
      arrProduct.splice(indexId, 1);
    } else arrProduct = [];
    addCart({ user: infoUser.email, cartData: arrProduct });
  };

  return (
    <div className="cart fadeIn">
      <Breadcrumb title="Cart" />
      <div className="container cart__container">
        {cartData?.cartData?.length ? (
          <Row gutter={[32, 24]} justify="end">
            <Col xl={17} lg={16} xs={24}>
              <section className="cart__product">
                <div className="cart__product--title">
                  <h2>{t('cart.My Cart')}:</h2>
                  <p>
                    {cartData?.cartData?.reduce(
                      (total, currentValue) => {
                        return parseInt(total) + currentValue.amount;
                      },
                      [0]
                    )}{' '}
                    {t('cart.item')}
                  </p>
                </div>
                <table className="cart__table">
                  <tbody className="cart__product--list">
                    {cartData?.cartData?.map((item) => (
                      <CartItem
                        data={item}
                        handleDeleteCart={handleDeleteCart}
                        key={`cart-${item.id}`}
                      />
                    ))}
                  </tbody>
                </table>
                <div className="cart__product--bottom">
                  <span></span>
                  <button
                    className="button button-round--lg button-primary"
                    onClick={() => history.push('/products')}
                  >
                    {t('cart.Continue Shopping')}
                  </button>
                  <button
                    className="button button-round--lg button-transparent"
                    onClick={() => setIsModalVisible(true)}
                  >
                    {t('cart.Clear Cart')}
                  </button>
                </div>
              </section>
            </Col>
            <Col xl={7} lg={8} md={12} sm={16} xs={24}>
              <section className="cart__price">
                <div className="cart__price--subtotal">
                  <div className="cart__price--subtotal-item">
                    <h4>{t('cart.Subtotal')}</h4>
                    <p>${handleCalculateToTal().toLocaleString()} VND</p>
                  </div>
                  <div className="cart__price--subtotal-item">
                    <h4>VAT: </h4>
                    <p>${(handleCalculateToTal() * 0.1).toLocaleString()} VND</p>
                  </div>
                </div>
                <div className="cart__price--info">
                  <h2 className="cart__price--title">{t('cart.Shipping Info')}</h2>
                  <div className="cart__price--info-item">
                    <p>{t('cart.Country')}</p>
                    <Select defaultValue="vi" style={{ width: '100%' }}>
                      <Option value="vi">
                        <img src={VietNam} alt="VietNam" className="header__language--img" />
                        <span>Viet Nam</span>
                      </Option>
                      <Option value="en">
                        <img src={English} alt="English" className="header__language--img" />
                        <span>England</span>
                      </Option>
                    </Select>
                  </div>
                  <div className="cart__price--info-item">
                    <p>{t('cart.Zip/Postal code')}</p>
                    <Input placeholder="Zip/Postal code" />
                  </div>
                </div>
                <div className="cart__price--total">
                  <h4>{t('cart.Total')}</h4>
                  <p>${(handleCalculateToTal() * 1.1).toLocaleString()} VND</p>
                </div>
                <div className="cart__price--button">
                  <button
                    className="button button-round--lg button-primary"
                    onClick={() => history.push('/infoPayment')}
                  >
                    {t('cart.Checkout')}
                  </button>
                </div>
              </section>
            </Col>
          </Row>
        ) : (
          <div className="cart__nonProduct ">
            <div className="cart__nonProduct-img text-center">
              <img src="https://i.imgur.com/Drj57qu.png" alt="nonProduct" />
            </div>
            <div className="cart__nonProduct-btn ">
              <p>{t('cart.The shopping cart has no products')}</p>
              <button
                className="button button-round--lg button-primary"
                type="button"
                onClick={() => history.push('/products')}
              >
                {t('cart.Continue Shopping')}
              </button>
            </div>
          </div>
        )}
      </div>
      <Modal
        title={t('cart.Do you want to delete all products')}
        visible={isModalVisible}
        onOk={() => {
          handleDeleteCart('', 'all');
          setIsModalVisible(false);
        }}
        onCancel={() => setIsModalVisible(false)}
      ></Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { cartData, addCartData } = state.cartReducer;

  return {
    cartData,
    addCartData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCartData: (params) => dispatch(getCartData(params)),
    addCart: (params) => dispatch(addCart(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
