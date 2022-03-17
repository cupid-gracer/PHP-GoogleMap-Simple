<?php
include('Utils.php');

class DB
{
    private $servername = "localhost";
    private $username = "root";
    private $password = "";
    private $dbname = "mediapro_weticketit_booking";
    private $con;
    // private $servername = "localhost";
    // private $username = "meetahoe_root";
    // private $password = "qwe123QWE!@#";
    // private $dbname = "meetahoe_mediapro_weticketit_booking";
    // private $con;

    function __construct() {
        $this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
        // Check connection
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    public function sqlRun($sql)
    {
        return $this->conn->query($sql);
    }
}
?>