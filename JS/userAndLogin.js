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
  const user_status_request = new Request("login.php", options);
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
    showLogInView();
  } else {
    //Update the global variabel to 0 to show that user is not logged in
    globalUser = 0;
    // render popup for no user found in the databas
    renderPopUp("NoUserFound");
  }
}

//function for the when the user is logged in
function showLogInView(user) {
  //Run the functions that are only accessed through logged in ?
  //Add more.
  favorites(user);
}

//FAVORITES LIST (The hearts)
//Loops through the user and for each favorite render beerBeers favorite.
function favorites(user) {
  //Loops through the users and rendersBeers based on the users liked beers
  user.likedBeers.forEach((favorite) => {
    renderBeers(favorite);
  });
}
