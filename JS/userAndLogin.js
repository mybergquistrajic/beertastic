"use strict";

// Functions to support login and create account

//DIRECT CODE

//Global variabel for user
let globalUser;

//If the pathlocation is createa_ccount.html
//Evenlistner for the createAccount button that runs the renderNewUser function
if (window.location.pathname.endsWith("create_account.html")) {
  const c_button = document.getElementById("createAccountButton");
  c_button.addEventListener("click", renderNewUser);
}

//if pathlocation is login.html
//The eventlistner for the loginButton and runs the login-funcion with the parameter globalUser
if (window.location.pathname.endsWith("login.html")) {
  const logInButton = document.getElementById("login_button");
  logInButton.addEventListener("click", () => {
    logIn(globalUser);
  });
}

//FUNCTIONS

//function to log in
function logIn() {
  //Reads the values of the inputs (username, password)
  const username = document.getElementById("logIn_username").value;
  const password = document.getElementById("logIn_password").value;

  //The user data for the body
  const user = {
    username: username,
    password: password,
  };

  //the method, body and headers in the request
  const options = {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-type": "application/json" },
  };

  //request to log in
  const user_status_request = new Request("PHP/login.php", options);

  //The responseStatus
  let responseStatus;

  //fetch the request , when the resource promise comes call the function logIn_answer (responseStatus and username)
  fetch(user_status_request)
    .then((r) => {
      responseStatus = r;
      return r.json();
    })
    .then((resource) => {
      logIn_answer(responseStatus, resource.username);
    });
}

//Function for the response to the log in request
function logIn_answer(responseStatus, username) {
  //If the user is in the database and the log in is sucessful
  if (responseStatus.status === 200) {
    //Update the global variabel to the username
    localStorage.setItem("globalUser", username);
    //send the user to the their favorites
    window.location.href = "favorites.html";

    //if not successful log in
  } else if (responseStatus.status === 400) {
    // render popup for no user found in the databas
    renderPopUp("NoUserFound");
    //Update the global variabel to 0 to show that user is not logged in
    globalUser = 0;
    //if the information is incorrect render popUp
  } else if (responseStatus.status === 404) {
    renderPopUp("missingInfo");
  }
}

//Function to show users favorites
function showFavorites(username) {
  // Empty array to fill with beers
  let faveBeers = [];
  // Get user object from fetch
  fetch(`PHP/readUsersDatabase.php?un=${username}`)
    .then((r) => r.json())

    .then((user) => {
      // If no favorites, display message
      if (user["likedBeers"].length == 0) {
        let noResult = document.createElement("div");
        noResult.innerHTML = `
        <div>
        <p>No favorites yet</p>
        <p>Try adding some from the catalogue!</p>
        </div>
        `;
        document.querySelector(".beerResults").appendChild(noResult);
        noResult.classList.add("noResult");
      }
      user["likedBeers"].forEach((favorite) => {
        // For each beer ID, fetch readBeerDatabase to get the full beer object
        fetch(`PHP/read_beerDatabase.php?un=${username}&id=${favorite.id}&beers`)
          .then((r) => r.json())
          .then((result) => {
            // For each beer, push the beer to the faveBeers array
            faveBeers.push(result);
            // At last, call renderBeers (in beerCatalogue.js)
            if (faveBeers.length == user["likedBeers"].length) {
              renderBeers(faveBeers);
            }
          });
      });
    });
}

//CreateAccount for the new user
function renderNewUser() {
  //the values in the input fields for username, password, age
  const c_username = document.getElementById("c_username").value;
  const c_password = document.getElementById("c_password").value;
  const age = document.getElementById("age").value;

  //newUser that is in the body with username and password and age
  const newUser = {
    username: c_username,
    password: c_password,
    age: age,
  };

  //the method, body and headers in the request
  const options = {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: { "Content-type": "application/json" },
  };

  //request create new user
  const new_user_request = new Request("PHP/postUser.php", options);

  //fetch the request and depenting on the response status renderPopUp
  fetch(new_user_request)
    .then((response) => {
      //taken username
      if (response.status === 400) {
        return renderPopUp("takenUsername");
      }
      //under 18
      if (response.status === 403) {
        return renderPopUp("underAgeAccount");
      }
      //missing information in the request
      if (response.status === 404) {
        return renderPopUp("missingInfo");
      }
      //Wrong password length
      if (response.status === 416) {
        return renderPopUp("wrongLenght");
      }

      return response.json();
    })

    //returning the new user
    .then((new_user) => {
      if (new_user === undefined) {
        return;
      }
      //runs the function create user with the new user data
      createdUser(new_user);
    });
}

//function for the created user
function createdUser(newUser) {
  //Stores the new user in localStorage
  localStorage.setItem("globalUser", newUser["username"]);
  //the new user gets send to user.html when creating an account
  window.location.href = "user.html";
}
