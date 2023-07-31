import React from "react";
import { useEffect, useState } from "react";
import "../../src/styles.css";
import NewTodoForm from "../Components/NewTodoForm";
import List from "../Components/List";
import ReactSwitch from "react-switch"

export default function MainWindow({ theme, toggleTheme }) {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEM");
    if (localValue == null) {
      return [];
    }
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEM", JSON.stringify(todos));
  }, [todos]);

  function addTodo(title) {
    setTodos((currentTodos) => {
      return [
        ...currentTodos, // pass in complete obejct
        {
          id: crypto.randomUUID(),
          title: title, // adds new object with newItem as title
          completed: false,
        },
      ];
    });
  }

  function toggleTodos(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo; // return todo if non match id
      });
    });
  }

  function deleteTodos(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => {
        return todo.id !== id;
      });
    });
  }

  return (
    <div id={theme}>
      
      <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
      <NewTodoForm addTodo={addTodo} />

      {/* TODO LIST  */}
      <List todos={todos} toggleTodos={toggleTodos} deleteTodos={deleteTodos} />
    </div>
  );
}
