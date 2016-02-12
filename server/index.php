<?php

	require_once('PDO_db.class.php');
	require_once('JSON_RecordSet.php');

	$action  = isset($_REQUEST['action'])  ? $_REQUEST['action']  : null;
	$subject = isset($_REQUEST['subject']) ? $_REQUEST['subject'] : null;
	$id      = isset($_REQUEST['id'])      ? $_REQUEST['id']      : null;

	// concatenate the action and the subject, making the first letter of subject uppercase
	$route = $action . ucfirst($subject);

	$db = pdoDB::getConnection();

	// set the header to JSON because everything is returned in that format
	header("Content-Type: application/json");

	// take the appropriate action based on the action and subject
	switch ($route){
		case 'listStudents':
			$id = $db->quote($id);
			$sqlCourseStudents = "SELECT studentid, forename, surname, stage, email
								  FROM srs_student WHERE coursecode=$id ORDER BY surname, forename";
			$rs = new JSONRecordSet(); // initiate class
			$retval = $rs->getRecordSet($sqlCourseStudents);
			echo $retval;
			break;
		case 'listCourses':
			$sqlCourses = "SELECT coursecode, coursetitle department
						   FROM srs_course c INNER JOIN srs_dept d ON c.deptcode=d.deptcode ORDER BY coursetitle";
			$rs = new JSONRecordSet();
			$retval = $rs->getRecordSet($sqlCourses, 'ResultSet');
			echo $retval;
			break;
		default:
			echo '{"status":"error", "message":{"text": "default no action taken"}}';
			break;
	}
?>