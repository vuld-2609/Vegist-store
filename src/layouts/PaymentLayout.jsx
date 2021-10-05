import React from 'react';
import { Route } from 'react-router-dom';
import { Steps, Col, Row } from 'antd';
import {
  ShoppingCartOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined
} from '@ant-design/icons';
import './styles.scss';
import InfoCart from '../components/InfoCart';
function PaymentLayout({ component: Component, role, ...props }) {
  const { Step } = Steps;

  return (
    <Route
      {...props}
      render={routerProps => (
        <>
          <div className=" payment-layout">
            <div className="main container">
              <Row justify="center">
                <Col lg={14} md={18} xs={24} className="payment__left">
                  <Component {...routerProps} />
                </Col>
                <Col lg={10} md={18} xs={24}>
                  <InfoCart />
                </Col>
              </Row>
            </div>
          </div>
        </>
      )}
    />
  );
}

export default PaymentLayout;
