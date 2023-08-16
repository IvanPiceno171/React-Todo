import React from "react";

// export default function TodoItem({completed, id, title, toggleTodos, deleteTodos}) {
export default function TodoItem({
  completed,
  id,
  title,
  toggleTodos,
  deleteTodos,
  setTodos
}) {


  
  return (
    <div>
      <li key={id}>
        <label>
          <input
            type="checkbox"
            checked={completed}
            name=""
            id=""
            onChange={(e) => {
            toggleTodos(id, e.target.checked, setTodos);          
            }}
          />
          {title}
        </label>
        <button className="btn btn-danger" onClick={() => deleteTodos(id, setTodos)}>
          Delete
        </button>
      </li>
    </div>
  );
}
