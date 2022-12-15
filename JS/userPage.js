"user strict";

//Function for the patching of the password/Changing the password
function putPassword(username) {
  //the username in the body is the same as the user that is logged in
  localStorage.getItem("globalUser", username);

  //reads the value of the inputfields for changing the password
  const currentPW = document.getElementById("currentPW").value;
  const newPW = document.getElementById("newPW").value;

  //the request body  contains username, old password and new password
  const putPW = {
    username: username,
    password: currentPW,
    newPassword: newPW,
  };

  //The method, body and headers

  const options = {
    method: "PUT",
    body: JSON.stringify(putPW),
    headers: { "Content-type": "application/json" },
  };

  //The request to the update password file

  const putRequest = new Request("../PHP/updatePassword.php", options);

  //Fetthing the request
  fetch(putRequest)
    .then((r) => r.json())
    .then(console.log);
}

//Logout that clears the localstorage and sends the user to the startpage
function logOut() {
  localStorage.clear();
  window.location.href = "index.html";
}

//Funciton to get the username in the h1
function welcomeUser(username) {
  localStorage.setItem("globalUser", username);
  const userInfo = document.getElementById("userInfo");
  const h1 = (document.createElement("h1").innerText = `Welcome ${username}`);
  userInfo.append(h1);
}

//Eventfuntion on logout that runs logout  funciton
const log_out_b = document.getElementById("logOutButton");
log_out_b.addEventListener("click", logOut);

//Eventfuntion for the change passowrd button
const changePWbutton = document.getElementById("changePW");
changePWbutton.addEventListener("click", putPassword);
//Direct code
welcomeUser(globalUser);
