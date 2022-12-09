<?php
//For login with username and password

require_once "functions.php";

//Displays errors
ini_set("display_errors", 1);

// If request method is not POST send error message 
if($request_method != "POST"){
    $error = ["error" => "The method must be POST"]; 
    sendJSON($error, 400);
}

//The r_data must include username and password 
if(!isset($r_data["username"], $r_data["password"])){
    //if the r_data is correct, loop through the database of 
    //users and check that the user exists
    foreach($users as $user){
        if($user["username"] == $r_data["username"] and $user["password"] == $r_data["password"]){
            //Allwo the user to login if it's in the database.
            sendJSON($user);

        }
    }
}else{
    //If the user is not in the database, send error message and don't allow to login. 
    $error = ["error" => "The user doesn't exist."]; 
    sendJSON($error, 400);
}




?>