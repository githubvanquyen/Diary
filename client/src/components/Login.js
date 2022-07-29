import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { GET_USER } from '../ultil/query';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [input, setInput] = useState({
        name: '',
        password: ''
    });

    const handleSetChangeInput = (e) => {
        e.preventDefault();
        setInput({ ...input, [e.target.name]: e.target.value });
    };
    const { name, password } = input;

    const { loading, error, data } = useQuery(GET_USER);
    const navigate = useNavigate();
    const handleSubmitUser = () => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error.message}</p>;
        const finedUser = data.users.find(
            (user) => user.name === name && user.password === password
        );
        console.log(data);
        if (finedUser) {
            localStorage.setItem('user', finedUser.id);
            window.location.reload();
        } else {
            alert('username or password wrong');
        }
    };
    return (
        <Container>
            <Row
                className="d-flex justify-content-center align-items-center"
                style={{ height: '100vh' }}
            >
                <Col className="col-lg-4 ">
                    <Card>
                        <Card.Title
                            className="d-flex justify-content-center "
                            style={{ fontSize: '24px' }}
                        >
                            Login
                        </Card.Title>
                        <Card.Body>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    name="name"
                                    value={name}
                                    className="mb-3"
                                    onChange={handleSetChangeInput}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Password"
                                    value={password}
                                    name="password"
                                    className="mb-3"
                                    onChange={handleSetChangeInput}
                                />
                            </Form.Group>
                            <Button
                                type="submit"
                                variant="primary"
                                style={{ width: '100%' }}
                                className="mt-3"
                                onClick={handleSubmitUser}
                            >
                                Login
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
