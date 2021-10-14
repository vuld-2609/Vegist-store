import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getComment, getProducts } from '../../../redux/actions';
import './styles.scss';
import { Table, Tag, Space } from 'antd';
import { BsReplyAllFill } from 'react-icons/bs';
import { RiDeleteBin5Fill } from 'react-icons/ri';

function ListComponent({ comments, getComment, productsData, getProducts }) {
  useEffect(() => {
    getComment({});
  }, []);

  useEffect(() => {
    getProducts({});
  }, []);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'ID Product',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name Product',
      dataIndex: 'nameProduct',
      key: 'nameProduct',
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
    },
    {
      title: 'Datetime',
      dataIndex: 'datetime',
      key: 'datetime',
    },
    {
      title: 'Action',
      key: 'action',
      render: (action) => (
        <>
          <BsReplyAllFill className="commment__icon commment__icon--reply" />
          <RiDeleteBin5Fill className="commment__icon commment__icon--delete" />
        </>
      ),
    },
  ];

  const renderNameProduct = (idProduct) => {
    let string = '';
    const index = productsData.findIndex((item) => item.id === idProduct);
    string = productsData[index].name;
    return string;
  };

  const renderData = () => {
    let newArr = [];
    comments.map((item, index) => {
      newArr.push({
        stt: index + 1,
        id: item.idProduct,
        nameProduct: item.nameProduct || renderNameProduct(Number(item.idProduct)),
        userName: item.name,
        title: item.title,
        content: item.content,
        rate: item.rate,
        datetime: item.datetime,
      });
    });
    return newArr;
  };

  return (
    <section className="comment">
      <div className="comment__wrapper">
        <Table columns={columns} dataSource={renderData()} className="comment__table" />
      </div>
    </section>
  );
}

// export default ListComponent;
const mapStateToProps = (state) => {
  const { comments } = state.productDetailReducer;
  const { productsData } = state.productReducer;
  return {
    comments,
    productsData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getComment: (params) => dispatch(getComment(params)),
    getProducts: (params) => dispatch(getProducts(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListComponent);
