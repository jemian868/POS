<?php 
    include "../connection.php";
    $data = json_decode(file_get_contents("php://input"));
    
    $id = $data->id;
    $cusername = $data->cusername;
    $cpassword = $data->cpassword;
    $nusername = $data->nusername;
    $npassword = $data->npassword;

    $query = mysqli_query($connection, "SELECT * FROM account WHERE id = '$id'");
    if ($row = mysqli_fetch_assoc($query)) {
      $currentUsername = $row['username'];
      $currentPassword = $row['password'];

      if($currentUsername === $cusername && $currentPassword === $cpassword) {
        if($nusername && $npassword) {
          mysqli_query($connection, "UPDATE account SET username='$nusername', password='$npassword' WHERE id='$id'");
          if(mysqli_affected_rows($connection) > 0) {
            echo 'Username and Password updated.'; die();
          }
        } else if ($nusername && !$npassword) {
          mysqli_query($connection, "UPDATE account SET username='$nusername' WHERE id='$id'");
          if(mysqli_affected_rows($connection) > 0) {
            echo 'Username updated.'; die();
          }
        } else {
          mysqli_query($connection, "UPDATE account SET password='$npassword' WHERE id='$id'");
          if(mysqli_affected_rows($connection) > 0) {
            echo 'Password updated.'; die();
          }
        }
      } else {
        echo 'invalid'; die();
      }
    }
?>