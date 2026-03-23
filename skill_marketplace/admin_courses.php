<?php
session_start();
include("config.php");

// 🔐 ADMIN CHECK
if (!isset($_SESSION['role']) || $_SESSION['role'] != 'admin') {
    header("Location: login.php");
    exit();
}

// 🚫 NO CACHE (IMPORTANT)
header("Cache-Control: no-cache, no-store, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");

// GET COURSES
$result = $conn->query("SELECT * FROM courses ORDER BY id DESC");

if (!$result) {
    die("Error: " . $conn->error);
}
?>

<!DOCTYPE html>
<html>
<head>
<title>Admin Courses</title>

<style>
body {
    margin: 0;
    font-family: Arial;
    display: flex;
}

/* SIDEBAR */
.sidebar {
    width: 220px;
    height: 100vh;
    background: #1e1e2f;
    color: white;
    padding: 20px;
}

.sidebar a {
    display: block;
    color: white;
    text-decoration: none;
    margin: 10px 0;
}

.sidebar a:hover {
    color: #00c6ff;
}

/* MAIN */
.main {
    flex: 1;
    padding: 20px;
    background: #f4f6f9;
}

/* CARD */
.card {
    background: white;
    padding: 15px;
    margin: 10px 0;
    border-radius: 10px;
}

img {
    width: 200px;
    height: 120px;
    object-fit: cover;
}

button {
    background: red;
    color: white;
    border: none;
    padding: 6px 10px;
    border-radius: 5px;
}
</style>

</head>
<body>

<div class="sidebar">
    <h3>Admin Panel</h3>
    <a href="admin_dashboard.php">Dashboard</a>
    <a href="admin_courses.php">Courses</a>
    <a href="add_course.php">Add Course</a>
    <a href="logout.php">Logout</a>
</div>

<div class="main">
<h2>All Courses</h2>

<?php while($row = $result->fetch_assoc()) { ?>

<div class="card">
    <img src="images/<?php echo $row['image']; ?>"><br>
    <h3><?php echo $row['title']; ?></h3>
    <p><?php echo $row['description']; ?></p>
    <p>₹ <?php echo $row['price']; ?></p>

    <a href="delete_course.php?id=<?php echo $row['id']; ?>">
        <button>Delete</button>
    </a>
</div>

<?php } ?>

</div>

</body>
</html>