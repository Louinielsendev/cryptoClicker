<?php
$q = intval($_GET['q']);

$serverName = "localhost";
$dbUserName = "root";
$dbPassword = "Anglarna1!";
$dbName = "click-game";

$con = mysqli_connect($serverName, $dbUserName, $dbPassword, $dbName);
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}


$sql="Select * from ownskin where userId = $q";
$result = mysqli_query($con,$sql);

$data = array();

while ($row = mysqli_fetch_assoc($result)){
    $data[] = $row;
}

echo json_encode($data);
