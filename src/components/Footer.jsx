import { useState } from 'react';
export default function Footer({ showFilter, numberLeft }) {
  let [filter, setFilter] = useState('all');

  const filterSet = (f) => {
    setFilter(f);
    showFilter(f);
  };

  return (
    <footer className="footer">
      <span className="todo-count">{numberLeft} items left</span>
      <ul className="filters">
        <li>
          <button onClick={() => filterSet('all')} className={filter === 'all' ? 'selected' : ''}>
            All
          </button>
        </li>
        <li>
          <button onClick={() => filterSet('active')} className={filter === 'active' ? 'selected' : ''}>
            Active
          </button>
        </li>
        <li>
          <button onClick={() => filterSet('completed')} className={filter === 'completed' ? 'selected' : ''}>
            Completed
          </button>
        </li>
      </ul>
      <button
        onClick={() => filterSet('ClearCompleted')}
        className={filter === 'ClearCompleted' ? 'selected clear-completed' : 'clear-completed'}
      >
        Clear completed
      </button>
    </footer>
  );
}
