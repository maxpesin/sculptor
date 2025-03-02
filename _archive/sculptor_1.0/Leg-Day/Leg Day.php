<?php
if (isset($_post['insert']))
{
	$xml = new DOMDocument("1.0","UTF-8");
	$xml->load('Sculpt-Legs.xml');
	
	$1l = $-post['1l'];
	$1r = $-post['1r'];
	
	$rootTag = $xml->getElementsByTagName("document")->item(0);
	
	$infoTag = $xml->createElement("info");
		$1lTag = $xml->createElement("1l", $1l);
		$1rTag = $xml->createElement("1r", $1r);
		
		$infoTag->appendChild($1lTag);
		$infoTag->appendChild($1lTag);
	
	$rootTag->appendChild($infoTag);
	$xml->save('Sculpt-Legs.xml');
}	
?>

<html>
<head> 
	<title>Leg Day</title>
	<a href="../index.html">Home</a>
	<h1>Hello World</h1></br>
	<h1>Today is Leg Day</h1></br>
</head>
<body>
	<p>Warm up</p>
	<p>Quads One</p>
	<form action="Sculpt-Legs.php" method="post">
1lbs
<input type="text" name="1l"/>
1Reps
<input type="text" name="1r"/>

2lbs
<input type="text" name="2l"/>
2Reps
<input type="text" name="2r"/>

3lbs
<input type="text" name="3l"/>
3Reps
<input type="text" name="3r"/>

3Dlbs
<input type="text" name="3Dl"/>
3DReps
<input type="text" name="3Dr"/>

<input type="submit" name="ok" value="add"
</form>
	<p>Hams One</p>
	<p>Quads Two</P>
	<p>Hams Two</p>
	<p>Calfs</p>
	<p>Cool Down</p>
</body>
</html>
