<?php

ini_set('display_errors', 1);

require_once 'functions.php';

if($request_method == "PUT") {
    if(!isset($r_data["username"], $r_data["password"], $r_data["newPassword"])) {
        $error = ["error" => "The password and new Password must be set."];
        sendJSON($error, 400);
    } elseif (empty($r_data["username"]) || empty($r_data["password"]) || empty($r_data["newPassword"])) {
        $error = ["error" => "The password and new Password must not be empty."];
        sendJSON($error, 400);
    } 
    
    foreach($users as $user){
        if ($user["username"] == $r_data["username"]) { if($user["password"] != $r_data["password"]) {
            $error = ["error" => "The password is incorrect."];
            sendJSON($error, 400);};
        }
    }

    if (strlen($r_data["newPassword"]) < 5) {
        $error = ["error" => "The new Password must be at least 5 characters long."];
        sendJSON($error, 400);
    }

    // $id = $r_data["id"];
    $username = $r_data["username"];
    $password = $r_data["password"];
    $newPassword = $r_data["newPassword"];
    
    foreach($users as $index => $user){
        if ($user["username"] == $username) {
            $users[$index]["username"] = $username;
            $users[$index]["password"] = $newPassword;
            $users[$index]["likedBeers"] = $user["likedBeers"];
            file_put_contents($userDatabase, json_encode($users, JSON_PRETTY_PRINT));
            sendJSON($users[$index], 200);
        }
    }

} else {
    sendJSON('Invalid request method', 405);
}
?>