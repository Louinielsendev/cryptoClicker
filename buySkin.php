<?php
require_once 'dbCon.php';

$userId = intval($_GET['userId']);
$skinId = intval($_GET['skinId']);



$sql="insert into ownSkin values ($userId, $skinId, 0)";
mysqli_query($con,$sql);

echo $userId;
