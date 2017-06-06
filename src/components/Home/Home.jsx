import React from 'react';
import { Link } from 'react-router-dom';

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
          <Link to="/"><button>Projects</button></Link>
          <Link to="/"><button>About</button></Link>
        </div>
      </div>
    );
  }
}
