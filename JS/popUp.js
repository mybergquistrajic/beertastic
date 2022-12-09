"user strict";

//Function to load different answers based on the type - parameter.

function renderPopUp(type) {
  const popUpDiv = document.createElement("div");
  popUpDiv.classList.add("popUpDiv");

  if (type === "checkage") {
    popUpDiv.innerHTML = `
      <div>Are you over 18 years of age?<div>
      <div id = "ageCheck">
      <button>Yes</button>
      <button>No</button>
      </div>`;
  } else if (type === "underAgeAccount") {
    popUpDiv.innerHTML = `
    <div>Sorry you have to be 18 to create an account.<div>`;
  } else if (type === "underAgeBeer") {
    popUpDiv.innerHTML = `
    <div>Sorry you have to be over 18 years of age to view this beer.<div>`;
  } else if (type === "ratingReview") {
    popUpDiv.innerHTML = `
    <div>You have to add a rating or a review.<div>`;
  } else if (type === "haveToLogIn") {
    popUpDiv.innerHTML = `
    <div>You have to log in or create an account to view this.<div>
    <button>Log in</button>`;
  }

  //append the popUpDiv here:
}
