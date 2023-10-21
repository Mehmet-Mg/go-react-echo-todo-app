import { useState } from "react"
import styles from "./TodoList.module.css"

export default function TodoList({ todos, error, onCreate, onDelete, onUpdate }) {
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
            onUpdate(formData);
            setEditingId(null);
        } else {
            onCreate(formData);
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
                                <button onClick={() => onDelete(todo.id)}>Delete</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {error && <p>{error}</p>}
        </div>
    )
}