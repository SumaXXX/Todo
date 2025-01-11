import "./App.css";
import Header from "./components/Header";
import ToDoList from "./components/TodoList";
import Footer from "./components/Footer";

import { Component } from "react";

export default class App extends Component {
  deletedItem = () => {

  }

  completedItem = () => {

  }


  createTodoItem = (label) => {
    return {
      label,
      time: new Date(),
    };
  };

  addItem = (text) => {
    if (!text) return;
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      return { todoData: [...todoData, newItem] };
    });
  };

  state = {
    todoData: [
      this.createTodoItem("wake up"),
      this.createTodoItem("grind"),
      this.createTodoItem("go to sleep"),
    ],
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
          <ToDoList todos={todoData} />
        </section>
        <Footer />
      </section>
    );
  }
}
