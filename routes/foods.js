const express = require("express");
var database = require("../database");
const router = express.Router();
const bodyParser = require("body-parser"); // Middleware to parse JSON request body, this is going to be used to get data from the databackend to frontend static JS

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
   res.render("foods/foods"); // Assuming 'result' contains user data
});

router.get("/allFoods", (req, res) => {
   database.outputAllFoods((error, result) => {
      if (error) {
         res.status(500).send("Error fetching foods: " + error);
         return;
      }
      console.log("Foods LOADED");
      res.render("foods/allFoods", { foods: result });
   });
});

router.post("/addFood", (req, res) => {
   const { foodName, foodDescription, foodPrice, foodLink } = req.body;
   database.createFood(
      foodName,
      foodDescription,
      foodPrice,
      foodLink,
      (error, result) => {
         if (error) {
            res.status(500).send("Error creating item ");
            return;
         }
         console.log("Food info saved");
         res.status(201).redirect("/foods/allFoods");
      }
   );
});

module.exports = router;
