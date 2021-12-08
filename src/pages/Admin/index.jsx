import { ContainerOutlined, DesktopOutlined, PieChartOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import history from '../../until/history';
import './style.scss';

const Admin = () => {
  const { SubMenu } = Menu;
  const { t } = useTranslation();
  document.title = 'Vegist | Trang Admin';
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <div className="admin-navbar" style={{ width: 256 }}>
        <Menu
          inlineCollapsed={collapsed}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['']}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item
            onClick={() => history.push('/admin/listUser')}
            key="2"
            icon={<DesktopOutlined />}
          >
            {t('admin.listUser.title')}
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<ContainerOutlined />}
            onClick={() => history.push('/admin/products')}
          >
            {t('admin.listProduct.title')}
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<ContainerOutlined />}
            onClick={() => history.push('/admin/listOrder')}
          >
            {t('admin.listOrder.title')}
          </Menu.Item>
          <Menu.Item
            key="5"
            icon={<ContainerOutlined />}
            onClick={() => history.push('/admin/listComment')}
          >
            {t('admin.listComment.title')}
          </Menu.Item>
          {/* <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu> */}
        </Menu>
      </div>
    </>
  );
};
export default Admin;
