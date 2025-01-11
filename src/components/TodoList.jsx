import TodoItem from "./TodoItem";

export default function ToDoList({ todos }) {
  const elements = todos.map((item, index) => {
    const { ...itemProps } = { ...item };
    return (
      <TodoItem
        {...itemProps}
        key={index}
      />
    );
  });
  return <ul className="todo-list">{elements}</ul>;
}
