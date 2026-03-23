<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
include("config.php");

// LOGIN CHECK
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

$user_name = $_SESSION['user_name'] ?? "User";

// GET COURSES
$result = $conn->query("SELECT * FROM courses");

if (!$result) {
    die("Query Error: " . $conn->error);
}
?>

<!DOCTYPE html>
<html>
<head>
<title>Courses</title>

<style>

/* BODY */
body {
    margin: 0;
    font-family: Arial;
    display: flex;
    background: #f4f6f9;
}

/* SIDEBAR */
.sidebar {
    width: 220px;
    height: 100vh;
    background: #1e1e2f;
    color: white;
    padding: 20px;
    position: fixed;
}

.sidebar h2 {
    margin-bottom: 20px;
}

.sidebar a {
    display: block;
    color: white;
    text-decoration: none;
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
}

.sidebar a:hover {
    background: #333;
}

.logout {
    background: red;
}

/* MAIN */
.main {
    margin-left: 240px;
    padding: 20px;
    width: 100%;
}

/* TOP BAR */
.topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* GRID */
.course-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

/* CARD */
.card {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.card img {
    width: 100%;
    height: 150px;
    object-fit: cover;
}

.card-body {
    padding: 15px;
}

.price {
    color: green;
    font-weight: bold;
}

/* BUTTON */
button {
    margin-top: 10px;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background: #007bff;
    color: white;
}

button:hover {
    background: #0056b3;
}

</style>

</head>
<body>

<!-- SIDEBAR -->
<div class="sidebar">
    <h2>🎓 SkillApp</h2>

    <a href="dashboard.php">Dashboard</a>
    <a href="courses.php">Courses</a>
    <a href="profile.php">Profile</a>
    <a href="logout.php" class="logout">Logout</a>
</div>

<!-- MAIN -->
<div class="main">

    <!-- TOP BAR -->
    <div class="topbar">
        <h2>Courses</h2>
        <span>👤 <?php echo $user_name; ?></span>
    </div>

    <!-- COURSES -->
    <div class="course-container">

    <?php while($row = $result->fetch_assoc()) { ?>

        <div class="card">

            <img src="images/<?php echo $row['image']; ?>">

            <div class="card-body">
                <h3><?php echo $row['title']; ?></h3>
                <p><?php echo $row['description']; ?></p>
                <p class="price">₹ <?php echo $row['price']; ?></p>

               <a href="payment.php?course_id=<?php echo $row['id']; ?>">
            <button style="background:green;color:white;padding:10px;border:none;">
                Enroll Now
            </button>
                </a>
            </div>

        </div>

    <?php } ?>

    </div>

</div>

</body>
</html>