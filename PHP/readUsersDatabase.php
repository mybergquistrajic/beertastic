<?php
    //The function file is required 
    require_once ("functions.php");

    // If request method is not GET  
    if($request_method !== "GET"){
        $error = ["error" => "The method must be GET"]; 
        sendJSON($error, 400);
        
    }

    // If username is not set in get paramaters 
    if(!isset($_GET["un"])){
        $error = ["error" => "The parameter username is not set"]; 
        sendJSON($error, 400);
        
    }

    // Finding the right user
    foreach($users as $user){
        if($user["username"] == $_GET["un"]){
            sendJSON($user, 200);
            
        }
    }

    // If no user was found (meaning, we did not exit)
    $error = ["error" => "No user with that ID was found"]; 
    sendJSON($error, 400);
    
?>