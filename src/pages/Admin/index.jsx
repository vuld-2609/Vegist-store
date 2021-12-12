import { ContainerOutlined, PieChartOutlined } from '@ant-design/icons';
import { Menu, Modal } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineHome } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { FaRegCommentDots } from 'react-icons/fa';
import { RiBillLine } from 'react-icons/ri';
import history from '../../until/history';
import './style.scss';

const Admin = () => {
  const { t } = useTranslation();
  document.title = 'Vegist | Trang Admin';
  const [collapsed, setCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [authData, setAuthData] = useState(JSON.parse(localStorage.getItem('profile')));

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    history.push('/login');
    localStorage.clear();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="admin-navbar" style={{ width: 256 }}>
        <Menu
          inlineCollapsed={collapsed}
          defaultSelectedKeys={['3']}
          defaultOpenKeys={['3']}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="1">
            {authData && (
              <>
                <div className="admin__account" onClick={showModal}>
                  <div className="admin__account--avt">
                    <img src={authData?.avatar} alt="avatar" />
                  </div>
                  <p className="admin__account--name">{authData?.fullName}</p>
                </div>
                <Modal
                  title="Notification"
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <p>Do you want to sign out?</p>
                </Modal>
              </>
            )}
          </Menu.Item>
          <Menu.Item key="2" icon={<AiOutlineHome />} onClick={() => history.push('/')}>
            {t('admin.home')}
          </Menu.Item>
          <Menu.Item key="3" icon={<PieChartOutlined />}>
            OPTION 1
          </Menu.Item>
          <Menu.Item onClick={() => history.push('/admin/listUser')} key="4" icon={<BiUser />}>
            {t('admin.listUser.title')}
          </Menu.Item>
          <Menu.Item
            key="5"
            icon={<ContainerOutlined />}
            onClick={() => history.push('/admin/products')}
          >
            {t('admin.listProduct.title')}
          </Menu.Item>
          <Menu.Item key="6" icon={<RiBillLine />} onClick={() => history.push('/admin/listOrder')}>
            {t('admin.listOrder.title')}
          </Menu.Item>
          <Menu.Item
            key="7"
            icon={<FaRegCommentDots />}
            onClick={() => history.push('/admin/listComment')}
          >
            {t('admin.listComment.title')}
          </Menu.Item>
          <Menu.Item
            key="8"
            icon={<ContainerOutlined />}
            onClick={() => history.push('/admin/discount')}
          >
            {t('admin.discount.title')}
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
};
export default Admin;
