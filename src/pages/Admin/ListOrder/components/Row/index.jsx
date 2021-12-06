import { Select } from 'antd';
import moment from 'moment';
import 'moment/locale/vi';
import React from 'react';
import { BiDetail } from 'react-icons/bi';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import history from '../../../../../until/history';
import './styles.scss';

function Row({ item, index, arrStatus, handleChangeStatus, handleClickDelete }) {
  const { Option } = Select;

  const renderDatetime = (datetime) => {
    return moment(datetime).format('L');
  };

  const renderPaymentCode = (id) => {
    let str = id.slice(-8).toUpperCase();
    return `Vegist-${str}`;
  };

  return (
    <>
      <tr className="table__row">
        <td>{index + 1}</td>
        <td>{renderPaymentCode(item.id)}</td>
        <td>{item.userId.fullName}</td>
        <td>{`${item.total.toLocaleString()} VND`}</td>
        <td>{renderDatetime(item.dateCreate)}</td>
        <td>
          <div>
            <Select
              showSearch
              style={{ width: 200 }}
              optionFilterProp="children"
              value={item.status}
              onChange={(value) => handleChangeStatus(value, item.id)}
            >
              {arrStatus.map((item, index) => {
                if (item.id > 4) return null;
                return (
                  <Option value={item.value} key={`option-${item.value}-${index}`}>
                    {item.value}
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
              onClick={() => handleClickDelete(renderPaymentCode(item.id), item.id)}
            />
          </div>
        </td>
      </tr>
    </>
  );
}

export default Row;
