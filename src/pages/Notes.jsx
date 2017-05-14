import React from 'react';
import { Link } from 'react-router';

import vent from 'Core/eventEmitter';
import globals from 'Core/globals';

import List from 'Components/List';
import CreateButton from 'Components/CreateButton';

import NoteSVG from 'SVG/note';

export default class Notes extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      notes: [],
    };

    this.getNotes = this.getNotes.bind(this);
    vent.on('notes:fetch', this.getNotes);
  }

  componentDidMount() {
    console.log('Getting notes');
    const _this = this;

    // check indexedDB

    _this.getNotes();
  }

  /* Fetching all the notes from the server */
  getNotes() {
    const _this = this;
    let userId = firebase.auth().currentUser.uid;

    firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      let notes = snapshot.val().notes;
      let newNotes = [];
      _this.setState({
        notes: newNotes,
      });
      console.log(notes);

      for (let [key, value] of Object.entries(notes)) {
        firebase.database().ref('/notes/' + key).once('value').then(function(note) {
          let n = note.val();
          n.key = key;
          n.path = '/notes/' + key;

          newNotes.push(n);
          globals.notes.push(n);

          _this.setState({
            notes: newNotes,
          });
        });
      }
      // ...
    }).catch(function(error) {
      console.log(error);
    });
  }

  render() {
    return (
      <nav className="athletes-menu">
        <List list={this.state.notes} expandable />

        <CreateButton options={[
            {
              title: 'Note',
              type: 'note',
              content: <NoteSVG />,
            },
          ]} />
      </nav>
    );
  }
}
