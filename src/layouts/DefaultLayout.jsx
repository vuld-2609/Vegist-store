import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function DefaultLayout({ component: Component, role, ...props }) {
  return (
    <Route
      {...props}
      render={routerProps => (
        <>
          <Header {...routerProps} />
          <div className="main">
            <Component {...routerProps} />
          </div>
          <Footer />
        </>
      )}
    />
  );
}
export default DefaultLayout;
