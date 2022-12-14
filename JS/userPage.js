"user strict";

//Function for the patching of the password/Changing the password

//Logout that clears the localstoraga and reloads the page
function logOut() {
  const log_out_b = document.getElementById("log_out_button");
  log_out_b.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
  });
}

//Eventfuntion on logout that runs logout  funciton
