"use strict";
//This contains the code that is used all the time

//DIRECT CODE
menuBar();

//If the user is null set the user to admin
if (localStorage.getItem("globalUser") === null) {
  localStorage.setItem("globalUser", "admin");
}

//If the global user is not admin (loged out) and the startpage is set
if (localStorage.getItem("globalUser") !== "admin") {
  if (window.location.pathname.endsWith("index.html")) {
    const href = document.querySelector("#logIn");
    const href1 = document.querySelector("#createA");
    const wrapper = document.querySelector("#swipeWrapper");
    //Adjustingn the swipe box to look better visually
    wrapper.style.marginTop = "15vh";
    //removes the sign in and createaccount button
    href.remove();
    href1.remove();

    //Also adds a log Out button to the startpage if the user is logged in.
    const logout_startpage = document.createElement("button");
    //Styles it
    logout_startpage.classList.add("Buttons");
    logout_startpage.innerText = "Log Out";
    logout_startpage.style.border = "solid";
    let index = document.querySelector("#indexContent");
    index.append(logout_startpage);
    //Eventfuntion on logout that runs logout  funciton
    logout_startpage.addEventListener("click", logOut);
  }
}

//FUNCTIONS

//MENU
// Menubar, to be called in all JS-files that are directly connected to HTML-files
function menuBar() {
  let menu = document.createElement("div");
  let home, heart, beer, user;
  if (window.location.pathname.endsWith("favorites.html")) {
    heart = "heart-color.png";
  } else {
    heart = "heart-nofilled.png";
  }
  if (window.location.pathname.endsWith("search.html")) {
    beer = "beer-color.png";
  } else {
    beer = "beer.png";
  }
  if (window.location.pathname.endsWith("user.html")) {
    user = "user-color.png";
  } else {
    user = "userprofile.png";
  }
  if (window.location.pathname.endsWith("index.html")) {
    home = "home-color.png";
  } else {
    home = "home.png";
  }
  menu.innerHTML = `
    <a href="../HTML/index.html"><img src="../IMAGES/${home}" id="homeBtn"></a>
    <a href="../HTML/favorites.html"><img src="../IMAGES/${heart}" id="favoritesBtn"></a>
    <a href="../HTML/search.html"><img src="../IMAGES/${beer}" id="beerBtn"></a>
    <a href="../HTML/user.html"><img src="../IMAGES/${user}" id="userBtn"></a>
    `;
  document.querySelector("body").appendChild(menu);
  menu.id = "mainMenu";
}

//HEARTS
//filles and unfills the hearts and updates the database [favorites]
function heartOnClick(event) {
  globalUser = localStorage.getItem("globalUser");
  // If not logged in
  if (globalUser == "admin") {
    renderPopUp("haveToLogIn");
  }
  // If logged in
  else {
    // The heart we clicked on
    let heart = event.target;
    // Takes the class name (ex heart5) and splices 5, to only get the beer ID
    let beerId = event.target.classList[1].slice(5);

    // If the heart is filled, make it not filled
    if (heart.classList.contains("filled")) {
      heart.classList.replace("filled", "notfilled");
    }
    // If the heart is not filled, fill it
    else {
      heart.classList.replace("notfilled", "filled");
    }
    // Fetch to update database
    fetch("../PHP/heart.php", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: globalUser,
        beerId: beerId,
      }),
    })
      .then((r) => r.json())
      .then();
  }
}

//POP-UP
//Function to load different answers based on the "type" - parameter
function renderPopUp(type) {
  //Creates the popUpDiv
  const popUpDiv = document.createElement("div");
  //Adding a class for styling the popUpDiv
  popUpDiv.classList.add("display_error");

  //reaching the body-element
  const body = document.querySelector("body");

  //Depending on the popUp type name , the HTML is different
  //if the user is under 18
  if (type === "underAgeAccount") {
    popUpDiv.innerHTML = `
    <div>
    <h1>Sorry!</h1>
    <p>You need to be to be at least 18 to create an account.</p>
    <button class = "ok">Ok</button>
    </div>`;

    //If the rating (text or stars is empty)
  } else if (type === "ratingReview") {
    popUpDiv.innerHTML = `
    <div>
    <h1>Oops!</h1>
    <p>You have to add a rating or a review.</p>
    <button class = "ok">Ok</button>
    </div>`;

    //If the user isn't logged in
  } else if (type === "haveToLogIn") {
    popUpDiv.setAttribute("id", "haveToLogIn");
    popUpDiv.innerHTML = `
    <div>
    <h1>Sorry!</h1>
    <p>You have to be logged in to view this.</p>
    <button><a href = "../HTML/login.html">Log in</a></button> 
    </div>`;

    //Deleting a review
  } else if (type === "deleteReview") {
    popUpDiv.innerHTML = `
    <div>
    <h1>Hey!</h1>
    <p>Are you sure you want to delete this review?</p>
    <button class="yesButton">Yes</button>
    <button class="noButton">No</button>`;

    //If no user is found
  } else if (type === "NoUserFound") {
    popUpDiv.innerHTML = `
    <div>
    <h1>Sorry!</h1>
    <p>No user found. Please create an account.</p>
    <button class = "ok">Ok</button>
    </div>`;

    //Informaiton is missing
  } else if (type === "missingInfo") {
    popUpDiv.innerHTML = `
    <div>
    <h1>Sorry!</h1>
    <p>You have to fill in all of the information to create an account.</p>
    <button class = "ok">Ok</button>
    </div>`;

    //The username is already taken
  } else if (type === "takenUsername") {
    popUpDiv.innerHTML = `
    <div>
    <h1>Sorry!</h1>
    <p>The username is already taken. Please try again.</p>
    <button class= "ok">Ok</button>
    </div>`;

    //When changing the password
  } else if (type === "changedPW") {
    popUpDiv.innerHTML = `
    <div>
    <h1>Perfect!</h1>
    <p>Your password has been changed.</p>
    <button class = "ok">Ok</button>
    </div>`;

    //The wrong password is filled in
  } else if (type === "wrongPW") {
    popUpDiv.innerHTML = `
    <div>
    <h1>Oops!</h1>
    <p>The current password is wrong. Please try again.</p>
    <button class = "ok">Ok</button>
    </div>`;

    //the password is to short
  } else if (type === "wrongLenght") {
    popUpDiv.innerHTML = `
    <div>
    <h1>Oops!</h1>
    <p>The password must contain at least 5 characters.</p>
    <button class = "ok">Ok</button>
    </div>`;
  }

  //append the popUpDiv to body
  //if the type is deletereview,checkage,havetologin dont create an ok button
  body.append(popUpDiv);
  if (type === "deleteReview" || type === "checkage" || type === "haveToLogIn") {
  } else {
    const ok = document.querySelector(".ok");
    ok.addEventListener("click", addAndRemoveClass);
  }
}

//function for adding and removing the class for the popUpdiv
function addAndRemoveClass(e) {
  e.preventDefault();
  const body = document.querySelector("body");
  const popUpDiv = document.querySelector(".display_error");
  popUpDiv.classList.remove("display_error");
  //Also removing the popUpdiv from the body
  body.removeChild(popUpDiv);
}

//Logout that clears the localstorage and sends the user to the startpage
function logOut() {
  localStorage.setItem("globalUser", "admin");
  window.location.href = "index.html";
}
