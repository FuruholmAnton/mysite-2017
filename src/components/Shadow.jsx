
import React from 'react';
import { Link } from 'react-router';
import vent from '../core/eventEmitter.js';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isShadowVisible: undefined };

        // This binding is necessary to make `this` work in the callback
        this.toggleShadow = this.toggleShadow.bind(this);
        this.showShadow = this.showShadow.bind(this);
        this.hideShadow = this.hideShadow.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    toggleShadow() {
        // this.setState(prevState => ({
        //     isShadowVisible: !prevState.isShadowVisible
        // }));

        if (this.state.isShadowVisible !== true) {
            this.showShadow();
        } else {
            this.hideShadow();
        }
    }

    hideShadow() {
        document.body.classList.remove('shadow-is-visible');
        this.setState({
            isShadowVisible: false,
        });
    }

    showShadow() {
        document.body.classList.add('shadow-is-visible');
        this.setState({
            isShadowVisible: true,
        });
    }

    onClick(e) {
        this.toggleShadow();
        if (document.body.classList.contains('menu-is-open')) vent.emit('menu:close');
        if (document.body.classList.contains('createButton-is-open')) vent.emit('createButton:close');
    }

    componentDidMount() {
        vent.on('shadow:toggle', this.toggleShadow);
        vent.on('shadow:show', this.showShadow);
        vent.on('shadow:hide', this.hideShadow);
    }

    render() {
        return (
            <div onClick={this.onClick}
                    className={(this.state.isShadowVisible ? 'is-visible' : (this.state.isShadowVisible === false ? 'is-hidden' : '')) + ' c-shadow'}>
                </div>
        );
    }
}
