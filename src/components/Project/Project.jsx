import React from 'react';
import {
	Link
} from 'react-router-dom';

import s from './project.scss';

export default class Project extends React.Component {

	render() {
		return (
			<div className={s.wrapper}>

				<li className="box_item">
					<a href="/web-projects/walnut/" className={s.image}></a>

					<div className={s.content}>
						<h4 className={s.heading}>WalnutJS</h4>
						<div className={s.tags}><span className="boxTool_item">JavaScript</span> <span className="boxTool_item">SVG</span></div>
						<p className={s.copy}>WalnutJS is an overlaying image viewer made with Vanilla JavaScript. It’s responsive and the viewer is made for developers who needs a fast option, who don’t want to put down a lot of time trying to figure out how it works.</p>
						<Link to="" className={s.button}>Read more</Link>
					</div>
				</li>
			</div>
		);
	}
}
