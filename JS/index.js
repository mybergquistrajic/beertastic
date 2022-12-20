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

// Variables for the swipebox
const swipeBox = document.querySelector("#swipeBox");
const leftButton = document.querySelector("#swipeLeft");
const rightButton = document.querySelector("#swipeRight");
// Function for when user starts dragging with event as parameter
function dragStart(e) {
    isDragStart = true;
    // gets the x position of where the user started dragging
    prevPageX = e.pageX || e.touches[0].pageX;
    // gets the scrollLeft position of the swipebox aka how far away from the left the user is in the swipebox
    prevScrollLeft = swipeBox.scrollLeft;
}

// Function for when user is dragging with event as parameter
function dragging(e) {
    // if user is not dragging, return (safety measure)
    if (!isDragStart) {
        return;
    }
    // prevent default action of the event aka prevent the user from selecting text or images
    e.preventDefault();
    isDragging = true;
    swipeBox.classList.add("dragging")
    // gets the difference between the x position of where the user started dragging and the current x position of the user
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    // sets the scrollLeft of the swipebox to the previous scrollLeft minus the positionDiff
    swipeBox.scrollLeft = prevScrollLeft - positionDiff;
    showHideButton();
}

// Function for when user stops dragging with event as parameter
function dragStop() {
    isDragStart = false;
    swipeBox.classList.remove("dragging")
    if (!isDragging) return;
    isDragging = false;
    // runs the autoCenterSlide function to center the slide if stopped before the slide is centered
    autoCenterSlide();
}
 
