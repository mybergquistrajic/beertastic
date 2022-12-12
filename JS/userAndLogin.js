"use strict";

//USER LOGIN
//function to log in with the user_status to define logged in or not
function logIn(user_status) {
  //request to log in PHP-file
  const user_status_request = new Request("login.php");

  //fetch the request , when the resource promise comes call the function logIn_answer
  fetch(user_status_request)
    .then((r) => r.json())
    .then(logIn_answer(user_status));
}

//Function for the response to the request to log in
function logIn_answer(response_answer) {
  //If the user is in the database and the log in is sucessful show the log in view.
  if (response_answer === 200) {
    showLogInView();
  } else {
    //error message here?
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
