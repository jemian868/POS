<?php
    include "../connection.php";
    $data = json_decode(file_get_contents("php://input"));
    $output = array();

    $id = $data->id;

    $query = mysqli_query($connection, "SELECT * FROM profile_record  WHERE profile_id = '$id' ");
    while($row = mysqli_fetch_assoc($query)) {
        $output[] = $row;
    }
    echo json_encode($output);die();
?>