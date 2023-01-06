<?php
//For deleting a review 

//The function file is required 
require_once "functions.php";

//Checks that the method is DELETE 
if ($request_method != "DELETE"){
    $error = ["error" => "Wrong method used."];
    sendJSON($error, 400);
}

//Checks that the requested data contains review- and beer-id 
if(isset($r_data["reviewId"], $r_data["beerId"])){
    //Loops through the beers in the database
    foreach($beers as $beerindex => $beer){
        //Loops through the array of reviews 
        if($beer["id"] == $r_data["beerId"]){
            foreach($beer["reviews"] as $reviewindex => $review){
                //If the review id is the same as the requested data id and the username in the requested data is the same as the 
                //Username in the review delete it. 
                if($review["review_id"] == $r_data["reviewId"]){

                    // Remove old review
                    array_splice($beer["reviews"], $reviewindex, 1);

                    // Remove old review, add new beer (without the deleted review), and sort
                    $updatedBeer = $beer;
                    array_splice($beers, $beerindex, 1);
                    $beers[] = $updatedBeer;
                    array_multisort($beers);

                    // Update database and send JSON with id of removed review
                    $beersJSON = json_encode($beers, JSON_PRETTY_PRINT);
                    $beersData = file_put_contents($beerDatabase, $beersJSON);
                    sendJSON($review["review_id"]);
                    
                }
            }
        }
    }       
    //If the request doen't include id send error message 
    }else{
        $error = ["error" => "Bad request. The object doesn't exist."];
        sendJSON($error, 404);
    }



?>