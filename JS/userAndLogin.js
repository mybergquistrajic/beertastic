"use strict";
//Global variabel for user to see if logged in or not.
let globalUser;

//USER LOGIN
//function to log in with the user_status to define logged in or not
function logIn(user_status) {
  const username = document.getElementById("logIn_username").value;
  const password = document.getElementById("logIn_password").value;

  //user that is in the body with username and password
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

  //request to log in PHP-file
  const user_status_request = new Request("../PHP/login.php", options);
  //fetch the request , when the resource promise comes call the function logIn_answer
  fetch(user_status_request)
    .then((r) => r.json())
    .then(logIn_answer(user_status, username));
}

//Function for the response to the request to log in
function logIn_answer(response, username) {
  //If the user is in the database and the log in is sucessful show the log in view.
  if (response === 200) {
    //Update the global variabel to the username
    globalUser = username;
    //Run the funciton for the Log in view
    showLogInView(username);
  } else {
    //Update the global variabel to 0 to show that user is not logged in
    globalUser = 0;
    // render popup for no user found in the databas
    renderPopUp("NoUserFound");
  }
}

//Function to show users favorites
function showFavorites(username) {
  // Get user object from fetch
  fetch(`../PHP/readUsersDatabase.php?un=${username}`)
    .then((r) => r.json())
    .then(user => {
      // Empty array to fill with beers
      let faveBeers = [];
      user["likedBeers"].forEach(favorite => {
        // For each beer ID, fetch readBeerDatabase to get the full beer object 
        fetch(`../PHP/read_beerDatabase.php?un=${username}&id=${favorite.id}&beers`)
          .then(r => r.json())
          .then(result => {
            // For each beer, push the beer to the faveBeers array
            faveBeers.push(result)
            // At last, call renderBeers (in beerCatalogue.js)
            renderBeers(faveBeers)
          })
      })
    })
}

//CreateAccount for the new user
function renderNewUser() {
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

  //request create new user to the postuser php file
  const new_user_request = new Request("../PHP/postUser.php", options);
  //fetch the request ,
  fetch(new_user_request)
    .then((response) => {
      if (newUser.age < 18) {
        renderPopUp("underAgeAccount");
      } else if (response === 400) {
        renderPopUp("takenUsername");
      } else if (response === 404) {
        renderPopUp("missingInfo");
      }
      return response.json();
    })
    //Fucntion to update the userJSON-file?
    .then(console.log);
}

const c_button = document.getElementById("createAccountButton");
c_button.addEventListener("click", renderNewUser);

document.getElementById("favoritesBtn").addEventListener("click", favorites);
