import { useQuery } from '@apollo/client';
import React, { useMemo } from 'react';
import { Badge, ListGroup } from 'react-bootstrap';
import { GET_TASK_BY_USER } from '../ultil/query';

const ShowTask = () => {
    const id = useMemo(() => localStorage.getItem('user'), []);

    const { loading, error, data } = useQuery(GET_TASK_BY_USER, {
        variables: { id }
    });

    if (loading) return <p>loading...</p>;
    if (error) return <p>{error.message}</p>;
    return (
        <ListGroup>
            {data.user.task.map((task) => (
                <ListGroup.Item
                    className="d-flex justify-contents-between align-items-start"
                    key={task.id}
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{task.name}</div>
                    </div>
                    {task.status === true ? (
                        <Badge bg="primary" pill>
                            hoàn thành
                        </Badge>
                    ) : (
                        <Badge bg="danger" pill>
                            đang thực hiện
                        </Badge>
                    )}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default ShowTask;
