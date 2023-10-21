import { useEffect, useState } from 'react'
import TodoList from './TodoList'

const API_URL = "/todos"
const headers = {
  'Content-Type': 'application/json',
};

function TodoApp() {
  const [todos, setTodos] = useState([])
  const [error, setError] = useState(null)
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setTodos(data))
      .catch(error => setError(error));
  }

  const handleCreate = (todo) => {
    console.log(`add item: ${JSON.stringify(todo)}`)

    fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({ text: todo.text }),
    })
      .then(response => response.json())
      .then(returnedItem => {
        setTodos([...todos, returnedItem])
      })
      .catch(error => setError(error));
  }

  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers,
    })
      .then(() => setTodos(todos.filter(item => item.id !== id)))
      .catch(error => console.error('Error deleting item:', error));
  }

  const handleUpdate = (todo) => {
    console.log(`update item: ${JSON.stringify(todo)}`)

    fetch(`${API_URL}/${todo.id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(todo),
    })
      .then(() => setTodos(todos.map(item => item.id === todo.id ? todo : item)))
      .catch(error => setError(error));
  } 

  return (
    <>
      <TodoList
        todos={todos}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        onCreate={handleCreate}
        error={error}
      />
    </>
  )
}

export default TodoApp
