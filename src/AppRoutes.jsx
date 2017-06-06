import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Home from './components/Home';

export default class AppRoutes extends React.Component {
	render() {
		return (<Router>
			<div>
				<ul>
					<li><Link to="/">Go Home</Link></li>
				</ul>

				<hr/>

				<Route exact path="/" component={Home}/>
			</div>
		</Router>);
	}
}



// export default class AppRoutes extends React.Component {

//   // render() {
//   //   return <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)} />;
//   // }
// }
