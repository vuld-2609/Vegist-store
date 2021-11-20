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
          <TabPane tab="Tab 1" key="1">
            <CartManage/>
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            <InfoManage/>
          </TabPane>
        </Tabs>
    </>
  );
}

export default Profile;
