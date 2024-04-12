const express = require("express");
var database = require("../database");
const router = express.Router();
const bodyParser = require("body-parser"); // Middleware to parse JSON request body, this is going to be used to get data from the databackend to frontend static JS

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/",(req, res)=>{
    database.outputAllUsers((error, result) => {
        if (error) {
           // Pass the error to the error handling middleware or handle it here
           res.status(500).send("Error Fetching files " + error);
           return;
        }
        // Render the 'allusers' EJS template and pass the 'result' data
        console.log("Users LOADED");
        // Assuming 'result' contains user data
        res.render("contributions/contributions", { users: result });
     });
})

router.post("/addContributions", (req,res)=>{
   const {user_id, amount} = req.body
   database.addContribution((error, result) => {
      if (error) {
         // Pass the error to the error handling middleware or handle it here
         res.status(500).send("Error Fetching files " + error);
         return;
      }  

      // Assuming 'result' contains user data
      res.render("contributions/contributions", {users: result });
   }); 
})





module.exports = router;
