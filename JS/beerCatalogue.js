"use strict"

// Global variables, username & password to be changes
let beerResult;
let username = "mybr";
let password = "mrPotatoHead";

// Fetch all beers
function getAllBeers() {
    fetch(`../PHP(Back-End)/read_beerDatabase.php?un=${username}&pw=${password}&beers`)
        .then(r => r.json())
        .then(result => {
            // Fill the global result variable, and then call filterBeers
            beerResult = result;
            filterBeers();
        })
}

// Filter beers (if search bar is filled, else keeps all beers)
function filterBeers() {
    // If there's no value in searchbar, render all beers
    if (document.querySelector(".searchBar input").value == "") {
        renderBeers(beerResult);
    }
    // If there is a value in searchbar, filter the beers and then render
    if (document.querySelector(".searchBar input").value !== "") {
        let filteredResult = beerResult.filter(beer => beer["name"].toLowerCase().includes(document.querySelector(".searchBar input").value));
        renderBeers(filteredResult);
    }
}

// Render beers
function renderBeers(result) {
    document.querySelector(".beerResults").innerHTML = "";
    // If result is empty
    if (result.length < 1) {
        let noResult = document.createElement("div");
        noResult.innerHTML = "Sorry, no beer with that name";
        document.querySelector(".beerResults").appendChild(noResult);
    }
    // Else call renderBeer() for each beer
    else {
        result.forEach(beer => {
            renderBeer(beer);
        })
    }
}

async function renderBeer(beer) {

    // Checking if the beer is a favorite, and deciding on heart filled or not filled.
    // Used as a class to determine if the heart will be filled or not
    let favorite = await getFavorites(beer);
    if (await favorite == 1) {
        favorite = "filled"
    } else {
        favorite = "notfilled"
    }

    // Render each beer
    let beerDiv = document.createElement("div");

    // Dont forget heart click to switch and rating <3 
    beerDiv.innerHTML = `
    <div>
        <img src="../IMAGES/${beer["img"]}">
    </div>
    <div>
        <div class="${favorite}" id="heart${beer["id"]}"></div>
        ${beer["name"]} <br>
        ${beer["avb"]} <br>
        ${beer["type"]} <br>
        <p>rating to be added...<p>
        <p>heart to be added...<p>
    </div>
    `
    document.querySelector(".beerResults").appendChild(beerDiv);
    beerDiv.classList.add("beerDiv");

    // When clicking on the heart
    document.getElementById(`heart${beer["id"]}`).addEventListener("click", function () {
        console.log(document.getElementById(`heart${beer["id"]}`))
        // If the heart is filled, make it not filled
        if (document.getElementById(`heart${beer["id"]}`).className == "filled")
            document.getElementById(`heart${beer["id"]}`).className = "notfilled"
        // If the heart is not filled, fill it
        else
            document.getElementById(`heart${beer["id"]}`).className = "filled"
    })
}

// Check if current beer (from renderBeer function) is a favorite
async function getFavorites(beer) {
    let user = await (await fetch(`../PHP(Back-End)/readUsersDatabase.php?un=${username}`)).json();
    // Loop through current users favorites
    for (let i = 0; i < await user.likedBeers.length; i++) {
        if (user.likedBeers[i].id == beer["id"]) {
            // If yes, return 1
            return 1;
        }
    }
    // If no, return 0
    return 0;
}

// Might need another PHP for reading users, to be able to render hearts correctly
// based on the users favorites... 

// DIRECT CODE
getAllBeers()
document.querySelector(".searchBar input").onkeyup = function () {
    filterBeers();
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

//     function renderHeart(){
//     if not logged in {render empty heart}
//     if logged in {check user database if beer is in favorites, if yes = heart filled; if no = heart empty}
//     append
//     eventlistener – when heart is clicked, call function heartOnClick()
//     }
