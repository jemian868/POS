<?php
    include "../connection.php";
    $data = json_decode(file_get_contents("php://input"));
    $output = array();

    $from = $data->from;
    $to = $data->to;

    $query = mysqli_query($connection, 
    "SELECT 
      sales.*,
      payment.image AS image,
      product.name AS product_name,
      product.selling_price AS product_price,
      CONCAT(account.firstname, ' ', account.lastname) AS account_name
    FROM sales 
    LEFT JOIN product ON sales.product_id = product.id
    LEFT JOIN account ON sales.account_id = account.id
    LEFT JOIN payment ON sales.batch_number = payment.batch_number
    WHERE sales.date_created >= '$from' AND sales.date_created <= '$to'
    ");

    while($row = mysqli_fetch_assoc($query)) {
        $output[] = $row;
    }
    echo json_encode($output);die();
?>