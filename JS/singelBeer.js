"use strict";

//Function to render one beer from the database
function render_one_beer(beer) {
  //adding a div for the beer
  const one_beer_div = document.createElement("div");
  //adding classList for styling to one beer
  one_beer_div.classList.add("one_beer");
  //Adding id to the div that's the same as the beer id

  //Maybe just run the renderBeer??
  one_beer_div.id = beer.id;
  //InnerHTML for one beer and fills it with content + button for writing review.
  one_beer_div.innerHTML = `
        <div>${beer.img}</div>
        <div>${beer.name}</div>
        <div>${beer.type}</div>
        <div>${beer.avb}%</div>
        <button id= write_review_button>Review</button>
        `;
  //Runs the functions for showing the reviews, the ratings and the heart.
  renderReviews(beer);
  renderRatings(beer);
  renderHeart();

  //adding eventListner to the button write review
  const write_review_button = document.getElementById("write_review_buttion");
  write_review_button.addEventListener("click", () => { writeReview(beer) });
}
