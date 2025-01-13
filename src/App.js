import "./App.css";
import Header from "./components/Header";
import ToDoList from "./components/TodoList";
import Footer from "./components/Footer";

import { Component } from "react";

export default class App extends Component {

  createTodoItem = (label) => {
    return {
      label,
      time: new Date(),
      id: Math.random()
    };
  };

  state = {
    todoData: [
      this.createTodoItem("wake up"),
      this.createTodoItem("grind"),
      this.createTodoItem("go to sleep"),
    ],
  };

  //   toggleProperty = (arr, id, propName) => {
    
  //   const idx = arr.findIndex((el) => el.id === id);
  //   const oldItem = arr[idx];
  //   const newItem = { ...oldItem, [propName]: !oldItem[propName] };

  //   return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];

  // }

  // onToggleImportant = (id) => {
  //   this.setState(({ todoData }) => {
  //     return {
  //       todoData: this.toggleProperty(todoData, id, "important")
  //     }
  //   });
  // };

  // onToggleDone = (id) => {
  //   this.setState(({ todoData }) => {
  //     return {
  //       todoData: this.toggleProperty(todoData, id, "done")
  //     }
  //   });
  // };


  toggleProperty = (arr, id, propName) => {
    
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];

  }

  completedItem = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "completed")
      }
    });
  }

  deletedItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArr,
      };
    });
  }



  addItem = (text) => {
    if (!text) return;
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      return { todoData: [...todoData, newItem] };
    });
  };



  render() {
    const { todoData } = this.state;

    return (
      <section className="todoapp">
        <Header onItemAdded={this.addItem} />
        <section className="main">
          {/* <ul
            className="todo-list"
            onItemAdded={addItem}
          >
            <TodoItem label={"as"} />
          </ul> */}
          <ToDoList todos={todoData} onCompleted={this.completedItem}onDeleted={this.deletedItem}/>
        </section>
        <Footer />
      </section>
    );
  }
}
