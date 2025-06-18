<?php 
    include "../connection.php";
    $data = json_decode(file_get_contents("php://input"));
    
    $fullname = $data->fullname;
    $birthDate = $data->birthDate;
    $gender = $data->gender;
    $civil_status = $data->civil_status;
    $nationality = $data->nationality;
    $contact = $data->contact ?? 'none';
    $address = $data->address ?? 'none';

    mysqli_query($connection, 
    "INSERT INTO profile(fullname,birth_date,gender,civil_status,nationality,contact,address)
    VALUES('$fullname','$birthDate','$gender','$civil_status','$nationality','$contact','$address')");
    if(mysqli_affected_rows($connection) > 0){
        echo "success";die();
    } else{echo mysqli_error($connection);die();}

?>