<?php
include 'config.php';

if(!isset($_SESSION['user_id'])){
    header("Location: login.php");
    exit();
}

$user = $conn->query("SELECT * FROM users WHERE id=".$_SESSION['user_id'])->fetch_assoc();

if($user['role'] != 'admin'){
    die("Access Denied");
}
?>

<!DOCTYPE html>
<html>
<head>
<title>Admin Panel</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>

<body>

<div class="d-flex">

    <!-- Sidebar -->
    <div class="bg-dark text-white p-3" style="width:250px; min-height:100vh;">
        <h4>Admin Panel</h4>
        <hr>
        <a href="admin_dashboard.php" class="text-white d-block mb-2">Dashboard</a>
        <a href="add_course.php" class="text-white d-block mb-2">Add Course</a>
        <a href="admin_users.php" class="text-white d-block mb-2">View Users</a>
        <a href="logout.php" class="text-danger d-block mt-4">Logout</a>
    </div>

    <!-- Content -->
    <div class="flex-grow-1 p-4">