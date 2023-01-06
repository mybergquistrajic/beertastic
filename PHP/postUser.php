<?php
//Creating a new user

//The function file is required 
require_once "functions.php";


//Checks that the method is POST 
if($request_method != "POST"){
    $error = ["error" => "Wrong method. Please try again."];
    sendJSON($error, 400);
}


//Check so that the new user contains username, password and age
if(!isset($r_data["username"], $r_data["password"], $r_data["age"])){
    $error = ["error" => "Incorrect data."];
    sendJSON($error, 400);
}



//Checks that the user request data isn't empty 
if(empty($r_data["username"]) or empty($r_data["password"]) or empty($r_data["age"])) {
 
        $error = ["error" => "Missing data."];
        sendJSON($error, 404);

}


//If the user is under 18 send error
if($r_data["age"] < 18){
$error = ["error" => "Forbidden age."];
        sendJSON($error, 403);
}

//If the password is under 5 characters send error 
if(strlen($r_data["password"]) < 5){
    $error = ["error" => " The password must be at least 5 characters long."];
        sendJSON($error, 416);
}

//Checks that the user isn't already in the database of users
foreach($users as $user){
    if($user["username"] == $r_data["username"] ){
        $error = ["error" => "The username is already taken. Try a new one."];
        sendJSON($error, 400);
    }
}

// variables for the data 
$username = $r_data["username"];
$password = $r_data["password"];
$age = $r_data["age"];

    
//The highest ID starts at 0 
$highest_id = 0; 

//Controls the highest ID in the array of users 
foreach($users as $user){
    if($user['userId'] > $highest_id){
        $highest_id = $user["userId"];
    }
}

//The new id of the user is the highest existing ID + 1 
$new_id = $highest_id + 1; 

//The new user contains the id, username, age and the empty array of likedBeers 
$newUser = ["userId" => $new_id, "username" => $username, "password" => $password ,"age" => $age, "likedBeers" => []];
    
//Adding the user to the array of users and updates the database 
$users[] = $newUser;
$users_json = json_encode($users, JSON_PRETTY_PRINT); 
file_put_contents($userDatabase, $users_json);
sendJSON($newUser);










?>