<?php

	require_once('PDO_db.class.php');
	require_once('JSON_RecordSet.php');

	$action  = isset($_REQUEST['action'])  ? $_REQUEST['action']  : null;
	$subject = isset($_REQUEST['subject']) ? $_REQUEST['subject'] : null;
	$id      = isset($_REQUEST['id'])      ? $_REQUEST['id']      : null;

	//
	if (empty($action)) {
		if ((($_SERVER['REQUEST_METHOD'] == 'POST') ||
			($_SERVER['REQUEST_METHOD'] == 'PUT') ||
			($_SERVER['REQUEST_METHOD'] == 'DELETE')) &&
		(strpos($_SERVER['CONTENT_TYPE'], 'application/json') !== false)) {

			$input = json_decode(file_get_contents('php://input'), true);

			$action = isset($input['action']) ? $input['action'] : null;
			$subject = isset($input['subject']) ? $input['subject'] : null;
			$data = isset($input['data']) ? $input['data'] : null;
		}
	}
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
		case 'updateStudent':
			if (!empty($data)) {
				$student = json_decode($data);
				$studentUpdateSQL = "update srs_student set surname=:surname, forename=:forename, email=:email, stage=:stage where studentid=:studentid";
				$rs = new JSONRecordSet();
				$retval = $rs->getRecordSet($studentUpdateSQL,
				'ResultSet',
				array(':surname'=>$student->surname,
				      ':forename'=>$student->forename,
				      ':email'=>$student->email,
				      ':stage'=>$student->stage,
				      ':studentid'=>$student->studentid));
				echo '{"status":"ok", "message":{"text":"updated", "studentid":"'.$student->studentid.'"}}';
			}
			break;
		default:
			echo '{"status":"error", "message":{"text": "default no action taken"}}';
			break;
	}
?>