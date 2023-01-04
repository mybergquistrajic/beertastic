<?php
//The function file is required 
    require_once ("functions.php");

    // If request method is not GET
    if($request_method !== "GET"){
        $error = ["error" => "The method must be GET"]; 
        sendJSON($error, 400);
    
    }
    // If username, password or beers is not set in get paramaters
    if(!isset($_GET["un"], $_GET["beers"])){
        $error = ["error" => "The parameters: username, password or beers are not set"]; 
        sendJSON($error, 400);
        
    }

    // If id-paramater is set
    if(isset($_GET["id"])){
        // If id-paramater is numeric
        if(is_numeric($_GET["id"])){
            foreach($beers as $beer){
                if($beer["id"] == $_GET["id"]){
                    sendJSON($beer);
                    
                }
            }
        }
        // If id-paramater is NOT numeric
        else{
            $error = ["error" => "Id has to me numeric"]; 
            sendJSON($error, 400);
            
        }
    }else{
    // If no specific beer-id was given, send all beers
    sendJSON($beers);
    
    }
?>