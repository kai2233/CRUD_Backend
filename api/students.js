const router = require('express').Router();
const {campuses,students} = require('../db/models');

// Root here is localhost:8080/api/students/
// display all the rows of the students table
// if allStudents is truthy, display all the rows of the campuses table
// if allStudents is falsey, display list not found message
router.get('/', async (req, res, next) => {
    try{
        const allStudents = await students.findAll();
        allStudents? res.status(201).json(allStudents) : res.status(404).send("students list not found");
    }catch(err){
        next(err);
    }

});

router.get("/findStudent", async (req, res, next) => {
    const stuID = req.query.stuID;
    console.log(stuID);
    try {
      const singleStudent = await students.findAll({
        include:campuses,
        where:{id:stuID}
      });  
      singleStudent? res.status(200).json(singleStudent) 
      : res.status(404).send("campuses $1 Not Found", [stuID]);  
    } catch (err) {
      next(err);
    }
  });

module.exports = router;