var database = require("../database");
const { createRouter } = require("./helper");
const router = createRouter();

router
   .get("/", (req, res) => {
      database.outputAllUsers((error, result) => {
         if (error) {
            // Pass the error to the error handling middleware or handle it here
            res.status(500).send("Error Fetching files " + error);
            return;
         }
         // Render the 'allusers' EJS template and pass the 'result' data
         console.log("Users LOADED");
         res.render("users/users", { users: result }); // Assuming 'result' contains user data
      });
   })
   .post("/", (req, res) => {
      const { username, password } = req.body;
      database.createUser(username, password, (error, result) => {
         if (error) {
            res.status(500).send("Error creating item ");
            return;
         }
         console.log("User info saved");
         res.status(201).redirect("/user/");
      });
   });

router.get("/delete/:id", (req, res) => {
   const ids = req.params.id;
   database.deleteUserId(ids, (error, result) => {
      if (error) {
         // Pass the error to the error handling middleware or handle it here
         res.status(500).send("Error Deleting User " + error);
         return;
      }
      console.log(`User Deleted ${ids}`);
      res.redirect("/user/");
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
      res.redirect("/user/");
   });
});

router.post("/login", (req, res) => {
   const { user } = req.body;
   database.addLoginRecord(user, (error, result) => {
      if (error) {
         console.log("something went wrong : " + error);
         res.status(500).send(error);
         return;
      }
      console.log("User info saved");
      res.redirect(`/?name=${user}`);
   });
});

module.exports = router;
