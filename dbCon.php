<?php
$serverName = "localhost";
$dbUserName = "root";
$dbPassword = "Casiojbliphone1";
$dbName = "click-game";

$con = mysqli_connect($serverName, $dbUserName, $dbPassword, $dbName);
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}