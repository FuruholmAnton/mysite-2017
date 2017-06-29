import React from 'react';
import { Link } from 'react-router';
// import globals from 'Core/globals';

const image = require('Images/home.jpg');

export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  test() {
    alert();
  }

  render() {
    return (
      <div className="container" style={{ backgroundImage: `url(${image})` }}>
        <h1 className="home_heading" onClick={this.test}>Furuholm</h1>
        <div className="home_navigation">
          <Link to="/">Projects</Link>
          <Link to="/">About</Link>
        </div>
      </div>
    );
  }
}
