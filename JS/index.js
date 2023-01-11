"use strict";

// Functions for the Swipe box on index.html

// Global variables
let beerSlides = [];
// let isDragStart = false,
//   isDragging = false,
//   prevPageX,
//   prevScrollLeft,
//   positionDiff;

// Function to fetch the beers for the slides
function createSlides() {
  fetch("PHP/read_beerDatabase.php?un=" + "admin" + "&beers")
    .then((r) => r.json())
    .then((result) => {
      for (let i = 0; i < 5; i++) {
        let random = Math.floor(Math.random() * result.length);
        beerSlides.push(result[random]);
      }

      renderSlides();
    });
}

// Function to render the slides
function renderSlides() {
  let slideContainer = document.querySelector("#swipeBox");
  beerSlides.forEach((beer) => {
    let slide = document.createElement("div");
    slide.classList.add("slide");
    slide.innerHTML = `
            <div class="slideImage">
                <img src="IMAGES/${beer.img}" alt="${beer.name}" draggable="false">
            </div>
            <div class="slideText">
                <h2>${beer.name}</h2>
            </div>`;
    slideContainer.appendChild(slide);



  })

  enableSwipe();
}

function enableSwipe() { 
  // Variables for the swipebox
  const swipeBox = document.querySelector("#swipeBox");
  const box = document.querySelector(".slide");
  let start;
  let change;

  // Width of the slide
  let width = box.offsetWidth;

  // Eventlistener for where the user starts touching the screen
  swipeBox.addEventListener('touchstart', (e) => {
    // Stores the position of the user's finger when start touching
    start = e.touches[0].clientX;
  })

  // Eventlistener for where the user is moving their finger on the screen
  swipeBox.addEventListener('touchmove', (e) => {
    // Prevents the default action of the event aka prevents the user from selecting text or images
    e.preventDefault();
    // Stores the position of the user's finger when moving
    let touch = e.touches[0];
    // Stores the difference between the position of the user's finger when start touching and when moving
    change = start - touch.clientX;
  })

  // Eventlistener for where the user stops touching the screen
  swipeBox.addEventListener('touchend', slideShow);

  // Function to show the next slide
  function slideShow() {
    // If the difference between the position of the user's finger when start touching and when moving is greater than 0, scroll to the right else scroll to the left (x position value is either positive or negative depending on which way the user swipes)
    if (change > 0) {
      swipeBox.scrollLeft += width;
    } else {
      swipeBox.scrollLeft -= width;
    }

    showHideButton();
  }

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

  const leftButton = document.querySelector("#swipeLeft");
  const rightButton = document.querySelector("#swipeRight");

  rightButton.addEventListener("click", () => {
    swipeBox.scrollLeft += swipeBox.clientWidth;
    setTimeout(showHideButton, 300);
  });
  
  leftButton.addEventListener("click", () => {
    swipeBox.scrollLeft -= swipeBox.clientWidth;
    setTimeout(showHideButton, 300);
  });

};


createSlides();


