<?php
//For deleting a review 

require_once "functions.php";

ini_set("display_errors", 1);

//Checks that the method is DELETE 
if ($request_method != "DELETE"){
    $error = ["error" => "Wrong method used."];
    sendJSON($error, 400);
}



//Checks that the requested data contains "id" 

if(isset($r_data["review_id"])){

    //Loops through the beers in the database
    foreach($beers as $beer){
        //Loops through the array of reviews 
        foreach($beer["reviews"] as $index => $review){
            //If the review id is the same as the requested data id delete delete it
            if($review["review_id"] == $r_data["review_id"]){
                
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
?>