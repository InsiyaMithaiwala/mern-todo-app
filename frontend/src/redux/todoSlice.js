import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://localhost:5006/api/todos';

// Fetch todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(apiUrl);
  return response.data;
});

// Add a todo
export const addTodo = createAsyncThunk('todos/addTodo', async ({ title, description }) => {
  const response = await axios.post(apiUrl, { title, description });
  return response.data;
});

// Update a todo
export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, title, description, completed }) => {
  const response = await axios.put(`${apiUrl}/${id}`, { title, description, completed });
  return response.data;
});

// Delete a todo
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await axios.delete(`${apiUrl}/${id}`);
  return id;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => action.payload)
      .addCase(addTodo.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.findIndex(todo => todo._id === action.payload._id);
        state[index] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        return state.filter(todo => todo._id !== action.payload);
      });
  },
});

export const selectTodos = (state) => state.todos;

export default todoSlice.reducer;
