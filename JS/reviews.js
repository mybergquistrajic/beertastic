globalUser = localStorage.getItem("globalUser");

// render Reviews for selected beer
async function renderReviews(beer) {
  let rating = await checkRating(beer);
  let ratingContent = await rating[1];
  let ratingClass = await rating[2];

  const reviews = beer.reviews;
  const reviewsContainer = document.querySelector(".reviews");
  reviewsContainer.innerHTML = "";

  // render a review for each review in the array
  reviews.forEach(function (review) {
    // If reviewMessage is not empty, render review

    if (review.message != "") {
      // Create and append reviewbox
      const reviewContainer = document.createElement("div");
      reviewContainer.classList.add("review");
      reviewsContainer.appendChild(reviewContainer);
      // Create and append header of review
      const reviewHeader = document.createElement("div");
      reviewHeader.classList.add("reviewHeader");
      reviewContainer.appendChild(reviewHeader);

      // If the review includes a rating
      if (review.rating !== null) {
        const reviewRating = document.createElement("div");
        reviewRating.classList.add("reviewRating");
        reviewRating.innerHTML = `<div class="${ratingClass} ratingReview${review.review_id}" style="font-size: 6.2vw">${ratingContent}</div>`;
        reviewHeader.appendChild(reviewRating);
        // Call function with the ratingSum and star-element as parameters
        calculateStars(document.querySelector(`.ratingReview${review.review_id}`), review.rating);
      }
      // If the review doesn't include a rating
      else {
        const reviewNoRating = document.createElement("div");
        reviewNoRating.classList.add("reviewNoRating");
        reviewNoRating.innerText = "No rating given";
        reviewNoRating.style.fontStyle = "italic";
        reviewHeader.appendChild(reviewNoRating);
      }

      // If user is the author of the review, add delete button
      if (review.username == globalUser) {
        const deleteButton = document.createElement("div");
        deleteButton.classList.add("reviewDelete");
        // On delete click
        deleteButton.addEventListener("click", function () {
          // Confirm delete review
          renderPopUp("deleteReview");
          const yesButton = document.querySelector(".yesButton");
          // If yes
          yesButton.addEventListener("click", function () {
            fetch("../PHP/deleteReview.php", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                beerId: beer.id,
                reviewId: review.review_id,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                //Fetching anew to get beer without the deleted review
                fetch(`../PHP/read_beerDatabase.php?un=${globalUser}&id=${beer.id}&beers`)
                  .then((r) => r.json())
                  .then((updatedBeer) => {
                    // Removing old popup and rendering anew, to ensure that it's updated
                    document.querySelector(".oneBeerPopUp").remove();
                    popUpBeer(updatedBeer);
                    document.querySelector(".display_error").remove();
                  });
              });
          });
          // If no
          const noButton = document.querySelector(".noButton");
          noButton.addEventListener("click", function () {
            document.querySelector(".display_error").remove();
          });
        });
        reviewHeader.appendChild(deleteButton);
      }

      // Review username & date
      const reviewUser = document.createElement("p");
      reviewUser.classList.add("reviewUser");
      reviewUser.style.margin = 0;
      reviewUser.innerHTML = `<span style="font-weight: bolder; margin-right: 2vw; color: #ab4300;">${review.username}</span><span>(${review.date})</span>`;
      reviewContainer.appendChild(reviewUser);

      // Review message
      const reviewMessage = document.createElement("p");
      reviewMessage.classList.add("reviewMessage");
      reviewContainer.appendChild(reviewMessage);
      // If the message length is more than 200
      if (review.message.length > 200) {
        // Slice the message by 200 and add ...
        reviewMessage.innerHTML = review.message.slice(0, 200) + "...";
        // Create and append show more btn
        const showMore = document.createElement("div");
        showMore.classList.add("show");
        showMore.classList.add("showStyling");
        showMore.innerHTML = "Show more";
        reviewContainer.appendChild(showMore);
        // Toggle show more button
        showMore.addEventListener("click", function (event) {
          // If clicking to show more
          if (showMore.classList.contains("show")) {
            reviewMessage.innerHTML = review.message;
            showMore.innerHTML = "Show less";
          }
          // If clicking to show less
          else {
            reviewMessage.innerHTML = review.message.slice(0, 200) + "...";
            showMore.innerHTML = "Show more";
          }
          // Change/toggle
          showMore.classList.toggle("show");
        });
      } else {
        reviewMessage.innerHTML = review.message;
      }
    }
  });
  // If no WRITTEN reviews
  if (reviewsContainer.innerHTML == "") {
    reviewsContainer.innerHTML =
      "This beer has no written reviews yet. This is your chance, be the first one!";
    reviewsContainer.classList.add("noReviews");
    document.querySelector(".oneBeerPopUpContent").style.paddingBottom = "5vw";
  }
}

