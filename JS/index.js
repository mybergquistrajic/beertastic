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

// Function to render the slides
function renderSlides() {
    let slideContainer = document.querySelector("#swipeBox");
    beerSlides.forEach(beer => {
        let slide = document.createElement("div");
        slide.classList.add("slide");
        slide.innerHTML = `
            <div class="slideImage">
                <img src="../IMAGES/${beer.img}" alt="${beer.name}" draggable="false">
            </div>
            <div class="slideText">
                <h2>${beer.name}</h2>
            </div>`;
        slideContainer.appendChild(slide);
    });
}

createSlides();

