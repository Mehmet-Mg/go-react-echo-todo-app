import React from 'react'
import ReactDOM from 'react-dom/client'
import TodoApp from './features/todo/TodoApp.jsx'
import './index.css'

import {Provider} from "react-redux"
import store from "./app/store"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <TodoApp />
    </Provider>
  </React.StrictMode>,
)
