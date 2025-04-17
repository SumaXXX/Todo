import { useState } from 'react';

export default function Header({ onItemAdded }) {
  const [label, setLabel] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onMinutesChange = (e) => {
    setMinutes(e.target.value);
  };

  const onSecondsChange = (e) => {
    let value = e.target.value;
    if (value < 59) setSeconds(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let sum = Number(minutes) * 60 + Number(seconds);
    onItemAdded(label, sum);
    setMinutes('');
    setSeconds('');
    setLabel('');
  };

  return (
    <header>
      <h1>todos</h1>
      <form onSubmit={onSubmit} className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={onLabelChange}
          value={label}
        ></input>
      </form>
      <form className="new-todo-form time-form" onSubmit={onSubmit}>
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={onMinutesChange}
          value={minutes}
        ></input>
      </form>
      <form className="new-todo-form time-form" onSubmit={onSubmit}>
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={onSecondsChange}
          value={seconds}
        ></input>
      </form>
    </header>
  );
}
