<?php
require_once 'dbCon.php';

$userId = intval($_GET['userId']);
$skinId = intval($_GET['skinId']);
$state = intval($_GET['state']);





$sql="update ownskin set equiped = $state where userId = $userId and skinId = $skinId";
mysqli_query($con,$sql);


