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
   const query = "SELECT * FROM users";
   executeQuery(query, [], callback);
}
function deleteUserId(id, callback) {
   const query = "Delete FROM users where user_id = ?";
   executeQuery(query, [id], callback);
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

function deleteAllFoods(callback) {
   const query = "DELETE FROM foodList";
   executeQuery(query, [], callback);
}
function deleteFoodsID(id, callback) {
   const query = "DELETE FROM foodList WHERE foodID = ?";
   executeQuery(query, [id], callback);
}
// End of Food queries

//Start of contributions Queries
function addContribution(userID, amount, callback) {
   const query = " INSERT INTO CONTRIBUTIONS (user_id, amount) values (?,?)";
   executeQuery(query, [userID, amount], callback);
}

function showSumContribution(callback) {
   const query = "SELECT SUM(amount) as Total from contributions";
   executeQuery(query, [], callback);
}

function outputContribTable(callback) {
   const query =
      "select CONTRIBUTIONS.id, users.user_name, contributions.amount from CONTRIBUTIONS inner join users on CONTRIBUTIONS.user_id=users.user_id ORDER BY CONTRIBUTIONS.id ASC";
   executeQuery(query, [], callback);
}
//End of contributions Queries

function addLoginRecord(loginName, callback) {
   const query = "INSERT INTO LOGINS (login_name) values (?)";
   executeQuery(query, [loginName], callback);
}

function showLogRecords(callback) {
   const query = "SELECT * FROM LOGINS";
   executeQuery(query, [], callback);
}

module.exports = {
   checkIfUserExist,
   createUser,
   outputAllUsers,
   deleteAllUsers,
   createFood,
   outputAllFoods,
   deleteAllFoods,
   deleteUserId,
   addContribution,
   showSumContribution,
   outputContribTable,
   addLoginRecord,
   showLogRecords,
   deleteFoodsID,
};
