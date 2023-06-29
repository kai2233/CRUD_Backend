const router = require("express").Router();
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

router.get("/findCampuses", async (req, res, next) => {
  const campID = req.query.campID;
  console.log(campID);
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

// router.get("/newShoes",async (req, res, next) => {
//   try{
//     const newShoes = await Shoes.create({ company: "abc", type: "boot",laces: false, size:1});
//     newShoes
//       ? res.status(200).json(newShoes) // if allShoes is truthy
//       : res.status(404).send("new shoes Not Found");
//   }catch(error){
//     next(error);
// }});



module.exports = router;