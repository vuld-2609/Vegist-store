import { Select } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, Route } from 'react-router-dom';
import English from '../assets/images/english.svg';
import VietNam from '../assets/images/vietnam.svg';
import Admin from '../pages/Admin';
import './styles.scss';
const { Option } = Select;

function PrivateLayout({ component: Component, role, ...props }) {
  const { t, i18n } = useTranslation();

  const userInfo = JSON.parse(localStorage.getItem('profile'));
  if (userInfo && userInfo.email) {
    if (userInfo.role !== 'admin') {
      return <Redirect to="/" />;
    }
  } else {
    return <Redirect to="/login" />;
  }

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Route
      {...props}
      render={(routerProps) => (
        <>
          <div className="main">
            <div className="admin">
              <div className="admin__nav">
                <Admin {...routerProps} />
              </div>
              <div className="admin__wrapper">
                <div className="header__language admin__language">
                  <span>{t('language.name')}: </span>
                  <Select onChange={changeLanguage} defaultValue="en">
                    <Option value="en">
                      <img src={English} className="header__language--img" />
                      {t('language.english')}
                    </Option>
                    <Option value="vi">
                      <img src={VietNam} className="header__language--img" />
                      {t('language.vietnam')}
                    </Option>
                  </Select>
                </div>
                <Component {...routerProps} />
              </div>
            </div>
          </div>
        </>
      )}
    />
  );
}

export default PrivateLayout;
