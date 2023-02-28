<?php
require_once 'dbCon.php';

$q = intval($_GET['q']);


$sql="Select * from user where user.id=$q";
$result = mysqli_query($con,$sql);

$data = array();

while ($row = mysqli_fetch_assoc($result)){
    $data[] = $row;
}

echo json_encode($data);
