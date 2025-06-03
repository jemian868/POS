<?php 
  include "../connection.php";
  $data = json_decode(file_get_contents("php://input"));
  
  $quantity = $data->quantity;
  $expiry = isset($data->expiry) && $data->expiry !== '' ? $data->expiry : null;
  $product_id = $data->product_id;
  $account_id = $data->account_id;
  
  if ($expiry !== null) {
    $query = "INSERT INTO stock(quantity, date_expired, product_id, account_id) 
              VALUES ('$quantity', '$expiry', '$product_id', '$account_id')";
  } else {
    $query = "INSERT INTO stock(quantity, date_expired, product_id, account_id) 
              VALUES ('$quantity', NULL, '$product_id', '$account_id')";
  }
  mysqli_query($connection, $query);

  if(mysqli_affected_rows($connection) > 0){
    $updateQuery = "UPDATE product SET quantity_stock = quantity_stock + $quantity WHERE id = '$product_id'";
    if (mysqli_query($connection, $updateQuery)) {
        echo "success"; die();
    } else {
        echo "Error updating product: " . mysqli_error($connection); die();
    }
  } else{echo mysqli_error($connection);die();}
?>