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


$sql="insert into user values ($q, 0, 1, 0)";
mysqli_query($con,$sql);

