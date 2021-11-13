import React from 'react';
import { Tabs } from 'antd';

import InfoManage from '../../../components/Profile/InfoManage/index'

import './style.scss';

const { TabPane } = Tabs;

function Profile() {

  return (
    <>
         <Tabs tabPosition='left'>
          <TabPane tab="Tab 1" key="1">
            <InfoManage/>
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab 2
          </TabPane>
        </Tabs>
    </>
  );
}

export default Profile;
