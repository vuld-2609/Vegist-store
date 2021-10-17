import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Pagination, Input, Modal, Empty, Button } from 'antd';
import { getProducts, deleteProduct, getSidebar, getTotalProducts } from '../../../redux/actions';
import history from '../../../until/history';
import { BsTrashFill } from 'react-icons/bs';
import { IoEyeSharp } from 'react-icons/io5';
import { FaEdit } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

import './styles.scss';

const ListUser = ({
  getProducts,
  deleteProduct,
  productsData,
  getSidebar,
  sidebarData,
  totalProduct,
  getTotalProducts,
}) => {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(1);
  const [isDeleted, setIsDeleted] = useState(false);
  const [search, setSearch] = useState('');
  const [searchKey, setSearchKey] = useState();
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    document.title = 'Vegist | Quản lý sản phẩm';
    getSidebar();
  }, []);

  useEffect(() => {
    getProducts({
      page: current,
      limit: 10,
      searchKey: searchKey,
      sortId: true,
    });
    getTotalProducts({ searchKey: searchKey });
  }, [current, searchKey, isDeleted]);

  const { Search } = Input;

  const handleChange = (e) => {
    const valueInput = e.target.value;
    setSearch(valueInput);

    clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      setSearchKey(valueInput);
      setCurrent(1);
    }, 800);
  };
  function confirm(data) {
    Modal.confirm({
      title: 'Confirm',
      content: (
        <p>
          Do you want to delete this product <span style={{ fontWeight: 600 }}>{data.name}</span> ?
        </p>
      ),
      okText: 'OK',
      cancelText: 'CANCEL',
      onOk() {
        setIsDeleted(!isDeleted);
        deleteProduct({ id: data.id });
      },
      onCancel() {},
    });
  }
  const handelChangePage = (page) => {
    setCurrent(page);
  };
  const renderLocationProduct = () => {
    const start = (current - 1) * 12 + 1;
    let end;
    if (productsData.length >= 12) {
      end = (current - 1) * 12 + 12;
    } else end = start + productsData.length - 1;
    return `${start} - ${end}`;
  };
  return (
    <>
      <section className="admin__listUser admin__products fadeIn">
        <div className="container">
          <div className="admin__listUser--btn">
            <div className="admin__listUser--btn-search">
              <Search
                placeholder="search a product"
                value={search}
                onChange={handleChange}
                enterButton
              />
            </div>
            <div
              className="admin__listUser--btn-create"
              onClick={() => history.push('/admin/products/add')}
            >
              <Button type="primary">Add product</Button>
            </div>
          </div>
          <div className="admin__listUser--tableNormal">
            <table>
              <thead>
                <tr>
                  <td>Key</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Discount</td>
                  <td>Size</td>
                  <td>Category</td>
                  <td>Tag</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {totalProduct?.length > 0 ? (
                  productsData?.map((item, index) => (
                    <>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.oldPrice ? item.oldPrice : item.newPrice}</td>
                        <td>
                          {item.oldPrice
                            ? Math.ceil(-1 + (item.newPrice / item.oldPrice) * 100)
                            : 0}
                          %
                        </td>
                        <td>{item.size || ''}</td>
                        <td>
                          {
                            sidebarData?.categoryData?.find(
                              (itemCategory) => (itemCategory.id = item.categoryId)
                            ).name
                          }
                        </td>
                        <td>
                          {sidebarData?.tagsData?.find((itemTag) => (itemTag.id = item.tagId)).name}
                        </td>
                        <td>
                          <button
                            className="button"
                            onClick={() => history.push(`/product/${item.id}`)}
                          >
                            <IoEyeSharp />
                          </button>
                          <button
                            className="button"
                            onClick={() => history.push(`/admin/products/edit/${item.id}`)}
                          >
                            <FaEdit />
                          </button>

                          <button className="button" onClick={() => confirm(item)}>
                            <BsTrashFill />
                          </button>
                        </td>
                      </tr>
                    </>
                  ))
                ) : (
                  <Empty />
                )}
              </tbody>
            </table>
          </div>
          <div className="admin__listUser--pagination">
            {totalProduct?.length > 10 && (
              <section className="pagination">
                <div className="pagination__result">
                  {t('products.Showing')} {renderLocationProduct()} {t('products.of')}{' '}
                  {totalProduct.length} {t('products.result')}
                </div>
                <Pagination
                  current={current}
                  onChange={handelChangePage}
                  total={totalProduct?.length}
                  defaultPageSize={12}
                />
              </section>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  const { deleteProduct, productsData, totalProduct } = state.productReducer;
  const { sidebarData } = state.categoryReducer;
  return {
    deleteProduct,
    productsData,
    sidebarData,
    totalProduct,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: (params) => dispatch(getProducts(params)),
    getTotalProducts: (params) => dispatch(getTotalProducts(params)),
    deleteProduct: (params) => dispatch(deleteProduct(params)),
    getSidebar: (params) => dispatch(getSidebar(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListUser);
