<?php
    include "../connection.php";
    $data = json_decode(file_get_contents("php://input"));
    $output = array();

    $getProducts = mysqli_query($connection, 
    "SELECT 
        product.*, 
        category.category AS category_name,
        size.size AS size_name,
        type.type AS type_name,
        supplier.supplier AS supplier_name
    FROM product
    LEFT JOIN category ON product.category_id = category.id
    LEFT JOIN size ON product.size_id = size.id
    LEFT JOIN type ON product.type_id = type.id
    LEFT JOIN supplier ON product.supplier_id = supplier.id");

    while($row = mysqli_fetch_assoc($getProducts)) {
        $output[] = $row;
    }
    echo json_encode($output);die();
?>