<?php
include "pages/services/connection.php";

$data = json_decode(file_get_contents("php://input"));
$output = array();

$username = mysqli_real_escape_string($connection, $data->username);
$password = mysqli_real_escape_string($connection, $data->password);

$query = mysqli_query($connection, "SELECT * FROM account WHERE BINARY username = '$username' AND BINARY password = '$password'");
if ($row = mysqli_fetch_assoc($query)) {
    if ($row['status'] === 'active') {
      $output[] = array("id"          =>  $row['id'],
                        "firstname"   =>  $row['firstname'],
                        "lastname"    =>  $row['lastname'],
                        "designation" =>  $row['designation'],
                        "username"    =>  $row['username'],
                        "password"    =>  $row['password'],
                        "status"      =>  "success",
                    );
    } else {
      $output[] = array("status" => "deactivated");
    }
} else {
  $output[] = array("status" => "error");
}
echo json_encode($output);
die();
?>
