<?php
    include "../connection.php";
    $data = json_decode(file_get_contents("php://input"));
    $output = array();

    $from = $data->from;
    $to = $data->to;

    $query = mysqli_query($connection, 
    "SELECT 
      stock.*,
      product.name AS product_name,
      CONCAT(account.firstname, ' ', account.lastname) AS account_name
    FROM stock 
    LEFT JOIN product ON stock.product_id = product.id
    LEFT JOIN account ON stock.account_id = account.id
    WHERE date_created >= '$from' AND date_created <= '$to'
    ");

    while($row = mysqli_fetch_assoc($query)) {
        $output[] = $row;
    }
    echo json_encode($output);die();
?>