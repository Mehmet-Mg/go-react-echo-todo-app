import { useEffect } from 'react'
import TodoList from './TodoList'
import { fetchTodos } from './actions/todosActions';
import {connect} from "react-redux"

function TodoApp({dispatch}) {
  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch]);

  return (
    <>
      <TodoList />
    </>
  )
}

export default connect()(TodoApp)
