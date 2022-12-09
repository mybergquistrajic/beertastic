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
  }

  //append the popUpDiv here:
}
