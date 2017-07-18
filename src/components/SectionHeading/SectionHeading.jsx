import React from 'react';
import { Link } from 'react-router-dom';

import s from './section-heading.scss';

export default class SectionHeading extends React.Component {

	render() {
		return (
			<header className="">
				<span className={s.line}></span>
				<h2 className={s.heading}>Web Projects</h2>
				<p className={s.text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique nihil molestias laborum ab distinctio, temporibus necessitatibus est quam ullam odio quo optio aperiam mollitia repellendus animi quia earum iste voluptatibus.</p>
			</header>
		);
	}
}
