import React from "react";
import { useEffect, useState } from "react";
import "../../src/styles.css";
import NewTodoForm from "../Components/NewTodoForm";
import List from "../Components/List";
import ReactSwitch from "react-switch";

export default function MainWindow({ theme, toggleTheme }) {
  const [todos, setTodos] = useState([]);
  const [databaseChanged, setDatabaseChanged] = useState(false)

  async function fetchTodos() {
    try {
      const response = await fetch("http://localhost:5000/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setTodos(data.todos);
      } else {
        console.error("Error fetching todos:", response.status);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if (databaseChanged) {
      fetchTodos();
      setDatabaseChanged(false);
    }
  }, [databaseChanged]);


  async function addTodo(title) {
    const newTodo = {
      title: title,
      completed: false,
    };
    try {
      const response = await fetch("http://localhost:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      // console.log("Response from adding todo:", response);
      if (response.status === 201) {
        const data = await response.json();
        
        setTodos((currentTodos) => [...currentTodos, data.todo]);
        setDatabaseChanged(true);

      } else {
        console.error("Error adding todo:", response.status);
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
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


  async function deleteTodos(id) {
    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "DELETE",
      });

      if (response.status === 201) {
        setTodos((currentTodos) =>
          currentTodos.filter((todo) => todo.id !== id)
        );
        setDatabaseChanged(true); // Set databaseChanged to true

      } else if (response.status === 404) {
        console.error("Todo not found:", response.status);
      } else {
        console.error("Error deleting todo:", response.status);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }


  return (
    <div id={theme}>
      <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
      <NewTodoForm addTodo={addTodo} />

      {/* TODO LIST  */}
      <List
      setTodos={setTodos}
        todos={todos}
        toggleTodos={toggleTodos}
        deleteTodos={deleteTodos}
      />
    </div>
  );
}
