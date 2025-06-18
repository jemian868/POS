<?php 
    include "../services/connection.php";
    $data = json_decode(file_get_contents("php://input"));
    
    $id = $data->id;
    $record = mysqli_real_escape_string($connection, $data->record);

    mysqli_query($connection, "UPDATE profile_record SET records='$record' WHERE id='$id'");
    if(mysqli_affected_rows($connection) > 0){
        echo "success";die();
    } else{echo mysqli_error($connection);die();}

?>