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

// Function to auto center the slide when moved to the left or right
function autoCenterSlide() {
    // if user position is at the end of the swipebox, return
    if (swipeBox.scrollLeft == (swipeBox.scrollWidth - swipeBox.clientWidth)) {
        return;
    }

    // converts positionDiff to absolute value aka positive number
    positionDiff = Math.abs(positionDiff);

    // get the width of the first slide
    let firstSlideWidth = swipeBox.clientWidth;

    // get the difference between the first slide width and the positionDiff
    let valueDifference = firstSlideWidth - positionDiff;

    // if user position swipes to the right
    if (swipeBox.scrollLeft > prevScrollLeft) {
        // if user positionDiff is greater than 33% of the slide width, add valueDifference to scrollLeft else subtract positionDiff
        if (positionDiff > firstSlideWidth / 3) {
            return swipeBox.scrollLeft += valueDifference;
        } else {
            return swipeBox.scrollLeft -= positionDiff;
        }
    }

    // if user position swipes to the left do the same as above but in reverse
    if (positionDiff > firstSlideWidth / 3) {
        return swipeBox.scrollLeft -= valueDifference;
    } else {
        return swipeBox.scrollLeft += positionDiff;
    }

}

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
 
// Function to show and hide the left and right buttons
function showHideButton() {

    // if user is at the start of the swipebox (where the scrollLeft is 0), hide left button else show left button
    if (swipeBox.scrollLeft == 0) {
        leftButton.style.display = "none";
    } else {
        leftButton.style.display = "block";
    }

    // if user is at the end of the swipebox (takes the scrollWidth aka the length of the whole swipeBox minus the current slide), hide right button else show right button
    if (swipeBox.scrollLeft == swipeBox.scrollWidth - swipeBox.clientWidth) {
        rightButton.style.display = "none";
    } else {
        rightButton.style.display = "block";
    }
}

// All the event listeners for when user starts, drags and stops dragging
swipeBox.addEventListener("mousedown", dragStart)
swipeBox.addEventListener("touchstart", dragStart)

swipeBox.addEventListener("mousemove", dragging)
swipeBox.addEventListener("touchmove", dragging)

swipeBox.addEventListener("mouseup", dragStop)
swipeBox.addEventListener("mouseleave", dragStop)
swipeBox.addEventListener("touchend", dragStop)

// Event listeners for when user clicks the left and right buttons
rightButton.addEventListener("click", () => { 
    swipeBox.scrollLeft += swipeBox.clientWidth;
    setTimeout(showHideButton, 500);
})

leftButton.addEventListener("click", () => {
    swipeBox.scrollLeft -= swipeBox.clientWidth;
    setTimeout(showHideButton, 500);
})


