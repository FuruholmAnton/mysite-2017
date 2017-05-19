import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './AppRoutes.jsx';
import globals from 'Core/globals';

import 'wicg-focus-ring';

/* For development */
if (module.hot) {
  module.hot.accept();
}

window.onload = () => {
  let presenceRef = firebase.database().ref('disconnectmessage');
  // Write a string when this client loses connection
  presenceRef.onDisconnect().set('Firebase disconnected!');

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      ReactDOM.render(<AppRoutes />, document.getElementById('main'));
    } else {
      // No user is signed in.
      this.provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(this.provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        let token = result.credential.accessToken;
        // The signed-in user info.
        let user = result.user;
        console.log(user);
        // vent.emit('notes:fetched');

        ReactDOM.render(<AppRoutes />, document.getElementById('main'));
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
  });
};
