import React, { useState, useEffect } from 'react';
import api from './api';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Todos
  const fetchTodos = async () => {
    try {
      const res = await api.get('/');
      setTodos(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching todos:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add Todo
  const addTodo = async (text) => {
    try {
      const res = await api.post('/', { text });
      setTodos([res.data, ...todos]);
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  // Toggle Todo
  const toggleTodo = async (id, completed) => {
    try {
      const res = await api.put(`/${id}`, { completed });
      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  // Delete Todo
  const deleteTodo = async (id) => {
    try {
      await api.delete(`/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <AddTodo onAdd={addTodo} />
      {loading ? (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>
      ) : (
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      )}
    </div>
  );
}

export default App;
