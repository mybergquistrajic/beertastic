<?php
//For deleting a review 

require_once "functions.php";

ini_set("display_errors", 1);

//Checks that the method is DELETE 
if ($request_method != "DELETE"){
    $error = ["error" => "Wrong method used."];
    sendJSON($error, 400);
}

//Checks that the requested data contains review- and beer-id 
if(isset($r_data["review_id"], $r_data["beerId"])){
    //Loops through the beers in the database
    foreach($beers as $beerindex => $beer){
        //Loops through the array of reviews 
        if($beer["id"] == $r_data["beerId"]){
            foreach($beer["reviews"] as $reviewindex => $review){
                //If the review id is the same as the requested data id and the username in the requested data is the same as the 
                //Username in the review delete it. 
                if($review["review_id"] == $r_data["review_id"]){

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
                    exit();
                }
            }
        }
    }       
    //If the request doen't include id send error message 
    }else{
        $error = ["error" => "Bad request. The object doesn't exist."];
        sendJSON($error, 404);
    }


/*

//Checks that the requested data contains "id" 

if(isset($r_data["review_id"],$r_data["username"])){

    //Loops through the beers in the database
    foreach($beers as $beer){
        //Loops through the array of reviews 
        foreach($beer["reviews"] as $index => $review){
            //If the review id is the same as the requested data id and the username in the requested data is the same as the 
            //Username in the review delete it. 
            if($review["review_id"] == $r_data["review_id"] and $r_data["username"] == $review["username"]){
                
                array_splice($review, $index, 1);

                //Adding the changes to the beerDatabase 
                $beers_json = json_encode($beers, JSON_PRETTY_PRINT);
                file_put_contents($beerDatabase, $beers_json);
                sendJSON($review["review_id"]);  
            }
        }
    }       
            //If the request doen't include id send error message 
            }else{
                $error = ["error" => "Bad request. The object doesn't exist."];
                sendJSON($error, 404);
            }

*/
?>