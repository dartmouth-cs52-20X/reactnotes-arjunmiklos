import React, { Component } from 'react';

// Modeled of the searchbar from SA4

class CreateBar extends Component {
  constructor(props) {
    super(props);

    this.state = { workingTitle: '' };
  }

  onInputChange = (event) => {
    this.setState({ workingTitle: event.target.value });
  }

  addNote = (event) => {
    event.preventDefault();
    const newNote = {
      title: this.state.workingTitle,
      text: '',
      x: 400,
      y: 12,
      zIndex: 26,
    };
    this.props.add(newNote);
    this.setState({ workingTitle: '' });
  }

  // Learned about form and sumbit from https://www.w3schools.com/jsref/event_onsubmit.asp
  render() {
    return (
      <div className="create-bar">
        <form onSubmit={this.addNote}>
          <input id="input-textbar" placeholder="New note title" onChange={this.onInputChange} value={this.state.workingTitle} />
          <input id="input-submit-button" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CreateBar;
