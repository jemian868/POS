<?php
    include "../connection.php";
    $data = json_decode(file_get_contents("php://input"));
    $output = array();

    $from = $data->from;
    $to = $data->to;

    $query = mysqli_query($connection, "SELECT 
      profile_record.*,
      profile.fullname AS fullname,
      profile.birth_date AS birth_date,
      profile.gender AS gender,
      profile.civil_status AS civil_status,
      profile.nationality AS nationality,
      profile.contact AS contact,
      profile.address AS address,
      profile.image AS image
    FROM profile_record 
    LEFT JOIN profile ON profile_record.profile_id = profile.id
    WHERE date_admitted >= '$from' AND date_admitted <= '$to'");
    while($row = mysqli_fetch_assoc($query)) {
        $output[] = $row;
    }
    echo json_encode($output);die();
?>