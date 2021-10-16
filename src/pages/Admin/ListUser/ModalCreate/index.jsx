import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { createUserByAdmin } from '../../../../redux/actions';
import { regexPhone } from '../../../../Constant';

import { Modal, Button, Select } from 'antd';
import './style.scss';

const ModalCreate = ({ createUserByAdmin }) => {
  const { t } = useTranslation();
  const success = (value) => toast.success(`🦄 ${value}`);
  const { Option } = Select;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectRole, setSelectRole] = useState('user');

  function handleChange(value) {
    setSelectRole(value);
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmitAdd = (value) => {
    createUserByAdmin({
      ...value,
      name: value.first + ' ' + value.last,
      role: selectRole,
    });
    setIsModalVisible(false);
  };
  return (
    <>
      <div className="admin__listUser--modal">
        <Button type="primary" onClick={showModal}>
          ADD USER
        </Button>
        <Modal
          title="ADD NEW USER"
          visible={isModalVisible}
          onCancel={handleCancel}
          className="listUser__modal"
        >
          <Formik
            initialValues={{
              first: '',
              last: '',
              email: '',
              address: '',
              phone: '',
              password: '',
            }}
            enableReinitialize
            validationSchema={Yup.object({
              first: Yup.string().required(t('validate.first')).max(20, t('Profile.max')),
              last: Yup.string().required(t('validate.last')).max(20, t('Profile.max')),
              phone: Yup.string().matches(regexPhone, 'Invalid phone number !'),
              email: Yup.string().required(t('validate.email.required')),
              address: Yup.string().max(50, t('userList.validate.address')),
              password: Yup.string()
                .required(t('validate.password.required'))
                .min(8, t('validate.password.regex')),
            })}
            onSubmit={(value, { resetForm }) => {
              handleSubmitAdd(value);
              resetForm();
            }}
          >
            <Form className="admin__listUser--modal-form">
              <div className="modal__create-input">
                <label htmlFor="first">
                  {t('Profile.account.first')} <span>*</span>
                </label>
                <div>
                  <Field id="first" type="text" name="first" />
                  <p className="error-message">
                    <ErrorMessage name="first" />
                  </p>
                </div>
              </div>
              <div className="modal__create-input">
                <label htmlFor="last">
                  {t('Profile.account.last')} <span>*</span>
                </label>
                <div>
                  <Field id="last" type="text" name="last" />
                  <p className="error-message">
                    <ErrorMessage name="last" />
                  </p>
                </div>
              </div>
              <div className="modal__create-input">
                <label htmlFor="email">
                  Email <span>*</span>
                </label>
                <div>
                  <Field id="email" type="text" name="email" />
                  <p className="error-message">
                    <ErrorMessage name="email" />
                  </p>
                </div>
              </div>
              <div className="modal__create-input">
                <label htmlFor="phone">{t('Profile.account.phone')}</label>
                <div>
                  <Field id="phone" type="text" name="phone" />
                  <p className="error-message">
                    <ErrorMessage name="phone" />
                  </p>
                </div>
              </div>
              <div className="modal__create-input">
                <label htmlFor="address">{t('Profile.account.address')}</label>
                <div>
                  <Field id="address" type="text" name="address" />
                  <p className="error-message">
                    <ErrorMessage name="address" />
                  </p>
                </div>
              </div>
              <div className="modal__create-input">
                <label htmlFor="password">
                  {t('Profile.account.password')} <span>*</span>
                </label>
                <div>
                  <Field id="password" type="password" name="password" />
                  <p className="error-message">
                    <ErrorMessage name="password" />
                  </p>
                </div>
              </div>
              <div className="modal__create-input modal__create-input-modify">
                <label htmlFor="password">{t('Profile.account.role')}</label>
                <div>
                  <Select defaultValue="user" style={{ width: 120 }} onChange={handleChange}>
                    <Option value="user">{t('Profile.account.user')}</Option>
                    <Option value="admin">{t('Profile.account.admin')}</Option>
                  </Select>
                </div>
              </div>
              <div className="modal__form-btn">
                <Button type="primary" htmlType="submit">
                  SUBMIT
                </Button>
                <Button htmlType="reset" type="primary" onClick={handleCancel}>
                  CANCEL
                </Button>
              </div>
            </Form>
          </Formik>
        </Modal>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { listUser } = state.accountReducer;
  return {
    listUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createUserByAdmin: (params) => dispatch(createUserByAdmin(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalCreate);
