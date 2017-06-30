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
					<a href="/web-projects/walnut/" className="box_image"></a>

					<div className="box_content">
							<h4 className="box_title heading">WalnutJS</h4>
							<div className="boxTools_list"><span className="boxTool_item">JavaScript</span> <span className="boxTool_item">SVG</span></div>
							<p className="box_copy">WalnutJS is an overlaying image viewer made with Vanilla JavaScript. It’s responsive and the viewer is made for developers who needs a fast option, who don’t want to put down a lot of time trying to figure out how it works.</p>
							<a href="/web-projects/walnut/" className="box_moreBtn">Read more</a>
					</div>
				</li>
			</div>
		);
	}
}
