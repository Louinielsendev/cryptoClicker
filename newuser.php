<?php
require_once 'dbCon.php';

$q = intval($_GET['q']);





$sql="insert into user values ($q, 0, 1, 0)";
mysqli_query($con,$sql);
