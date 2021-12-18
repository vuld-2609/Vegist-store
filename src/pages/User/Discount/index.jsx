import React, { useState, useEffect, useRef } from 'react';
import './styles.scss';
import { BiSearch } from 'react-icons/bi';
import Breadcrumb from '../../../components/Breadcrumb';
import { connect } from 'react-redux';
import { getDiscount } from '../../../redux/actions';
import DiscountItem from './../../../components/DiscountItem/index';
import { Col, Empty, Pagination, Row } from 'antd';

function Discount({ getDiscount, discountData, totalDiscount }) {
  console.log('Log :  totalDiscount', totalDiscount);
  console.log('Log :  discountData', discountData);
  const [current, setCurrent] = useState(1);
  const [search, setSearch] = useState('');
  const [searchKey, setSearchKey] = useState();
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    document.title = 'Vegist | Danh sách mã giảm giá';
  }, []);

  useEffect(() => {
    getDiscount({
      page: current,
      limit: 10,
      searchKey: searchKey,
    });
  }, [current, searchKey]);

  const handleChange = (e) => {
    const valueInput = e.target.value;
    setSearch(valueInput);

    clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      setSearchKey(valueInput);
      setCurrent(1);
    }, 800);
  };

  return (
    <section>
      <div className="discount fadeIn">
        <Breadcrumb title="Discount" />
        <h1 className="discount__title">Mã giảm giá Vegist mới nhất</h1>
        <div className="discount__container">
          <h3>Tìm kiếm mã giảm giá</h3>
          <div className="discount__search">
            <input
              className="discount__search--input"
              value={search}
              type="text"
              placeholder="Nhập tên sản phẩm..."
              onChange={handleChange}
            />
            <span className="discount__search--icon">
              <BiSearch className="discount__icon" />
            </span>
          </div>
          <div className="discount__content">
            <h3>DANH SÁCH MÃ KHUYẾN MÃI VEGIST</h3>
            <Row gutter={[16, 16]}>
              {discountData ? (
                discountData.map((item) => (
                  <Col md={12} xs={24} className="discount__border">
                    <DiscountItem
                      code={item.code}
                      name={item.name}
                      percent={item.percent}
                      endDate={item.endDate}
                      quantity={item.quantity}
                    />
                  </Col>
                ))
              ) : (
                <Empty />
              )}
            </Row>
          </div>
          <div className="pagination">
            {discountData?.length ? (
              <Pagination
                current={current}
                onChange={(page) => setCurrent(page)}
                total={totalDiscount}
                defaultPageSize={10}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

// export default Discount;
const mapStateToProps = (state) => {
  const { discountData, totalDiscount } = state.discountReducer;
  return { discountData, totalDiscount };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDiscount: (params) => dispatch(getDiscount(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Discount);
