import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { getOrderUser, cancelOrderUser, getBillDetailUser } from '../../../redux/actions';
import { Button, Modal, Select, Input, Pagination, Spin } from 'antd';
import history from '../../../until/history';

import './style.scss';
import moment from 'moment';
const { Option } = Select;
const { Search } = Input;
function CartManage(prop) {
  const { getOrderUser, orderUser, cancelOrderUser, billDetailUser, getBillDetailUser } = prop;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [current, setCurrent] = useState(1);
  const [searchKey, setSearchKey] = useState('');
  const [filterSelect, setFilterSelect] = useState('');
  const [openDetail, isOpenDetail] = useState(false);

  const { t } = useTranslation();
  document.title = 'Vegist | Trang Thông tin cá nhân';

  useEffect(() => {
    getOrderUser({
      search: searchKey,
      page: current,
      status: filterSelect,
    });
  }, [current, searchKey, filterSelect]);

  function handleChange(value) {
    setFilterSelect(value);
  }

  const handleSearchOrder = (key) => {
    setSearchKey(key);
  };

  const handleOk = (id) => {
    setIsModalVisible(false);
    cancelOrderUser({ billId: id });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOkBill = (id) => {
    isOpenDetail(false);
  };

  const handleCancelBill = () => {
    isOpenDetail(false);
  };

  const handleCancelPayment = () => {
    setIsModalVisible(true);
  };

  const openBillDetail = (id) => {
    isOpenDetail(true);
    getBillDetailUser(id);
  };

  return (
    <>
      <section className="profile fadeIn">
        <div className="container">
          <div className="profile__order">
            <p className="profile__order--title">{t('orderHistory.title')}</p>
            <div className="profile__order-content">
              <div className="profile__order-content-action">
                <div className="action-select">
                  <Select defaultValue="all" onChange={handleChange}>
                    <Option value="all">Tất cả</Option>
                    <Option value="Chưa thanh toán">Chưa thanh toán</Option>
                    <Option value="Đã thanh toán">Đã thanh toán</Option>
                  </Select>
                </div>
                <div>
                  <Search
                    placeholder="input search text"
                    onSearch={handleSearchOrder}
                    enterButton
                  />
                </div>
              </div>
              <table className="bill-table">
                <thead>
                  <tr>
                    <td>STT</td>
                    <td>NAME PRODUCT</td>
                    <td>DATE</td>
                    <td>TOTAL</td>
                    <td>STATUS</td>
                    <td>ACTION</td>
                  </tr>
                </thead>
                {orderUser.data.length !== 0 && (
                  <tbody>
                    <>
                      {orderUser.data?.map((item, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td id="order-detail-products">
                            {item.billDetails.map((item, index) => (
                               <div>
                                 <div>
                                  {item.productId.name}
                                </div>
                                <div>
                                  <img src={item.productId.imgs[0]} alt="" />
                                </div>
                               </div>
                            ))}
                          </td>
                          <td>{moment(item.dateCreate).format('LL')}</td>
                          <td>{`${item.total.toLocaleString()} VND`}</td>
                          <td>{item.status}</td>
                          <td className="action-cart-manage">
                            <Button
                              disabled={item.status !== 'Chưa thanh toán'}
                              onClick={handleCancelPayment}
                            >
                              Huỷ
                            </Button>
                            <Button onClick={() => openBillDetail(item.id)}>Chi tiết</Button>
                            <Modal
                              title="Product Detail"
                              visible={openDetail}
                              onOk={handleOkBill}
                              onCancel={handleCancelBill}
                              width={1000}
                            >
                              {billDetailUser.load ? (
                                <div className="loading">
                                  <Spin />
                                </div>
                              ) : (
                                <div className="bill-detail-modal">
                                  <div className="bill-detail-modal__title">
                                    <li>Name</li>
                                    <li>Product</li>
                                    <li>Price</li>
                                  </div>
                                  {billDetailUser.data?.map((item) => (
                                   <>
                                     <div className="bill-detail-modal__content">
                                      <li>{item.productId.name}</li>
                                      <li>
                                        <img src={item.productId.imgs[0]} alt="" />
                                      </li>
                                      <li>{`${item.productId.price.toLocaleString()} VND`}</li>
                                    </div>
                                   </>
                                  ))}
                                </div>
                              )}
                            </Modal>
                            <Modal
                              title="Basic Modal"
                              visible={isModalVisible}
                              onOk={() => handleOk(item.id)}
                              onCancel={handleCancel}
                            >
                              <p>Bạn có chắc muốn huỷ đơn đặt hàng này không ?</p>
                            </Modal>
                          </td>
                        </tr>
                      ))}
                    </>
                  </tbody>
                )}
              </table>
              {orderUser.data.length === 0 && (
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
              )}
              {orderUser.data.length !== 0 && (
                <div className="admin__listUser--pagination">
                  <Pagination
                    current={current}
                    onChange={(page) => setCurrent(page)}
                    total={orderUser.total}
                    defaultPageSize={10}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const mapStateToProps = (state) => {
  const { orderUser, billDetailUser } = state.paymentReducer;

  return {
    orderUser,
    billDetailUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderUser: (params) => dispatch(getOrderUser(params)),
    cancelOrderUser: (params) => dispatch(cancelOrderUser(params)),
    getBillDetailUser: (params) => dispatch(getBillDetailUser(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartManage);
