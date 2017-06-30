import React from 'react';
import { Link } from 'react-router-dom';

import s from './hero.css';

export default class Hero extends React.Component {
	componentWillUnmount() {

	}

	render() {
		return (
			<section className={s.wrapper}>
				<h1 className={s.heading}>Home</h1>
			</section>
		);
	}
}
