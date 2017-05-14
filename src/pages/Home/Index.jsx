import React from 'react';
import { Link } from 'react-router';
import globals from 'Core/globals';

// import homeImage from 'Images/home.jpg';
// import assets from '../../webpack-assets.json';
// console.log(assets.assets['./assets/images/home.jpg']);

export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const image = require('Images/home.jpg');
    console.log(image);

    return (
      <div className="container" style={{ backgroundImage: `url(${image})` }}>
        <h1 className="home_heading">Furuholm</h1>
      </div>
    );
  }
}
