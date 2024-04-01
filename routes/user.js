const express = require("express");
var database = require("../database");
const router = express.Router();

router.get("/", (req, res) => {
   res.send("user main loaded");
});

router
   .get("/register", (req, res) => {
      res.render("users/register");
   })
   .post("/register", (req, res) => {
      const { username, password } = req.body;
      database.createUser(username, password, (error, result) => {
         if (error) {
            res.status(500).send("Error creating item ");
            return;
         }
         console.log("User info saved");
         res.status(201).render("users/register");
      });
   });

router.get("/allusers", (req, res) => {
   database.outputAllUsers((error, result) => {
      if (error) {
         // Pass the error to the error handling middleware or handle it here
         res.status(500).send("Error Fetching files " + error);
         return;
      }
      // Render the 'allusers' EJS template and pass the 'result' data
      console.log("Users LOADED");
      res.render("users/allusers", { users: result }); // Assuming 'result' contains user data
   });
});

router.get("/delete", (req, res) => {
   database.deleteAllUsers((error, result) => {
      if (error) {
         // Pass the error to the error handling middleware or handle it here
         res.status(500).send("Error Deleting Users " + error);
         return;
      }
      console.log("Users Deleted");
      res.redirect("/user/allusers");
   });
});

module.exports = router;
