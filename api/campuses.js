const router = require("express").Router();
router.use(require("express").json());
const { campuses, students } = require("../db/models");

// Root here is localhost:8080/api/campuses/
// display all the rows of the campuses table
// if allCampuses is truthy, display all the rows of the campuses table
// if allCampuses is falsey, display list not found message
router.get("/", async (req, res, next) => {
  try {
    const allCampuses = await campuses.findAll();
    allCampuses? res.status(200).json(allCampuses) 
    : res.status(404).send("campuses List Not Found"); 
  } catch (err) {
    next(err);
  }
});

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

router.post("/addCampus", async (req, res, next) => {

  const newCampus = await campuses.create(req.body);
  newCampus? res.status(200).json(newCampus)
    : res.status(404).send("created unsuccessfully");
});

router.delete("/deleteCampus/:id", async (req, res, next) => {
  console.log(req.params.id);
  const deleteCampus = await campuses.findAll({where:{ id:req.params.id}});
  deleteCampus? await deleteCampus[0].destroy()
    : res.status(404).send("campuses $1 Not Found", [campID]);
  res.status(200).json(deleteCampus) 
});




module.exports = router;