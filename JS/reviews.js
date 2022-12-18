globalUser = localStorage.getItem("globalUser");

// render Reviews for selected beer
function renderReviews(beer, ratingClass, ratingContent) {

    const reviews = beer.reviews;
    const reviewsContainer = document.querySelector(".reviews");
    reviewsContainer.innerHTML = "";

    // render a review for each review in the array
    reviews.forEach(function (review) {

        // if reviewMessage is not empty, render review
        if (review.message != "") {
            const reviewContainer = document.createElement("div");
            reviewContainer.classList.add("review");
            // APPEND REVIEW!!!
            reviewsContainer.appendChild(reviewContainer);

            const reviewHeader = document.createElement("div");
            reviewHeader.classList.add("reviewHeader");
            reviewContainer.appendChild(reviewHeader);

            if (review.rating !== null) {
                const reviewRating = document.createElement("div");
                reviewRating.classList.add("reviewRating");
                reviewRating.innerHTML = `<div class="${ratingClass} ratingReview${review.review_id}" style="font-size: 6.4vw">${ratingContent}</div>`
                reviewHeader.appendChild(reviewRating);
                // Call function with the ratingSum and star-element as parameters
                calculateStars(document.querySelector(`.ratingReview${review.review_id}`), review.rating);
            } else {
                const reviewNoRating = document.createElement("div");
                reviewNoRating.classList.add("reviewNoRating");
                reviewNoRating.innerText = "No rating given"
                reviewNoRating.style.fontStyle = "italic";
                reviewHeader.appendChild(reviewNoRating);
            }
            console.log(review.rating)

            // if user has written review, add delete button
            if (review.username == globalUser) {
                const deleteButton = document.createElement("div");
                deleteButton.classList.add("reviewDelete");
                // deleteButton.innerHTML = `<img src="../IMAGES/delete.png">`
                deleteButton.addEventListener("click", function () {

                    // Confirm delete review
                    renderPopUp("deleteReview");
                    console.log(beer)
                    const yesButton = document.querySelector(".yesButton");
                    yesButton.addEventListener("click", function () {
                        fetch("../PHP/deleteReview.php",
                            {
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    beerId: beer.id,
                                    reviewId: review.review_id
                                })

                            })
                            .then(res => res.json())
                            .then(data => {
                                //Fetching anew to get beer without the deleted review
                                fetch(`../PHP/read_beerDatabase.php?un=${globalUser}&id=${beer.id}&beers`)
                                    .then(r => r.json())
                                    .then(updatedBeer => {
                                        let newRatingSum = calculateRating(updatedBeer)
                                        renderReviews(updatedBeer, ratingClass, ratingContent)
                                        if (newRatingSum !== null) {
                                            console.log(newRatingSum)
                                            // Call function with the ratingSum and star-element as parameters
                                            calculateStars(document.querySelector(`.ratingPopup${beer["id"]}`), newRatingSum);
                                        }
                                        document.querySelector(".display_error").remove()
                                    })
                            })
                    })

                    const noButton = document.querySelector(".noButton");
                    noButton.addEventListener("click", function () {
                        document.querySelector(".display_error").remove()
                    })


                })
                reviewHeader.appendChild(deleteButton);
            }

            // Review username & date
            const reviewUser = document.createElement("p");
            reviewUser.classList.add("reviewUser");
            reviewUser.style.margin = 0;
            reviewUser.innerHTML = `<span style="font-weight: bolder; margin-right: 2vw; color: #ab4300;">${review.username}</span><span>(${review.date})</span>`
            reviewContainer.appendChild(reviewUser);

            // Review message
            const reviewMessage = document.createElement("p");
            reviewMessage.classList.add("reviewMessage");
            reviewMessage.innerHTML = review.message;
            reviewContainer.appendChild(reviewMessage);

            // if review is longer than 100 characters, add show more button
            if (review.message.length > 100) {
                const showMore = document.createElement("p");
                showMore.classList.add("showMore");
                showMore.innerHTML = "Show more";
                // Toggle show more button
                showMore.addEventListener("click", function () {
                    reviewMessage.classList.toggle("showMore");
                    showMore.classList.toggle("showMore");
                })
                reviewContainer.appendChild(showMore);
            }

        }
    })
}

