import React, {useEffect} from 'react'
import TodoItem from './TodoItem'

export default function List({todos, toggleTodos, deleteTodos}) {

useEffect(()=>{

},[todos])


  return (
    <div>
            <h1 className="header">Todo list</h1>

            <ul className="list">
        {todos.length === 0 && "No To Do" } 

        {todos.map((todo) => (
         <TodoItem 
         {...todo} //todo.completed, todo.id, todo.title, 
         deleteTodos={() => deleteTodos(todo.id)}
         toggleTodos={(id, completed) => toggleTodos(id, completed)}
        // key={todo.id}
         />

         ))}
      </ul>

    </div>
  )
}
