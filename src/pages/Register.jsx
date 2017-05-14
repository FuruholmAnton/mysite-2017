import React from 'react';
import { Link } from 'react-router';


export default class Register extends React.Component {

    constructor(props) {
        super(props);

        this.registerGoogle = this.registerGoogle.bind(this);
    }

    componentDidMount() {
        this.provider = new firebase.auth.GoogleAuthProvider();
    }

    registerGoogle() {
        firebase.auth().signInWithPopup(this.provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            let token = result.credential.accessToken;
            // The signed-in user info.
            let user = result.user;
            console.log(user);

            // ...
        }).catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // The email of the user's account used.
            let email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            let credential = error.credential;
            // ...
        });
    }

    render() {
        return (
            <div>
                <h2>Register with email</h2>
                <form action="">
                    <input type="email" />
                    <input type="password" />
                    <input type="checkbox"/> <label htmlFor="">Show password</label>
                    <button type="submit" className="button">Register</button>
                </form>
                <h2>Other</h2>
                <div>
                    <button onClick={this.registerGoogle}>Google</button>
                </div>
            </div>
        );
    }
}
