const inputUsername = document.getElementById("username");
const inputPassword = document.getElementById("password");
const btnSubmit = document.getElementById("formSubmit");
var valUsername;
var valPassword;
var usernameFromDB;

// Make sure that the DOM is loaded before we proceed with functions
document.addEventListener("DOMContentLoaded", function () {
   if (btnSubmit) {
      btnSubmit.addEventListener("click", checkEmpty);
   } else {
      console.error("btnSubmit element not found.");
   }
});

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
