const express = require("express");
var database = require("../database");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
   database.outputAllUsers((error, result) => {
      if (error) {
         res.status(500).send("Error Fetching files " + error);
         return;
      }
      console.log("Users LOADED");
      res.render("contributions/contributions", { users: result });
   });
});

router.post("/addContributions", (req, res) => {
   const { user_id, amount } = req.body;
   database.addContribution(user_id, amount, (error, result) => {
      if (error) {
         res.status(500).send("Error Fetching files " + error);
         return;
      }
      console.log(`User ${user_id}'s contribution, amount: ${amount}`);
      res.redirect("/contributions/");
   });
});

module.exports = router;
