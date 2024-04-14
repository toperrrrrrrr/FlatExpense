var database = require("../database");
const { createRouter } = require("./helper");
const router = createRouter();

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


router.get("/delete", (req, res) => {
   database.deleteAllFoods((error, result) => {
      if (error) {
         // Pass the error to the error handling middleware or handle it here
         res.status(500).send("Error Deleting Foods " + error);
         return;
      }
      console.log("Foods Deleted");
      res.redirect("/foods/allFoods");
   });
});

router.get("/delete/:id", (req, res) => {
   const ids = req.params.id
   database.deleteAllFoods(ids, (error, result) => {
      if (error) {
         // Pass the error to the error handling middleware or handle it here
         res.status(500).send("Error Deleting Foods " + error);
         return;
      }
      console.log("Foods Deleted");
      res.redirect("/foods/allFoods");
   });
});


module.exports = router;
