import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { getOrderUser, cancelOrderUser, getBillDetailUser } from '../../../redux/actions';
import { Button, Modal, Select, Input, Pagination, Spin,Typography } from 'antd';
import history from '../../../until/history';

import './style.scss';
import moment from 'moment';
const { Option } = Select;
const { Search } = Input;
const { Text } = Typography;
function CartManage(prop) {
  const { getOrderUser, orderUser, cancelOrderUser, billDetailUser, getBillDetailUser, tabValue } =
  prop;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [current, setCurrent] = useState(1);
  const [searchKey, setSearchKey] = useState('');
  const [filterSelect, setFilterSelect] = useState('all');
  const [openDetail, isOpenDetail] = useState(false);
  const [idProductCancel, isIdProductCancel] = useState();

  const { t } = useTranslation();
  document.title = 'Vegist | Trang Thông tin cá nhân';

  useEffect(() => {
    getOrderUser({
      search: searchKey,
      page: current,
      status: filterSelect,
      limit: 5,
    });
  }, [current, searchKey, filterSelect]);

  useEffect(() => {
    tabValue === '1' &&
      getOrderUser({
        page: current,
        limit: 5,
      });
  }, [tabValue]);

  function handleChange(value) {
    setFilterSelect(value);
    setCurrent(1);
  }

  const handleSearchOrder = (key) => {
    setSearchKey(key);
    setCurrent(1);
  };

  const handleCancelPayment = (id) => {
    isIdProductCancel(id)
    setIsModalVisible(true);
  };


  const handleCancelBill = async () => {
    await cancelOrderUser({ billId: idProductCancel, status: 'Đã hủy' });

    setCurrent(1);

    getOrderUser({
      page: current,
      limit: 5,
    });

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOkBill = (id) => {
    isOpenDetail(false);
  };

  const handleOpenModalCancelBill = () => {
    isOpenDetail(false);
  };


  const openBillDetail = (id) => {
    // isOpenDetail(true);
    // getBillDetailUser(id);
    history.push(`/success/${id}`);
  };

  return (
    <>
      {orderUser.load ? (
        <div className="loading">
          <Spin />
        </div>
      ) : (
        <section className="profile fadeIn">
          <div className="container">
            <div className="profile__order">
              <p className="profile__order--title">{t('orderHistory.title')}</p>
              <div className="profile__order-content">
                <div className="profile__order-content-action">
                  <div>Sort by:</div>
                  <div className="action-select">
                    <Select value={filterSelect} onChange={handleChange}>
                      <Option value="all">Tất cả</Option>
                      <Option value="Đợi xác nhận">Đợi xác nhận</Option>
                      <Option value="Đã xác nhận">Đã xác nhận</Option>
                      <Option value="Đang vận chuyển">Đang vận chuyển</Option>
                      <Option value="Đã giao hàng">Đã giao hàng</Option>
                      <Option value="Đã hủy">Đã hủy</Option>
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
                      <td>PRODUCT</td>
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
                              <div>
                                {item.billDetails.map((item, index) => (
                                  <div>
                                    <div>{item.productId.name}</div>
                                    <div>
                                      <img src={item.productId.imgs[0]} alt="" />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td>{moment(item.dateCreate).format('L')}</td>
                            <td>{`${item.total.toLocaleString()} VND`}</td>
                            <td>{item.status}</td>
                            <td className="action-cart-manage">
                              <Button
                                disabled={item.status !== 'Đợi xác nhận'}
                                onClick={()=>handleCancelPayment(item.id)}
                              >
                                Huỷ
                              </Button>
                              <Button onClick={() => openBillDetail(item.id)}>Chi tiết</Button>
                              {/* <Modal
                                title="Product Detail"
                                visible={openDetail}
                                onOk={handleOkBill}
                                onCancel={handleOpenModalCancelBill}
                                bodyStyle={{ maxHeight: '70vh',height: '70vh', overflowY: 'auto' }}
                                width={1000}
                              >
                                {billDetailUser.load ? (
                                  <div className="loading">
                                    <Spin />
                                  </div>
                                ) : (
                                  <div className="bill-detail">
                                    <table className="bill-table bill-table--detail">
                                    <thead>
                                      <tr>
                                        <td>STT</td>
                                        <td>NAME</td>
                                        <td>PRODUCT</td>
                                        <td>PRICE</td>
                                        <td>QUANTITY</td>
                                        <td>TOTAL</td>
                                        <td>PAYMENT DATE {moment(billDetailUser?.bill?.dateCreate).format('L')}</td>
                                        <td>SHIP FEE 20.000 VND</td>
                                        <td>{`TOTAL PRICE ${(billDetailUser?.bill?.total + 20000).toLocaleString()} VND`}</td>
                                      </tr>
                                    </thead>
                                    <tbody>
                                    {billDetailUser.data?.map((item,index) => (
                                      <>
                                        <tr className="">
                                          <td>{index +1}</td>
                                          <td>{item.productId.name}</td>
                                          <td>
                                            <img src={item.productId.imgs[0]} alt="" />
                                          </td>
                                          <td>{`${item.productId.price.toLocaleString()} VND`}</td>
                                          <td>{item.quantity}</td>
                                          <td>{(item.quantity * item.productId.price).toLocaleString()} VND</td>
                                        </tr>
                                        </>
                                    ))}
                                    </tbody>
                                    </table>
                                  </div>
                                )}
                              </Modal> */}
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
                      onChange={(page) => {
                        window.scrollTo({
                          top: 0,
                          left: 0,
                          behavior: 'smooth',
                        });
                        setCurrent(page);
                      }}
                      total={orderUser.total}
                      defaultPageSize={5}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
      <Modal
        title="Cancel Bill"
        visible={isModalVisible}
        onOk={handleCancelBill}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc muốn huỷ đơn đặt hàng này không ?</p>
      </Modal>
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
