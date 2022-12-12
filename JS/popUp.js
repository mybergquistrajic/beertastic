
// function renderPopUp (type){
//     render popup
//     SWITCH()
//     (load different information based on parameter)
//     if type == checkage
//         “Are you over 18 years of age?”
//         Button - yes / no
//     if type == underageaccount
//         “Sorry you have to be over 18 to create an account”
//         X button
//     if type == underagebeer
//         “Sorry you have to be over 18 to view the beers”
//     if type == ratingreview
//         “You have to add a rating or a review”
//         X button
//         OK button
//     if type == havetologin
//         “You have to log in to blablabla”
//         X button
//         Login button
//     if type == deleteReview
//         “Are you sure you want to delete this review?”
//         button - yes / no
//     }

"user strict";

//Function to load different answers based on the type - parameter.

function renderPopUp(type) {
  const popUpDiv = document.createElement("div");
  popUpDiv.classList.add("popUpDiv");

  if (type === "checkage") {
    popUpDiv.innerHTML = `
      <div>
      <h1>Hi!</h1>
      <p>Are you over 18 years of age?</p>
      <button>Yes</button>
      <button>No</button>
      </div>
      `;
  } else if (type === "underAgeAccount") {
    popUpDiv.innerHTML = `
    <div>
    <h1>Sorry!</h1>
    <p>You need to be to be at least 18 to create an account</p>
    <button>Ok</button>
    </div>`;
  } else if (type === "underAgeBeer") {
    popUpDiv.innerHTML = `
    <div>
    <h1>Sorry!</h1>
    <p>You have to be over the age of 18 to view this beers</p>
    <button>Ok</button>
    </div>`;
  } else if (type === "ratingReview") {
    popUpDiv.innerHTML = `
    <div>
    <h1>Oops!</h1>
    <p>You have to add a rating or a review.</p>
    <button>Ok</button>
    </div>`;
  } else if (type === "haveToLogIn") {
    popUpDiv.innerHTML = `
    <div>
    <h1>Sorry!</h1>
    <p>You have to be logged in to view this.</p>
    <button>Log in</button>
    </div>`;
  } else if (type === "deleteReview") {
    popUpDiv.innerHTML = `
    <div>
    <h1>Are you sure?</h1>
    <p>You want to delete this review?</p>
    <button class="yesButton">Yes</button>
    <button class="noButton">No</button>
    </div>`;
  }

  //append the popUpDiv here:
}

