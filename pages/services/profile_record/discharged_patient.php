<?php 
    include "../connection.php";
    $data = json_decode(file_get_contents("php://input"));
    
    $id = $data->id;
    $date_discharged = $data->date_discharged;

    
    mysqli_query($connection, "UPDATE profile_record SET date_discharged='$date_discharged' WHERE id='$id'");
    if(mysqli_affected_rows($connection) > 0){
        echo "success";die();
    } else{echo mysqli_error($connection);die();}

?>