"use strict";

//DIRECT CODE
//If the global user is null set it to "admin", that represents the user is not logged in.
if (localStorage.getItem("globalUser") === null) {
  localStorage.setItem("globalUser", "admin");
}

//Render the logIn popUp if the user is not logged in (admin)
if (localStorage.getItem("globalUser") === "admin") {
  renderPopUp("haveToLogIn");
}

//Eventfuntion on logout button that runs logout  funciton
const log_out_b = document.getElementById("logOutButton");
log_out_b.addEventListener("click", logOut);

//Eventfuntion for the change passowrd button
const changePWbutton = document.getElementById("changePW");
changePWbutton.addEventListener("click", putPassword);

//runs the function welcomeUser with the username as parameter
welcomeUser(localStorage.getItem("globalUser"));

//FUNCTIONS

//Function for the patching of the password/Changing the password
function putPassword() {
  //the username in the body is the same as the user that is logged in
  globalUser = localStorage.getItem("globalUser");

  //reads the value of the inputfields for changing the password
  const currentPW = document.getElementById("currentPW").value;
  const newPW = document.getElementById("newPW").value;

  //the request body  contains username, old password and new password
  const putPW = {
    username: globalUser,
    password: currentPW,
    newPassword: newPW,
  };

  //The method, body and headers
  const options = {
    method: "PUT",
    body: JSON.stringify(putPW),
    headers: { "Content-type": "application/json" },
  };

  //the request for changing password
  const putRequest = new Request("../PHP/updatePassword.php", options);

  //The response to the update password file
  let response;

  //Fetching the request
  fetch(putRequest)
    //Updating the response with the response and returning it
    .then((r) => {
      response = r;
      return r.json();
    })
    //Run the funciton with the response
    .then(() => {
      changedPWStatus(response);
    });
}

//Function for the response status. Depending on the responsestatus render different popUp-types.
function changedPWStatus(response) {
  if (response.status === 200) {
    renderPopUp("changedPW");
  }
  if (response.status === 400) {
    renderPopUp("missingInfo");
  }
  if (response.status === 404) {
    renderPopUp("wrongPW");
  }
  if (response.status === 416) {
    renderPopUp("wrongLenght");
  }
}

//Funciton to visualize the username in the userPage
function welcomeUser(username) {
  const userInfo = document.getElementById("userInfo");
  const div = document.createElement("div");
  div.innerText = `Welcome ${username}`;
  userInfo.append(div);
}
