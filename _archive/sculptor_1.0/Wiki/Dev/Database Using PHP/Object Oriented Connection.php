<?php
// MySQLi Object Oriented connectiion
//................................................

require_once('settings.php');

$link = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if($link->connect_error)
	{
	echo "error". $link->connect_eror;
	}
	else
	{
  /*echo "connected";*/
	}
	$query = "
	CREATE TABLE `test10` (
  `ID` int(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `Date` int(11) NOT NULL,
  `Set 1` int(11) NOT NULL COMMENT 'lbs',
  `Rep 1` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Test Exercise' ;
";
if($link->query($query)===TRUE){
	echo "Created Table";
	}else{
		echo "Snap! Something Went Wrong :(" . $link->error;
	}

/*
$query = "CREATE DATABASE newdb";
echo $link->query($query)
*/
?>

<p><a href="Database Using PHP.html" class="back-button">Back</a></p>