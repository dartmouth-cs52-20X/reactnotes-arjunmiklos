/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import marked from 'marked';
import Draggable from 'react-draggable';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
    };
  }

  onTrashClick = (event) => {
    this.props.delete(this.props.id);
  }

  handleDrag = (event, data) => {
    this.props.update(this.props.id, 'position', [data.x, data.y]);
  }

  changeTitle = (event) => {
    this.props.update(this.props.id, 'title', event.target.value);
  }

  changeText = (event) => {
    this.props.update(this.props.id, 'text', event.target.value);
  }

  toggleEditing = (event) => {
    if (this.state.isEditing === true) {
      this.setState({ isEditing: false });
    } else {
      this.setState({ isEditing: true });
    }
  }

  renderNote() {
    if (this.state.isEditing === true) {
      return (
        <div className="note-box">
          <div className="note-header">
            <input onChange={this.changeTitle} value={this.props.note.title} />
            <div className="note-icons">
              <i onClick={this.onTrashClick} className="fas fa-trash" />
              <i onClick={this.toggleEditing} className="fas fa-check-square" />
              <div className="drag-icon">
                <i className="fas fa-expand-arrows-alt" />
              </div>
            </div>
          </div>
          <div className="note-text">
            <textarea onChange={this.changeText} value={this.props.note.text} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="note-box">
          <div className="note-header">
            <p>{this.props.note.title}</p>
            <div className="note-icons">
              <i onClick={this.onTrashClick} className="fas fa-trash" />
              <i onClick={this.toggleEditing} className="fas fa-edit" />
              <div className="drag-icon">
                <i className="fas fa-expand-arrows-alt" />
              </div>
            </div>
          </div>
          <div className="note-text">
            <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <Draggable
        handle=".drag-icon"
        position={{ x: this.props.note.x, y: this.props.note.y }}
        onStart={this.handleStartDrag}
        onDrag={this.handleDrag}
        onStop={this.handleStopDrag}
        bounds={{
          top: 0, left: 0,
        }}
        axis="both"
      >
        <div>
          {this.renderNote()}
        </div>
      </Draggable>
    );
  }
}

export default Note;
