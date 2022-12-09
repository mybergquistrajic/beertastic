// render Reviews for selected beer
function renderReviews(beer) {

    const reviews = beer.reviews;
    const reviewsContainer = document.querySelector(".reviews");
    reviewsContainer.innerHTML = "";

    // render a review for each review in the array
    reviews.forEach(function (review) {
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

        const reviewUser = document.createElement("p");
        reviewUser.classList.add("reviewUser");
        reviewUser.innerHTML = review.username;
        reviewContainer.appendChild(reviewUser);

        const reviewDate = document.createElement("p");
        reviewDate.classList.add("reviewDate");
        reviewDate.innerHTML = review.date;
        reviewContainer.appendChild(reviewDate);

        const reviewMessage = document.createElement("p");
        reviewMessage.classList.add("reviewMessage");
        reviewMessage.innerHTML = review.message;
        reviewContainer.appendChild(reviewMessage);

        // if review is longer than 100 characters, add show more button
        if (review.message.length > 100) {
            const showMore = document.createElement("p");
            showMore.classList.add("showMore");
            showMore.innerHTML = "Show more";
            showMore.addEventListener("click", function () {
                reviewMessage.classList.toggle("showMore");
                showMore.classList.toggle("showMore");
            })
            reviewContainer.appendChild(showMore);
        }

        const reviewRating = document.createElement("p");
        reviewRating.classList.add("reviewRating");
        reviewRating.innerHTML = // Function for stars: review.rating;
        reviewContainer.appendChild(reviewRating);
        
        reviewsContainer.appendChild(reviewContainer);
    })
}



// function renderRewievs(beer){
//     foreach beer of review {
//     review.username
//     review.date
//     review.message
//     review.rating

//  if user has written review
//  (add remove button delete_review(review, beer))
//  else (don't add remove)
//     showmore()
//    }
//  }

//  delete_review(review, beer){
//  popup → if yes{fetch delete med review ID}
//  renderRatings(beer)
//  renderReviews(beer)
//  }

//  function write_review(beer) {
//  render popup: white background, exit button, image, rating, inputfield, submitbutton, etc
//  for each star → event listener add_rating(number)
//  on submit: POST request

//  if  POST -request is empty : alert ("review or rating needs to be filled in")
//  else (
//  submit & close reviewpop )
//  renderRatings(beer)
//  renderReviews(beer)
//  }

//  function showmore(){
//   measures the text-height and width or amount of characters
//  if length && height === limit add a showMore button}
