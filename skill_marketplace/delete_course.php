<?php
session_start();
include("config.php");

if ($_SESSION['role'] != 'admin') {
    header("Location: login.php");
    exit();
}

$id = $_GET['id'];

$conn->query("DELETE FROM courses WHERE id=$id");

header("Location: admin_courses.php");
exit();
?>