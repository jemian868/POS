<?php 
    include "../connection.php";
    $data = json_decode(file_get_contents("php://input"));
    
    $category = $data->category;
    
    mysqli_query($connection, "INSERT INTO category(category) VALUES ('$category')");
    if(mysqli_affected_rows($connection) > 0){
        echo "success";die();
    } else{echo mysqli_error($connection);die();}

?>