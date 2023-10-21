import { useState } from "react"
import {connect} from "react-redux"
import styles from "./TodoList.module.css"
import { createTodo, deleteTodo, updateTodoById } from "./actions/todosActions"

function TodoList({ dispatch, todos, hasErrors, loading }) {
    const [formData, setFormData] = useState({
        id: "",
        text: "",
        createdAt: "",
        updatedAt: "",
        deletedAt: "",
    })
    const [editingId, setEditingId] = useState(null)

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editingId) {
            // onUpdate(formData);
            dispatch(updateTodoById(formData.id, formData))
            setEditingId(null);
        } else {
            dispatch(createTodo(formData))
        }
        setFormData({
            id: "",
            text: "",
            createdAt: "",
            updatedAt: "",
            deletedAt: "",
        });
    }

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData({
            id: "",
            text: "",
            createdAt: "",
            updatedAt: "",
            deletedAt: "",
        });
    }

    const handleEdit = (item) => {
        setEditingId(item.id);
        setFormData({
            id: item.id,
            text: item.text,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
        });
    };

    if(loading) {
        return <p>Loading</p>
    } else if(hasErrors) {
        return <p>Error was occured while getting todos</p>
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="text"
                    placeholder="text"
                    value={formData.text}
                    onChange={handleFormChange}
                />
                <button type="submit">{editingId ? 'Update' : 'Create'}</button>
                {editingId && <button type="button" onClick={handleCancelEdit}>Cancel</button>}

            </form>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <div className={styles.todo}>
                            <div>
                                <p>{todo.text}</p>
                            </div>
                            <div>
                                <button onClick={() => handleEdit(todo)}>Edit</button>
                                <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => ({
    loading: state.todos.loading,
    todos: state.todos.todos,
    hasErrors: state.todos.hasErrors,
});

export default connect(mapStateToProps)(TodoList)