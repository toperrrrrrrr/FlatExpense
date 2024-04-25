const database = require("../database");

function callShowTable(callback) {
   database.outputContribTable((err, result) => {
      if (err) {
         callback(err, null);
         return;
      }
      callback(null, result);
   });
}

function callShowSum(callback) {
   database.showSumContribution((err, result) => {
      if (err) {
         callback(err, null);
         return;
      }
      callback(null, result);
   });
}

function callShowUsers(callback) {
   database.outputAllUsers((err, result) => {
      if (err) {
         callback(err, null);
         return;
      }
      callback(null, result);
   });
}

function callFoods(callback) {
   database.outputAllFoods((err, result) => {
      if (err) {
         callback(err, null);
         return;
      }
      callback(null, result);
   });
}

module.exports = {
   callShowTable,
   callShowSum,
   callShowUsers,
   callFoods,
};
