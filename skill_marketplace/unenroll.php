<?php
session_start();
include("config.php");

$user_id = $_SESSION['user_id'];
$course_id = $_GET['id'];

$conn->query("DELETE FROM enrollments WHERE user_id=$user_id AND course_id=$course_id");

header("Location: dashboard.php");
?>