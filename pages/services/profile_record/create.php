<?php 
    include "../connection.php";
    $data = json_decode(file_get_contents("php://input"));
    
    $profile_id = $data->profile_id;
    $date_admitted = $data->date_admitted;
    $record = $data->record;
    
    mysqli_query($connection, "INSERT INTO profile_record(profile_id,date_admitted,records) VALUES ('$profile_id','$date_admitted','$record')");
    if(mysqli_affected_rows($connection) > 0){
        echo "success";die();
    } else{echo mysqli_error($connection);die();}

?>