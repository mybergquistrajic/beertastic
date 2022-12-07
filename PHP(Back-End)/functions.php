<?php

//Variables 

//JSON - files 
$userDatabase = "../JSON/userDatabase.json";
$beerDatabase = "../JSON/beerDatabase.json";

//Request methods
$request_method = $_SERVER["REQUEST_METHOD"];

//Content type 
$content_type = $_SERVER["CONTENT_TYPE"];

//Requested JSON 
$r_json = file_get_contents("php://input");

//Requested data 
$r_data = json_decode($r_json, true);

//Array of users 
$users = [];

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
    $json = file_get_contents($userDatabase);
    $users = json_decode($json, true);
}


function sendJSON($data, $statusCode = 200) {
    header('Content-Type: application/json');
    http_response_code($statusCode);
    echo json_encode($data);
    exit();
}
?>