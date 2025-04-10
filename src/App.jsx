import './App.css';
import { useState, useCallback } from 'react';

import Header from './components/Header';
import ToDoList from './components/TodoList';
import Footer from './components/Footer';

const createTodoItem = (label, time) => ({
  label,
  time: new Date(),
  id: Math.random(),
  timerTime: time,
  isEditing: false,
  completed: false,
});

const App = () => {
  const [todoData, setTodoData] = useState([
    createTodoItem('wake up', 300),
    createTodoItem('grind', 300),
    createTodoItem('go to sleep', 300),
  ]);
  const [filter, setFilter] = useState('all');

  const toggleProperty = useCallback((id, propName) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((el) => el.id === id);
      const oldItem = prevTodoData[idx];
      const newItem = { ...oldItem, [propName]: !oldItem[propName] };
      return [...prevTodoData.slice(0, idx), newItem, ...prevTodoData.slice(idx + 1)];
    });
  }, []);

  const setTimerTime = useCallback((id, timerTime) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((el) => el.id === id);
      const itemToSetTime = prevTodoData[idx];
      const newItem = { ...itemToSetTime, timerTime };
      return [...prevTodoData.slice(0, idx), newItem, ...prevTodoData.slice(idx + 1)];
    });
  }, []);


  const completedItem = useCallback((id) => {
    toggleProperty(id, 'completed');
  }, [toggleProperty]);

  const deletedItem = useCallback((id) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((el) => el.id === id);
      return [...prevTodoData.slice(0, idx), ...prevTodoData.slice(idx + 1)];
    });
  }, []);

  const addItem = useCallback((text, time) => {
    if (!text) return;
    const newItem = createTodoItem(text, time);
    setTodoData((prevTodoData) => [...prevTodoData, newItem]);
  }, []);

  const showFilteredItems = useCallback((f) => {
    setFilter(f);
  }, []);

  const deleteCompletedItems = useCallback(() => {
    setTodoData((prevTodoData) => prevTodoData.filter((el) => !el.completed));
  }, []);

  const onEdited = useCallback((id) => {
    toggleProperty(id, 'isEditing');
  }, [toggleProperty]);

  const onSubmitedEdit = useCallback((id, text) => {
    if (!text) return;
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((el) => el.id === id);
      const updatedTodo = { ...prevTodoData[idx], label: text, isEditing: false };
      return [
        ...prevTodoData.slice(0, idx),
        updatedTodo,
        ...prevTodoData.slice(idx + 1),
      ];
    });
  }, []);

  const completedItems = todoData.filter((el) => el.completed);
  const activeItems = todoData.filter((el) => !el.completed);
  let visibleItems = todoData;
  let numberLeft = activeItems.length;

  if (filter === 'completed') visibleItems = completedItems;
  if (filter === 'active') visibleItems = activeItems;
  if (filter === 'ClearCompleted') {
    deleteCompletedItems();
    setFilter('all');
  }

  return (
    <section className="todoapp">
      <Header onItemAdded={addItem} />
      <section className="main">
        <ToDoList
          todos={visibleItems}
          onCompleted={completedItem}
          onDeleted={deletedItem}
          setTimerTime={setTimerTime}
          onEdited={onEdited}
          onSubmitedEdit={onSubmitedEdit}
        />
      </section>
      <Footer showFilter={showFilteredItems} numberLeft={numberLeft} />
    </section>
  );
};

export default App;
