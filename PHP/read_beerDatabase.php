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

    // If id-paramater is set
    if(isset($_GET["id"])){
        // If id-paramater is numeric
        if(is_numeric($_GET["id"])){
            foreach($beers as $beer){
                if($beer["id"] == $_GET["id"]){
                    sendJSON($beer, 400);
                    exit();
                }
            }
        }
        // If id-paramater is NOT numeric
        else{
            $error = ["error" => "Id has to me numeric"]; 
            sendJSON($error, 400);
            exit();
        }
    }else{
    // If no specific beer-id was given, send all beers
    sendJSON($beers);
    exit();
    }
?>