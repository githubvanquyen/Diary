import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CREATE_DIARY_BY_USERID } from '../ultil/mutation';
import { GET_DINARY_BY_USER } from '../ultil/query';

const AddDiary = () => {
    const id = localStorage.getItem('user');
    const [input, setInput] = useState({
        title: '',
        content: ''
    });
    const { title, content } = input;
    const createdAt = new Date(Date.now());
    const updatedAt = createdAt;
    const user = localStorage.getItem('user');

    const [createDiaryFunc, { data, loading, error }] = useMutation(
        CREATE_DIARY_BY_USERID,
        {
            variables: { title, content, createdAt, updatedAt, user },
            refetchQueries: [{ query: GET_DINARY_BY_USER, variables: { id } }]
        }
    );

    const handleSetChangeInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleSubmitCreateDiary = (e) => {
        e.preventDefault();
        createDiaryFunc();
        setInput({ title: '', content: '' });
    };
    if (loading) return <p>loading...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <Form className="mt-4" onSubmit={handleSubmitCreateDiary}>
            <Form.Group>
                <Form.Label>Nhập tiêu đề nhật kí</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Tiêu đề"
                    value={title}
                    name="title"
                    onChange={handleSetChangeInput}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Nhập nội dung nhật kí</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Tiêu đề"
                    name="content"
                    value={content}
                    onChange={handleSetChangeInput}
                />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-2">
                Lưu
            </Button>
        </Form>
    );
};

export default AddDiary;
