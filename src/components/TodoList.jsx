import TodoItem from './TodoItem';

export default function ToDoList({ todos, onCompleted, onDeleted }) {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = { ...item };
    return <TodoItem {...itemProps} key={id} onCompleted={() => onCompleted(id)} onDeleted={() => onDeleted(id)} />;
  });
  return <ul className="todo-list">{elements}</ul>;
}
