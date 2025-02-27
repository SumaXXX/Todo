import './App.css';
import { Component } from 'react';

import Header from './components/Header';
import ToDoList from './components/TodoList';
import Footer from './components/Footer';

export default class App extends Component {
  createTodoItem = (label) => {
    return {
      label,
      time: new Date(),
      id: Math.random(),
    };
  };

  state = {
    todoData: [this.createTodoItem('wake up'), this.createTodoItem('grind'), this.createTodoItem('go to sleep')],
    filter: 'all',
  };

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  completedItem = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'completed'),
      };
    });
  };

  deletedItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArr,
      };
    });
  };

  addItem = (text) => {
    if (!text) return;
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      return { todoData: [...todoData, newItem] };
    });
  };

  showFilteredItems = (f) => {
    this.setState(() => {
      return {
        filter: f,
      };
    });
  };

  deleteCompletedItems = () => {
    this.setState(({ todoData }) => {
      const completed = todoData.filter((el) => !el.completed);
      return { todoData: completed };
    });
  };

  render() {
    const { todoData, filter } = this.state;

    const completedItems = todoData.filter((el) => el.completed);
    const activeItems = todoData.filter((el) => !el.completed);
    let visibleItems = todoData;
    let numberLeft = activeItems.length;
    if (filter === 'completed') visibleItems = completedItems;
    if (filter === 'active') visibleItems = activeItems;
    if (filter === 'ClearCompleted') {
      this.setState(() => {
        return {
          filter: 'all',
        };
      });
      this.deleteCompletedItems();
    }

    return (
      <section className="todoapp">
        <Header onItemAdded={this.addItem} />
        <section className="main">
          <ToDoList todos={visibleItems} onCompleted={this.completedItem} onDeleted={this.deletedItem} />
        </section>
        <Footer showFilter={this.showFilteredItems} numberLeft={numberLeft} />
      </section>
    );
  }
}
