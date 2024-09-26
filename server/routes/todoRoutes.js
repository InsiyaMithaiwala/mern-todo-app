const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// Create a  new todo
router.post('/', async (req, res) => {
  const { title, description } = req.body; 
  try {
    const newTodo = new Todo({
      title,
      description, 
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo); // Return 201 status for resource creation
  } catch (err) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// Update a todo
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body; // Capture all necessary fields
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, { title, description, completed }, { new: true });
    if (!updatedTodo) return res.status(404).json({ error: 'Todo not found' });
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) return res.status(404).json({ error: 'Todo not found' });
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

module.exports = router;
