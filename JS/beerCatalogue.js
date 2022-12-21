"use strict";
// console.log(localStorage.getItem(globalUser))
// if (localStorage.getItem("globalUser") === null) {
//   localStorage.setItem("globalUser", "admin");
//   console.log("hej")
// }

// Global variables
let globalBeers;
globalUser = localStorage.getItem("globalUser");

// Fetch all beers
function getAllBeers() {
  fetch(`../PHP/read_beerDatabase.php?un=${globalUser}&beers`)
    .then((r) => r.json())
    .then((result) => {
      //sorting the result in alphabetical order based on the beers name.
      result.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });

      //Updates the beerarray with the sorted resource result
      globalBeers = result;

      filterBeers();
    });
}

// Filter beers (if search bar is filled, else keeps all beers)
function filterBeers() {
  // If there's no value in searchbar, render all beers
  if (document.querySelector(".searchBar input").value == "") {
    renderBeers(globalBeers);
  }
  // If there is a value in searchbar, filter the beers and then render
  if (document.querySelector(".searchBar input").value !== "") {
    let filteredResult = globalBeers.filter((beer) =>
      beer["name"].toLowerCase().includes(document.querySelector(".searchBar input").value)
    );
    renderBeers(filteredResult);
  }
}

// Render beers
function renderBeers(result) {
  document.querySelector(".beerResults").innerHTML = "";
  // If result is empty
  if (result.length < 1) {
    let noResult = document.createElement("div");
    noResult.innerHTML = `<div><p>Sorry!</p><p>No beer with that name, try searching for another one</p></div>`;
    document.querySelector(".beerResults").appendChild(noResult);
    noResult.classList.add("noResult");
  }
  // Else call renderBeer() for each beer
  else {
    result.forEach((beer) => {
      renderBeer(beer);
    });
  }
}

// Renders one beer
async function renderBeer(beer) {
  let favorite;
  // Get favourite status
  if (globalUser == "admin") {
    favorite = "notfilled";
  } else {
    favorite = await checkFavorite(beer);
  }
  // Get rating values
  let rating = await checkRating(beer);
  let ratingSum = await rating[0];
  let ratingContent = await rating[1];
  let ratingClass = await rating[2];
  let reviewWidth = await rating[3];

  // HTML of the beer
  let beerDiv = document.createElement("div");
  beerDiv.innerHTML = `
    <div class="${favorite} heart${beer["id"]}"></div>
    <div class="popUp${beer["id"]}">
        <div>
          <img src="../IMAGES/${beer["img"]}">
        </div>
        <div>
          <h3>${beer["name"]} </h3>
          ${beer["avb"]}% <br>
          ${beer["type"]} <br>
          <div style="width: ${reviewWidth}"><div class="${ratingClass} rating${beer["id"]}">${ratingContent}</div></div>
        </div>
    </div>
    `;

  // Append beer and give class
  document.querySelector(".beerResults").appendChild(beerDiv);
  beerDiv.classList.add("beerDiv");
  beerDiv.id = "beer" + beer.id;
  // If the bees has (at least one) rating(s)
  if (ratingSum !== 0) {
    // Call function with the ratingSum and star-element as parameters
    calculateStars(document.querySelector(`.rating${beer["id"]}`), ratingSum);
  }
  // When clicking the heart
  document.querySelector(`.heart${beer["id"]}`).addEventListener("click", heartOnClick);
  // When clicking the beer
  document.querySelector(`.popUp${beer["id"]}`).addEventListener("click", () => {
    popUpBeer(beer);
  });
}

