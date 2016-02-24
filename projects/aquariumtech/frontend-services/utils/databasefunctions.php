<?php

/*--------------------------------------------------------------------------------------------------
HOW TO USE IT

MySQL
$results = queryMySQLDatabase($MySQLServer, $MySQLUser, $MySQLPassword, $MySQLDatabase, $MySQLQuery);

foreach ($results as $result) {
	echo $result['key'].'<br>'; 
}

MSSQL
$results = queryMSSQLDatabase($MSSQLServer, $MSSQLUser, $MSSQLPassword, $MSSQLDatabase, $MSSQLQuery);

foreach ($results as $result) {
	echo $result['key'].'<br>'; 
}

the 'key' refers to the different queried fields.

----------------------------------------------------------------------------------------------------*/


function queryMySQLDatabase ($MySQLServer, $MySQLUser, $MySQLPassword, $MySQLDatabase, $MySQLQuery){

	// Connecting to Database
	$MySQLLink = mysql_connect($MySQLServer, $MySQLUser, $MySQLPassword) 
		or die('Could not connect: ' . mysql_error());

	//Selecting the Database	
	mysql_select_db($MySQLDatabase, $MySQLLink)
	    or die('Unable to select database! ' .$MySQLDatabase);

	//Performing Query
	$MySQLQueryResult = mysql_query($MySQLQuery) or die('Query failed: ' . mysql_error());

	$results = array();
	
	while ($MySQLQueryResultRow = mysql_fetch_assoc($MySQLQueryResult)){
		$results[] = $MySQLQueryResultRow;
	}

	// Free resultset
	mysql_free_result($MySQLQueryResult);

	// Closing connection
	mysql_close($MySQLLink);

	return $results;

}

function queryMSSQLDatabase ($MSSQLServer, $MSSQLUser, $MSSQLPassword, $MSSQLDatabase, $MSSQLQuery){

	// Connecting to Database
	$MSSQLLink = mssql_connect($MSSQLServer, $MSSQLUser, $MSSQLPassword) 
		or die('Could not connect: ' . mssql_error());

	//Selecting the Database	
	mssql_select_db($MSSQLDatabase, $MSSQLLink)
	    or die('Unable to select database! ' .$MSSQLDatabase);

	//Performing Query
	$MSSQLQueryResult = mssql_query($MSSQLQuery) or die('Query failed: ' . mssql_error());

	$results = array();
	
	while ($MSSQLQueryResultRow = mssql_fetch_array($MSSQLQueryResult)){
		$results[] = $MSSQLQueryResultRow;
	}

	// Free resultset
	mssql_free_result($MSSQLQueryResult);

	// Closing connection
	mssql_close($MSSQLLink);

	return $results;

}

?>