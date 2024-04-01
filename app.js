const express = require("express");
const dataBase = require("./database")
const port = 8888;
const app = express();

queries = dataBase.createUser;

app.use(express.json()); //This is responsible for getting access from the JSON file you send through the BODY of your website.
app.use(express.static("public")); // Connection to my public assets. This includes HTMLs.
app.use(express.urlencoded({ extended: true })); // This is for accessing the  URL? not so sure.
app.set("view engine", "ejs");



//Loading Main Page
app.get("/", (req, res) => {
   console.log("Main Page Loaded");
   res.render("index");
});

app.get("/user/register",(req,res)=>{

})

//These are for checking whether the server can connect to the PORT
const serverListen = app.listen(port, () => {
   console.log(`Server is running on port ${port}.`);
});
serverListen.on('error', (err) => {
    console.error('Server startup error:', err);
  });

// Staple functions for checking connections and making sure there is no error with the Server
app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).send("Something broke!" + err);
});

app.use((req, res, next) => {
   res.status(404).render("404"); //calls the 404.ejs on the views folder
});
