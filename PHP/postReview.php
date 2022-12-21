 <?php

    require_once ("functions.php");

    // If method is not post
    if($request_method !== "POST"){
        $error = ["error" => "The method must be POST"]; 
        sendJSON($error, 400);
        exit();
    }

    // If neither rating nor review have been submitted
    // Rating of 0 means no stars submitted (to rate, user has to rate 1-5)
    // Review of "" means no review content submitted
    if(($r_data["rating"] == "" and $r_data["reviewContent"] == "")){
        $error = ["error" => "Neither rating nor review was submitted, please fill in one of the values"]; 
        sendJSON($error, 404);
        exit();
    }

    // If paramaters are missing (fetch)
    if(!isset($r_data["username"], $r_data["beerId"])){
        $error = ["error" => "One or more paramaters are missing"]; 
        sendJSON($error, 400);
        exit();
    }

    // Finding the right beer
    foreach($beers as $index => $beer){
        $highestId = 0;
        if($beer["id"] == $r_data["beerId"]){
            // For each review, change highestId
            foreach($beer["reviews"] as $review){
                if ($review["review_id"] > $highestId){
                    $highestId = $review["review_id"];
                }
            }
            $highestId = $highestId + 1;
            
            // Create and add new review to array
            $newReview = ["review_id" => $highestId, "username" => $r_data["username"], "rating" => $r_data["rating"], "message" => $r_data["reviewContent"], "date" => date("y-m-d")];
            array_push($beer["reviews"], $newReview);

            // Remove old beer, add new beer (including new review), and sort
            $updatedBeer = $beer;
            array_splice($beers, $index, 1);
            $beers[] = $updatedBeer;
            array_multisort($beers);

            // Update database and send JSON of new review
            $beersJSON = json_encode($beers, JSON_PRETTY_PRINT);
            $beersData = file_put_contents($beerDatabase, $beersJSON);
            sendJSON($newReview);
        }
    }

?>

