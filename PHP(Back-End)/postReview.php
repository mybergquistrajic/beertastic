 <?php
    require_once ("functions.php");

    // If method is not post
    if($request_method !== "POST"){
        $error = ["error" => "The method must be POST"]; 
        sendJSON($error, 400);
        exit();
    }

    // If paramaters are missing
    if(!isset($r_data["username"], $r_data["password"], $r_data["beerId"], $r_data["rating"], $r_data["reviewContent"])){
        $error = ["error" => "One or more paramaters are missing"]; 
        sendJSON($error, 400);
        exit();
    }

    // Finding the right beer
    foreach($beers as $index => $beer){
        if($beer["id"] == $r_data["beerId"]){
            $highestId = 0;
            // For each review, change highestId
            foreach($beer["reviews"] as $review){
                if ($review["id"] > $highestId){
                    $highestId = $review["id"];
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

            // Update database and send JSON
            $beersJSON = json_encode($beers, JSON_PRETTY_PRINT);
            $beersData = file_put_contents($beerDatabase, $beersJSON);
            sendJSON($newReview);

            // ADD:
                // Date to review
        }
    }

?>

