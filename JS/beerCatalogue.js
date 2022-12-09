// function searchBar(){
//     renders and appends searchbar
//     searchbars inputValue filters the results
//     }

//     function getAllBeers(){
//     GET - fetch with the read.php-file
//     In the resource promise run the function seachBeers
//     then (r=> r.json)
//     then(result => {searchBeers(result)})
//     }

//     function searchBeers(beers){
//     if ( searchFieldIsFilled ){
//     filter beers
//     renderBeers(beers)
//     }
//     else (no result is found send a message "Sorry! No results found")
//     }

//     function renderBeers (beers){
//     forEach loop that loops through databaseOfBeers =>
//     beer.name
//     beer.type
//     beer.AVB
//     beer.img

//     renderRatings(beer)
//     renderHeart()

//     beerDiv.event.listener – when beer is clicked, (){
//     if not logged in → popup: you have to be logged in
//     else{
//     load one_beer.html
//     render_one_beer(beer);
//     }
//     }

//     function renderHeart(){
//     if not logged in {render empty heart}
//     if logged in {check user database if beer is in favorites, if yes = heart filled; if no = heart empty}
//     append
//     eventlistener – when heart is clicked, call function heartOnClick()
//     }
