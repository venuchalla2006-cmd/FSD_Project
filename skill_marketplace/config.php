<?php
$conn = new mysqli("localhost", "root", "", "skill_marketplace");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>