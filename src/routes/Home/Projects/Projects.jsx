import React from 'react';
import { Link } from 'react-router-dom';

import s from './projects.scss';

import {SectionHeading, Project} from 'Components';

export default class Projects extends React.Component {

	render() {
		return (
			<section className={s.wrapper}>
				<i className="anchor" id="web"></i>

				<SectionHeading></SectionHeading>

				<Project></Project>

			</section>
		);
	}
}
