<?php 
  include "../connection.php";
  $data = json_decode(file_get_contents("php://input"));

  $account_id = $data->account_id;
  $product_id = $data->product_id;
  $quantity = $data->quantity;
  $batch_number = $data->batch_number;

  // Get current stock for the product
  $result = mysqli_query($connection, "SELECT quantity_stock FROM product WHERE id = '$product_id'");
  if ($row = mysqli_fetch_assoc($result)) {
      $available_stock = $row['quantity_stock'];

      // Check current quantity in cart (if any)
      $cart_check = mysqli_query($connection, "SELECT quantity FROM cart WHERE account_id = '$account_id' AND product_id = '$product_id'");
      $existing_cart_quantity = 0;

      if ($cart_row = mysqli_fetch_assoc($cart_check)) {
          $existing_cart_quantity = $cart_row['quantity'];
      }

      $total_requested = $existing_cart_quantity + $quantity;

      if ($total_requested > $available_stock) {
          echo "insuficient"; die();
      }

      if ($existing_cart_quantity > 0) {
          // Update quantity in existing cart item
          $update = mysqli_query($connection, "UPDATE cart SET quantity = quantity + '$quantity' WHERE account_id = '$account_id' AND product_id = '$product_id'");
          if ($update) {
              echo "updated"; die();
          } else {
              echo mysqli_error($connection); die();
          }
      } else {
          // Insert new item into cart
          $insert = mysqli_query($connection, "INSERT INTO cart(account_id, product_id, quantity, batch_number) VALUES ('$account_id', '$product_id', '$quantity', '$batch_number')");
          if ($insert) {
              echo "success"; die();
          } else {
              echo mysqli_error($connection); die();
          }
      }

  } else {
      echo "error: Product not found."; die();
  }
?>
