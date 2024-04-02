const currentUser = "Noriel";

var groupSet = "";

var initialBal = 40000; //this should be initialized during the first use. The data should be saved to the database and pulled to be the value of this variable.
var usersnames = ["Nori", "Norms", "Glo", "Kriselle"]; //This should also be pulled from the database
var foodslist = ["Adobo", " Kahit Ano", " Kare Kare", " Lechon"];

//Check who uses the app
currentUsers.textContent = currentUser;

// This is responsible for checking if the day is AM or PM//
function checkAmPm() {
   var currentTime = new Date();
   var currentMin = currentTime.getMinutes();
   var currentHour = parseInt(currentTime.getHours());
   var timeIndicator = "";

   function makeit12() {
      if (currentHour === 12) {
         currentHour = 12;
      } else {
         currentHour -= 12;
      }
   }

   if (currentHour >= 19) {
      ampm.textContent = "evening";
      timeIndicator = "PM";
      makeit12();
   } else if (currentHour >= 12) {
      ampm.textContent = "afternoon";
      timeIndicator = "PM";
      makeit12();
   } else if (currentHour <= 12) {
      ampm.textContent = "morning";
      timeIndicator = "AM";
   }

   if (currentMin <= 9) {
      currentMin = "0" + currentMin.toString();
   }

   curTime.textContent =
      currentHour.toString() +
      ":" +
      currentMin +
      " " +
      timeIndicator.toLowerCase();
   curDate.textContent = currentTime.toLocaleDateString();
}

checkAmPm();
setInterval(checkAmPm, 1000);

// This is responsible for checking if the day is AM or PM//

balance.textContent = initialBal;
usersList.textContent = usersnames;
foods.textContent = foodslist;


