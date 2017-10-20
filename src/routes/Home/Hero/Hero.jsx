import React from 'react';
import { Link } from 'react-router-dom';

import s from './hero.scss';

export default class Hero extends React.Component {
	constructor(props) {
		super(props);
		this.handleScroll = this.handleScroll.bind(this);

		this.state = {};
	}

	componentDidMount() {
		const rect = this.heading.getBoundingClientRect();
		this.setState({
			heading: {
				rect: rect,
				top: rect.top + window.pageYOffset,
				speed: rect.left / (rect.top + window.pageYOffset),
				scale: (1 - 0.2) / rect.top + window.pageYOffset,
			},
			subHeading: {
				top: this.subHeading.getBoundingClientRect().top,
			}
		});

		window.addEventListener('scroll', () => {
			requestAnimationFrame(this.handleScroll);
		});
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll(e) {
		const scrollY = window.pageYOffset;

		this.subHeading.style.transform = `translate3d(0, ${scrollY * 0.4}px, 0)`;
		this.subHeading.style.opacity = 1 - scrollY / this.state.subHeading.top;

		if (scrollY < this.state.heading.top) {
			this.heading.style.transform = `translate3d(-${scrollY * this.state.heading.speed}px, 0, 0) scale(${1 - (scrollY || 1) * this.state.heading.scale })`;

			this.heading.classList.remove(s['is-fixed']);
		}
		else {
			this.heading.classList.add(s['is-fixed']);
			this.heading.style.transform = 'scale(0.2)';
		}
	}

	render() {

		return (
			<section className={s.wrapper}>
				<h2 className={s.subHeading} ref={(n) => { this.subHeading = n; }}>Web developer</h2>
				<div className={s.headingWrapper}><h1 className={s.heading} ref={(n) => { this.heading = n; }}>FURUHOLM</h1></div>
			</section>
		);
	}

	// CUSTOM

}
