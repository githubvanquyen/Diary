const { gql } = require("apollo-server-express");
const { GraphQL } = require("graphql");

const typeDefs = gql`
    scalar DateTime
    type Diary {
        id: ID
        title: String
        content: String
        createdAt: DateTime
        updatedAt: DateTime
        user: User
    }
    type Task {
        id: ID
        name: String
        status: Boolean
        createdAt: DateTime
        updatedAt: DateTime
        expiredAt: DateTime
        user: User
    }
    type User {
        id: ID
        name: String
        password: String
        diary: [Diary]
        task: [Task]
    }
    type Query {
        diaries: [Diary]
        users: [User]
        tasks: [Task]
        task(id: ID!): Task
        diary(id: ID!): Diary
        user(id: ID!): User
    }
    type Mutation {
        createDiary(
            title: String
            content: String
            createdAt: DateTime
            updatedAt: DateTime
            user: ID
        ): Diary
        createUser(name: String, password: String): User
        createTask(
            name: String
            status: Boolean
            createdAt: DateTime
            updatedAt: DateTime
            expiredAt: DateTime
            user: ID
        ): Task
    }
`;
module.exports = typeDefs;
