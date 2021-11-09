import { Select } from 'antd';
import moment from 'moment';
import 'moment/locale/vi';
import React from 'react';
import { BiDetail } from 'react-icons/bi';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import history from '../../../../../until/history';
import './styles.scss';

const status = {
  approval: 'approval',
  shipping: 'shipping',
  delivered: 'delivered',
};

function Row({ payments, item, index, arrStatus, handleChangeStatus, handleClickDelete }) {
  const { Option } = Select;

  const renderDatetime = (datetime) => {
    return moment(datetime).format('L');
  };

  const renderTotalPrice = (index) => {
    let total = 0;
    payments[index]?.cartData?.forEach((item) => (total += item.price));
    return `$${total.toLocaleString()} VND`;
  };

  return (
    <>
      <tr className="table__row">
        <td>{index + 1}</td>
        <td>{item.paymentCode}</td>
        <td>{item.name}</td>
        <td>{renderTotalPrice(index)}</td>
        <td>{renderDatetime(item.datetime)}</td>
        <td>
          <div>
            <Select
              showSearch
              style={{ width: 200 }}
              optionFilterProp="children"
              value={
                item.status === status.approval
                  ? 'Đang duyệt'
                  : item.status === status.shipping
                  ? 'Đang vận chuyển'
                  : 'Đã giao hàng'
              }
              onChange={(value) => handleChangeStatus(value, item.id)}
            >
              {arrStatus.map((item, index) => {
                if (item.id > 3) return null;
                return (
                  <Option value={item.value} key={`option-${item.value}-${index}`}>
                    {item.title}
                  </Option>
                );
              })}
            </Select>
          </div>
        </td>
        <td>
          <div>
            <BiDetail
              className="order__icon order__icon--detail"
              onClick={() => history.push(`/admin/listOrder/${item.id}`)}
            />
            <RiDeleteBin5Fill
              className="order__icon order__icon--delete"
              onClick={() => handleClickDelete(item.paymentCode, item.id)}
            />
          </div>
        </td>
      </tr>
    </>
  );
}

export default Row;
