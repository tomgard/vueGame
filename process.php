<?php
    $file = "data.txt";
    $data = [];
    function getData() {
        return file_get_contents ($file).json_decode();
    }
    
    function saveData() {
        file_put_contents($file, $data.json_encode());
    }
    
    function getRealIpAddr() {
        if (!empty($_SERVER['HTTP_CLIENT_IP']))   //check ip from share internet
        {
          $ip=$_SERVER['HTTP_CLIENT_IP'];
        }
        elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))   //to check ip is pass from proxy
        {
          $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
        }
        else
        {
          $ip=$_SERVER['REMOTE_ADDR'];
        }
        return $ip;
    }
    
    if($_GET["x"] && $_GET["y"] && $_GET["direction"] && $_GET["sprite"]){
        $data = getData();
        
    } else {
        echo "error";
    }
    
?>