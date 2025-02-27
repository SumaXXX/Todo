import { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Timer } from './Timer';

export default class TodoItem extends Component {
  render() {
    const { label, time, onCompleted, onDeleted, completed } = this.props;
    let className = 'active';
    if (completed) className += ' completed';
    return (
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onCompleted}></input>
          <label>
            <span className="description">{label}</span>

            <Timer/>
            <span className="created">{formatDistanceToNow(time, { addSuffix: true, includeSeconds: true })}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button onClick={onDeleted} className="icon icon-destroy"></button>
        </div>
      </li>
    );
  }
}
