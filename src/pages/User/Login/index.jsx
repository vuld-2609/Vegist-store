import React, { useEffect } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import history from '../../../until/history';
import { useTranslation } from 'react-i18next';

import './style.scss';
import { connect } from 'react-redux';
import { getUser } from '../../../redux/actions';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './style.scss';
const Login = ({ getUser, user }) => {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = 'Vegist | Trang Đăng nhập';
  });
  const [form] = Form.useForm();
  const handleSubmitForm = values => {
    getUser(values);
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
                onFinish={values => handleSubmitForm(values)}
                scrollToFirstError
              >
                <div className="register__title">
                  <h2>{t('login.create')}</h2>
                  <p>{t('login.text')}</p>
                </div>
                <div className="login__label">Email</div>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: 'email',
                      message: t('validate.email.regex')
                    },
                    {
                      required: true,
                      message: t('validate.email.required')
                    }
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
                <div className="login__label">{t('password.password')}</div>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      min: 8,
                      message: t('validate.password.regex')
                    },
                    {
                      required: true,
                      message: t('validate.password.required')
                    }
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="Pass word" />
                </Form.Item>
                <Form.Item>
                  <Button type="warning" htmlType="submit">
                    {t('login.button register')}
                  </Button>
                  <div className="forgot--password">
                    <span>{t('login.forgot')}</span>
                  </div>
                </Form.Item>
              </Form>
            </Col>
            <Col lg={7} md={10} xs={24} sm={16}>
              <div className="register__right">
                <p className="register__right--title">{t('login.already')}</p>
                <Button onClick={() => history.push('/register')} type="ghost">
                  {t('login.button login')}
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
      <ToastContainer />
    </>
  );
};

const mapStateToProps = state => {
  const { user } = state.accountReducer;
  return {
    user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUser: params => dispatch(getUser(params))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
