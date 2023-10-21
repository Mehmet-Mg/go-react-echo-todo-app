import React from 'react'
import ReactDOM from 'react-dom/client'
import TodoApp from './TodoApp.jsx'
import './index.css'

import {Provider} from "react-redux"
import rootReducer from './reducers/index.js'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <TodoApp />
    </Provider>
  </React.StrictMode>,
)
