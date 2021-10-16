import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { editUser } from '../../../../redux/actions';
import { FaEdit } from 'react-icons/fa';
import { regexPhone } from '../../../../Constant';
import { Modal, Button, Select } from 'antd';
import './style.scss';

const ModalModify = ({ editUser, item }) => {
  const { t } = useTranslation();
  const { Option } = Select;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectRole, setSelectRole] = useState(item.role);
  const [isLoading, setIsLoading] = useState(false);

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
    editUser({
      ...value,
      id: item.id,
      name: value.first + ' ' + value.last,
      role: selectRole,
    });
    setIsModalVisible(false);
  };
  return (
    <>
      <div className="admin__listUser--modal">
        <Button type="primary" onClick={showModal}>
          <FaEdit />
        </Button>
        <Modal
          title="MODIFY USER"
          visible={isModalVisible}
          onCancel={handleCancel}
          className="listUser__modal"
        >
          <Formik
            initialValues={{
              first: item.first,
              last: item.last,
              address: item.address,
              phone: item.phone,
            }}
            enableReinitialize
            validationSchema={Yup.object({
              first: Yup.string().required(t('validate.first')).max(20, t('Profile.max')),
              last: Yup.string().required(t('validate.last')).max(20, t('Profile.max')),
              phone: Yup.string().matches(regexPhone, 'Invalid phone number !'),
              address: Yup.string().max(50, t('userList.validate.address')),
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

              <div className="modal__create-input modal__create-input-modify">
                <label htmlFor="password">{t('Profile.account.role')}</label>
                <div>
                  <Select defaultValue={item.role} style={{ width: 120 }} onChange={handleChange}>
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
  const { userEdit, isLoadingEdit } = state.accountReducer;
  return {
    userEdit,
    isLoadingEdit,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (params) => dispatch(editUser(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalModify);
