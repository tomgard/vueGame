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
    if($_POST["x"] && $_POST["y"] && $_POST["direction"] && $_POST["sprite"]){
        echo "all data present";
    } else {
        echo "error";
    }
    
?>