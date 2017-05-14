import React from 'react';
import { Link } from 'react-router';
// import vent from 'Core/eventEmitter';

import { LeftArrow } from 'SVG';
import Menu from 'Components/Menu';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'isToggleOn': true,
      'isChildView': false,
      'back-url': '',
      'title': props.title,
    };
  }

  // toggleMenu(e) {
  //   e.preventDefault();
  //   console.log('Click');
  //   vent.emit('menu:toggle');
  //   vent.emit('shadow:toggle');
  // }

  render() {
    let backBtn;
    if (this.props['back-url']) {
      backBtn = (
        <Link to={'/' + this.props['back-url']} className={'header_backButton'}>
          <LeftArrow />
          {this.props['back-name'] || 'Home'}
        </Link>
      );
    }

    /* <h2 className="header_heading" ref={(ref) => { this.ui.heading = ref; }}>Furuholm</h2>*/
    return (
      <header className={`header js-header`}>
        {backBtn}

        <Menu />
      </header>
    );
  }
}

Header.propTypes = {
  title: React.PropTypes.string,
};
