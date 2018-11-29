<?php
    $data = [];
    function getData() {
        return json_decode(file_get_contents("data.txt"));
    }
    
    function saveData() {
        json_encode(file_put_contents("data.txt", $data));
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
        return $data;
    } else {
        echo "error on " + getRealIpAddr();
    }
    
?>