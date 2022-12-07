<?php
//For deleting a review 

require_once "functions.php";

ini_set("display_errors", 1);

//Checks that the method used is DELETE 
if ($request_method != "DELETE"){
    $error = ["error" => "Wrong method used."];
    sendJSON($error, 400);
}



//Checks that the requestet data contains "id" and 
if(isset($r_data["review_id"])){

    $review_id = $r_data["review_id"];

    foreach($beers["reviews"] as $index => $beer){
        
        foreach($beer as $review){

            if($review["review_id"] == $review_id){

                array_splice($review["review_id"], $index, 1);
                $beer_json = json_encode($review, JSON_PRETTY_PRINT);
                file_put_contents($beerDatabase, $beer_json);
                sendJSON($review["review_id"]);
            }

        }

    }

    
}else{
$error = ["error" => "Bad request. The object doesn't exist."];
sendJSON($error, 400);
exit();
}
?>