import { Empty, Input, Modal, Pagination, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { deletePayments, getPayments, updatePayments } from '../../../redux/actions';
import Row from './components/Row/index';
import './styles.scss';

const arrStatus = [
  { id: 1, title: 'Đang duyệt', value: 'approval' },
  { id: 2, title: 'Đang vận chuyển', value: 'shipping' },
  { id: 3, title: 'Đã giao hàng', value: 'delivered' },
  { id: 4, title: 'Tất cả', value: 'all' },
];

const title = [
  { id: 1, title: 'STT' },
  { id: 2, title: 'Payment Code' },
  { id: 3, title: 'User Name' },
  { id: 4, title: 'Total Price' },
  { id: 5, title: 'Date Time' },
  { id: 6, title: 'Status' },
  { id: 7, title: 'Action' },
];

function ListOrder({
  paymentsData,
  getPayments,
  deleteData,
  deletePayments,
  updateData,
  updatePayments,
}) {
  const { payments, total } = paymentsData;

  const { Option } = Select;
  const { Search } = Input;

  const [current, setCurrent] = useState(1);
  const [search, setSearch] = useState('');
  const [searchKey, setSearchKey] = useState();
  const [sort, setSort] = useState('');

  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    document.title = 'Vegist | Trang Quản lý đơn đặt hàng';
    getPayments({
      page: current,
      limit: 10,
      search: searchKey,
      status: sort,
    });
  }, [current, searchKey, sort, deleteData, updateData]);

  const handleChangeStatus = (value, newID) => {
    updatePayments({
      id: newID,
      status: value,
    });
  };

  const handleClickDelete = (paymentCode, id) => {
    Modal.confirm({
      title: 'Confirm',
      content: (
        <p>
          Do you want to delete this payment{' '}
          <span style={{ fontWeight: 600 }}>{`#${paymentCode}`}</span> ?
        </p>
      ),
      okText: 'OK',
      cancelText: 'CANCEL',
      onOk() {
        deletePayments({ id });
      },
      onCancel() {},
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      const formValue = {
        search: value,
      };
      setSearchKey(formValue.search);
    }, 1000);
  };

  const handleChangeSort = (value) => {
    setSort(value);
  };

  return (
    <section className="order">
      <div className="order__filter">
        <div className="order__sort">
          <h3 className="order__sort--title">By Sort</h3>
          <Select
            showSearch
            style={{ width: 160 }}
            optionFilterProp="children"
            placeholder="Select a status"
            onChange={handleChangeSort}
          >
            {arrStatus.map((item, index) => (
              <Option value={item.value} key={`option-${index}`}>
                {item.title}
              </Option>
            ))}
          </Select>
        </div>
        <div className="order__search">
          <Search
            placeholder="Search payment code or a user"
            value={search}
            onChange={handleChange}
            enterButton
          />
        </div>
      </div>
      <div className="admin__listUser--tableNormal">
        <table className="table">
          <thead>
            <tr>
              {title.map((item) => (
                <td key={item.id}>{item.title}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {payments?.length ? (
              payments?.map((item, index) => (
                <Row
                  payments={payments}
                  item={item}
                  index={index}
                  arrStatus={arrStatus}
                  handleChangeStatus={handleChangeStatus}
                  handleClickDelete={handleClickDelete}
                />
              ))
            ) : (
              <Empty />
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        {payments?.length ? (
          <Pagination
            current={current}
            onChange={(page) => setCurrent(page)}
            total={total}
            defaultPageSize={10}
          />
        ) : null}
      </div>
    </section>
  );
}

// export default ListOrder;
const mapStateToProps = (state) => {
  const { paymentsData, deleteData, updateData } = state.paymentReducer;
  return {
    paymentsData,
    deleteData,
    updateData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPayments: (params) => dispatch(getPayments(params)),
    deletePayments: (params) => dispatch(deletePayments(params)),
    updatePayments: (params) => dispatch(updatePayments(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOrder);
