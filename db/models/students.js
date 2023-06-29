const {DataTypes} = require("sequelize");
const db = require("../db");

const students = db.define("students", {
    firstName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    imageUrl:{
        type:DataTypes.TEXT,
        defaultValue:'https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=740&t=st=1688008224~exp=1688008824~hmac=432d7c63b41663f7034baac84cb119c7adbe9433fc3a6b2bc96f99c0bab10b3e'
    },
    gpa:{
        type:DataTypes.DECIMAL,
        allowNull:false,
        defaultValue:0.0,
        validate:{
                min:0.0,
                max:4.0
        }
    },
    // campus_id:{
    //     type:DataTypes.INTEGER,
    //     allowNull:false,
    //     references:{
    //         model:'campuses',
    //         key:'id'
    //     }
    // }
});

module.exports = students;