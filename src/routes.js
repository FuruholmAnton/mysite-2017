import React from 'react';
import { Route, IndexRoute } from 'react-router';
import BaseLayout from './layouts/Base';

import HomePage from 'Pages/Home';
import Contact from 'Pages/Contact';
import PageNotFound from 'Pages/NotFound';

import { onRouteChange } from './core/functions';

// Adds ui, vars to all react components
React.Component.prototype.ui = {};
React.Component.prototype.vars = {};

const routes = (
  <Route path="/" name="Home" slug="home" onChange={onRouteChange} component={BaseLayout}>
    <IndexRoute component={HomePage} />
    <Route path="/contact" name="Contact" slug="contact" component={Contact} />
    <Route path="*" name="Page not found" slug="404" component={PageNotFound} />
  </Route>
);

export default routes;
