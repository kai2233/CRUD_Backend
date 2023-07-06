const { Sequelize } = require("sequelize");
const pg = require("pg");
const { name } = require("../package.json");
require('dotenv').config();
// name === cruddb

const db = new Sequelize(process.env.POSTGRES_URL+ "?sslmode=require",);

db.authenticate().then(()=>{
  console.log("Connection has been established successfully.");
});


module.exports = db;