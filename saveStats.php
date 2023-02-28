<?php
$id = intval($_GET['id']);
$score = intval($_GET['score']);
$cpcLevel = intval($_GET['cpcLevel']);
$acLevel= intval($_GET['acLevel']);



$serverName = "localhost";
$dbUserName = "root";
$dbPassword = "Anglarna1!";
$dbName = "click-game";

$con = mysqli_connect($serverName, $dbUserName, $dbPassword, $dbName);
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}


$sql="Update user set Id=$id, score=$score, clickPerCoin=$cpcLevel, clickPerSecond=$acLevel Where user.Id=$id";
mysqli_query($con,$sql);

echo $sql;




