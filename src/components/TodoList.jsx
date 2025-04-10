import TodoItem from './TodoItem';
export default function ToDoList({ todos, onCompleted, onDeleted, setTimerTime, onEdited, onSubmitedEdit }) {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = { ...item };
    return (
      <TodoItem
        id={id}
        {...itemProps}
        key={id}
        onCompleted={() => onCompleted(id)}
        onDeleted={() => onDeleted(id)}
        setTimerTime={setTimerTime}
        onEdited={() => onEdited(id)}
        onSubmitedEdit={onSubmitedEdit}
      />
    );
  });
  return <ul className="todo-list">{elements}</ul>;
}
