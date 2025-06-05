<?php 
include "../connection.php";

$data = json_decode(file_get_contents("php://input"));
$account_id = $data->account_id ?? null;
$cash = $data->cash ?? 0;
$discount = $data->discount ?? 0;

if (!$account_id) {
    echo 'invalid_account'; die();
}

// Fetch cart items once
$cartQuery = $connection->prepare("SELECT * FROM cart WHERE account_id = ?");
$cartQuery->bind_param("s", $account_id);
$cartQuery->execute();
$cartResult = $cartQuery->get_result();

$cartItems = [];
while ($row = $cartResult->fetch_assoc()) {
    $cartItems[] = $row;
}

// First check if all items are in stock
foreach ($cartItems as $item) {
    $cartQuantity = $item['quantity'];
    $productId = $item['product_id'];

    $productQuery = $connection->prepare("SELECT quantity_stock FROM product WHERE id = ?");
    $productQuery->bind_param("s", $productId);
    $productQuery->execute();
    $productResult = $productQuery->get_result();

    if ($productRow = $productResult->fetch_assoc()) {
        $available_stock = $productRow['quantity_stock'];
        if ($cartQuantity > $available_stock) {
            echo 'insufficient'; die();
        }
    } else {
        echo 'product_not_found'; die();
    }
}

// Prepare sales insert statement (without amount_paid and amount_discount)
$salesStmt = $connection->prepare(
    "INSERT INTO sales(account_id, product_id, quantity, batch_number) 
     VALUES (?, ?, ?, ?)"
);

// Insert sales records
foreach ($cartItems as $item) {
    $productId = $item['product_id'];
    $quantity = $item['quantity'];
    $batchNumber = $item['batch_number'];

    $salesStmt->bind_param("ssis", $account_id, $productId, $quantity, $batchNumber);
    if (!$salesStmt->execute()) {
        throw new Exception("insert_failed");
    }

    // Subtract quantity from product stock
    $updateStockQuery = "UPDATE product SET quantity_stock = quantity_stock - $quantity WHERE id = '$productId'";
    if (!mysqli_query($connection, $updateStockQuery)) {
        throw new Exception("stock_update_failed");
    }
}

// Now insert payment records, one payment per unique batch_number
// Collect unique batch_numbers from cart items
$uniqueBatchNumbers = array_unique(array_column($cartItems, 'batch_number'));

$paymentStmt = $connection->prepare("INSERT INTO payment(batch_number, amount, discount) VALUES (?, ?, ?)");

foreach ($uniqueBatchNumbers as $batchNumber) {
    // You can decide if you want to insert the same cash & discount for all batch_numbers,
    // or calculate amounts per batch_number from cart items.
    // For now, I will insert the same cash and discount for each batch_number.

    $paymentStmt->bind_param("sdd", $batchNumber, $cash, $discount);
    if (!$paymentStmt->execute()) {
        throw new Exception("payment_insert_failed");
    }
}

// Clear cart for the account
if (!mysqli_query($connection, "DELETE FROM cart WHERE account_id = '$account_id'")) {
    throw new Exception("delete_failed");
}

echo 'success'; die();
?>
