import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/TodoList.css'; // Import CSS styles

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get('http://localhost:5006/api/todos');
      setTodos(response.data);
    };
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title || !description) return;

    const response = await axios.post('http://localhost:5006/api/todos', {
      title,
      description,
    });
    setTodos([...todos, response.data]);
    setTitle('');
    setDescription('');
  };

  const editTodo = async (id) => {
    const todo = todos.find((t) => t._id === id);
    setTitle(todo.title);
    setDescription(todo.description);
    setEditId(id);
  };

  const updateTodo = async () => {
    if (!editId) return;

    const response = await axios.put(`http://localhost:5006/api/todos/${editId}`, {
      title,
      description,
    });
    setTodos(todos.map((t) => (t._id === editId ? response.data : t)));
    setTitle('');
    setDescription('');
    setEditId(null);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5006/api/todos/${id}`);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">My TODOs</h1>

      <div className="todo-form">
        <input
          type="text"
          className="input-field"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="input-field"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="add-btn" onClick={editId ? updateTodo : addTodo}>
          {editId ? 'Update' : 'Add'}
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} className="todo-item">
            <div>
              <strong>{todo.title}</strong>: {todo.description}
            </div>
            <div className="todo-actions">
              <button className="edit-btn" onClick={() => editTodo(todo._id)}>Edit</button>
              <button className="delete-btn" onClick={() => deleteTodo(todo._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
