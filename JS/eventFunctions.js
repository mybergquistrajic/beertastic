// function heartOnClick(event?){
//     if not logged in {alert: you have to be logged in}
//     if logged in{add or remove from users favorites}
//     }

//     loginButton.addeventListener("click", login.html
//     logIn(user_status); )

//     logOut.button.addeventListener("click",
//     change the global variable to null
//     or reload the page and reset the page.
//     )

//     createAccountButton.eventListener("click, create.html)

//Check age click events? if yes if no based on the popUpDiv "checkAge"?


function heartOnClick(event) {
    // The heart we clicked on
    let heart = event.target;
    // Takes the class name (ex heart5) and splices 5, to only get the beer ID
    let beerId = event.target.classList[1].slice(5);
    console.log(beerId)

    // If the heart is filled, make it not filled
    if (heart.classList.contains("filled")) {
        heart.classList.replace("filled", "notfilled")
    }
    // If the heart is not filled, fill it
    else {
        heart.classList.replace("notfilled", "filled")
    }
    // Fetch to update database
    fetch("../PHP/heart.php", {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username, beerId: beerId
        })
    }).then(r => r.json()).then()

}