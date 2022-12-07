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

    foreach($beers as $beer){
        if($beer["id"] == $r_data["beerId"]){
            $highestId = 0;
            foreach($beer["reviews"] as $review){
                if ($review["id"] > $highestId){
                    $highestId = $review["id"];
                }
            }
            $highestId = $highestId + 1;
            $newReview = ["review_id" => $highestId, "username" => $r_data["username"], "rating" => $r_data["rating"], "message" => $r_data["reviewContent"]];
        }
    }

    sendJSON($r_data);
?>

