import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Row, Col, Select, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import CustomField from './CustomField';
import VietNam from '../../../../../assets/images/vietnam.svg';
import English from '../../../../../assets/images/english.svg';
import { FaStarOfLife } from 'react-icons/fa';
import './styles.scss';
import { connect } from 'react-redux';
import {
  createProduct,
  getSidebar,
  updateProduct,
  getProductDetail
} from '../../../../../redux/actions';
import history from '../../../../../until/history';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const AddProductAdmin = ({
  match,
  getSidebar,
  sidebarData,
  createProduct,
  getProductDetail,
  updateProduct,
  productDetail
}) => {
  const productId = match.params.id;
  const { t } = useTranslation();
  const { Option } = Select;
  const location = useLocation();

  useEffect(() => {
    getSidebar();
    if (location.pathname.indexOf(`edit`) !== -1) {
      getProductDetail(productId);
    }
  }, []);

  const handleCreateProduct = values => {
    createProduct({ ...values, newPrice: parseInt(values.newPrice) });
    toast.success('🦄 Thêm sản phẩm thành công !', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
    history.push('/admin/products');
  };

  const handleEditProduct = values => {
    const data = {
      id: productId,
      ...values,
      newPrice: parseInt(values.newPrice)
    };
    updateProduct({ ...data });
    toast.success('🦄 Cập nhật sản phẩm thành công !', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
    history.push('/admin/products');
  };
  return (
    <section className="addProductAdmin">
      <Row justify="center">
        <Col xs={18}>
          <div className="addProductAdmin__container container">
            <h1 className="addProductAdmin__title">{t('admin.products.More new products')}</h1>
            <Formik
              initialValues={{
                name: location.pathname.indexOf(`edit`) !== -1 ? productDetail?.product?.name : '',
                categoryId:
                  location.pathname.indexOf(`edit`) !== -1
                    ? productDetail?.product?.categoryId
                    : '',
                size: location.pathname.indexOf(`edit`) !== -1 ? productDetail?.product?.size : '',
                origin:
                  location.pathname.indexOf(`edit`) !== -1 ? productDetail?.product?.origin : '',
                desc: location.pathname.indexOf(`edit`) !== -1 ? productDetail?.product?.desc : '',
                shortDesc:
                  location.pathname.indexOf(`edit`) !== -1 ? productDetail?.product?.shortDesc : '',
                tagId:
                  location.pathname.indexOf(`edit`) !== -1 ? productDetail?.product?.tagId : '',
                newPrice:
                  location.pathname.indexOf(`edit`) !== -1 ? productDetail?.product?.newPrice : '',
                oldPrice:
                  location.pathname.indexOf(`edit`) !== -1 ? productDetail?.product?.newPrice : ''
                // image: null,
              }}
              validationSchema={Yup.object({
                name: Yup.string()
                  .max(50, t('validate.name.max'))
                  .required(t('validate.name.required')),
                shortDesc: Yup.string().required(t('validate.Short description.required')),
                categoryId: Yup.string().required(t('validate.category.required')),
                origin: Yup.string().required(t('validate.origin.required')),
                tagId: Yup.string().required(t('validate.tag.required')),
                size: Yup.string()
                  .required(t('validate.size.required'))
                  .matches(/([0-9]{1,2})/, t('validate.size.regex')),
                newPrice: Yup.string()
                  .required(t('validate.price.required'))
                  .matches(/(^(1|2|3|4|5|6|7|8|9)+[0-9]{4,8}$)/, t('validate.price.regex')),
                ...(location.pathname.indexOf(`edit`) !== -1 && {
                  oldPrice: Yup.string()
                    .required(t('validate.price.required'))
                    .matches(/(^(1|2|3|4|5|6|7|8|9)+[0-9]{4,8}$)/, t('validate.price.regex'))
                })

                // image: Yup.object().required(t("validate.image.required")),
              })}
              onSubmit={values => {
                if (location.pathname !== `/admin/products/edit/${productId}`)
                  handleCreateProduct(values);
                else handleEditProduct(values);
              }}
              enableReinitialize
            >
              <Form>
                <Row gutter={[24, 16]}>
                  <Col xs={24}>
                    <CustomField
                      name="name"
                      type="text"
                      label={t("admin.products.Product's name")}
                      placeholder={t('admin.products.Enter product name')}
                      required
                    />
                  </Col>
                  <Col xs={24}>
                    <CustomField
                      name="newPrice"
                      type="text"
                      label={t('admin.products.Unit price')}
                      placeholder={t('admin.products.Enter unit price')}
                      required
                    />
                  </Col>
                  {location.pathname.indexOf(`edit`) !== -1 && (
                    <Col xs={24}>
                      <CustomField
                        name="oldPrice"
                        type="text"
                        label={t('admin.products.New price')}
                        placeholder={t('admin.products.Enter new price')}
                        required
                      />
                    </Col>
                  )}
                  <Col xs={24}>
                    <Row align="middle">
                      <Col md={6}>
                        <label className htmlFor="categoryId">
                          {t('admin.products.Product Line')}
                          <FaStarOfLife />
                        </label>
                      </Col>
                      <Col md={18}>
                        <Field
                          name="categoryId"
                          id="categoryId"
                          render={FieldProps => (
                            <Select
                              {...FieldProps.field}
                              style={{ width: '100%' }}
                              className="form__control--select"
                              placeholder={t('admin.products.Select product line')}
                              onChange={value =>
                                FieldProps.form.setFieldValue(FieldProps.field.name, value)
                              }
                            >
                              {sidebarData?.categoryData?.map(item => (
                                <Option key={item.id} value={item.id}>
                                  {item.name}
                                </Option>
                              ))}
                            </Select>
                          )}
                        />
                        <div className="text-danger">
                          <ErrorMessage name="categoryId" />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24}>
                    <CustomField
                      name="size"
                      type="size"
                      label={t('admin.products.Size')}
                      placeholder={t('admin.products.Select...')}
                      required
                    />
                  </Col>
                  <Col xs={24}>
                    <Row align="middle">
                      <Col md={6}>
                        <label className htmlFor="origin">
                          {t('admin.products.Origin')}
                          <FaStarOfLife />
                        </label>
                      </Col>
                      <Col md={18}>
                        <Field
                          name="origin"
                          id="origin"
                          render={FieldProps => (
                            <Select
                              {...FieldProps.field}
                              style={{ width: '100%' }}
                              className="form__control--select"
                              placeholder={t('admin.products.Select...')}
                              onChange={value =>
                                FieldProps.form.setFieldValue(FieldProps.field.name, value)
                              }
                            >
                              <Option value="vi">
                                <img src={VietNam} className="header__language--img" />
                                <span>Viet Nam</span>
                              </Option>
                              <Option value="en">
                                <img src={English} className="header__language--img" />
                                <span>England</span>
                              </Option>
                            </Select>
                          )}
                        />
                        <div className="text-danger">
                          <ErrorMessage name="origin" />
                        </div>
                      </Col>
                    </Row>
                  </Col>{' '}
                  <Col xs={24}>
                    <Row align="middle">
                      <Col md={6}>
                        <label htmlFor="tagId">
                          {t('admin.products.Tag')}
                          <FaStarOfLife />
                        </label>
                      </Col>
                      <Col md={18}>
                        <Field
                          name="tagId"
                          id="tagId"
                          type="select"
                          render={FieldProps => (
                            <Select
                              {...FieldProps.field}
                              style={{ width: '100%' }}
                              className="form__control--select"
                              placeholder={t('admin.products.Select tag')}
                              onChange={value =>
                                FieldProps.form.setFieldValue(FieldProps.field.name, value)
                              }
                            >
                              {sidebarData?.tagsData?.map(item => (
                                <Option value={item.id}>{item.name}</Option>
                              ))}
                            </Select>
                          )}
                        />
                        <div className="text-danger">
                          <ErrorMessage name="tagId" />
                        </div>
                      </Col>
                    </Row>
                  </Col>{' '}
                  <Col xs={24}>
                    <Row align="middle">
                      <Col md={6}>
                        <label htmlFor="image">
                          {t('admin.products.Image')}
                          <FaStarOfLife />
                        </label>
                      </Col>
                      <Col md={18}>
                        <Row align="middle" gutter={[0, 8]}>
                          <Col>
                            <Field
                              name="image"
                              id="image"
                              type="select"
                              render={FieldProps => (
                                <Upload
                                  {...FieldProps.field}
                                  onChange={value =>
                                    FieldProps.form.setFieldValue(FieldProps.field.name, value)
                                  }
                                >
                                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                </Upload>
                              )}
                            />
                          </Col>
                          <Col>
                            {location.pathname.indexOf(`edit`) !== -1 && (
                              <div className=" ">
                                <Row gutter={[16, 24]}>
                                  {productDetail?.product?.img?.map((item, index) => (
                                    <Col md={2} xs={4}>
                                      <img key={index} src={item} alt="anh product"></img>
                                    </Col>
                                  ))}
                                </Row>
                              </div>
                            )}
                          </Col>
                        </Row>

                        <div className="text-danger">
                          <ErrorMessage name="image" />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24}>
                    <CustomField
                      name="shortDesc"
                      required
                      type="text"
                      label={t('admin.products.Short description')}
                      placeholder={t('admin.products.Enter short description')}
                    />
                  </Col>
                  <Col xs={24}>
                    <CustomField
                      name="desc"
                      type="textarea"
                      label={t('admin.products.Describe')}
                      placeholder={t('admin.products.Enter describe')}
                    />
                  </Col>
                  <Col xs={24}>
                    <Row justify="end" align="middle">
                      <button type="submit" className="button button-round--lg button-primary">
                        {location.pathname.indexOf(`/admin/products/edit`) === -1
                          ? t('admin.products.Add new')
                          : 'edit'}
                      </button>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </Formik>
          </div>
        </Col>
      </Row>
    </section>
  );
};

const mapStateToProps = state => {
  const { sidebarData } = state.categoryReducer;
  const { productDetail } = state.productDetailReducer;

  return { sidebarData, productDetail };
};

const mapDispatchToProps = dispatch => {
  return {
    getSidebar: params => dispatch(getSidebar(params)),
    createProduct: params => dispatch(createProduct(params)),
    updateProduct: params => dispatch(updateProduct(params)),
    getProductDetail: params => dispatch(getProductDetail(params))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddProductAdmin);
