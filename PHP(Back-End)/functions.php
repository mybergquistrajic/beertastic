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


function sendJSON($data, $statusCode = 200) {
    header('Content-Type: application/json');
    http_response_code($statusCode);
    echo json_encode($data);
    exit();
}
?>