// Funtion for creating write review window
function writeReview(beer, ratingClass, ratingContent) {
    const reviewWindow = document.createElement("div");
    reviewWindow.classList.add("reviewWindow");

    // Exit button
    const reviewExit = document.createElement("div");
    reviewExit.classList.add("reviewExit");
    reviewExit.addEventListener("click", function () {
        reviewWindow.remove();
    })
    reviewWindow.appendChild(reviewExit);

    // Beer image
    const reviewImage = document.createElement("div");
    reviewImage.classList.add("reviewImage");
    reviewImage.innerHTML = `<img src="../IMAGES/${beer.img}">`
    reviewWindow.appendChild(reviewImage);

    // Beer name
    const reviewBeername = document.createElement("div");
    reviewBeername.classList.add("reviewBeername");
    reviewBeername.innerHTML = beer.name;
    reviewBeername.style.fontFamily = `'Shadows Into Light', cursive`
    reviewBeername.style.fontSize = `2em`
    reviewWindow.appendChild(reviewBeername);

    // Render stars for rating 
    const reviewRating = document.createElement("div");
    reviewRating.classList.add("reviewRatingStars");
    reviewRating.appendChild(createStars());
    console.log(reviewRating.value)
    reviewWindow.appendChild(reviewRating);

    // Review Message
    const reviewInput = document.createElement("div");
    reviewInput.classList.add("reviewInput");
    reviewInput.innerHTML = `<textarea></textarea>`
    reviewWindow.appendChild(reviewInput);

    // Submit button
    const reviewSubmit = document.createElement("div");
    reviewSubmit.classList.add("reviewSubmit");
    reviewSubmit.innerHTML = "Submit"
    reviewWindow.appendChild(reviewSubmit);
    reviewSubmit.addEventListener("click", function () {
        const reviewMessage = document.querySelector(".reviewInput textarea").value;
        const reviewRatingX = parseInt(document.querySelector(".starContainer").getAttribute('value'));
        fetch("../PHP/postReview.php",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    beerId: beer.id,
                    username: globalUser,
                    reviewContent: reviewMessage,
                    rating: reviewRatingX
                })
            })
            .then(res => {
                if (res.status === 200) {
                    console.log("Review posted");
                } else {
                    renderPopUp("ratingReview")
                    document.querySelector('.ok').addEventListener("click", function () {
                        document.querySelector(".display_error").remove()
                    })
                }
                return res.json();
            })
            .then(data => {
                if (data["error"] !== "Neither rating nor review was submitted, please fill in one of the values") {
                    reviewWindow.remove();
                    //Fetching anew to get beer without the new review
                    fetch(`../PHP/read_beerDatabase.php?un=${globalUser}&id=${beer.id}&beers`)
                        .then(r => r.json())
                        .then(updatedBeer => {
                            console.log(updatedBeer)
                            renderReviews(updatedBeer, ratingClass, ratingContent)
                            let newRatingSum = calculateRating(updatedBeer)
                            if (newRatingSum && reviewRatingX !== 0 || null) {
                                // Call function with the ratingSum and star-element as parameters
                                calculateStars(document.querySelector(`.ratingPopup${beer["id"]}`), newRatingSum);
                            }
                        })
                }
            })
    })
    document.querySelector("body").appendChild(reviewWindow);
    document.querySelector(".reviewInput textarea").placeholder = "Write your review here..."
}

// Function for creating clickable stars when writing review
function createStars() {
    const starContainer = document.createElement("div");
    starContainer.classList.add("starContainer");

    for (let i = 0; i < 5; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        star.innerHTML = "☆"
        star.addEventListener("click", function () {
            addRating(i);
        })
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
    })
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
