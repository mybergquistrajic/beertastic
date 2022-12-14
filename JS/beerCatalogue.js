"use strict";
// NOTES – To Do //
// – Fetch to change heart saves heart in database as string, not int...
//   might be a problem on the PHP side?
// – Add star-rating to the review
// – Link to beer when clicking on it

// Global variables, username & password to be changes
let beerResult;
// let username = "mybr";
// let password = "mrPotatoHead";
globalUser = localStorage.getItem("globalUser");

// Fetch all beers
function getAllBeers() {
  fetch(`../PHP/read_beerDatabase.php?un=${globalUser}&beers`)
    .then((r) => r.json())
    .then((result) => {
      // Fill the global result variable, and then call filterBeers
      beerResult = result;
      filterBeers();
    });
}

// Filter beers (if search bar is filled, else keeps all beers)
function filterBeers() {
  // If there's no value in searchbar, render all beers
  if (document.querySelector(".searchBar input").value == "") {
    renderBeers(beerResult);
  }
  // If there is a value in searchbar, filter the beers and then render
  if (document.querySelector(".searchBar input").value !== "") {
    let filteredResult = beerResult.filter((beer) =>
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
      "<p style='font-weight: bolder;'>Sorry!</p><p style='font-size: 0.7em;'>No beer with that name</p>";
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
        ${beer["name"]} <br>
        ${beer["avb"]}% <br>
        ${beer["type"]} <br>
        <div class="${ratingClass} rating${beer["id"]}">${ratingContent}</div>
    </div>
    `;

  // Append beer and give class
  document.querySelector(".beerResults").appendChild(beerDiv);
  beerDiv.classList.add("beerDiv");
  // If the bees has (at least one) rating(s)
  if (ratingSum !== 0) {
    // Call function with the ratingSum and star-element as parameters
    calculateStars(document.querySelector(`.rating${beer["id"]}`), ratingSum);
  }
  // When clicking the heart
  document.querySelector(`.heart${beer["id"]}`).addEventListener("click", heartOnClick);
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
  let searchDiv = document.createElement("div")
  searchDiv.classList.add("searchBar")
  searchDiv.innerHTML = `<input placeholder="search by name..."></input>`
  document.querySelector("body").appendChild(searchDiv)

  // Result
  let main = document.createElement("div")
  main.classList.add("beerResults")
  document.querySelector("body").appendChild(main)
}



// DIRECT CODE
// If current file/view is favorites
if (window.location.pathname.endsWith('favorites.html')) {
  let main = document.createElement("div")
  main.classList.add("beerResults")
  document.querySelector("body").appendChild(main)
  showFavorites(globalUser)
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



// function searchBar(){
//     renders and appends searchbar
//     searchbars inputValue filters the results
//     }

//     function getAllBeers(){
//     GET - fetch with the read.php-file
//     In the resource promise run the function seachBeers
//     then (r=> r.json)
//     then(result => {searchBeers(result)})
//     }

//     function searchBeers(beers){
//     if ( searchFieldIsFilled ){
//     filter beers
//     renderBeers(beers)
//     }
//     else (no result is found send a message "Sorry! No results found")
//     }

//     function renderBeers (beers){
//     forEach loop that loops through databaseOfBeers =>
//     beer.name
//     beer.type
//     beer.AVB
//     beer.img

//     renderRatings(beer)
//     renderHeart()

//     beerDiv.event.listener – when beer is clicked, (){
//     if not logged in → popup: you have to be logged in
//     else{
//     load one_beer.html
//     render_one_beer(beer);
//     }
//     }

