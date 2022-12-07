<?php



//Variables 

//JSON - files 
$userDatabase = "userDatabase.json";
$beerDatabase = "beerDatabase.json";

//Request methods
$request_method = $_SERVER["REQUEST_METHOD"];

//Content type 
$content_type = $_SERVER["CONTENT_TYPE"];

//Requested JSON 
$r_json = file_get_contents("php://input");

//Requested data 
$r_data = json_decode($r_json, true);

//IF-STATMENTS

//If statment to check that the content-type is JSON if the method is not GET
if($request_method != "GET"){
    if($content_type != "application/json"){
        $error = ["error" => "The content-type must be JSON."]; 
        sendJSON($error, 400);
    }
}

//Array of users 
$users = [];

//if the userDatabase.json exists uptade and decode it
if(file_exists($userDatabase)){
    $json = file_get_contents($userDatabase);
    $users = json_decode($json, true);
}


?>