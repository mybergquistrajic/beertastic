<?php
//File for creating a new user

require_once "functions.php";

ini_set("display_errors", 1);


//Checks that the method is POST 
if($request_method != "POST"){
    $error = ["error" => "Wrong method. Please try again."];
    sendJSON($error, 400);
}


//Check so that the new user contains username, password and date of birth
if(!isset($r_data["username"], $r_data["password"], $r_data["age"])){
    $error = ["error" => "Incorrect data."];
    sendJSON($error, 400);
}



//Checks that the user data isn't empty and that the user is over 18. The password also has to be longer than 5 characters. 
if($r_data["username"] == "" or $r_data["password"] == "" or $r_data["age"] < 18 or strlen($r_data["password"]) < 5) {
 
        $error = ["error" => "Missing data."];
        sendJSON($error, 404);

}

//Checks that the user isn't already in the database of users
foreach($users as $user){
    if($user["username"] == $r_data["username"] ){
        $error = ["error" => "The username is already taken. Try a new one."];
        sendJSON($error, 400);
    }
}

//variables for the data 

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