"use strict";
//This contains the code that runs all the time



//MENU
// Menubar, to be called in all JS-files that are directly connected to HTML-files
function menuBar() {
  let menu = document.createElement("div");
  menu.innerHTML = `
    <a href="../HTML/favorites.html"><img src="../IMAGES/heart-nofilled.png" id="favoritesBtn"></a>
    <a href="../HTML/search.html"><img src="../IMAGES/beer.png" id="beerBtn"></a>
    <a href="../HTML/user.html"><img src="../IMAGES/userprofile.png" id="userBtn"></a>
    `;
  document.querySelector("body").appendChild(menu);
  menu.id = "mainMenu";
}

//HEARTS
//filles and unfills the hearts and updates the database [favorites]
function heartOnClick(event) {
  globalUser = localStorage.getItem("globalUser");
  console.log(event)
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

//POP-UP Code

//Function to load different answers based on the "type" - parameter
function renderPopUp(type) {
  //Creates the popUpDiv
  const popUpDiv = document.createElement("div");
  //Adding a class for styling the popUpDiv
  popUpDiv.classList.add("popUpDiv");

  //Depending on the popUp type , the HTML is different
  if (type === "checkage") {
    popUpDiv.innerHTML = `
      <div>
      <h1>Hi!</h1>
      <p>Are you over 18 years of age?</p>
      <button>Yes</button>
      <button>No</button>
      </div>
      `;
  } else if (type === "underAgeAccount") {
    popUpDiv.innerHTML = `
    <div>
    <h1>Sorry!</h1>
    <p>You need to be to be at least 18 to create an account.</p>
    <button>Ok</button>
    </div>`;
  } else if (type === "underAgeBeer") {
    popUpDiv.innerHTML = `
    <div>
    <h1>Sorry!</h1>
    <p>You have to be over the age of 18 to view this beers.</p>
    <button>Ok</button>
    </div>`;
  } else if (type === "ratingReview") {
    popUpDiv.innerHTML = `
    <div>
    <h1>Oops!</h1>
    <p>You have to add a rating or a review.</p>
    <button>Ok</button>
    </div>`;
  } else if (type === "haveToLogIn") {
    popUpDiv.innerHTML = `
    <div>
    <h1>Sorry!</h1>
    <p>You have to be logged in to view this.</p>
    <button>Log in</button> 
    </div>`;
  } else if (type === "deleteReview") {
    popUpDiv.innerHTML = `
    <div>
    <h1>Are you sure?</h1>
    <p>You want to delete this review?</p>
    <button class="yesButton">Yes</button>
    <button class="noButton">No</button>`;
  } else if (type === "NoUserFound") {
    popUpDiv.innerHTML = `
    <div>
    <h1>Sorry!</h1>
    <p>No user found. Please create an account.</p>
    <button>Ok</button>
    </div>`;
  } else if (type === "missingInfo") {
    popUpDiv.innerHTML = `
    <div>
    <h1>Sorry!</h1>
    <p>You have to fill in all of the information to create an account.</p>
    <button>Ok</button>
    </div>`;
  } else if (type === "takenUsername") {
    popUpDiv.innerHTML = `
    <div>
    <h1>Sorry!</h1>
    <p>The username is already taken. Please try again.</p>
    <button>Ok</button>
    </div>`;
  } else if (type === "none") {
    popUpDiv.innerHTML = "";
  }

  //append the popUpDiv here:
}

//EVENT-FUNCTIONS

//     loginButton.addeventListener("click", login.html
//     logIn(user_status); )

//     logOut.button.addeventListener("click",
//     change the global variable to null
//     or reload the page and reset the page.
//     )

//     createAccountButton.eventListener("click, create.html)

// Direct code:
menuBar();
