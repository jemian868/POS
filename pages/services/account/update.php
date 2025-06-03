<?php 
    include "../connection.php";
    $data = json_decode(file_get_contents("php://input"));
    
    $id = $data->id;
    $firstname = $data->firstname;
    $lastname = $data->lastname;
    $designation = $data->designation;
    $username = $data->username;
    $password = $data->password;

    mysqli_query($connection, "UPDATE account SET firstname='$firstname', lastname='$lastname', designation='$designation', username='$username', password='$password' WHERE id='$id'");
    if(mysqli_affected_rows($connection) > 0){
        echo "success";die();
    } else{echo mysqli_error($connection);die();}

?>