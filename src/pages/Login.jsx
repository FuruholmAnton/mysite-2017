import React from 'react';
import { Link } from 'react-router';


export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.authGoogle = this.authGoogle.bind(this);
    }

    componentDidMount() {

    }

    authGoogle() {
        console.log('Auth');
    }

    render() {
        return (
            <div className="wrapper">
                <h2>Login with email</h2>
                <form action="">
                    <input type="email"/>
                    <input type="password"/>
                    <button type="submit">Login</button>
                </form>
                <h2>Other</h2>
                <div>
                    <button onClick={this.authGoogle} className="button">Google</button>
                </div>
            </div>
        );
    }
}
