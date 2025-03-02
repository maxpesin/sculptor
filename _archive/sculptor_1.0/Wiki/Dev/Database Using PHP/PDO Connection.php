<?php
// PDO connection
//................................................

require_once('settings.php');

try {
	$link = new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME, DB_USER, DB_PASS);
	$link->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Error Handling
	$query = "
	CREATE TABLE `test76` (
  `ID` int(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `Date` int(11) NOT NULL,
  `Set 1` int(11) NOT NULL COMMENT 'lbs',
  `Rep 1` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Test Exercise' ;
";
$link->exec($query);
echo "Created Table";
	echo "connected";
}
catch(PDOException $error){
	print "ERROR!". $error->getMessage() ;
	die();
}
	$link = null;
?>

<p><a href="Database Using PHP.html" class="back-button">Back</a></p>