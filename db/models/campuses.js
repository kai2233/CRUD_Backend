const {DataTypes} = require('sequelize');
const db = require("../db");

const campuses = db.define("campuses", {
  name: {
    type: DataTypes.STRING,
    allownull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    defaultValue: 'https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=740&t=st=1688008224~exp=1688008824~hmac=432d7c63b41663f7034baac84cb119c7adbe9433fc3a6b2bc96f99c0bab10b3e',
  },
  address: {
    type: DataTypes.STRING,
    allownull: false,
  },
  description: {
    type: DataTypes.STRING(1234),
    allownull: true,
  },
});

module.exports = campuses;