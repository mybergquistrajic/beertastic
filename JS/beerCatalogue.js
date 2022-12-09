"use strict"

let beerResult;

document.querySelector(".searchBar input").onkeyup = function () {
    filterBeers();
}

// Render searchbar
// function searchBar() {
//     let div = document.createElement("div");
//     let input = document.createElement("input");
//     div.classList.add("searchBar");
//     div.appendChild(input);
//     document.querySelector("body").appendChild(div);
//     // Call renderBeers when writing in searchbar
//     input.onkeyup = function () {
//         filterBeers();
//     }
// }

// Fetch all beers
function getAllBeers() {
    // UN PW To be changed
    let username = "username";
    let password = "password";
    fetch(`../PHP(Back-End)/read_beerDatabase.php?un=${username}&pw=${password}&beers`)
        .then(r => r.json())
        .then(result => {
            // Fill the global result variable, and then call renderBeers
            beerResult = result;
            filterBeers();
        })
}

// Filter beers (if search bar is filled, else keeps all beers)
function filterBeers() {
    // If there's no value in searchbar, render all beers
    if (document.querySelector(".searchBar input").value == "") {
        // Console = render
        console.log(beerResult);
        renderBeers(beerResult);
    }
    // If there is a value in searchbar, filter the beers and then render
    if (document.querySelector(".searchBar input").value !== "") {
        let filteredResult = beerResult.filter(beer => beer["name"].toLowerCase().includes(document.querySelector(".searchBar input").value));
        // Console == render
        if (filteredResult.length < 1) {
            console.log("Sorry, no beer with that name")
        } else {
            console.log(filteredResult);
            renderBeers(filteredResult);
        }
    }
}

function renderBeers(result) {
    document.querySelector(".beerResults").innerHTML = "";
    result.forEach(beer => {
        let beerDiv = document.createElement("div");
        beerDiv.innerHTML = beer["name"];
        document.querySelector(".beerResults").appendChild(beerDiv);
    });
}

// DIRECT CODE
// searchBar()
getAllBeers()


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
