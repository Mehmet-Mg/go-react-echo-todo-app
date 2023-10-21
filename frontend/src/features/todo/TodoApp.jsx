import { useEffect } from 'react'
import TodoList from './TodoList'
import {  useDispatch } from "react-redux"
import { fetchTodos } from './todoSlice';

function TodoApp() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch]);

  return (
    <>
    <TodoList />
    </>
  )
}

export default TodoApp
