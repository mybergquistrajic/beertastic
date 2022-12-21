"use strict";

if (localStorage.getItem("globalUser") === "admin") {
  renderPopUp("haveToLogIn");
}

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

  const putRequest = new Request("../PHP/updatePassword.php", options);

  //The request to the update password file
  let response;
  //Fetthing the request
  fetch(putRequest)
    //Updating the response with the response and returning it
    .then((r) => {
      response = r;
      return r.json();
    })
    //Run the funciton for the response
    .then(() => {
      changedPWStatus(response);
    });
}

//Function for the response status. Depending on the responsestatus render different popUp-types.
function changedPWStatus(response) {
  if (response.status === 200) {
    renderPopUp("changedPW");
  } else if (response.status === 400) {
    renderPopUp("missingInfo");
  } else if (response.status === 404) {
    renderPopUp("wrongPW");
  }
}
//Logout that clears the localstorage and sends the user to the startpage
function logOut() {
  localStorage.setItem("globalUser", "admin");
  // localStorage.clear();
  window.location.href = "index.html";
}

//Funciton to get the username in the h1
function welcomeUser(username) {
  const userInfo = document.getElementById("userInfo");
  const div = document.createElement("div");
  div.innerText = `Welcome ${username}`;
  userInfo.append(div);
}

//Eventfuntion on logout that runs logout  funciton
const log_out_b = document.getElementById("logOutButton");
log_out_b.addEventListener("click", logOut);

//Eventfuntion for the change passowrd button
const changePWbutton = document.getElementById("changePW");
changePWbutton.addEventListener("click", putPassword);
//Direct code
welcomeUser(localStorage.getItem("globalUser"));
