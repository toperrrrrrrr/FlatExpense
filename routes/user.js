const express = require("express");
var database = require("../database");
const router = express.Router();
const bodyParser = require("body-parser"); // Middleware to parse JSON request body, this is going to be used to get data from the databackend to frontend static JS

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
   res.send("user main loaded");
});

// POST endpoint to receive data from client
router.post("/checkUser", (req, res) => {
   const receivedData = req.body.clientData;
   console.log("Received data from client:", receivedData);

   database.checkIfUserExist(receivedData, (error, result) => {
      if (error) {
         res.status(500).send("Error fetching data ");
         return;
      }
      console.log("user exist");
      res.status(201).send("user exist");
   });
   // Send a response back to the client
   res.json({ message: "exist" });
   return;
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

router.get("/delete/:id", (req, res) => {
   const ids = req.params.id
   database.deleteUserId(ids, (error, result) => {
      if (error) {
         // Pass the error to the error handling middleware or handle it here
         res.status(500).send("Error Deleting User " + error);
         return;
      }
      console.log(`User Deleted ${ids}`);
      res.redirect("/user/allusers");
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
