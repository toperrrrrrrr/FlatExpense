const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const connection = mysql.createConnection({
   host: process.env.DATABASE_HOST,
   user: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE,
});

connection.connect((error) => {
   if (error) {
      console.error("Error connecting to MySQL database: " + error.stack);
      return;
   }
   console.log("Connected to MySQL database as id  " + connection.threadId);
});

// Function to execute SQL queries
function executeQuery(query, params, callback) {
   connection.query(query, params, (error, results) => {
      if (error) {
         console.error("Error executing query:", error);
         callback(error, null);
         return;
      }
      callback(null, results);
   });
}

// Start of Users queries
function createUser(userName, userPassword, callback) {
   const query = "INSERT INTO USERS (user_name, user_password) values (?,?);";
   executeQuery(query, [userName, userPassword], callback);
}

function outputAllUsers(callback) {
   const query = "SELECT user_name FROM users";
   executeQuery(query, [], callback);
}

function deleteAllUsers(callback) {
   const query = "Delete FROM users";
   executeQuery(query, [], callback);
}

//not being used at the moment.
function checkIfUserExist(userName, callback) {
   const query = "SELECT user_name FROM users where user_name = ?";
   executeQuery(query, [userName], callback);
}

// End of Users queries

//Start of Food queries
function createFood(foodName, foodDescription, foodPrice, foodLink, callback) {
   const query =
      "INSERT INTO foodList (foodName, foodDescription, foodPrice, foodLink) VALUES (?,?,?,?);";
   executeQuery(
      query,
      [foodName, foodDescription, foodPrice, foodLink],
      callback
   );
}

function outputAllFoods(callback) {
   const query = "SELECT * FROM foodList";
   executeQuery(query, [], callback);
}

function deleteAllFoods(id, callback) {
   const query = "Delete FROM foodlist where foodID = ?";
   executeQuery(query, [id], callback);
}

// End of Food queries


module.exports = {
   checkIfUserExist,
   createUser,
   outputAllUsers,
   deleteAllUsers,
   createFood,
   outputAllFoods,
   deleteAllFoods,
};
