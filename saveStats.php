<?php
require_once 'dbCon.php';

$id = intval($_GET['id']);
$score = intval($_GET['score']);
$cpcLevel = intval($_GET['cpcLevel']);
$acLevel= intval($_GET['acLevel']);



$sql="Update user set Id=$id, score=$score, clickPerCoin=$cpcLevel, clickPerSecond=$acLevel Where user.Id=$id";
mysqli_query($con,$sql);

echo $sql;




