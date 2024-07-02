import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, FormControl, Table, Spinner } from 'react-bootstrap';

const API_URL = 'http://localhost:5000/todos';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos', error);
    }
    setLoading(false);
  };

  const handleAdd = async () => {
    if (title.trim() === '' || comment.trim() === '') return;
    const newTodo = { title, completed: false, comment };
    try {
      await axios.post(API_URL, newTodo);
      fetchTodos();
      setTitle('');
      setComment('');
    } catch (error) {
      console.error('Error adding todo', error);
    }
  };

  const handleUpdate = async (id) => {
    const updatedTodo = todos.find(todo => todo.id === id);
    try {
      await axios.put(`${API_URL}/${id}`, updatedTodo);
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo', error);
    }
  };

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-center">Todo App</h1>
      <Form inline className="justify-content-center mb-3">
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form>
      <Form inline className="justify-content-center mb-3">
        <FormControl
          type="text"
          placeholder="Add Todo"
          className="mr-sm-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <FormControl
          type="text"
          placeholder="Add Comment"
          className="mr-sm-2"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button onClick={handleAdd} variant="primary" className="ml-2">Add</Button>
      </Form>
      {loading ? (
        <Spinner animation="border" role="status" className="d-block mx-auto">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <Table bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Completed</th>
              <th>Comment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTodos.map(todo => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.completed ? 'Yes' : 'No'}</td>
                <td>{todo.comment}</td>
                <td>
                  <Button variant="warning" onClick={() => setEditId(todo.id)}>Edit</Button>
                  <Button variant="danger" className="ml-2" onClick={() => handleDelete(todo.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default TodoApp;
