import { gql } from '@apollo/client';

export const GET_DINARY = gql`
    query getAllMovies {
        movies {
            id
            name
            genre
        }
    }
`;
export const GET_USER = gql`
    query getAllUser {
        users {
            id
            name
            password
        }
    }
`;

export const GET_TASK_BY_USER = gql`
    query getTaskByID($id: ID!) {
        user(id: $id) {
            task {
                id
                name
                status
                createdAt
            }
        }
    }
`;

export const GET_DINARY_BY_USER = gql`
    query getDiaryByID($id: ID!) {
        user(id: $id) {
            diary {
                id
                title
                content
                createdAt
            }
        }
    }
`;
