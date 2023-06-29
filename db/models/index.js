const campuses = require("./campuses");
const students = require("./students");


// setup one to Many relationships between campuses and students
campuses.hasMany(students);
students.belongsTo(campuses);


module.exports = {
  campuses,
  students,
};