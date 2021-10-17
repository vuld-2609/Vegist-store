import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { connect } from 'react-redux';
import { getCartData, setValueSearch } from '../../redux/actions';
import { useLocation } from 'react-router-dom';

import history from '../../until/history';
import logo from '../../assets/images/logo.png';
import VietNam from '../../assets/images/vietnam.svg';
import English from '../../assets/images/english.svg';
import { useTranslation } from 'react-i18next';

import { AiOutlineUserAdd, AiOutlineHeart } from 'react-icons/ai';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { GiHamburgerMenu, GiExitDoor } from 'react-icons/gi';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './styles.scss';

import Navbar from './Navbar';

const { Option } = Select;

const Header = ({
  getCartData,
  cartData,
  addCartData,
  userDataEdited,
  setValueSearch,
  valueSearch,
  match,
}) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [selectData, setSelectData] = useState([]);
  const [totalItemInCart, setTotalItemInCart] = useState(0);
  const [showNavbar, setShowNavbar] = useState(false);
  const [authData, setAuthData] = useState();
  const options = selectData.map((d) => (
    <Option key={d.value} value={d.value}>
      {d.text}
    </Option>
  ));
  const [value, setValue] = useState('');
  // console.log('Log :  value', value);
  useEffect(() => {
    if (!match.path.includes('/products')) setValue('');
  }, [valueSearch]);

  useEffect(() => {
    if (authData) getCartData({ user: authData.email });
  }, [authData]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('CartData'));
    setTotalItemInCart(
      cart?.reduce(
        (total, currentValue) => {
          return parseInt(total) + currentValue.amount;
        },
        [0]
      )
    );
  }, [cartData, location, addCartData]);

  useEffect(() => {
    setAuthData(() => JSON.parse(localStorage.getItem('profile')));
  }, [location, userDataEdited]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const handleChangeSearch = (e) => {
    setValue(e.target.value);
  };

  const handleClickSearch = () => {
    setValueSearch(value);
    history.push('/products');
  };

  return (
    <header className="header">
      <section className="header__top">
        <div className="container header__top--container">
          <div className="header__language">
            <span>{t('language.name')}: </span>
            <Select onChange={changeLanguage} defaultValue="en">
              <Option value="en">
                <img src={English} className="header__language--img" />
                {t('language.english')}
              </Option>
              <Option value="vi">
                <img src={VietNam} className="header__language--img" />
                {t('language.vietnam')}
              </Option>
            </Select>
          </div>
          <div className="header__text">
            <span className="header__text--animation">{t('header_text.free')}</span>{' '}
            {t('header_text.order')}
          </div>
        </div>
      </section>
      <section className="header__main">
        <div className="container header__main--container">
          <div onClick={() => history.push('/')} className="logo">
            <img src={logo} alt="logo"></img>
          </div>
          <div className="header__search">
            <div className="header__search--form">
              <input
                value={value}
                placeholder="Search..."
                className="header__search--input"
                onChange={handleChangeSearch}
              ></input>
              <div className="icon icon-round" onClick={handleClickSearch}>
                <BiSearch />
              </div>
            </div>
          </div>
          <div className="header__widget">
            <div
              className="header__widget--item icon-hamburger "
              onClick={() => setShowNavbar(true)}
            >
              <GiHamburgerMenu />
            </div>
            <div className="header__widget--account">
              {authData ? (
                <>
                  <div className="header__widget--item">
                    <GiExitDoor
                      onClick={() => {
                        history.push('/');
                        localStorage.clear();
                      }}
                    />
                  </div>
                  <div className="header__widget--account-content">
                    <p
                      onClick={() => history.push('/profile')}
                      className="header__widget--account-title"
                    >
                      {authData?.firstName + ' ' + authData?.lastName}
                    </p>
                    <p>
                      <span
                        onClick={() => {
                          history.push('/');
                          localStorage.clear();
                        }}
                        className="header__widget--account-text"
                      >
                        {t('Logout')}
                      </span>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="header__widget--item">
                    <AiOutlineUserAdd />
                  </div>
                  <div className="header__widget--account-content">
                    <p className="header__widget--account-title">{t('Account')}</p>
                    <p>
                      <span
                        onClick={() => history.push('/register')}
                        className="header__widget--account-text"
                      >
                        {t('Register')}
                      </span>
                      <span
                        onClick={() => history.push('/login')}
                        className="header__widget--account-text"
                      >
                        {t('Login')}
                      </span>
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="header__widget--item">
              <AiOutlineHeart />
              <span className="header__widget--item-count">0</span>
            </div>
            <div className="header__widget--item" onClick={() => history.push('/cart')}>
              <HiOutlineShoppingBag />
              {
                <span className="header__widget--item-count">
                  {totalItemInCart ? totalItemInCart : 0}
                </span>
              }
            </div>
          </div>
        </div>
      </section>
      <section className="header__navbar">
        <div className="container ">
          <Navbar showNavbar={showNavbar} setShowNavbar={setShowNavbar} />
        </div>
      </section>
      <ToastContainer />
    </header>
  );
};

const mapStateToProps = (state) => {
  const { cartData, addCartData } = state.cartReducer;
  const { userDataEdited } = state.accountReducer;
  const { valueSearch } = state.productReducer;
  return {
    userDataEdited,
    cartData,
    addCartData,
    valueSearch,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCartData: (params) => dispatch(getCartData(params)),
    setValueSearch: (params) => dispatch(setValueSearch(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
