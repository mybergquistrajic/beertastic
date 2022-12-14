// render Reviews for selected beer
function renderReviews(beer) {

    const reviews = beer.reviews;
    const reviewsContainer = document.querySelector(".reviews");
    reviewsContainer.innerHTML = "";

    // render a review for each review in the array
    reviews.forEach(function (review) {

        // if reviewMessage is not empty, render review
        if (review.message != "") {
            const reviewContainer = document.createElement("div");
            reviewContainer.classList.add("review");

            // if user has written review, add delete button
            if (review.username === user) {
                const deleteButton = document.createElement("div");
                deleteButton.classList.add("reviewDelete");
                deleteButton.innerHTML = //trashcan icon?
                    deleteButton.addEventListener("click", function () {
                
                        // Confirm delete review
                        renderPopup("deleteReview");

                        const yesButton = document.querySelector(".yesButton");
                        yesButton.addEventListener("click", function () {
                            fetch("http://localhost:8888/deleteReview",
                                {
                                    method: "DELETE",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        beerId: beer.id,
                                        reviewId: review.id
                                    })
                        
                                })
                                .then(res => res.json())
                                .then(data => {
                                    console.log(data)
                                    renderReviews(beer)
                                })
                        })

                        const noButton = document.querySelector(".noButton");
                        noButton.addEventListener("click", function () {
                            renderPopup("none"); //right way to close popup?
                        })
            
                        reviewContainer.appendChild(deleteButton);
                    })
            }

            // Review username
            const reviewUser = document.createElement("p");
            reviewUser.classList.add("reviewUser");
            reviewUser.innerHTML = review.username;
            reviewContainer.appendChild(reviewUser);

            // Review date
            const reviewDate = document.createElement("p");
            reviewDate.classList.add("reviewDate");
            reviewDate.innerHTML = review.date;
            reviewContainer.appendChild(reviewDate);

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

            // Review rating
            const reviewRating = document.createElement("p");
            reviewRating.classList.add("reviewRating");
            reviewRating.innerHTML = reviewRating(review.rating);
                reviewContainer.appendChild(reviewRating);
        
            reviewsContainer.appendChild(reviewContainer);
        }
})
}

// Funtion for creating write review window
function writeReview(beer) {
    const reviewWindow = document.createElement("div");
    reviewWindow.classList.add("reviewWindow");

    // Exit button
    const reviewExit = document.createElement("div");
    reviewExit.classList.add("reviewExit");
    reviewExit.innerHTML = "X"
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
    reviewWindow.appendChild(reviewBeername);

    // Render stars for rating 
    const reviewRating = document.createElement("div");
    reviewRating.classList.add("reviewRating");
    reviewRating.innerHTML = createStars();
    reviewWindow.appendChild(reviewRating);

    // Review Message
    const reviewInput = document.createElement("div");
    reviewInput.classList.add("reviewInput");
    reviewInput.innerHTML = `<input type="text" placeholder="Write review">`
    reviewWindow.appendChild(reviewInput);

    // Submit button
    const reviewSubmit = document.createElement("div");
    reviewSubmit.classList.add("reviewSubmit");
    reviewSubmit.innerHTML = "Submit"
    reviewSubmit.addEventListener("click", function () {
        const reviewMessage = document.querySelector(".reviewInput input").value;
        const reviewRating = document.querySelector(".reviewRating").value;
        fetch("http://localhost:8888/postReview",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                beerId: beer.id,
                username: globalUsername,
                message: reviewMessage,
                rating: reviewRating
            })
        })
        .then(res => {
            if (res.status === 200) {
                console.log("Review posted");
            } else {
                const errorMessage = document.createElement("p");
                errorMessage.classList.add("errorMessage");
                errorMessage.innerHTML = "Please fill out atleast one field";
            }

            return res.json();
        })
        .then(data => {
            console.log(data)
            reviewContainer.remove();
            renderReviews(beer)
        })
    })

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
