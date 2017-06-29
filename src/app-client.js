import React from 'react';
import ReactDOM from 'react-dom';

// Adds ui, vars to all react components
React.Component.prototype.ui = {};
React.Component.prototype.vars = {};

import AppRoutes from './AppRoutes.jsx';
// import globals from 'Core/globals';

import 'wicg-focus-ring';

import './assets/scss/style.scss';


/* For development */
if (module.hot) {
  module.hot.accept();
}
