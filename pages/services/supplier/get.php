<?php
    include "../connection.php";
    $data = json_decode(file_get_contents("php://input"));
    $output = array();

    $getProducts = mysqli_query($connection, 
    "SELECT * FROM supplier");

    while($row = mysqli_fetch_assoc($getProducts)) {
        $output[] = $row;
    }
    echo json_encode($output);die();
?>