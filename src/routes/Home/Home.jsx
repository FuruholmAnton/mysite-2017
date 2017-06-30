import React from 'react';
import { Link } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
// const image = require('./images/home.jpg');
import Hero from './Hero/Hero';
import Projects from './Projects/Projects';

import s from './home.css';

export default class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillUnmount() {

	}

	render() {
		return (
			<main className={`container ${s.wrapper}`} key="sadwaw" /* style={{ backgroundImage: `url(${image})` }}*/>
				<Hero></Hero>
				<Projects></Projects>
			</main>
		);
	}
}
