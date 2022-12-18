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

function calculateStars(element, finalSum) {
  // Set new width of element based on median (final sum)
  // times two (since the ratings are by 5 and not 10),
  // then multiplied by 10 to get percentage and add %
  element.style.width = ((finalSum * 2) * 10) + '%'
}