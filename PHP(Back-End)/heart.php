<?php
    require_once ("functions.php");

    // If method is not patch
    if($request_method !== "PATCH"){
        $error = ["error" => "The method must be PATCH"]; 
        sendJSON($error, 400);
        exit();
    }

    // If paramaters are missing (fetch)
    if(!isset($r_data["username"], $r_data["beerId"], $r_data["action"])){
        $error = ["error" => "One or more paramaters are missing"]; 
        sendJSON($error, 400);
        exit();
    }

    // If username or action paramaters aren't strings
    if(!is_string($r_data["username"]) or !is_string($r_data["action"])){
        $error = ["error" => "The username or action paramater(s) have to be strings"]; 
        sendJSON($error, 400);
        exit();
    }

    // If beerId paramater isn't numeric
    if(!is_numeric($r_data["beerId"])){
        $error = ["error" => "The beerId paramater has to be numeric"]; 
        sendJSON($error, 400);
        exit();
    }

    // If the action is not add or remove
    if($r_data["action"] !== "add"){
        $error = ["error" => "Action was not given correctly"]; 
        sendJSON($error, 400);
        exit();
    }

    // If requested action is add
    if($r_data["action"] === "add"){
        foreach($users as $index => $user){
            if($user["username"] == $r_data["username"]){
                $newFavorite = ["id" => $r_data["beerId"]];

                array_push($user["likedBeers"], $newFavorite);

                $updatedUser = $user;
                array_splice($users, $index, 1);
                $users[] = $updatedUser;
                array_multisort($users);

                $usersJSON = json_encode($users, JSON_PRETTY_PRINT);
                $usersData = file_put_contents($userDatabase, $usersJSON);
                sendJSON($newFavorite);
            }
        }
    }

    // If requested action is remove
    if($r_data["action"] === "remove"){
        
    }


?>