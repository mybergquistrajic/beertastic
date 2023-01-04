<?php
//For login with username and password

//The function file is required 
require_once "functions.php";

//Displays errors
ini_set("display_errors", 1);

// If request method is not POST send error message 
if($request_method != "POST"){
    $error = ["error" => "The method must be POST"]; 
    sendJSON($error, 400);
}

//The r_data must include username and password 
if(isset($r_data["username"], $r_data["password"])){
    //The r_data can't be empty
    if(empty($r_data["username"]) or empty($r_data["password"])){
        $error = ["error" => "Please fill in all of the information."];
        sendJSON($error, 404);
    }
    //if the r_data is correct, loop through the database of 
    //users and check that the user exists
    foreach($users as $user){
        if($user["username"] == $r_data["username"] and $user["password"] == $r_data["password"]){
            //Allwo the user to login if it's in the database.
            sendJSON($user);

        }
    }
    //Else send error 
    $error = ["error" => "No user found."];
    sendJSON($error, 400);
}



?>