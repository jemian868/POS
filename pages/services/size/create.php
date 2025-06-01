<?php 
    include "../connection.php";
    $data = json_decode(file_get_contents("php://input"));
    
    $size = $data->size;
    
    mysqli_query($connection, "INSERT INTO size(size) VALUES ('$size')");
    if(mysqli_affected_rows($connection) > 0){
        echo "success";die();
    } else{echo mysqli_error($connection);die();}

?>