<?php 
    include "../connection.php";
    $data = json_decode(file_get_contents("php://input"));
    
    $firstname = $data->firstname;
    $lastname = $data->lastname;
    $designation = $data->designation;
    $username = $data->username;
    $password = $data->password;
    
    mysqli_query($connection, "INSERT INTO account(firstname,lastname,designation,username,password) VALUES ('$firstname','$lastname','$designation','$username','$password')");
    if(mysqli_affected_rows($connection) > 0){
        echo "success";die();
    } else{echo mysqli_error($connection);die();}

?>