// Render the popup when clicking beer
async function popUpBeer(beer) {
  // If not logged in
  if (globalUser == "admin") {
    renderPopUp("haveToLogIn")
  }
  // If logged in
  else {
    // Get favourite status
    let favorite = await checkFavorite(beer);
    // Get rating values
    let rating = await checkRating(beer);
    let ratingSum = await rating[0];
    let ratingContent = await rating[1];
    let ratingClass = await rating[2];
    let popUpRating;
    if (ratingSum == 0) {
      popUpRating = "5vw";
    } else {
      popUpRating = "11.5vw";
    }
    // Create popup
    let oneBeerPopUp = document.createElement("div");
    oneBeerPopUp.classList.add("oneBeerPopUp");
    // Create content box
    let oneBeerPopUpContent = document.createElement("div");
    oneBeerPopUpContent.classList.add("oneBeerPopUpContent");
    // Create header
    let header = document.createElement("div");
    header.classList.add("oneBeerPopUpHeader");
    // Create back button
    let backBtn = document.createElement("img");
    backBtn.src = "../IMAGES/left-arrow.png";
    // Create heart
    let heartBtn = document.createElement("div");
    heartBtn.classList.add(`${favorite}`);
    heartBtn.classList.add(`heart${beer["id"]}`);
    heartBtn.style.height = "65%";
    // Create info div
    let infoDiv = document.createElement("div");
    infoDiv.classList.add("oneBeerPopUpInfo");
    infoDiv.innerHTML = `
  <img src="../IMAGES/${beer["img"]}">
  <h2 style="font-family: 'Shadows Into Light', cursive; margin-bottom: 0px;">${beer["name"]}</h2>
  ${beer["avb"]}% <br>
  ${beer["type"]} <br>
  `;
    // Create starDiv
    let starDiv = document.createElement("div");
    starDiv.classList.add("starDivPopup");
    starDiv.innerHTML = `<div class="${ratingClass} ratingPopup${beer["id"]}" style="font-size: ${popUpRating}">${ratingContent}</div>`;
    // Create rating numbers
    let ratingNumbers = document.createElement("div");
    ratingNumbers.classList.add("ratingNumber");
    ratingNumbers.innerHTML = `(${ratingSum} / 5)`;
    // Create reviewBtn
    let reviewBtn = document.createElement("div");
    reviewBtn.classList.add("reviewBtn");
    reviewBtn.innerHTML = `Review Beer`;
    // Create reviewsDiv
    let reviewsDiv = document.createElement("div");
    reviewsDiv.classList.add("reviews");
    // Append everything
    document.querySelector("body").appendChild(oneBeerPopUp);
    oneBeerPopUp.appendChild(header);
    oneBeerPopUp.appendChild(oneBeerPopUpContent);
    header.appendChild(backBtn);
    header.appendChild(heartBtn);
    oneBeerPopUpContent.appendChild(infoDiv);
    oneBeerPopUpContent.appendChild(starDiv);
    starDiv.appendChild(ratingNumbers);
    oneBeerPopUpContent.appendChild(reviewBtn);
    oneBeerPopUpContent.appendChild(reviewsDiv);

    // Render the reviews
    renderReviews(beer, ratingClass);

    // When clicking heart
    heartBtn.addEventListener("click", heartOnClick);
    // Remove popup on arrow click
    backBtn.addEventListener("click", () => {
      oneBeerPopUp.remove();
      //Re-fetch in case a beer has been updated
      getAllBeers();
    });
    // Rating stars
    if (ratingSum !== 0) {
      // Call function with the ratingSum and star-element as parameters
      calculateStars(document.querySelector(`.ratingPopup${beer["id"]}`), ratingSum);
    }
    // On review button click
    reviewBtn.addEventListener("click", () => {
      writeReview(beer);
    });
  }
}

// Check if current beer (from renderBeer function) is a favorite
async function getFavorites(beer) {
  let user = await (await fetch(`../PHP/readUsersDatabase.php?un=${globalUser}`)).json();
  // Loop through current users favorites
  for (let i = 0; i < (await user.likedBeers.length); i++) {
    if (user.likedBeers[i].id == beer["id"]) {
      // If yes, return 1
      return 1;
    }
  }
  // If no, return 0
  return 0;
}

// Checking if beer is a favourite and deciding on future class
async function checkFavorite(beer) {
  let favorite = await getFavorites(beer);
  if ((await favorite) == 1) {
    favorite = "filled";
  } else {
    favorite = "notfilled";
  }
  return favorite;
}

// Checking the beers rating and returning different values
// for sum, content, class and starwidth.
async function checkRating(beer) {
  let ratingSum = await calculateRating(beer);
  if (ratingSum == 0) {
    // ratingsum, ratingContent, ratingClass, reviewWidth
    return [ratingSum, "No ratings yet...", "norating", "100%"];
  } else {
    return [ratingSum, `★★★★★`, "rating", "50%"];
  }
}

// Search & main
function renderSearchAndMain() {
  // Search
  let searchDiv = document.createElement("div");
  searchDiv.classList.add("searchBar");
  searchDiv.innerHTML = `<input placeholder="search by name..."></input>`;
  document.querySelector("body").appendChild(searchDiv);

  // Result
  let main = document.createElement("div");
  main.classList.add("beerResults");
  document.querySelector("body").appendChild(main);
}

// DIRECT CODE

// If current file/view is favorites
if (window.location.pathname.endsWith("favorites.html")) {
  if (globalUser == "admin") {
    renderPopUp("haveToLogIn");
  }
  let main = document.createElement("div");
  main.classList.add("beerResults");
  document.querySelector("body").appendChild(main);
  main.style.maskImage = "linear-gradient(to top, black calc(100% - 40px), transparent 100%)";
  showFavorites(globalUser);
}

// If current file/view is beerCatalogue
else {
  // Render searchbar and main (beerResults)
  renderSearchAndMain();
  // Render all beers
  getAllBeers();
  // Eventlistener on searchbar
  document.querySelector(".searchBar input").onkeyup = function () {
    filterBeers();
  };
}
