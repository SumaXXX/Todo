import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Timer } from './Timer';

export default class TodoItem extends Component {
  state = {
    newLabel: '',
  };
  inputRef = React.createRef();

  onLabelEditing = (e) => {
    this.setState({
      newLabel: e.target.value,
    });
  };

  handleClickOutside = (event) => {
    console.log(this.inputRef);
    if (this.inputRef.current && !this.inputRef.current.contains(event.target)) {
      this.props.onEdited(this.props.id);
    }
  };

  handleKeyDown = (event) => {
    if (event.key === 'Escape' && this.props.isEditing === true) {
      this.props.onEdited(this.props.id);
    }
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const {
      label,
      time,
      onCompleted,
      onDeleted,
      completed,
      setTimerTime,
      id,
      timerTime,
      isEditing,
      onEdited,
      onSubmitedEdit,
    } = this.props;
    let className = 'active';
    if (completed) className += ' completed';

    const onSubmit = (e) => {
      e.preventDefault();

      onSubmitedEdit(id, this.state.newLabel);
      this.setState({
        newLabel: '',
      });
    };

    if (!isEditing)
      return (
        <li className={className}>
          <div className="view">
            <input className="toggle" type="checkbox" onClick={onCompleted}></input>
            <label>
              <span className="description item-label">{label}</span>
              <Timer setTimerTime={setTimerTime} id={id} _time={timerTime} />
              <span className="created">{formatDistanceToNow(time, { addSuffix: true, includeSeconds: true })}</span>
            </label>
            <button onClick={onEdited} className="icon icon-edit"></button>
            <button onClick={onDeleted} className="icon icon-destroy"></button>
            <input type="text" className="edit"></input>
          </div>
        </li>
      );

    if (isEditing)
      return (
        <form onSubmit={(e) => onSubmit(e)}>
          <input ref={this.inputRef} type="text" autoFocus className="edit" onChange={this.onLabelEditing} />
        </form>
      );
  }
}
