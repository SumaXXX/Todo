import { Component } from "react";

import { formatDistanceToNow } from "date-fns";

export default class TodoItem extends Component {
  render() {
    const { label, time} = this.props;
    const className = "active";

    return (
      <li
        className={className}
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
          ></input>
          <label>
            <span className="description">{label}</span>
            <span className="created">
              {formatDistanceToNow(time, { addSuffix: true, includeSeconds: true })}
            </span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy"></button>
        </div>
      </li>
    );
  }
}
