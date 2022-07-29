import React, { memo } from 'react';
import { Card } from 'react-bootstrap';

const DiaryDetail = ({ data, props }) => {
    const diary = props
        ? data.user.diary.find((diary) => diary.id == props)
        : { title: 'this is my first diary', content: 'lorem' };
    return (
        <Card>
            <Card.Header>{diary.title}</Card.Header>
            <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>{diary.content}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default memo(DiaryDetail);
