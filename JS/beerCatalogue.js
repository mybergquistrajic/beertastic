"use strict";

// Global variables
globalUser = localStorage.getItem("globalUser");

// Fetch all beers
function getAllBeers() {
  fetch(`../PHP/read_beerDatabase.php?un=${globalUser}&beers`)
    .then((r) => r.json())
    .then((result) => {
      filterBeers(result);
    });
}

// Filter beers (if search bar is filled, else keeps all beers)
function filterBeers(result) {
  // If there's no value in searchbar, render all beers
  if (document.querySelector(".searchBar input").value == "") {
    renderBeers(result);
  }
  // If there is a value in searchbar, filter the beers and then render
  if (document.querySelector(".searchBar input").value !== "") {
    let filteredResult = result.filter((beer) =>
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
    noResult.innerHTML =
      "<h2 style='font-weight: bolder;'>Sorry!</h2><p style='font-size: 0.7em;'>No beer with that name</p>";
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

async function renderBeer(beer) {
  // Checking if the beer is a favorite, and deciding on heart filled or not filled.
  // Used as a class to determine if the heart will be filled or not
  let favorite = await getFavorites(beer);
  if ((await favorite) == 1) {
    favorite = "filled";
  } else {
    favorite = "notfilled";
  }

  // Calculating rating and deciding on content & class
  let ratingContent;
  let ratingClass;
  let ratingSum = calculateRating(beer);
  if (ratingSum == 0) {
    ratingContent = "No ratings yet...";
    ratingClass = "norating";
  } else {
    ratingContent = `★★★★★`;
    ratingClass = "rating";
  }

  // Render each beer
  let beerDiv = document.createElement("div");
  beerDiv.innerHTML = `
    <div>
        <img src="../IMAGES/${beer["img"]}">
    </div>
    <div>
        <div class="${favorite} heart${beer["id"]}"></div>
        <h3>${beer["name"]} </h3>
        ${beer["avb"]}% <br>
        ${beer["type"]} <br>
        <div class="${ratingClass} rating${beer["id"]}">${ratingContent}</div>
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

  beerDiv.addEventListener("click", () => { popUpBeer(beer, favorite, ratingClass, ratingContent, ratingSum); })
}

function popUpBeer(beer, favorite, ratingClass, ratingContent, ratingSum) {
  // Create popup
  let oneBeerPopUp = document.createElement("div");
  oneBeerPopUp.classList.add("oneBeerPopUp");
  // Create header
  let header = document.createElement("div");
  header.classList.add("oneBeerPopUpHeader")
  // Create back button
  let backBtn = document.createElement("img");
  backBtn.src = "../IMAGES/left-arrow.png";
  // Create heart
  let heartBtn = document.createElement("div");
  heartBtn.classList.add(`${favorite}`)
  heartBtn.classList.add(`heart${beer["id"]}`)
  heartBtn.style.height = "65%";
  // Create info div
  let infoDiv = document.createElement("div");
  infoDiv.classList.add("oneBeerPopUpInfo");
  infoDiv.innerHTML = `
  <img src="../IMAGES/${beer["img"]}">
  <h2>${beer["name"]}</h2>
  ${beer["avb"]}% <br>
  ${beer["type"]} <br>
  `
  // Create starDiv
  let starDiv = document.createElement("div");
  starDiv.classList.add("starDivPopup")
  starDiv.innerHTML = `<div class="${ratingClass} ratingPopup${beer["id"]}" style="font-size: 11.5vw">${ratingContent}</div>`
  // Append everything
  document.querySelector("body").appendChild(oneBeerPopUp);
  oneBeerPopUp.appendChild(header);
  header.appendChild(backBtn);
  header.appendChild(heartBtn);
  oneBeerPopUp.appendChild(infoDiv);
  oneBeerPopUp.appendChild(starDiv);
  console.log(beer)

  // When clicking heart
  heartBtn.addEventListener("click", heartOnClick);
  // Stars
  if (ratingSum !== 0) {
    // Call function with the ratingSum and star-element as parameters
    calculateStars(document.querySelector(`.ratingPopup${beer["id"]}`), ratingSum);
  }
  // Remove popup on arrow click
  backBtn.addEventListener("click", () => { oneBeerPopUp.remove() })
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
  let main = document.createElement("div");
  main.classList.add("beerResults");
  document.querySelector("body").appendChild(main);
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
