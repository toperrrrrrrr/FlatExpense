const express = require("express");
const port = 8888;
const app = express();
const path = require("path");
const user = require("./routes/user"); //for navigating to the user route
const foods = require("./routes/foods"); //for navigating to the user route
const contrib = require("./routes/contributions"); //for navigating to the user route
const cont = require("./routes/index-contrib");

app.use(express.json()); //This is responsible for getting access from the JSON file you send through the BODY of your website.
app.use(express.static(path.join(__dirname, "public"))); // Connection to my public assets. This includes HTMLs.
app.use(express.urlencoded({ extended: true })); // This is for accessing the  URL? not so sure.
app.set("view engine", "ejs");
app.use(
   "/bootstrap",
   express.static(path.join(__dirname, "node_modules", "bootstrap", "dist"))
);

app.use("/user", user);
app.use("/foods", foods);
app.use("/contributions", contrib);

//Loading Main Page
app.get("/", (req, res) => {
   console.log("Main Page Loaded");
   let tables, totals, users;
   cont.callShowTable((err, table) => {
      if (err) {
         res.status(500).send("Error fetching table: " + err);
         return;
      }
      tables = table;
   });
   cont.callShowSum((err, total) => {
      if (err) {
         res.status(500).send("Error fetching table: " + err);
         return;
      }
      totals = total;
   });

   cont.callShowUsers((err, user) => {
      if (err) {
         res.status(500).send("Error fetching table: " + err);
         return;
      }
      users = user;

      res.render("index", { table: tables, total: totals, users: users });
   });
});

//These are for checking whether the server can connect to the PORT
const serverListen = app.listen(port, () => {
   console.log(`Server is running on port ${port}.`);
});
serverListen.on("error", (err) => {
   console.error("Server startup error:", err);
});

// Staple functions for checking connections and making sure there is no error with the Server
app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).send("Something broke!" + err);
});

app.use((req, res, next) => {
   res.status(404).render("404"); //calls the 404.ejs on the views folder
});
