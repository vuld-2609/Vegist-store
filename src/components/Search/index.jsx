import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiSearch } from 'react-icons/bi';
import { connect } from 'react-redux';
import { getTotalProducts, setFlagSearchChange, setValueSearch } from '../../redux/actions';
import history from '../../until/history';
import './styles.scss';

function Search({
  value,
  setValue,
  totalProduct,
  getTotalProducts,
  setFlagSearchChange,
  setValueSearch,
}) {
  const { t, i18n } = useTranslation();

  const [flag, setFlag] = useState(true); //Biến cờ để bật/tắt list kết quả tìm kiếm

  const typingTimeoutRef = useRef(null); //Debounce

  //debounce
  const handleChangeSearch = (e) => {
    setValue(e.target.value);
    setFlag(true);
    //Điều chỉnh thanh Scroll.
    if (e.target.value) setFlagSearchChange(true);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (e.target.value)
        getTotalProducts({
          searchKey: e.target.value,
        });
    }, 300);
  };

  const handleClickSearch = () => {
    setValueSearch(value);
    setFlag(false);
    setFlagSearchChange(false);
    history.push('/products');
  };

  const handleClickSearchItem = (id) => {
    setFlag(false);
    setFlagSearchChange(false);
    history.push(`/product/${id}`);
  };

  return (
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

        {value && totalProduct.length && flag ? (
          <ul className="header__search--list">
            {totalProduct.map((item) => (
              <li
                className="header__search--item"
                key={item.id}
                onClick={() => handleClickSearchItem(item.id)}
              >
                {item.img && <img src={item.img[0]} alt="img" className="header__search--img" />}
                <div className="header__search--wrapper">
                  <span>{item.name}</span>
                  <span>{`$${item.newPrice.toLocaleString()} USD`}</span>
                </div>
              </li>
            ))}
            <li className="header__search--item">
              <p className="header__search--result" onClick={handleClickSearch}>{`${t(
                'header_text.search'
              )} (${totalProduct.length})`}</p>
            </li>
          </ul>
        ) : null}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { totalProduct } = state.productReducer;
  return {
    totalProduct,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setValueSearch: (params) => dispatch(setValueSearch(params)),
    getTotalProducts: (params) => dispatch(getTotalProducts(params)),
    setFlagSearchChange: (params) => dispatch(setFlagSearchChange(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
