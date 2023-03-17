<?php
require_once 'dbCon.php';

$id = intval($_GET['id']);


$sql="insert into ownskin values ($id, 1, 1)";
mysqli_query($con,$sql);

