import { useQuery } from '@apollo/client';
import React, { useState, useMemo } from 'react';
import { Badge, Col, ListGroup, Row } from 'react-bootstrap';
import { GET_DINARY_BY_USER } from '../../ultil/query';
import DiaryDetail from './DiaryDetail';

const ShowDiary = () => {
    const id = useMemo(() => localStorage.getItem('user'), []);

    const { loading, error, data } = useQuery(GET_DINARY_BY_USER, {
        variables: { id }
    });

    const [keyDiary, setKeyDiary] = useState(null);

    if (loading) return <p>loading...</p>;
    if (error) return <p>{error.message}</p>;
    return (
        <Row>
            <Col lg={4}>
                <ListGroup>
                    {data.user.diary.map((diary) => {
                        const dateCreated = new Date(diary.createdAt);
                        let day = '';
                        switch (dateCreated.getDay()) {
                            case 0:
                                day = 'chủ nhật';
                                break;
                            case 1:
                                day = 'thứ hai';
                                break;
                            case 2:
                                day = 'thứ ba';
                                break;
                            case 3:
                                day = 'thứ tư';
                                break;
                            case 4:
                                day = 'thứ năm';
                                break;
                            case 5:
                                day = 'thứ sáu';
                                break;
                            case 6:
                                day = 'thứ bảy';
                                break;
                            default:
                                return '';
                        }

                        const date = dateCreated.getDate();
                        const month = dateCreated.getMonth();
                        //const year = dateCreated.getFullYear();
                        return (
                            <ListGroup.Item
                                action
                                key={diary.id}
                                className="d-flex justify-content-between"
                                onClick={setKeyDiary.bind(this, diary.id)}
                            >
                                <div>{diary.title}</div>
                                <Badge bg="warning" pill>
                                    {`${day} ${date}/${month}`}
                                </Badge>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </Col>
            <Col lg={8}>
                <DiaryDetail data={data} props={keyDiary} />
            </Col>
        </Row>
    );
};

export default ShowDiary;
