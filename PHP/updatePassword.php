<?php
//Updating the password 

//The function file is required  
require_once 'functions.php';

// Check if the request method is PUT
if($request_method == "PUT") {

    // Check if the request body is empty and contains the right request data and sends error in that case  
    if(!isset($r_data["username"], $r_data["password"], $r_data["newPassword"])) {
        $error = ["error" => "The password and new Password must be set."];
        sendJSON($error, 400);
    } elseif (empty($r_data["username"]) || empty($r_data["password"]) || empty($r_data["newPassword"])) {
        $error = ["error" => "The password and new Password must not be empty."];
        sendJSON($error, 400);
    } 
    
    // Loops through the users and check if the password is correct, sends error if it's not 
    foreach($users as $user){
        if ($user["username"] == $r_data["username"]) { if($user["password"] != $r_data["password"]) {
            $error = ["error" => "The password is incorrect."];
            sendJSON($error, 404);};
        }
    }

    // Check if the new password is at least 5 characters long
    if (strlen($r_data["newPassword"]) < 5) {
        $error = ["error" => "The new Password must be at least 5 characters long."];
        sendJSON($error, 416);
    }

    //variables with the requested/php input data
    $username = $r_data["username"];
    $password = $r_data["password"];
    $newPassword = $r_data["newPassword"];
    
    // Update the password
    foreach($users as $index => $user){
        if ($user["username"] == $r_data["username"]) {
            $users[$index]["userId"] = $user["userId"];
            $users[$index]["username"] = $user["username"];
            $users[$index]["password"] = $newPassword;
            $users[$index]["likedBeers"] = $user["likedBeers"];
            $users[$index]["age"] = $user["age"];
            file_put_contents($userDatabase, json_encode($users, JSON_PRETTY_PRINT));
            sendJSON($users[$index]);
        }
    }

} else {
    sendJSON('Invalid request method', 405);
}
?>