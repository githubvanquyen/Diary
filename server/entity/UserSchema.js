const EntitySchema = require("typeorm").EntitySchema
const {Users} = require("../models/Users")

module.exports =  new EntitySchema({
    name: "Users",
    target : Users,
    columns: {
        id:{
            primary: true,
            type:"int",
            generated: true
        },
        name:{
            type:"varchar"
        },
        password:{
            type:"varchar"
        }        
    }
})