const inputUsername = document.getElementById("username");
const inputPassword = document.getElementById("password");
const btnSubmit = document.getElementById("formSubmit");
var valUsername;
var valPassword;
var usernameFromDB;

function checkEmpty(event) {
   valUsername = inputUsername.value.trim();
   valPassword = inputPassword.value.trim();

   if (valUsername === "" || valPassword === "") {
      alert("Username and Password must not be empty");
      event.preventDefault(); // Prevent form submission
      console.log("prevented");
      return false;
   } else {
        alert("Username Saved");
   }
}

// Make sure that the DOM is loaded before we proceed with functions
document.addEventListener("DOMContentLoaded", function () {
   if (btnSubmit) {
      btnSubmit.addEventListener("click", checkEmpty);
   } else {
      console.error("btnSubmit element not found.");
   }
});




// not used at the moment. I will get back to this next time to validate data before sending it to the back end
function checkIfUserExists() {
   dataToSend = valUsername;
   fetch("/user/checkUser", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: dataToSend }),
   })
      .then((response) => response.json())
      .then((data) => {
         usernameFromDB = data

      })
      .catch((error) => {
         console.error("Error sending data:", error);
      });
}
