<?php 
  include "../connection.php";
  $data = json_decode(file_get_contents("php://input"));

  $account_id = $data->account_id;
  $product_id = $data->product_id;
  $quantity = $data->quantity;
  $batch_number = $data->batch_number;

	// Check Product if Exist
  $productQuery = mysqli_query($connection, "SELECT quantity_stock FROM product WHERE id = '$product_id'");
	if ($productRow = mysqli_fetch_assoc($productQuery)) {
		$available_stock = $productRow['quantity_stock'];	

		$cartQuery = mysqli_query($connection, "SELECT * FROM cart WHERE account_id = '$account_id' AND product_id = '$product_id'");
		if ($cartRow = mysqli_fetch_assoc($cartQuery)) {
			$cart_stock = $cartRow['quantity'];

			$request_quantity = intval($cart_stock + $quantity);
			if($request_quantity > $available_stock) {
				echo "insuficient"; die();
			} else {
				$update = mysqli_query($connection, "UPDATE cart SET quantity = quantity + '$quantity' WHERE account_id = '$account_id' AND product_id = '$product_id'");
				if ($update) {
					echo "updated"; die();
				} else {
						echo mysqli_error($connection); die();
				}
			}
		} else {	
			if($quantity > $available_stock) {
				echo "insuficient"; die();
			}	else {
				$cartQuery = mysqli_query($connection, "SELECT * FROM cart WHERE account_id = '$account_id'");
				if ($cartRow = mysqli_fetch_assoc($cartQuery)) {
					$batch_number = $cartRow['batch_number'];
				}

				$insert = mysqli_query($connection, "INSERT INTO cart(account_id, product_id, quantity, batch_number) VALUES ('$account_id', '$product_id', '$quantity', '$batch_number')");
				if ($insert) {
					echo "success"; die();
				} else {
						echo mysqli_error($connection); die();
				}
			}
		}
	}
?>
