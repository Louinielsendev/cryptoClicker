<?php
$userId = intval($_GET['userId']);
$skinId = intval($_GET['skinId']);



$serverName = "localhost";
$dbUserName = "root";
$dbPassword = "Anglarna1!";
$dbName = "click-game";

$con = mysqli_connect($serverName, $dbUserName, $dbPassword, $dbName);
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}


$sql="insert into ownSkin values ($userId, $skinId, 0)";
mysqli_query($con,$sql);

echo $userId;
