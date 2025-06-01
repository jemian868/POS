<?php 
    include "../connection.php";
    $data = json_decode(file_get_contents("php://input"));
    
    $type = $data->type;
    
    mysqli_query($connection, "INSERT INTO type(type) VALUES ('$type')");
    if(mysqli_affected_rows($connection) > 0){
        echo "success";die();
    } else{echo mysqli_error($connection);die();}

?>