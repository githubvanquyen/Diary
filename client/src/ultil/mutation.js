import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation createUser($name: String, $password: String) {
        createUser(name: $name, password: $password) {
            id
            name
        }
    }
`;

export const CREATE_DIARY_BY_USERID = gql`
    mutation createDinary(
        $title: String
        $content: String
        $createdAt: DateTime
        $updatedAt: DateTime
        $user: ID
    ) {
        createDiary(
            title: $title
            content: $content
            createdAt: $createdAt
            updatedAt: $updatedAt
            user: $user
        ) {
            id
            title
            content
            createdAt
            updatedAt
        }
    }
`;

export const CREATE_TASK_BY_USERID = gql`
    mutation createTask(
        $name: String
        $status: Boolean
        $createdAt: DateTime
        $updatedAt: DateTime
        $expiredAt: DateTime
        $user: ID
    ) {
        createTask(
            name: $name
            status: $status
            createdAt: $createdAt
            updatedAt: $updatedAt
            expiredAt: $expiredAt
            user: $user
        ) {
            id
            name
            status
            createdAt
            updatedAt
            expiredAt
        }
    }
`;
