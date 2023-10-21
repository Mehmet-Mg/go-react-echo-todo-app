import * as actions from "../actions/todosActions"

export const initalState = {
    todos: [],
    loading: false,
    hasErrors: false
}

export default function todosReducer(state = initalState, action) {
    switch(action.type) {
        case actions.GET_TODOS:
            return {
                ...state,
                loading: true
            }
        case actions.GET_TODOS_SUCCESS:
            return {
                todos: action.payload,
                loading: false,
                hasErrors: false
            }
        case actions.GET_TODOS_FAILURE:
            return {
                ...state,
                loading: false,
                hasErrors: true
            }
        case actions.UPDATE_TODO_SUCCESS:
            return {
                ...state,
                todos: state.todos.map(item => item.id === action.payload.id ? action.payload : item)
            }
        case actions.DELETE_TODO_SUCCESS:
            return {
                ...state,
                todos: state.todos.filter(item => item.id !== action.payload)
            }
        case actions.CREATE_TODO_SUCCESS: 
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        default:
            return state;
    }
}