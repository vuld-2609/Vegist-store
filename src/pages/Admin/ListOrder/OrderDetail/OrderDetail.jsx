import moment from 'moment';
import 'moment/locale/vi';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getOrderDetail } from '../../../../redux/actions';
import history from '../../../../until/history';
import './styles.scss';

const title = [
  { id: 1, title: 'STT' },
  { id: 2, title: 'Image' },
  { id: 3, title: 'Name' },
  { id: 4, title: 'Amount' },
  { id: 5, title: 'Price' },
];

const status = {
  approval: 'approval',
  shipping: 'shipping',
  delivered: 'delivered',
};

function OrderDetail({ match, orderDetail, getOrderDetail }) {
  useEffect(() => {
    document.title = 'Vegist | Trang Chi tiết đơn đặt hàng';
    getOrderDetail({ id: match.params.id });
  }, []);

  const renderTotalPrice = () => {
    let total = 0;
    orderDetail?.cartData?.forEach((item) => (total += item.price));
    return `$${total.toLocaleString()} VND`;
  };

  const datetime = moment(orderDetail.datetime).format('L');

  return (
    <section className="detail">
      <div className="detail__container">
        <h1 className="detail__title">ORDER DETAIL</h1>
        <div className="detail__wrapper">
          <h3 className="detail__subtitle">Payment Code</h3>
          <p>{`#${orderDetail.paymentCode}`}</p>
        </div>
        <div className="detail__wrapper">
          <h3 className="detail__subtitle">User Name</h3>
          <p>{orderDetail.name}</p>
        </div>
        <div className="detail__wrapper">
          <h3 className="detail__subtitle">Email</h3>
          <p>{orderDetail.email}</p>
        </div>
        <div className="detail__wrapper">
          <h3 className="detail__subtitle">Phone Number</h3>
          <p>{orderDetail.phone}</p>
        </div>
        <div className="detail__wrapper">
          <h3 className="detail__subtitle">Address</h3>
          <p>{orderDetail.address}</p>
        </div>
        <div className="detail__wrapper">
          <h3 className="detail__subtitle">DateTime</h3>
          <p>{datetime}</p>
        </div>
        <div className="detail__wrapper">
          <h3 className="detail__subtitle">Total Price</h3>
          <p>{renderTotalPrice()}</p>
        </div>
        <div className="detail__wrapper">
          <h3 className="detail__subtitle">Order Payment</h3>
          <p>{orderDetail.isPayment === true ? 'Đã thanh toán' : 'Chưa thanh toán (Ship COD)'}</p>
        </div>
        <div className="detail__wrapper">
          <h3 className="detail__subtitle">Order Status</h3>
          <p>
            {orderDetail.status === status.approval
              ? 'Đang duyệt'
              : orderDetail.status === status.shipping
              ? 'Đang vận chuyển'
              : 'Đã giao hàng'}
          </p>
        </div>
        <div className="detail__wrapper">
          <h3 className="detail__subtitle">Products</h3>
          <div className="admin__listUser--tableNormal">
            <table className="detail__table">
              <thead>
                <tr>
                  {title.map((item) => (
                    <td key={item.id}>{item.title}</td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orderDetail?.cartData?.length &&
                  orderDetail?.cartData?.map((item, index) => (
                    <tr className="table__row">
                      <td>{index + 1}</td>
                      <td>
                        <img src={item?.img[0]} alt="img" className="detail__img" />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.amount}</td>
                      <td>{`$${item.price.toLocaleString()}`}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="detail__button">
          <button
            type="button"
            className="button button-round--lg button-primary"
            onClick={() => history.push('/admin/listOrder')}
          >
            Go to List Order
          </button>
        </div>
      </div>
    </section>
  );
}

// export default OrderDetail;
const mapStateToProps = (state) => {
  const { orderDetail } = state.paymentReducer;
  return {
    orderDetail,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getOrderDetail: (params) => dispatch(getOrderDetail(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
