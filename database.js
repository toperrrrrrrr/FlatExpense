const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const connection = mysql.createConnection({
   host: process.env.DATABASE_HOST,
   user: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE,

});


connection.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL database: ' + err.stack);
      return;
    }
    console.log('Connected to MySQL database as id ' + connection.threadId);
  });

  
// Function to execute SQL queries
function executeQuery(query, params, callback) {
    connection.query(query, params, (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        callback(error, null);
        return;
      }
      callback(null, results);
    });
  }

  function createUser(userName, userPassword){
    const query = "INSERT INTO USERS (user_name, user_password) values (?,?);"
    executeQuery(query, [userName, password]);
  }

  module.exports = { createUser }