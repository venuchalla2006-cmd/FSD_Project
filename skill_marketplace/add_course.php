<?php
session_start();
include("config.php");

// 🔐 CHECK LOGIN
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

// 🔐 CHECK ADMIN
if (!isset($_SESSION['role']) || $_SESSION['role'] != 'admin') {
    header("Location: login.php");
    exit();
}

// ADD COURSE
if (isset($_POST['add'])) {

    $title = $_POST['title'];
    $description = $_POST['description'];
    $price = $_POST['price'];
    $image = $_FILES['image']['name'];

    move_uploaded_file($_FILES['image']['tmp_name'], "images/" . $image);

    $conn->query("INSERT INTO courses (title, description, price, image)
    VALUES ('$title', '$description', '$price', '$image')");

    header("Location: admin_courses.php");
    exit();
}
?>

<!DOCTYPE html>
<html>
<head>
<title>Add Course</title>
</head>
<body>

<h2>Add New Course</h2>

<form method="POST" enctype="multipart/form-data">
    <input type="text" name="title" placeholder="Course Title" required><br><br>
    <input type="text" name="description" placeholder="Description"><br><br>
    <input type="number" name="price" placeholder="Price"><br><br>
    <input type="file" name="image" required><br><br>

    <button name="add">Add Course</button>
</form>

</body>
</html>