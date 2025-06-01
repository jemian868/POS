<?php 
    include "../connection.php";
    $data = json_decode(file_get_contents("php://input"));
    
    $name = $data->name;
    $quantity_limit = $data->quantity_limit;
    $original_price = $data->original_price;
    $selling_price = $data->selling_price;
    $size_id = $data->size_id;
    $type_id = $data->type_id;
    $category_id = $data->category_id;
    $supplier_id = $data->supplier_id;

    mysqli_query($connection, 
    "INSERT INTO product(name,quantity_limit,original_price,selling_price,size_id,type_id,category_id,supplier_id)
    VALUES('$name','$quantity_limit','$original_price','$selling_price','$size_id','$type_id','$category_id','$supplier_id')");
    if(mysqli_affected_rows($connection) > 0){
        echo "success";die();
    } else{echo mysqli_error($connection);die();}

?>