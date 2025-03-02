<?php
// MySQLi Procedural Database Connection
//................................................

require_once('settings.php');

$link = mysqli_connect(DB_HOST, DB_USER, DB_PASS);

if ($link) {
  echo "<h1>connected</h1>";
 	}else{
die("ERROR!" . mysqli_connect_error());
	}

/*//..............................................UPDATE ROW

$query = "UPDATE `testtest` SET `ID` = '32', `Set 1` = '87', `Rep 1` = '55' WHERE `testtest`.`ID` = 32";

if(mysqli_query($link,$query)){
	echo "was updated";
}

mysqli_close($link);
*///..............................................
/*//..............................................DELETE ROW

$query = "DELETE FROM `testtest` WHERE `testtest`.`ID` = 33";

if(mysqli_query($link,$query)){
	echo "was deleted";
}

mysqli_close($link);
*///..............................................
/*//..............................................DISPLAY ROW VALUWS

$query = "SELECT * FROM `testtest`";
if($result = mysqli_query($link,$query)){
	while($row=mysqli_fetch_assoc($result)){
	echo "Date:".$row["Date"]."Set 1:".$row["Set 1"]."Rep 1:".$row["Rep 1"]."<br>"; 
}};

mysqli_close($link);
*///..............................................
/*................................................DISPLAY NUMBER OF ROWS

$query = "SELECT * FROM `testtest`";
if($result = mysqli_query($link,$query)){
	while($row=mysqli_fetch_assoc($result)){
	printf($result->num_rows); 
}};

mysqli_close($link);
*///..............................................
/*//..............................................INSERT ROW

$query = "INSERT INTO `testtest` (`ID`, `Date`, `Set 1`, `Rep 1`) VALUES (NULL, CURRENT_DATE(), '3', '4')";
if(mysqli_query($link,$query)){
	echo "New Entry Added". mysqli_insert_id($link);
}else{
	echo "Snap! Something Went Wrong :(" . $link->error;
	}

mysqli_close($link)
*///..............................................
/*//..............................................CREATE TABLE

$query = "
	CREATE TABLE `test9` (
  `ID` int(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `Date` int(11) NOT NULL,
  `Set 1` int(11) NOT NULL COMMENT 'lbs',
  `Rep 1` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Test Exercise' ;
";
if(mysqli_query($link,$query)){
	echo "Created Table";
	}else{
		echo "Snap! Something Went Wrong :(" . $link->error;
	}
*///..............................................
/*//..............................................CREATE DATABASE

$query = "CREATE DATABASE testrunbioth";
mysqli_query($link,$query);
*///..............................................

?>

<p><a href="Database Using PHP.html" class="back-button">Back</a></p>