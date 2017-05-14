
import React from 'react';
import {Link} from 'react-router';
import vent from '../core/eventEmitter.js';

export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };

        // This binding is necessary to make `this` work in the callback
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {

    }

    render() {
        return (
            <div onClick={this.onClick}></div>
        );
    }
}

Example.propTypes = {
  list: React.PropTypes.array.isRequired,
};
