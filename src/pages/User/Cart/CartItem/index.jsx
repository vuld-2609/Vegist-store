import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { Modal, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import './styles.scss';
import { addCart } from '../../../../redux/actions';
const CartItem = ({ data, setCartData, addCart, addCartData, handleDeleteCart }) => {
  const { confirm } = Modal;
  const { t } = useTranslation();
  const [valueInput, setValueInput] = useState(data.amount);
  const [infoUser, setInfoUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const contentModal = data => (
    <div className="modal">
      <div className="modal__img">
        <img src={data.img[0]} alt="modal"></img>
      </div>
      <div className="modal__content">
        <h3>{data.name}</h3>
        {data.size && (
          <p>
            <span>{t('cart.Size')}</span> {data.size}
          </p>
        )}
        <p>{`$${data.price.toLocaleString()}`}</p>
      </div>
    </div>
  );

  const modalInc = (data, value) => {
    confirm({
      title: `${t('cart.You can only order up to 30 products')}`,
      content: <>{contentModal(data)}</>,
      okText: `${t('cart.Yes')}`,
      cancelText: `${t('cart.No')}`,
      onOk() {
        setValueInput(30);
      },
      onCancel() {
        setValueInput(30);
      }
    });
  };

  const modalDec = (data, value) => {
    confirm({
      title: `${t('cart.Are you sure delete this product?')}`,
      content: <>{contentModal(data)}</>,
      okText: `${t('cart.Yes')}`,
      cancelText: `${t('cart.No')}`,
      onOk() {
        handleDeleteCart(data.id, 'single');
      },
      onCancel() {
        setValueInput(1);
      }
    });
  };
  const updateCart = (data, value) => {
    const cartData = JSON.parse(localStorage.getItem('CartData'));
    const indexItem = cartData.findIndex(item => item.id === data.id);
    cartData.splice(indexItem, 1, { ...data, amount: value });
    addCart({ user: infoUser.email, cartData });
  };

  const handleChangeInput = (e, data) => {
    let value = parseInt(e.target.value);
    if (isNaN(value)) {
      setValueInput('');
    } else if (value > 0 && value <= 30) {
      updateCart(data, value);
      setValueInput(value);
    } else if (value > 30) {
      value = value - 1;
      modalInc(data, value);
      updateCart(data, 30);
    } else if (value <= 0) {
      value = value + 1;
      modalDec(data, value);
      updateCart(data, 1);
    }
  };

  const handleIncreaseInput = data => {
    let value = parseInt(valueInput + 1);
    setValueInput(value);
    if (value > 30) {
      modalInc(data, value);
    } else updateCart(data, value);
  };

  const handleDecreaseInput = data => {
    let value = parseInt(valueInput - 1);
    setValueInput(value);
    if (value <= 0) {
      modalDec(data, value);
    } else updateCart(data, value);
  };

  return (
    <>
      <tr className="cart__product--item">
        <td className="cart__product--img">
          <img src={data.img[0]} alt="anh cart" />
        </td>
        <td className="cart__product--info">
          <h3>{data.name}</h3>
          {data.size && (
            <p>
              <span>{t('cart.Size')}</span>
              {data.size}
            </p>
          )}

          <p>${data.price.toLocaleString()} VND</p>
        </td>
        <td className="cart__product--amount">
          <div>
            <button className="" onClick={() => handleDecreaseInput(data)}>
              -
            </button>
            <input
              value={valueInput}
              className=""
              type="number"
              onChange={e => handleChangeInput(e, data)}
            ></input>
            <button className="" onClick={() => handleIncreaseInput(data)}>
              +
            </button>
          </div>
        </td>
        <td className="cart__product--price">${(data.price * valueInput).toLocaleString()} VND</td>
        <td className="cart__product--remove" onClick={() => modalDec(data, 0)}>
          <FaTrash />
        </td>
      </tr>
    </>
  );
};

const mapStateToProps = state => {
  const { addCartData } = state.cartReducer;

  return {
    addCartData
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addCart: params => dispatch(addCart(params))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
