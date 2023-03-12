<?php

require_once 'dbCon.php';


$sql="Select * from skin";
$result = mysqli_query($con,$sql);

$data = array();

while ($row = mysqli_fetch_assoc($result)){
    $data[] = $row;
}

echo json_encode($data);
