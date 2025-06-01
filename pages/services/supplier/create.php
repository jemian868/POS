<?php 
    include "../connection.php";
    $data = json_decode(file_get_contents("php://input"));
    
    $supplier = $data->supplier;
    
    mysqli_query($connection, "INSERT INTO supplier(supplier) VALUES ('$supplier')");
    if(mysqli_affected_rows($connection) > 0){
        echo "success";die();
    } else{echo mysqli_error($connection);die();}

?>