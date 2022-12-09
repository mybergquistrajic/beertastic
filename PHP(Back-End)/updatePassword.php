<?php

ini_set('display_errors', 1);

require_once 'functions.php';

// Check if the request method is PUT
if($request_method == "PUT") {

    // Check if the request body is empty
    if(!isset($r_data["userId"], $r_data["password"], $r_data["newPassword"])) {
        $error = ["error" => "The password and new Password must be set."];
        sendJSON($error, 400);
    } elseif (empty($r_data["userId"]) || empty($r_data["password"]) || empty($r_data["newPassword"])) {
        $error = ["error" => "The password and new Password must not be empty."];
        sendJSON($error, 400);
    } 
    
    // Check if the password is correct
    foreach($users as $user){
        if ($user["userId"] == $r_data["userId"]) { if($user["password"] != $r_data["password"]) {
            $error = ["error" => "The password is incorrect."];
            sendJSON($error, 400);};
        }
    }

    // Check if the new password is at least 5 characters long
    if (strlen($r_data["newPassword"]) < 5) {
        $error = ["error" => "The new Password must be at least 5 characters long."];
        sendJSON($error, 400);
    }

    $userId = $r_data["userId"];
    $password = $r_data["password"];
    $newPassword = $r_data["newPassword"];
    
    // Update the password
    foreach($users as $index => $user){
        if ($user["username"] == $username) {
            $users[$index]["userId"] = $user["userId"];
            $users[$index]["username"] = $user["username"];
            $users[$index]["password"] = $newPassword;
            $users[$index]["likedBeers"] = $user["likedBeers"];
            $users[$index]["age"] = $user["age"];
            file_put_contents($userDatabase, json_encode($users, JSON_PRETTY_PRINT));
            sendJSON($users[$index], 200);
        }
    }

} else {
    sendJSON('Invalid request method', 405);
}
?>