<?php
    include "../connection.php";
    $data = json_decode(file_get_contents("php://input"));

    $query = mysqli_query($connection, "SELECT COUNT(*) AS total FROM profile");

    if ($row = mysqli_fetch_assoc($query)) {
        echo $row['total'];
    }

    die();
?>