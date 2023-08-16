import React, {useEffect} from 'react'
import TodoItem from './TodoItem'

export default function List({todos, toggleTodos, deleteTodos, databaseChanged}) {
  console.log(todos)




  useEffect(() => {
    // Fetch the latest todos from the server and update the state
    async function fetchTodos() {
      try {
        const response = await fetch('http://localhost:5000/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          console.log(data);
          setTodos(data.todos);
        } else {
          console.error('Error fetching todos:', response.status);
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    }

    fetchTodos();
  }, [databaseChanged]); // Fetch whenever databaseChanged changes



  return (
    <div>
            <h1 className="header">Todo list</h1>

            <ul className="list">
        {todos.length === 0 && "No To Do" } 

        {todos.map((todo) => (
         <TodoItem 
         {...todo} //todo.completed, todo.id, todo.title, 
         deleteTodos={deleteTodos}
         toggleTodos={toggleTodos}
        // key={todo.id}
         />

         ))}
      </ul>

    </div>
  )
}
