const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const connection = mysql.createConnection({
   host: process.env.DATABASE_HOST,
   user: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE,
});

connection.connect((err) => {
   if (err) {
      console.error("Error connecting to MySQL database: " + err.stack);
      return;
   }
   console.log("Connected to MySQL database as id " + connection.threadId);
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

module.exports = {
   checkIfUserExist,
   createUser,
   outputAllUsers,
   deleteAllUsers,
};
