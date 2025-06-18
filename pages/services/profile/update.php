<?php 
    include "../connection.php";
    $data = json_decode(file_get_contents("php://input"));
    
    $id = $data->id;
    $fullname = $data->fullname;
    $birthDate = $data->birthDate;
    $gender = $data->gender;
    $civil_status = $data->civil_status;
    $nationality = $data->nationality;
    $contact = $data->contact ?? 'none';
    $address = $data->address ?? 'none';

    
    mysqli_query($connection, "UPDATE profile SET fullname='$fullname', birth_date='$birthDate', gender='$gender', civil_status='$civil_status', nationality='$nationality', contact='$contact', address='$address' WHERE id='$id'");
    if(mysqli_affected_rows($connection) > 0){
        echo "success";die();
    } else{echo mysqli_error($connection);die();}

?>