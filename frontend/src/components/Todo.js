import React from 'react';

const Todo = ({ todo, onDelete, onUpdate }) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onUpdate({ ...todo, completed: !todo.completed })}
      />
      <span>{todo.title}</span>
      <button onClick={() => onDelete(todo._id)}>Delete</button>
    </div>
  );
};

export default Todo;
