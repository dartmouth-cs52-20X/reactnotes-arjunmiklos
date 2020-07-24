import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
import './style.scss';
import CreateBar from './components/createBar';
import Note from './components/note';
import * as db from './services/datastore';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line new-cap
      notes: Map(),
    };
  }

  componentDidMount() {
    db.fetchNotes((notes) => {
      // eslint-disable-next-line new-cap
      this.setState({ notes: Map(notes) });
    });
  }

  makeNote = (title) => {
    // const note = {
    //   title,
    //   text: '',
    //   x: 400,
    //   y: 12,
    //   zIndex: this.state.nextHeight,
    // };
    // this.setState((prevState) => ({
    //   notes: prevState.notes.set(prevState.nextId, note),
    //   nextId: prevState.nextId + 1,
    //   nextHeight: prevState.Height + 1,
    // }));
    db.addNote(title);
  }

  deleteNote = (id) => {
    // this.setState((prevState) => ({
    //   notes: prevState.notes.delete(id),
    // }));
    db.deleteNote(id);
  }

  updateNote = (id, changeType, change) => {
    db.updateNote(id, changeType, change);
  }

  // Got this error before: Cannot update during an existing state transition
  // Fixed it by using solution from https://stackoverflow.com/questions/37387351/reactjs-warning-setstate-cannot-update-during-an-existing-state-transiti
  renderNotes() {
    return this.state.notes.entrySeq().map(([id, note]) => {
      return (<Note key={id} id={id} note={note} delete={this.deleteNote} update={this.updateNote} />);
    });
  }

  render() {
    return (
      <div id="wrapper">
        <div className="header-section">
          <CreateBar add={this.makeNote} />
        </div>
        <div className="noteSection">{this.renderNotes()}</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
