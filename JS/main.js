//Here the swipe-functions, menu, and the direct code will be

//Global variables

// function swipe(){
// renders swipe beers
// }

// Menubar, to be called in all JS-files that are directly connected to HTML-files
function menuBar() {
  let menu = document.createElement("div");
  menu.innerHTML = `
    <a href="../HTML/favorites.html"><img src="../IMAGES/heart-nofilled.png" id="favoritesBtn"></a>
    <a href="../HTML/search.html"><img src="../IMAGES/beer.png" id="beerBtn"></a>
    <a href="../HTML/user.html"><img src="../IMAGES/userprofile.png" id="userBtn"></a>
    `;
  document.querySelector("body").appendChild(menu);
  menu.id = "mainMenu";
}

// Direct code:
menuBar();
