const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");
const typeorm = require("typeorm");

const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// const appDataSource = new DataSource({
//     type:'postgres',
//     host:'localhost',
//     port:5432,
//     username:'postgres',
//     password:'1234',
//     database:'reddit',
//     entities:[MoviesSchema, NationalsSchema],
//     synchronize: true,
//     logging: false,
// })

// appDataSource.initialize()
//     .then(()=>console.log("database connected successfull"))
//     .catch((error) => console.log(error))

server.start().then((res) => {
    server.applyMiddleware({ app });
    app.listen(4000, () => {
        return console.log(
            `app run at http://localhost:4000${server.graphqlPath}`
        );
    });
});

typeorm
    .createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "1234",
        database: "reddit",
        entities: [
            require("./entity/DiarySchema"),
            require("./entity/UserSchema"),
            require("./entity/TaskSchema"),
        ],
        synchronize: true,
        logging: false,
    })
    .then((connection) => {
        // const movie = new Movies()
        // movie.name = "avenger: endgame"
        // movie.genre = "action"
        // movie.national = 1
        // connection.manager.save([movie])
        // .then((savedMovies) => console.log("one row have been created !!",savedMovies))
        // .catch((error) => console.log(error))
        return console.log("Database have been connected");
    })
    .catch((error) => {
        console.log(error);
    });
//module.exports = {appDataSource}
