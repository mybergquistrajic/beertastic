"use strict"

// Calculating median rating
function calculateRating(beer) {
  // Sum all ratings and getting median
  let ratings = [];
  beer["reviews"].forEach((review) => {
    ratings.push(review["rating"]);
  });
  let sum = ratings.reduce((a, b) => a + b, 0) / ratings.length;
  let finalSum = (Math.round(sum * 100) / 100);
  // If no ratings avaliable, return 0
  if (isNaN(finalSum)) {
    return 0;
  } else {
    return finalSum;
  }
}

// Calculate stars 'width'
function calculateStars(element, finalSum) {
  // Get the original width of the star-element
  let elementWidth = element.offsetWidth;
  // Set new width of element based on median (final sum)
  // divided by the elements width times 1000 to get the final percentage
  element.style.width = ((finalSum / elementWidth) * 1000) + '%'
}