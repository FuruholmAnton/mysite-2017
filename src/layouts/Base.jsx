import React from 'react';
import Header from './Header.jsx';
import Shadow from '../components/Shadow.jsx';
import vent from '../core/eventEmitter.js';

/**
 *
 *
 * @export The base layout
 * @class BaseLayout
 * @extends {React.Component}
 */
export default class BaseLayout extends React.Component {
	constructor(props) {
		super(props);
		// console.log(props);
	}

	componentDidMount() {
		// document.body.classList.add(`page-${}`);
	}

	render() {
		const slug = this.props.routes.filter((n) => { return n.slug; }).pop().slug;
		let content = (
			<div className={`base page-${slug}`}>
				<Header />


				<div className="content">
						{this.props.children}
					<Shadow />
				</div>

				<div className="notification">
					<div className="notification_content"></div>
				</div>

				<footer></footer>
			</div>
		);

		return content;
	}
}

BaseLayout.propTypes = {
	routes: React.PropTypes.array,
};
