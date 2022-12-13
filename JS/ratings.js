"use strict"

// Calculating rating and "rendering" stars
// Beer–paramater: the corresponding beer
// Element–paramater: the corresponding star-element, meaning when calling the function, 
// the star element has to be created and appended already. See beerCatalogue.js for example.
function calculateRating(beer, element) {
  // Sum all ratings and getting median
  let ratings = [];
  beer["reviews"].forEach((review) => {
    ratings.push(review["rating"]);
  });
  let sum = ratings.reduce((a, b) => a + b, 0) / ratings.length;
  let finalSum = (Math.round(sum * 100) / 100);
  // Get the original width of the star-element
  let cw = element.clientWidth;
  // Set new width of element based on median (final sum)
  element.style.width = Math.round(cw * (finalSum / 5)) + 'px';
}