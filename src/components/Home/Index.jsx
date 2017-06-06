import React from 'react';
import { Link } from 'react-router';

// const image = require('Images/home.jpg');

export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container" /* style={{ backgroundImage: `url(${image})` }}*/>
        <h1 className="home_heading">Home</h1>
        <div className="home_navigation">
          <button>Projects</button>
          <button>About</button>
        </div>
      </div>
    );
  }
}
