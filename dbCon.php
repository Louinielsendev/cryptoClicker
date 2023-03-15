<?php
$serverName = "";
$dbUserName = "ll223vk";
$dbPassword = "W5dr4L";
$dbName = "clickGame";

$con = mysqli_connect($serverName, $dbUserName, $dbPassword, $dbName);
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}