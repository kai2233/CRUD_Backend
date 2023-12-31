const router = require("express").Router();
//router.use(require("express").json());
const { campuses, students } = require("../db/models");

// Root here is localhost:8080/api/campuses/
// display all the rows of the campuses table
// if allCampuses is truthy, display all the rows of the campuses table
// if allCampuses is falsey, display list not found message
router.get("/", async (req, res, next) => {
  try {
    const allCampuses = await campuses.findAll({order:[['id','ASC']]});
    allCampuses? res.status(200).json(allCampuses) 
    : res.status(404).send("campuses List Not Found"); 
  } catch (err) {
    next(err);
  }
});

// localhost:8080/api/campuses/findCampus/
// display the info of single campus and campuses's students based on the id
router.get("/findCampus/:id", async (req, res, next) => {
  // const campID = req.query.campID;
  console.log(req.params.id);
  const campID = req.params.id;
  try {
    const singleCampuses = await campuses.findAll(
      {include: students,
       where:{id:campID}
    }); 
    singleCampuses? res.status(200).json(singleCampuses) 
    : res.status(404).send("campuses $1 Not Found", [campID]);
  } catch (err) {
    next(err);
  }
});

//localhost:8080/api/campuses/addCampus
//add a new campus to the database
router.post("/addCampus", async (req, res, next) => {
  console.log(req.body);
  const newCampus = await campuses.create(req.body);
  newCampus? res.status(200).json(newCampus)
    : res.status(404).send("created unsuccessfully");
});

//localhost:8080/api/campuses/deleteCampus/
//delete a campus from the database
router.delete("/deleteCampus/:id", async (req, res, next) => {
  console.log("Message from delete "+ req.params.id);
  // const deleteCampus = await campuses.findAll({where:{ id:req.params.id}});
  // console.log(deleteCampus);
  // deleteCampus? await deleteCampus.destroy()
  //   : res.status(404).send("campuses $1 Not Found", [req.params.id]);
  // res.status(200).json(deleteCampus) 
  try {
      const deleteCampus = await campuses.findOne({where: { id: req.params.id }});
      await deleteCampus.destroy();
      const allCampuses = await campuses.findAll({order:[['id','ASC']]});
      res.status(200).json(allCampuses);
    } catch (err) {
      next(err);
    }
});


//localhost:8080/api/campuses/updateCampus
//update a campus in the database based on the id
router.put("/updateCampus", async (req, res, next) => {
  try{
    const targetCampus = await campuses.findOne({where: { id: req.body.id }});
    await targetCampus.update(req.body);
    res.status(200).json(targetCampus);
  }catch (err) {
    next(err);
  }
});




module.exports = router;