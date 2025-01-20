import { useState } from 'react';

export default function Header({ onItemAdded }) {
  const [label, setLabel] = useState('');

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onItemAdded(label);
    setLabel('');
  };

  return (
    <>
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={onLabelChange}
          value={label}
        ></input>
      </form>
    </>
  );
}
