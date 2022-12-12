// function renderRatings(beer){
//     get star ratings for the beer, average value, append stars + show number of reviews and average value in number
//     }

//     function add_rating (number (ex. 3 for star nr 3){
//     5 empty stars
//     render stars a new
//     }

// Calculate median of beer ratings
function calculateRating(beer) {
    let sum = [];
    beer["reviews"].forEach(review => {
        sum.push(review["rating"])
    });
    // Sum all ratings
    let finalSum = sum.reduce((a, b) => a + b, 0) / sum.length;
    // Round to two decimals
    console.log(Math.round(finalSum * 100) / 100)
}