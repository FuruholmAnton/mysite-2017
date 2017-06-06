import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';

export default class AppRoutes extends React.Component {
	render() {
		return (<Router>
			<div>
				<ul>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/about">About</Link></li>
				</ul>

				<hr/>

				<Route exact path="/" component={Home}/>
				<Route path="/about" component={About}/>
			</div>
		</Router>);
	}
}



// export default class AppRoutes extends React.Component {

//   // render() {
//   //   return <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)} />;
//   // }
// }