// Create write review popup
async function writeReview(beer) {
  const reviewWindow = document.createElement("div");
  reviewWindow.classList.add("reviewWindow");

  // Exit button
  const reviewExit = document.createElement("div");
  reviewExit.classList.add("reviewExit");
  reviewExit.addEventListener("click", function () {
    reviewWindow.remove();
  });
  reviewWindow.appendChild(reviewExit);

  // Beer image
  const reviewImage = document.createElement("div");
  reviewImage.classList.add("reviewImage");
  reviewImage.innerHTML = `<img src="../IMAGES/${beer.img}">`;
  reviewWindow.appendChild(reviewImage);

  // Beer name
  const reviewBeername = document.createElement("div");
  reviewBeername.classList.add("reviewBeername");
  reviewBeername.innerHTML = beer.name;
  reviewBeername.style.fontFamily = `'Shadows Into Light', cursive`;
  reviewBeername.style.fontSize = `2em`;
  reviewWindow.appendChild(reviewBeername);

  // Render stars for rating
  const reviewRating = document.createElement("div");
  reviewRating.classList.add("reviewRatingStars");
  reviewRating.appendChild(createStars());
  reviewWindow.appendChild(reviewRating);

  // Review Message
  const reviewInput = document.createElement("div");
  reviewInput.classList.add("reviewInput");
  reviewInput.innerHTML = `<textarea></textarea>`;
  reviewWindow.appendChild(reviewInput);

  // Submit button
  const reviewSubmit = document.createElement("div");
  reviewSubmit.classList.add("reviewSubmit");
  reviewSubmit.innerHTML = "Submit";
  reviewWindow.appendChild(reviewSubmit);
  reviewSubmit.addEventListener("click", function () {
    const reviewMessage = document.querySelector(".reviewInput textarea").value;
    const reviewRatingX = parseInt(document.querySelector(".starContainer").getAttribute("value"));
    fetch("../PHP/postReview.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        beerId: beer.id,
        username: globalUser,
        reviewContent: reviewMessage,
        rating: reviewRatingX,
      }),
    })
      .then((res) => {
        // If successful post
        if (res.status === 200) {
        }
        // If not successful post, alert user
        else {
          renderPopUp("ratingReview");
          document.querySelector(".ok").addEventListener("click", function () {
            document.querySelector(".display_error").remove();
          });
        }
        return res.json();
      })
      .then((data) => {
        // If successfull reviewpost
        if (
          data["error"] !==
          "Neither rating nor review was submitted, please fill in one of the values"
        ) {
          reviewWindow.remove();
          //Fetching anew to get beer without the new review
          fetch(`../PHP/read_beerDatabase.php?un=${globalUser}&id=${beer.id}&beers`)
            .then((r) => r.json())
            .then((updatedBeer) => {
              // Removing old popup and rendering anew, to ensure that it's updated
              document.querySelector(".oneBeerPopUp").remove();
              popUpBeer(updatedBeer);
            });
        }
      });
  });
  document.querySelector("body").appendChild(reviewWindow);
  document.querySelector(".reviewInput textarea").placeholder = "Write your review here...";
}

// Function for creating clickable stars when writing review
function createStars() {
  const starContainer = document.createElement("div");
  starContainer.classList.add("starContainer");

  for (let i = 0; i < 5; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    star.innerHTML = "☆";
    star.addEventListener("click", function () {
      addRating(i);
    });
    starContainer.appendChild(star);
  }
  return starContainer;
}

// Function for when clicking on star
function addRating(number) {
  document.querySelector(".starContainer").setAttribute("value", number + 1);
  const allStars = document.querySelectorAll(".star");
  allStars.forEach(function (star, i) {
    // If star clicked fill or clear previous stars with ★ or ☆
    // example: if star 3 is clicked, star 1 and 2 will be filled with ★ and star 4 and 5 will be cleared with ☆
    if (i <= number) {
      star.innerHTML = "★";
    } else {
      star.innerHTML = "☆";
    }
  });
}

// Function for creating rating stars when viewing reviews
function reviewRating(reviewRating) {
  const ratingContainer = document.createElement("div");
  ratingContainer.classList.add("ratingContainer");
  for (let i = 0; i < 5; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    // If star is less than or equal to review rating fill with ★ else clear with ☆
    if (i < reviewRating) {
      star.innerHTML = "★";
    } else {
      star.innerHTML = "☆";
    }
    ratingContainer.appendChild(star);
  }
  return ratingContainer;
}
