<?php
    require_once ("functions.php");

    // If request method is not GET
    if($request_method !== "GET"){
        $error = ["error" => "The method must be GET"]; 
        sendJSON($error, 400);
        exit();
    }
    // If username, password or beers is not set in get paramaters
    if(!isset($_GET["un"], $_GET["pw"], $_GET["beers"])){
        $error = ["error" => "The parameters: username, password or beers are not set"]; 
        sendJSON($error, 400);
        exit();
    }

    // If everythings good, send beers
    sendJSON($beers);
    exit();
?>