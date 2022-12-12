//Here the swipe-functions, menu, and the direct code will be

//Global variables

// function swipe(){
// renders swipe beers
// }

// Menu
// function menu_bar ()
// flaticon for favorites, catalog and account with links


function menuBar() {
    let menu = document.createElement("div");
    menu.innerHTML = `
    <a href="../HTML/user.html"><img src="../IMAGES/heart-nofilled.png" id="favoritesBtn"></a>
    <a href="../HTML/search.html"><img src="../IMAGES/beer.png" id="beerBtn"></a>
    <a href="../HTML/create_account.html"><img src="../IMAGES/userprofile.png" id="userBtn"></a>
    `
    document.querySelector("body").appendChild(menu);
    menu.id = "mainMenu";

    document.getElementById("favoritesBtn").addEventListener("click", fu)
}

// Direct code:
