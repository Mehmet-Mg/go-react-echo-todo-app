export const GET_TODOS = "GET_TODOS";
export const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS"
export const GET_TODOS_FAILURE = "GET_TODOS_FAILURE"

export const UPDATE_TODO_SUCCESS = "UPDATE_TODO_SUCCESS"
export const UPDATE_TODO_FAILURE = "UPDATE_TODO_FAILURE"

export const DELETE_TODO_SUCCESS = "DELETE_TODO_SUCCESS"
export const DELETE_TODO_FAILURE = "DELETE_TODO_FAILURE"

export const CREATE_TODO_SUCCESS = "CREATE_TODO_SUCCESS"
export const CREATE_TODO_FAILURE = "CREATE_TODO_FAILURE"

const API_URL = "/todos"
const headers = {
    'Content-Type': 'application/json',
};

export const getTodos = () => ({
    type: GET_TODOS
});

export const getTodosSuccess = (todos) => ({
    type: GET_TODOS_SUCCESS,
    payload: todos
});

export const getTodosFailure = () => ({
    type: GET_TODOS_FAILURE,
});

export const updateTodoSuccess = (todo) => ({
    type: UPDATE_TODO_SUCCESS,
    payload: todo,
});

export const updateTodoFailure = () => ({
    type: UPDATE_TODO_FAILURE,
});

export const deleteTodoSuccess = (id) => ({
    type: DELETE_TODO_SUCCESS,
    payload: id
});

export const deleteTodoFailure = () => ({
    type: DELETE_TODO_FAILURE,
});

export const createTodoSuccess = (todo) => ({
    type: CREATE_TODO_SUCCESS,
    payload: todo
})

export const createTodoFailure = () => ({
    type: CREATE_TODO_FAILURE,
})

export function createTodo(todo) {
    return async (dispatch) => {
        try {
            const newTodo = await fetch(API_URL, {
                method: 'POST',
                headers,
                body: JSON.stringify({ text: todo.text }),
            })
                .then(response => response.json())
            dispatch(createTodoSuccess(newTodo))

        } catch (error) {
            dispatch(createTodoFailure())
        }
    }
}

export function fetchTodos() {
    return async (dispatch) => {
        dispatch(getTodos())

        try {
            const todos = await fetch(API_URL)
                .then(response => response.json())
            dispatch(getTodosSuccess(todos))
        } catch (error) {
            dispatch(getTodosFailure())
        }
    }
}

export function updateTodoById(id, todo) {
    return async (dispatch) => {
        try {
            console.log(`update item: ${JSON.stringify(todo)}`)
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers,
                body: JSON.stringify(todo),
            })
            dispatch(updateTodoSuccess(todo))
        } catch (error) {
            dispatch(updateTodoFailure())
        }
    }
}

export function deleteTodo(id) {
    return async (dispatch) => {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers,
            })
            dispatch(deleteTodoSuccess(id))
        } catch (error) {
            dispatch(deleteTodoFailure())
        }
    }
}