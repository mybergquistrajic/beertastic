<?php
//Variables 

//JSON - files 
$userDatabase = "../JSON/userDatabase.json";
$beerDatabase = "../JSON/beerDatabase.json";

//Request methods
$request_method = $_SERVER["REQUEST_METHOD"];

//Content type 
$content_type = $_SERVER['CONTENT_TYPE'];

//Requested JSON 
$r_json = file_get_contents("php://input");

//Requested data 
$r_data = json_decode($r_json, true);

//Array of users 
$users = [];

//Array of beers
$beers = [];

//IF-STATMENTS

//If statment to check that the content-type is JSON if the method is not GET
if($request_method != "GET"){
    if($content_type != "application/json"){
        $error = ["error" => "The content-type must be JSON."]; 
        sendJSON($error, 400);
    }
}

//if the userDatabase.json exists uptade and decode it
if(file_exists($userDatabase)){
    $users_json = file_get_contents($userDatabase);
    $users = json_decode($users_json, true);
}


//if the beerDatabase exists uodate and decode it 
if(file_exists($beerDatabase)){
    $beers_json = file_get_contents($beerDatabase);
    $beers = json_decode($beers_json, true);

}

//Allows all methods, Origins and Methods to acess the API  
if($request_method == "OPTIONS"){
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    
    exit();
}else{
    header("Access-Control-Allow-Origin: *");
};

//Function for sending the JSON-data and statusCode. The statusCode is 200 by default. 

function sendJSON($data, $statusCode = 200) {
    header('Content-Type: application/json');
    http_response_code($statusCode);
    echo json_encode($data);
    exit();
}



?>