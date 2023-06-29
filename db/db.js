const { Sequelize } = require("sequelize");
const { name } = require("../package.json");
// name === ttpbackend2023

const db = new Sequelize(`postgres://postgres:1536771545@localhost:5432/${name}`, {
  logging: false,
});

db.authenticate().then(()=>{
  console.log("Connection has been established successfully.");
});


module.exports = db;