<?php
    $file = "data.txt";
    $data = [];
    function getData()
    {
        return file_get_contents (file).unserialize();
    }
    function saveData()
    {
        file_put_contents(file, data.serialize());
    }
    if($_GET["x"] && $_GET["y"] && $_GET["direction"] && $_GET["sprite"]){
        echo "all data present";
    } else {
        echo "error";
    }
    
?>