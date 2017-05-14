import React from 'react';
import { Link } from 'react-router';

import { getRoutesList } from 'Core/functions.js';
import globals from 'Core/globals';

export default class Index extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Contact</h1>
            </div>
        );
    }
}
