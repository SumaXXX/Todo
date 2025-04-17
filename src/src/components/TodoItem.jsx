import React, { useState, useRef, useEffect, useMemo } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Timer } from './Timer';

const TodoItem = ({
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
}) => {
  
  const [newLabel, setNewLabel] = useState('');

  const inputRef = useRef(null);
  const onLabelEditing = (e) => {
    setNewLabel(e.target.value);
  };


  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target) && isEditing) {
      onEdited(id);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && isEditing) {
      onEdited(id);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClickOutside, handleKeyDown, isEditing]);

  const className = `active ${completed ? 'completed' : ''}`;

  const onSubmit = (e) => {
    e.preventDefault();
    onSubmitedEdit(id, newLabel);
    setNewLabel('');
  };

  if (!isEditing) {
    return (
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onCompleted} />
          <label>
            <span className="description item-label">{label}</span>
            <Timer setTimerTime={setTimerTime} id={id} _time={timerTime} />
            <span className="created">
              {formatDistanceToNow(time, { addSuffix: true, includeSeconds: true })}
            </span>
          </label>
          <button onClick={onEdited} className="icon icon-edit" />
          <button onClick={onDeleted} className="icon icon-destroy" />
          <input type="text" className="edit" /> 
        </div>
      </li>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        ref={inputRef}
        type="text"
        autoFocus
        className="edit"
        value={!newLabel ? label : newLabel}
        onChange={onLabelEditing}
      />
    </form>
  );
};

export default TodoItem;
