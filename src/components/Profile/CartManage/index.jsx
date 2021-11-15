import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { getBill, deletePayments } from '../../../redux/actions';
import { Button, Modal } from 'antd';
import history from '../../../until/history';

import './style.scss';

function CartManage(prop) {
  const { billData, getBill, deletePayments } = prop;
  const { t } = useTranslation();

  useEffect(() => {
    document.title = 'Vegist | Trang Thông tin cá nhân';
    const user = JSON.parse(localStorage.getItem('profile'));
    getBill({
      user: user.email,
    });
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
    deletePayments({ id:1 });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCancelPayment = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <section className="profile fadeIn">
        <div className="container">
          <div className="profile__order">
            <p className="profile__order--title">{t('orderHistory.title')}</p>
            {!billData ? (
              <div className="cart__nonProduct ">
                <div className="cart__nonProduct-img text-center">
                  <img src="https://i.imgur.com/Drj57qu.png" alt="nonProduct" />
                </div>
                <div className="cart__nonProduct-btn ">
                  <p>{t('orderHistory.content')}</p>
                  <button
                    className="button button-round--lg button-primary"
                    type="button"
                    onClick={() => history.push('/products')}
                  >
                    {t('cart.Continue Shopping')}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div>hehe</div>
                <table>
                  <thead>
                    <tr>
                      <td>STT</td>
                      <td>NAME</td>
                      <td>COUNT</td>
                      <td>ADDRESS</td>
                      <td>DATE</td>
                      <td>PRICE</td>
                      <td>STATUS</td>
                      <td>ACTION</td>
                    </tr>
                  </thead>
                  <tbody>
                    <>
                      {billData?.map((item) => (
                        <tr>
                          <td>{1}</td>
                          <td>
                            <div className="name-order">
                              {item?.cartData?.map((itemC, index) => (
                                <>
                                  <p>{itemC.name}</p>
                                  <img src={itemC.img[0]} alt="" />
                                </>
                              ))}
                            </div>
                          </td>
                          <td>{item?.cartData?.length}</td>
                          <td>{item.address}</td>
                          <td>{item.datetime}</td>
                          <td>
                            {item?.cartData
                              ?.reduce((acc, item) => {
                                return acc + item.price;
                              }, 0)
                              .toLocaleString()}
                          </td>
                          <td>{item.status}</td>
                          <td>
                            <Button
                              disabled={item.status === 'done'}
                              onClick={handleCancelPayment}
                            >
                              Huỷ
                            </Button>
                            <Modal
                              title="Basic Modal"
                              visible={isModalVisible}
                              onOk={handleOk}
                              onCancel={handleCancel}
                            >
                              <p>Bạn có chắc muốn huỷ đơn đặt hàng này không ?</p>
                            </Modal>
                          </td>
                        </tr>
                      ))}
                    </>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

const mapStateToProps = (state) => {
  const { billData } = state.paymentReducer;

  return {
    billData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBill: (params) => dispatch(getBill(params)),
    deletePayments: (params) => dispatch(deletePayments(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartManage);
