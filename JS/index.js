"use strict"

// Global variables
let beerSlides = [];
let isDragStart = false,
    isDragging = false,
    prevPageX,
    prevScrollLeft,
    positionDiff;

// Function to fetch the beers for the slides
function createSlides() {
    fetch("../PHP/read_beerDatabase.php?un=" + "Eminem" + "&beers")
        .then(r => r.json())
        .then(result => {
        for (let i = 0; i < 5; i++) {
            let random = Math.floor(Math.random() * result.length);
            beerSlides.push(result[random]);
        }
            console.log(beerSlides);
        renderSlides();
    });
}

