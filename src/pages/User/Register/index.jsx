import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import history from '../../../until/history';
import { useTranslation } from 'react-i18next';

import { createAccount } from '../../../redux/actions';
import { connect } from 'react-redux';
import './style.scss';

const Register = (prop) => {
  document.title = 'Vegist | Trang Đăng kí';
  const { t } = useTranslation();
  const { createAccount } = prop;
  const [form] = Form.useForm();
  const handleSubmitForm = (values) => {
    createAccount({
      ...values,
      name: values.first + ' ' + values.last,
    });
  };
  return (
    <>
      <section className="register fadeIn">
        <div className="container">
          <Row justify="center">
            <Col md={10} sm={12} xs={24} lg={7}>
              <Form
                form={form}
                name="register"
                className="form-register"
                onFinish={(values) => handleSubmitForm(values)}
                scrollToFirstError
              >
                <div className="register__title">
                  <h2>{t('register.create')}</h2>
                  <p>{t('register.text')}</p>
                </div>
                <Form.Item
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: t('validate.first'),
                      whitespace: true,
                    },
                  ]}
                >
                  <Input placeholder="First name" />
                </Form.Item>
                <Form.Item
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: t('validate.last'),
                      whitespace: true,
                    },
                  ]}
                >
                  <Input placeholder="Last name" />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: 'email',
                      message: t('validate.email.regex'),
                    },
                    {
                      required: true,
                      message: t('validate.email.required'),
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      min: 8,
                      message: t('validate.password.regex'),
                    },
                    {
                      required: true,
                      message: t('validate.password.required'),
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="Pass word" />
                </Form.Item>
                <Form.Item>
                  <Button type="warning" htmlType="submit">
                    {t('register.button register')}
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col lg={7} md={10} xs={24} sm={16}>
              <div className="register__right">
                <p className="register__right--title">{t('register.already')}</p>
                <Button onClick={() => history.push('/login')} type="ghost">
                  {t('register.button login')}
                </Button>
                <div className="term-privacy">
                  <p>
                    *<span>{t('Terms & Conditions.title')}</span>
                  </p>
                  <p>
                    {t('Terms & Conditions.content')}
                    <span>{t('Terms & Conditions.privacy')}</span>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  const { user, userList } = state.accountReducer;
  return {
    user,
    userList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createAccount: (params) => dispatch(createAccount(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
