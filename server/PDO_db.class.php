<?php

class pdoDB {
	// private statics to hold the connection
	private static $dbConnection = null;

	// make the next 2 functions private to prevent normal
	// class instantiation
	private function __construct() {
	}
	private function __clone() {
	}

	/**
	 * Return DB connection or create initial connection
	 * @return object (PDO)
	 * @access public
	 */
	public static function getConnection() {
		// if there isn't a connection already then create one
		if ( !self::$dbConnection ) {
			try {
				self::$dbConnection = new PDO( 'sqlite:/local-html/year-3/CM0665-web-app-int/angular/srs.sqlite');
				self::$dbConnection->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
			}
			catch( PDOException $e ) {
				// in a production system you would log the error not display it
				echo $e->getMessage();
			}
		}
		// return the connection
		return self::$dbConnection;
	}

}

?>