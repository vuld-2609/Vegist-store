import React from 'react';
import { Tabs } from 'antd';

import InfoManage from '../../../components/Profile/InfoManage/index'
import CartManage from '../../../components/Profile/CartManage/index'

import './style.scss';

const { TabPane } = Tabs;

function Profile() {

  return (
    <>
      <Tabs tabPosition='left'>
        <TabPane tab="Info Manage" key="1">
          <InfoManage/>
        </TabPane>
        <TabPane tab="Order Manage" key="2">
          <CartManage/>
        </TabPane>
    </Tabs>
    </>
  );
}

export default Profile;
