import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createTodo, deleteTodo, todoSelector, updateTodoById } from "./todoSlice"

function TodoList() {
    const dispatch = useDispatch()
    const {todos, loading, hasErrors} = useSelector(todoSelector)

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

    if (loading) {
        return <p>Loading</p>
    } else if (hasErrors) {
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
                        <div>
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

export default TodoList