import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Admin from '../pages/Admin';

function PrivateLayout({ component: Component, role, ...props }) {
  const userInfo = JSON.parse(localStorage.getItem('profile'));
  if (userInfo && userInfo.email) {
    if (userInfo.role !== 'admin') {
      return <Redirect to="/" />;
    }
  } else {
    return <Redirect to="/login" />;
  }

  return (
    <Route
      {...props}
      render={routerProps => (
        <>
          <div className="main">
            <div id="admin">
              <Admin {...routerProps} />
              <Component {...routerProps} />
            </div>
          </div>
        </>
      )}
    />
  );
}

export default PrivateLayout;
