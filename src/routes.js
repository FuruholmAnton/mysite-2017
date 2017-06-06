import React from 'react';
import { Route, IndexRoute } from 'react-router';
import BaseLayout from './layouts/Base';
import { onRouteChange } from './core/functions';

import Home from './components/Home';
import PageNotFound from './components/NotFound';

export default (
	<Route path="/" name="Home" slug="home" onChange={onRouteChange} component={BaseLayout}>
		<IndexRoute component={Home} />
		<Route path="*" name="Page not found" slug="404" component={PageNotFound} />
	</Route>
);
