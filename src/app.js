import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './AppRoutes.jsx';
import globals from 'Core/globals';
import FastClick from 'fastclick';

import 'wicg-focus-ring';

ReactDOM.render((
  <AppRoutes/>
), document.getElementById('root'));

/* For development */
if (module.hot) {
  module.hot.accept();
}

// Switch off the native scroll restoration behavior and handle it manually
// https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
const scrollPositionsHistory = {};
if (window.history && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// Make taps on links and buttons work fast on mobiles
FastClick.attach(document.body);

