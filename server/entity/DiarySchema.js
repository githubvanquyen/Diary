const EntitySchema = require("typeorm").EntitySchema;
const Diaries = require("../models/Diaries").Diaries;
const Users = require("../models/Users").Users;

module.exports = new EntitySchema({
    name: "Diaries",
    target: Diaries,
    columns: {
        id:{
            primary: true,
            type: "int",
            generated: true,
        },
        title:{
            type: "varchar",
        },
        content:{
            type:"text",
        },
        createdAt:{
            type:"timestamp without time zone",
        },
        updatedAt:{
            type:"timestamp without time zone",
        }
    },
    relations:{
        user:{
            target:"Users",
            type:"many-to-one",
            //inverseSide: 'national',
            joinTable: true,
            cascade:true,
        }
    }
})

//module.exports = MoviesSchema