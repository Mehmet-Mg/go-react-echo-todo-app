import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createTodo, deleteTodo, todoSelector, updateTodoById } from "./todoSlice"
import { Button, Col, Form, Input, List, Row, Skeleton, Space } from "antd"

function TodoList() {
    const dispatch = useDispatch()
    const { todos, loading, hasErrors } = useSelector(todoSelector)
    const [form] = Form.useForm();

    const [editingId, setEditingId] = useState(null)

    const handleSubmit = (formData) => {
        if (editingId) {
            dispatch(updateTodoById(editingId, formData))
            setEditingId(null);
        } else {
            dispatch(createTodo(formData))
        }
        form.resetFields();
    }

    const handleCancelEdit = () => {
        setEditingId(null);
        form.resetFields();
    }

    const handleEdit = (item) => {
        setEditingId(item.id);
        form.setFieldsValue({
            text: item.text
        })
    };

    if (loading) {
        return <p>Loading</p>
    } else if (hasErrors) {
        return <p>Error was occured while getting todos</p>
    }

    return (
        <Row style={{ marginRight: 24, marginLeft: 24 }}>
            <Col span={24}>
                <Form
                    form={form}
                    onFinish={handleSubmit}
                >
                    <Form.Item name="text" label="Text">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">{editingId ? 'Update' : 'Create'}</Button>
                            {editingId && <Button htmlType="button" type="link" onClick={handleCancelEdit}>Cancel</Button>}
                        </Space>
                    </Form.Item>
                </Form>
            </Col>
            <Col span={24}>
                <List
                    loading={loading}
                    dataSource={todos}
                    renderItem={(item) => (
                        <List.Item
                            actions={[<Button type="primary" onClick={() => handleEdit(item)}>Edit</Button>, <Button danger onClick={() => dispatch(deleteTodo(item.id))}>Delete</Button>]}
                        >
                            <Skeleton title={false} active loading={false}>
                                <List.Item.Meta
                                    title={item.id}
                                    description={item.text}
                                />
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </Col>
        </Row>
    )
}

export default TodoList