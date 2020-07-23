import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
import './style.scss';
import CreateBar from './components/createBar';
import Note from './components/note';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line new-cap
      notes: Map({
        1: {
          title: 'This is a note',
          text: 'This is some content',
          x: 400,
          y: 12,
          zIndex: 1,
        },
      }),
      nextId: 2,
      nextHeight: 2,
    };
  }

  makeNote = (title) => {
    const note = {
      title,
      text: '',
      x: 400,
      y: 12,
      zIndex: this.state.nextHeight,
    };
    this.setState((prevState) => ({
      notes: prevState.notes.set(prevState.nextId, note),
      nextId: prevState.nextId + 1,
      nextHeight: prevState.Height + 1,
    }));
  }

  deleteNote = (id) => {
    this.setState((prevState) => ({
      notes: prevState.notes.delete(id),
    }));
  }

  updateNote = (id, fields) => {
    this.setState((prevState) => ({
      // eslint-disable-next-line prefer-object-spread
      notes: prevState.notes.update(id, (n) => { return Object.assign({}, n, fields); }),
    }));
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
        <div className="note-section">{this.renderNotes()}</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
