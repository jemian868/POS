<?php 
    include "../connection.php";
    $data = json_decode(file_get_contents("php://input"));
    
    $id = $data->id;
    $status = $data->status;

    mysqli_query($connection, "UPDATE account SET status='$status' WHERE id='$id'");
    if(mysqli_affected_rows($connection) > 0){
        echo "success";die();
    } else{echo mysqli_error($connection);die();}

?>