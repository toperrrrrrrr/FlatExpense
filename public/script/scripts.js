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
      ampm.textContent = "Evening";
      timeIndicator = "PM";
      makeit12();
   } else if (currentHour >= 12) {
      ampm.textContent = "Afternoon";
      timeIndicator = "PM";
      makeit12();
   } else if (currentHour <= 12) {
      ampm.textContent = "Morning";
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

function toggle() {
   const btn = document.querySelector(".toggle-sidebar-btn");
   if (btn) {
      btn.addEventListener("click", () => {
         document.body.classList.toggle("toggle-sidebar");
      });
   }
}

toggle();
