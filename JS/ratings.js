"use strict"

// Calculating median rating
function calculateRating(beer) {
  console.log(beer)
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

function calculateStars(element, finalSum) {
  // Get the original width of the star-element
  let cw = element.clientWidth;
  // Set new width of element based on median (final sum)
  element.style.width = Math.round(cw * (finalSum / 5)) + 'px';
}