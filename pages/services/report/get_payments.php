<?php
    include "../connection.php";
    $data = json_decode(file_get_contents("php://input"));
    $output = array();
    
    $from = $data->from;
    $to = $data->to;

    $query = mysqli_query($connection, 
    "SELECT * FROM payment WHERE date_created >= '$from' AND date_created <= '$to'");

    while($row = mysqli_fetch_assoc($query)) {
        $output[] = $row;
    }
    echo json_encode($output);die();
?>