<?php
    include "../connection.php";
    $data = json_decode(file_get_contents("php://input"));
    $output = array();

    $query = mysqli_query($connection, 
    "SELECT * FROM size");

    while($row = mysqli_fetch_assoc($query)) {
        $output[] = $row;
    }
    echo json_encode($output);die();
?>