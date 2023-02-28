<?php
$userId = intval($_GET['userId']);
$skinId = intval($_GET['skinId']);
$state = intval($_GET['state']);



$serverName = "localhost";
$dbUserName = "root";
$dbPassword = "Anglarna1!";
$dbName = "click-game";

$con = mysqli_connect($serverName, $dbUserName, $dbPassword, $dbName);
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}


$sql="update ownskin set equiped = $state where userId = $userId and skinId = $skinId";
mysqli_query($con,$sql);


