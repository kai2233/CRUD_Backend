const router = require('express').Router();
//router.use(require("express").json());
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

router.get("/findStudent/id", async (req, res, next) => {
    // const stuID = req.query.stuID;
    const stuID = req.params.id;
    console.log(stuID);
    try {
      const singleStudent = await students.findAll({
        include:campuses,
        where:{id:stuID}
      });  
      singleStudent? res.status(200).json(singleStudent) 
      : res.status(404).send("Students $1 Not Found", [stuID]);  
    } catch (err) {
      next(err);
    }
  });

  router.post("/addStudents", async (req, res, next) => {

    const newStudents = await students.create(req.body);
    newStudents? res.status(200).json(newStudents)
      : res.status(404).send("created unsuccessfully");
  });

  router.delete("/deleteStudents/:id", async (req, res, next) => {
    console.log(req.params.id);
    const deleteStudents = await students.findAll({where:{ id:req.params.id}});
    deleteStudents? await deleteStudents[0].destroy()
      : res.status(404).send("students $1 Not Found", [req.params.id]);
    res.status(200).json(deleteStudents) 
  });

module.exports = router;