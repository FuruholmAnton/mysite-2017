
import React from 'react';
import { Link } from 'react-router';
import vent from '../core/eventEmitter.js';
import { getRoutesList } from 'Core/functions.js';

import List from 'Components/List';
import { Hamburger as HamburgerIcon } from 'SVG';

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
    };

    // This binding is necessary to make `this` work in the callback
    this.toggleMenu = this.toggleMenu.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  componentDidMount() {
    vent.on('menu:toggle', this.toggleMenu);
    vent.on('menu:open', this.openMenu);
    vent.on('menu:close', this.closeMenu);

    this.setState({
      initialSize: this.ui.expander.offsetHeight,
    });
  }

  toggleMenu() {
    // this.setState((prevState) => ({
    //   isMenuOpen: !prevState.isMenuOpen,
    // }));
    this.setState({ isMenuOpen: !this.state.isMenuOpen }, () => {
      const tl = new TimelineMax();
      const expander = this.ui.expander;
      const menu = this.ui.menu;
      const menuLinks = Array.from(document.querySelectorAll('.menu_list-link'));

      if (this.state.isMenuOpen) {
        menuLinks.forEach((el) => {
            el.style.transform = 'translateY(-100%)';
        });
        tl.to(expander, 0.3, { height: '100vh', width: '100vw', y: '0', x: '0' });
        tl.to(expander, 0.2, { borderRadius: '20px' }, '-=0.1');
        tl.set(menu, { visibility: 'visible', opacity: '1' });
        // tl.set(heading, { opacity: '0' });
        tl.set(menuLinks, { opacity: '0' });
        tl.staggerTo(menuLinks, 0.4, { y: '0%', opacity: '1' }, 0.1);
        // tl.to(heading, 1.2, { opacity: '1', ease: Expo.easeOut });
      } else {
        tl.fromTo(menu, 0.2, { opacity: '1' }, { opacity: '0', ease: Power3.easeIn });
        tl.to(expander, 0.3, { height: this.state.initialSize, width: this.state.initialSize, y: '10px', x: '-10px', borderRadius: this.state.initialSize });
        tl.set(menu, { visibility: 'hidden' });
        tl.set(menuLinks, { clearProps: 'all' });
      }
    });

    // const isOpen = document.body.classList.toggle('menu-is-open');
  }

  closeMenu() {
    document.body.classList.remove('menu-is-open');
    this.setState({
      isMenuOpen: false,
    });
    vent.emit('shadow:hide');
  }

  openMenu() {
    document.body.classList.add('menu-is-open');
    this.setState({
      isMenuOpen: true,
    });
  }

  render() {
    return (
      <div className="menu_wrapper">

        <div className="menu_expander" ref={(ref) => { this.ui.expander = ref; }}></div>

        <button onClick={this.toggleMenu} className="menu_hamburgerIcon">
          <HamburgerIcon />
        </button>

        <nav className={(this.state.isMenuOpen ? 'is-open' : (this.state.isMenuOpen != null ? 'is-closed' : '')) + ' menu'}
            ref={(ref) => { this.ui.menu = ref; }}>
          <Link to="/" onClick={() => {
            vent.emit('menu:close');
          }}>
          </Link>

          <ul className="menu_list">
            <li className="menu_list-item"><a href="#" className="menu_list-link">Test</a></li>
            <li className="menu_list-item"><a href="#" className="menu_list-link">Test</a></li>
            <li className="menu_list-item"><a href="#" className="menu_list-link">Test</a></li>
            <li className="menu_list-item"><a href="#" className="menu_list-link">Test</a></li>
          </ul>
        </nav>

      </div>
    );
  }
}
