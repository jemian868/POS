<?php
    include "../connection.php";
    $data = json_decode(file_get_contents("php://input"));
    $output = array();

    $account_id = $data->account_id;

    $query = mysqli_query($connection, 
    "SELECT 
      cart.*,
      product.name AS product_name,
      product.selling_price AS product_price,
      type.type AS type_name,
      size.size AS size_name
    FROM cart 
    LEFT JOIN product ON cart.product_id = product.id
    LEFT JOIN type ON product.type_id = type.id
    LEFT JOIN size ON product.size_id = size.id
    WHERE account_id = '$account_id'
    ");

    while($row = mysqli_fetch_assoc($query)) {
        $output[] = $row;
    }
    echo json_encode($output);die();
?>