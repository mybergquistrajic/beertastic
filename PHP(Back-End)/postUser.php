<?php
//File for creating a new user
ini_set("display_errors", 1);
require_once "functions.php";

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

//Checks that the user data isn't empty and that the user is over 18 and the lenght of so the password is shorter than 5 characters 
if($r_data["username"] == "" 
or strln($r_data["password"]) < 5 
or $r_data["password"] == ""
or $r_data["age"] < 18){

    $error = ["error" => "Missing data."];
    sendJSON($error, 404);
}

//Checks that the user isn't already in the database of users 
if($r_data["username"] == $userDatabase["username"]){
    $error = ["error" => "Username already taken. Please try again."];
    sendJSON($error, 400);
}

    

    $username = $r_data["username"];
    $password = $r_data["password"];
    $age = $r_data["age"];

    







?>