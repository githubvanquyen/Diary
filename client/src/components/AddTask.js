import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TASK_BY_USERID } from '../ultil/mutation';
import { GET_TASK_BY_USER } from '../ultil/query';
import sendEmail from './sendEmail';
const AddTask = () => {
    const [input, setInput] = useState({
        name: '',
        expiredAt: ''
    });
    const { name, expiredAt } = input;
    const createdAt = new Date(Date.now());
    const updatedAt = createdAt;

    const user = localStorage.getItem('user');

    const [createTaskFunc, { data, loading, error }] = useMutation(
        CREATE_TASK_BY_USERID,
        {
            variables: {
                name,
                status: false,
                createdAt,
                updatedAt,
                expiredAt,
                user
            },
            refetchQueries: [
                { query: GET_TASK_BY_USER, variables: { id: user } }
            ]
        }
    );

    const handleSetChangeInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleSubmitCreateTask = (e) => {
        e.preventDefault();
        createTaskFunc();
        setInput({ name: '', expiredAt: '' });
    };
    if (loading) return <p>loading...</p>;
    if (error) return <p>{error.message}</p>;
    if (data) {
        sendEmail('vanquyen101112@gmail.com', data.createTask.id);
    }
    return (
        <Form className="mt-4" onSubmit={handleSubmitCreateTask}>
            <Form.Group>
                <Form.Label>Nhập tên công việc</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    placeholder="Công việc"
                    value={name}
                    onChange={handleSetChangeInput}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Nhập ngày hết hạn</Form.Label>
                <Form.Control
                    type="date"
                    name="expiredAt"
                    value={expiredAt}
                    onChange={handleSetChangeInput}
                />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-2">
                Lưu
            </Button>
        </Form>
    );
};

export default AddTask;
