import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
import { Checkbox, Input, Row, Col, Select } from 'antd';
import * as Yup from 'yup';
import PaymentBreadcrumb from './component/PaymentBreadcrumb';
import CustomField from './component/CustomField';
import VietNam from '../../../assets/images/vietnam.svg';
import English from '../../../assets/images/english.svg';
import './styles.scss';
import { createBill, getInfo } from '../../../redux/actions';

const Information = ({ getInfo, infoUser, cartData, createBill }) => {
  const { Option } = Select;
  const { t } = useTranslation();
  const [valueSelect, setValueSelect] = useState('vi');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  useEffect(() => {
    document.title = 'Vegist | Thông tin';
    getInfo({ email: user.email });
  }, []);

  const handleSubmitForm = values => {
    const { firstName, lastName, ...other } = values;
    const paymentCode = `ARYA${infoUser.id}${Math.floor(
      Math.random() * values.zipCode + infoUser.id
    )}`;
    const dataForm = {
      user: user.email,
      name: `${firstName} ${lastName}`,
      country: valueSelect,
      cartData: [...cartData.cartData],
      cartId: cartData.id,
      paymentCode,
      ...other
    };
    createBill({ ...dataForm });
  };

  return (
    <div className="payment-page fadeIn">
      <div className="container payment__container">
        <section className="information">
          <h1 className="information__title">vegina-store</h1>
          <PaymentBreadcrumb />
          <Formik
            initialValues={{
              email: infoUser?.email,
              firstName: infoUser?.first,
              lastName: infoUser?.last,
              address: infoUser?.address || '',
              zipCode: infoUser?.zipCode || '',
              phone: infoUser?.phone || '',
              check: true
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .required(t('validate.email.required'))
                .max(50, t('validate.email.max'))
                .email('Email không hợp lệ'),
              firstName: Yup.string()
                .max(50, t('validate.firstName.max'))
                .required(t('validate.firstName.required')),
              lastName: Yup.string()
                .max(20, t('validate.lastName.max'))
                .required(t('validate.lastName.required')),
              phone: Yup.string()
                .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, t('validate.phone.regex'))
                .required(t('validate.phone.required')),
              address: Yup.string()
                .required(t('validate.address.required'))
                .max(100, t('validate.address.max')),
              zipCode: Yup.string().matches(/([0-9]{6})/, t('validate.zipCode'))
            })}
            onSubmit={values => handleSubmitForm(values)}
            enableReinitialize
          >
            <Form>
              <Row gutter={[24, 16]}>
                <Col xs={24}>
                  <CustomField name="email" type="email" label="Email" />
                </Col>
                <Col xs={24}>
                  <div className="form__control">
                    <Field
                      type="checkbox"
                      name="check"
                      render={({ field }) => (
                        <Checkbox {...field}>{t('payments.information.check')}</Checkbox>
                      )}
                    />
                  </div>
                </Col>

                <Col sm={12} xs={24}>
                  <CustomField
                    name="firstName"
                    type="text"
                    label={t('payments.information.First name')}
                  />
                </Col>

                <Col sm={12} xs={24}>
                  <CustomField
                    name="lastName"
                    type="text"
                    label={t('payments.information.Last name')}
                  />
                </Col>
                <Col sm={15} xs={24}>
                  <CustomField
                    name="address"
                    type="text"
                    label={t('payments.information.Address')}
                  />
                </Col>
                <Col sm={9} xs={24}>
                  <CustomField name="phone" type="text" label={t('payments.information.Phone')} />
                </Col>
                <Col sm={9} xs={24}>
                  <div className="form__control">
                    <label htmlFor="title">{t('payments.information.Country/region')}</label>
                    <Field
                      name="country"
                      render={({ field }) => (
                        <Select
                          {...field}
                          defaultValue="vi"
                          style={{ width: '100%' }}
                          className="form__control--select"
                          onChange={value => setValueSelect(value)}
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
                  </div>
                </Col>
                <Col sm={15} xs={24}>
                  <CustomField
                    name="zipCode"
                    type="text"
                    label={t('payments.information.ZIP code')}
                  />
                </Col>
                <Col>
                  <button type="submit" className="button button-round--lg button-primary">
                    {t('payments.information.Continue to shipping')}
                  </button>
                  <button type="button" className="button button-round--lg button-transparent">
                    {t('payments.information.Return to cart')}
                  </button>
                </Col>
              </Row>
            </Form>
          </Formik>
        </section>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const { infoUser } = state.accountReducer;
  const { cartData } = state.cartReducer;
  const { billData } = state.paymentReducer;
  return { infoUser, cartData, billData };
};

const mapDispatchToProps = dispatch => {
  return {
    getInfo: params => dispatch(getInfo(params)),
    createBill: params => dispatch(createBill(params))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Information);
