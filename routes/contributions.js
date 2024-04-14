var database = require("../database");
const { createRouter } = require("./helper");
const router = createRouter();

router.get("/", (req, res) => {
   let users, total, table;

   database.outputAllUsers((error1, result1) => {
      if (error1) {
         res.status(500).send("Error with Query 1 Fetching files " + error1);
         return;
      }
      users = result1;
   });

   database.outputContribTable((error3, result3) => {
      if (error3) {
         res.status(500).send("Error with Query 3 Fetching files " + error3);
         return;
      }
      table = result3;
   });


   database.showSumContribution((error2, result2) => {
      if (error2) {
         res.status(500).send("Error with Query 2 Fetching files " + error2);
         return;
      }
      total = result2;

      res.render("contributions/contributions", {
         users: users,
         total: total,
         table: table,
      });
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
