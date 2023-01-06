<?php
//Users favorites (hearts) 

//The function file is required 
    require_once ("functions.php");

    // If method is not patch
    if($request_method !== "PATCH"){
        $error = ["error" => "The method must be PATCH"]; 
        sendJSON($error, 400);    
    }

    // If paramaters are missing (fetch)
    if(!isset($r_data["username"], $r_data["beerId"])){
        $error = ["error" => "One or more paramaters are missing"]; 
        sendJSON($error, 400);
    }

    // If beerId paramater isn't numeric
    if(!is_numeric($r_data["beerId"])){
        $error = ["error" => "The beerId paramater has to be numeric"]; 
        sendJSON($error, 400);
    }

    // Finding the right user
    foreach($users as $userindex => $user){
        if($user["username"] == $r_data["username"]){
            // Finding the right beer
            foreach($user["likedBeers"] as $beerindex => $beer){

                // REMOVE FROM DATABASE
                // If the given beerId exists in the users likedBeers-array: remove beer from array
                if ($beer["id"] == $r_data["beerId"]){

                    // Remove old beer
                    array_splice($user["likedBeers"], $beerindex, 1);

                    // Remove old user, add new user (without the deleted beer), and sort
                    $updatedUser = $user;
                    array_splice($users, $userindex, 1);
                    $users[] = $updatedUser;
                    array_multisort($users);
                    
                    // Update database and send JSON with id of removed beer
                    $usersJSON = json_encode($users, JSON_PRETTY_PRINT);
                    $usersData = file_put_contents($userDatabase, $usersJSON);
                    sendJSON(0);
                }
            }

            // ADD TO DATABASE
            // If the giver beerId does NOT exist in the users likedBeers-array: add beer to array
            $newFavorite = ["id" => $r_data["beerId"]];
            array_push($user["likedBeers"], $newFavorite);

            // Remove old user, add new user (including new favorite), and sort
            $updatedUser = $user;
            array_splice($users, $userindex, 1);
            $users[] = $updatedUser;
            array_multisort($users);

            // Update database and send JSON with id of added beer
            $usersJSON = json_encode($users, JSON_PRETTY_PRINT);
            $usersData = file_put_contents($userDatabase, $usersJSON);
            sendJSON(1);

            }
        }

?>