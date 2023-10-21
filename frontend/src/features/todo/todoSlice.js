import { createSlice } from "@reduxjs/toolkit";

const API_URL = "/todos"
const headers = {
    'Content-Type': 'application/json',
};

const todoSlice = createSlice({
    name: "todo",
    initialState: {
        loading: false,
        hasErrors: false,
        todos: [],
    },
    reducers: {
        getTodos: (state) => {
            state.loading = true
        },
        getTodosSuccess: (state, { payload }) => {
            state.todos = payload
            state.loading = false
            state.hasErrors = false
        },
        getTodosFailure: (state) => {
            state.loading = false
            state.hasErrors = true
        },
        updateTodoSuccess: (state, { payload }) => {
            state.todos = state.todos.map(item => item.id === payload.id ? {
                ...item,
                text: payload.todo.text
            } : item)
        },
        deleteTodoSuccess: (state, { payload }) => {
            state.todos = state.todos.filter(item => item.id !== payload)
        },
        createTodoSuccess: (state, { payload }) => {
            state.todos = [...state.todos, payload]
        }
    }
})

// actions generated from the slice
export const {
    getTodos,
    getTodosSuccess,
    getTodosFailure,
    updateTodoSuccess,
    deleteTodoSuccess,
    createTodoSuccess
} = todoSlice.actions;

// Asynchronous thunk actions
export const createTodo = (todo) => async (dispatch) => {
    try {
        const newTodo = await fetch(API_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify({ text: todo.text }),
        })
            .then(response => response.json())
        dispatch(createTodoSuccess(newTodo))

    } catch (error) {

    }
}

export const fetchTodos = () => async (dispatch) => {
    dispatch(getTodos())

    try {
        const todos = await fetch(API_URL)
            .then(response => response.json())
        dispatch(getTodosSuccess(todos))
    } catch (error) {
        dispatch(getTodosFailure())
    }
}

export const updateTodoById = (id, todo) => async (dispatch) => {
    try {
        console.log(`update item: ${JSON.stringify(todo)}`)
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(todo),
        })
        dispatch(updateTodoSuccess({ id, todo }))
    } catch (error) {
        dispatch(updateTodoFailure())
    }
}

export const deleteTodo = (id) => async (dispatch) => {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers,
        })
        dispatch(deleteTodoSuccess(id))
    } catch (error) {
    }
}

// a selector
export const todoSelector = (state) => state.todos;

// reducer
export default todoSlice.reducer;