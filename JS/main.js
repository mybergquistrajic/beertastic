"use strict";
//This contains the code that runs all the time

//Direct code
menuBar();

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
    console.log(beerId);

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

//POP-UP Code

//Function to load different answers based on the "type" - parameter
function renderPopUp(type) {
  //Creates the popUpDiv
  const popUpDiv = document.createElement("div");
  //Adding a class for styling the popUpDiv
  popUpDiv.classList.add("display_error");

  //reaching the body-element
  const body = document.querySelector("body");

  //Depending on the popUp type , the HTML is different
  if (type === "checkage") {
    popUpDiv.innerHTML = `
      <div>
      <h1>Hi!</h1>
      <p>Are you over 18 years of age?</p>
      <button class = "yes_18">Yes</button>
      <button class = "no_18" >No</button>
      </div>
      `;
  } else if (type === "underAgeAccount") {
    popUpDiv.innerHTML = `
    <div>
    <h1>Sorry!</h1>
    <p>You need to be to be at least 18 to create an account.</p>
    <button class = "ok">Ok</button>
    </div>`;
  } else if (type === "underAgeBeer") {
    popUpDiv.innerHTML = `
    <div>
    <h1>Sorry!</h1>
    <p>You have to be over the age of 18 to view this beers.</p>
    <button class = "ok">Ok</button>
    </div>`;
  } else if (type === "ratingReview") {
    popUpDiv.innerHTML = `
    <div>
    <h1>Oops!</h1>
    <p>You have to add a rating or a review.</p>
    <button class = "ok">Ok</button>
    </div>`;
  } else if (type === "haveToLogIn") {
    popUpDiv.setAttribute("id", "haveToLogIn");
    popUpDiv.innerHTML = `
    <div>
    <h1>Sorry!</h1>
    <p>You have to be logged in to view this.</p>
    <button><a href = "../HTML/login.html">Log in</a></button> 
    </div>`;
  } else if (type === "deleteReview") {
    popUpDiv.innerHTML = `
    <div>
    <h1>Hey!</h1>
    <p>Are you sure you want to delete this review?</p>
    <button class="yesButton">Yes</button>
    <button class="noButton">No</button>`;
  } else if (type === "NoUserFound") {
    popUpDiv.innerHTML = `
    <div>
    <h1>Sorry!</h1>
    <p>No user found. Please create an account.</p>
    <button class = "ok">Ok</button>
    </div>`;
  } else if (type === "missingInfo") {
    popUpDiv.innerHTML = `
    <div>
    <h1>Sorry!</h1>
    <p>You have to fill in all of the information to create an account.</p>
    <button class = "ok">Ok</button>
    </div>`;
  } else if (type === "takenUsername") {
    popUpDiv.innerHTML = `
    <div>
    <h1>Sorry!</h1>
    <p>The username is already taken. Please try again.</p>
    <button class= "ok">Ok</button>
    </div>`;
  } else if (type === "none") {
    popUpDiv.innerHTML = "";
  } else if (type === "changedPW") {
    popUpDiv.innerHTML = `
    <div>
    <h1>Perfect!</h1>
    <p>Your password has been changed.</p>
    <button class = "ok">Ok</button>
    </div>`;
  } else if (type === "wrongPW") {
    popUpDiv.innerHTML = `
    <div>
    <h1>Oops!</h1>
    <p>The current password is wrong. Please try again.</p>
    <button class = "ok">Ok</button>
    </div>`;
  }

  //append the popUpDiv to body
  body.append(popUpDiv);
  if (type === "deleteReview" || type === "checkage") {
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
  //Also removing the popUpdiv from the body. Otherwise it would create extra div each time.
  body.removeChild(popUpDiv);
}
