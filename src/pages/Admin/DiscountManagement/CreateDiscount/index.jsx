import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Row, Col, DatePicker } from 'antd';
import CustomField from '../../../../components/Admin/CustomField/index';
import { AiOutlineRollback } from 'react-icons/ai';
import { FaStarOfLife } from 'react-icons/fa';
import { connect } from 'react-redux';
import { createDiscount } from '../../../../redux/actions';
import history from '../../../../until/history';
import moment from 'moment';
import { dateTime } from '../../../../until/dateTime';
import './style.scss';

const CreateDiscount = ({ createDiscount }) => {
  const { t } = useTranslation();
  const dateFormat = 'DD/MM/YYYY';

  useEffect(() => {
    document.title = 'Vegist | Thêm sản phẩm';
  }, []);

  function disabledDate(current) {
    return current && current < moment().startOf('day');
  }

  const handleCreateDiscount = (values) => {
    const startDate = dateTime(values.startDate._d);
    const endDate = dateTime(values.endDate._d);
    createDiscount({ ...values, startDate, endDate });
    history.push('/admin/discount');
  };
  return (
    <section className="addProductAdmin">
      <Row>
        <Col offset={2}>
          <AiOutlineRollback
            className="icon-back"
            onClick={() => history.push('/admin/discount')}
          />
        </Col>
      </Row>
      <Row justify="center">
        <Col xs={18}>
          <div className="addProductAdmin__container container">
            <h1 className="addProductAdmin__title">{t('admin.products.Create discount')}</h1>
            <Formik
              initialValues={{
                name: '',
                code: '',
                percent: '',
                quantity: '',
                startDate: null,
                endDate: null,
              }}
              validationSchema={Yup.object({
                name: Yup.string()
                  .max(50, t('validate.discount.max'))
                  .required(t('validate.discount.required')),
                code: Yup.string().required(t('validate.discount name.required')),
                startDate: Yup.date().nullable().required('validate.discount start date.required'),
                endDate: Yup.date().nullable().required('validate.discount end date.required'),
                quantity: Yup.string().required(t('validate.discount.required')),
                percent: Yup.string()
                  .required(t('validate.discount.required'))
                  .matches(/(^[1-9]?[0-9]{1}$|^100$)/, t('validate.discount.percent')),
              })}
              onSubmit={(values) => {
                handleCreateDiscount(values);
              }}
              enableReinitialize
            >
              <Form>
                <Row gutter={[24, 16]}>
                  <Col xs={24}>
                    <CustomField
                      name="name"
                      type="text"
                      label={t('admin.discount. Discount name')}
                      placeholder={t('admin.products.Enter discount name')}
                      required
                    />
                  </Col>
                  <Col xs={24}>
                    <CustomField
                      name="code"
                      type="text"
                      label={t('admin.products.Discount code')}
                      placeholder={t('admin.products.Enter discount code')}
                      required
                    />
                  </Col>
                  <Col xs={24}>
                    <CustomField
                      name="percent"
                      type="text"
                      label={t('admin.products.Percent')}
                      placeholder={t('admin.products.Enter percent')}
                      required
                    />
                  </Col>
                  <Col xs={24}>
                    <Row align="middle">
                      <Col md={6}>
                        <label className htmlFor="startDate">
                          {t('admin.discount.StartDate')}
                          <FaStarOfLife />
                        </label>
                      </Col>
                      <Col md={18}>
                        <Field
                          name="startDate"
                          id="startDate"
                          render={(FieldProps) => (
                            <DatePicker
                              {...FieldProps.field}
                              format={dateFormat}
                              disabledDate={disabledDate}
                              onChange={(value) =>
                                FieldProps.form.setFieldValue(FieldProps.field.name, value)
                              }
                            />
                          )}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24}>
                    <Row>
                      <Col md={6}>
                        <label className htmlFor="endDate">
                          {t('admin.discount.EndDate')}
                          <FaStarOfLife />
                        </label>
                      </Col>
                      <Col md={18}>
                        <Field
                          name="endDate"
                          id="endDate"
                          render={(FieldProps) => (
                            <DatePicker
                              {...FieldProps.field}
                              format={dateFormat}
                              disabledDate={disabledDate}
                              onChange={(value) =>
                                FieldProps.form.setFieldValue(FieldProps.field.name, value)
                              }
                            />
                          )}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24}>
                    <CustomField
                      name="quantity"
                      type="text"
                      label={t('admin.products.Quantity')}
                      placeholder={t('admin.products.Enter quantity')}
                      required
                    />
                  </Col>
                  <Col xs={24}>
                    <Row justify="end" align="middle">
                      <button type="submit" className="button button-round--lg button-primary">
                        t('admin.discount.Add new')
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

const mapDispatchToProps = (dispatch) => {
  return {
    createDiscount: (params) => dispatch(createDiscount(params)),
  };
};
export default connect(null, mapDispatchToProps)(CreateDiscount);
