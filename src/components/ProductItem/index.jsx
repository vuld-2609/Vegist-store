import React, { useEffect, useState } from 'react';
import { IoEyeSharp } from 'react-icons/io5';
import { HiShoppingBag, HiHeart } from 'react-icons/hi';
import history from '../../until/history';
import { toast } from 'react-toastify';
import { Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { addCart, getCartData } from '../../redux/actions';
import Star from '../Star';
import './styles.scss';

const ProductItem = ({ data, addCart }) => {
  const { t } = useTranslation();

  const [authData, setAuthData] = useState();
  useEffect(() => {
    setAuthData(() => JSON.parse(localStorage.getItem('profile')));
  }, []);

  const handleAddToCart = ({ id, name, newPrice, img }) => {
    if (!authData) {
      history.push('/login');
    } else {
      let arrData = [];
      const productItem = { id, name, price: newPrice, img, amount: 1 };
      const cartData = JSON.parse(localStorage.getItem('CartData'));
      if (cartData.length) {
        const findItem = cartData.find((item) => item.id === id);
        if (findItem) {
          const indexItem = cartData.findIndex((item) => item.id === id);
          cartData.splice(indexItem, 1, {
            ...findItem,
            amount: parseInt(findItem.amount) + 1,
          });
          arrData = [...cartData];
        } else arrData = [...cartData, productItem];
      } else arrData.push(productItem);
      addCart({ user: authData.email, cartData: [...arrData] });
      toast.success(`😍 ${t('Add card success')}!`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  let { id, name, rate, newPrice, oldPrice, news, img } = data;
  const sales = oldPrice && Math.ceil((1 - newPrice / oldPrice) * 100);

  return (
    <div className="product-item">
      <div className="product-item__img">
        <a href="#" className="rotate-img">
          {img && (
            <>
              <img src={img[0]} alt="anh" />
              <img src={img[1]} alt="ANH" />
            </>
          )}
        </a>
        <div className="product-item__widget">
          <span className="icon icon-round product-item__widget-icon">
            <Tooltip placement="top" title="WISHLIST">
              <HiHeart />
            </Tooltip>
          </span>
          <span
            className="icon icon-round product-item__widget-icon"
            onClick={() => handleAddToCart(data)}
          >
            <Tooltip placement="top" title="ADD TO CART">
              <HiShoppingBag />
            </Tooltip>
          </span>

          <span
            onClick={() => history.push(`/product/${id}`)}
            className="icon icon-round product-item__widget-icon"
          >
            <Tooltip placement="top" title="QUICKVIEW">
              <IoEyeSharp />
            </Tooltip>
          </span>
        </div>
        {news && <span className="product-item--new ">New</span>}
        {oldPrice && <span className="product-item--sale">{sales} %</span>}
      </div>
      <div className="product-item__content">
        <Tooltip placement="topLeft" title={name}>
          <h3 className="product-item__name text-clamp text-clamp--1">{name}</h3>
        </Tooltip>
        <div className="product-item__rate">
          <Star rate={rate}></Star>
        </div>
        <div className="product-item__price">
          <span className="product-item__price--new">{`$${newPrice.toLocaleString()} USD`}</span>
          {oldPrice && (
            <span className="product-item__price--old">{` $${oldPrice.toLocaleString()} USD`}</span>
          )}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCart: (params) => dispatch(addCart(params)),
    getCartData: (params) => dispatch(getCartData(params)),
  };
};
export default connect(null, mapDispatchToProps)(ProductItem);
