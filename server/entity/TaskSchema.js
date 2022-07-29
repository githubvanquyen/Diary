const EntitySchema = require("typeorm").EntitySchema;
const Tasks = require("../models/Tasks").Tasks;
const Users = require("../models/Users").Users;

module.exports = new EntitySchema({
    name: "Tasks",
    target: Tasks,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
        },
        status: {
            type: "boolean",
        },
        createdAt: {
            type: "timestamp without time zone",
        },
        updatedAt: {
            type: "timestamp without time zone",
        },
        expiredAt: {
            type: "timestamp without time zone",
        },
    },
    relations: {
        user: {
            target: "Users",
            type: "many-to-one",
            //inverseSide: 'national',
            joinTable: true,
            cascade: true,
        },
    },
});

//module.exports = MoviesSchema
