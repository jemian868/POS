<?php 
include "../connection.php";

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);

    $query = "DELETE FROM cart WHERE id = $id";
    mysqli_query($connection, $query);

    if (mysqli_affected_rows($connection) > 0) {
        echo "success"; die();
    } else {
        echo mysqli_error($connection); die();
    }
} else {
    echo "No ID provided"; die();
}
?>
